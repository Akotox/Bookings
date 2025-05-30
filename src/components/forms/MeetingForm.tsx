"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { meetingFormSchema } from "@/schema/meetings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  formatDate,
  formatTimeString,
  formatTimezoneOffset,
} from "@/lib/formatters";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { toZonedTime } from "date-fns-tz";
import { createMeeting } from "@/server/actions/meetings";
import { DateTime } from "luxon";

export function MeetingForm({
  validTimes,
  eventId,
  clerkUserId,
  userId,
  teacherId,
  frequency,
  name,
  email,
  isTrial,
  classPerWeek,
  step,
  initialDate,
  teacherName,
  classCode,
  price,
  classBundleId,
  bookingId,
  isReschedule,
}: {
  validTimes: Date[];
  eventId: string;
  clerkUserId: string;
  userId: string;
  teacherId: string;
  frequency: number;
  name: string;
  email: string;
  isTrial: boolean;
  classPerWeek: number;
  step?: string;
  initialDate?: string;
  teacherName: string;
  classCode: string;
  price: number;
  classBundleId?: string;
  bookingId?: string;
  isReschedule: boolean;
}) {
  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      guestName: name,
      guestEmail: email,
      guestNotes: isTrial
        ? "This session is a trial, so feel free to ask questions about our services and let us know your expectations. We want to ensure you get the most out of this experience."
        : "This is a regular session, and we’ll be focusing on the planned classes and topics.",
      classPerWeek: classPerWeek,
      isTrial: isTrial,
      step: parseInt(step! || "1", 10) || 1,
      teacherName: teacherName,
      classCode: classCode,
      price: price,
      classBundleId: classBundleId,
      bookingId: bookingId,
      isReschedule: isReschedule,
    },
  });

  const timezone = form.watch("timezone");
  const date = form.watch("date");
  const validTimesInTimezone = useMemo(() => {
    return validTimes.map((date) => toZonedTime(date, timezone));
  }, [validTimes, timezone]);
  const startTime = form.watch("startTime");
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  async function onSubmit(values: z.infer<typeof meetingFormSchema>) {

    const data = await createMeeting({
      ...values,
      eventId,
      clerkUserId,
      userId,
      frequency,
      teacherId,
      start: startTime,
      browserTimeZone: browserTimeZone,
    });

    if (data?.error) {
      form.setError("root", {
        message: "There was an error saving your event",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf("timeZone").map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <Popover>
                <FormItem className="flex-1">
                  <FormLabel>Date</FormLabel>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal flex w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        !validTimesInTimezone.some((time) =>
                          isSameDay(date, time)
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                  <FormMessage />
                </FormItem>
              </Popover>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Time</FormLabel>
                <Select
                  disabled={date == null || timezone == null}
                  onValueChange={(value) => {
                    console.log("====================================");
                    console.log(
                      "Selected UTC time (raw value from dropdown):",
                      value
                    );
                    console.log("====================================");

                    // Timezone where this time should be converted to
                    console.log("====================================");
                    console.log("Browser Timezone:", browserTimeZone);
                    console.log("Target Timezone:", timezone);
                    console.log("====================================");

                    // Step 1: Parse selected value as UTC
                    const selectedUtcTime = DateTime.fromISO(value, {
                      zone: "utc",
                    });

                    // Step 2: Convert to browser local time (for context)
                    const browserLocalTime =
                      selectedUtcTime.setZone(browserTimeZone);
                    console.log(
                      "Browser Local Time:",
                      browserLocalTime.toISO()
                    );

                    // Step 3: Extract just the time parts (hour/minute/etc) from browser time
                    // and reconstruct in the target timezone (e.g., Asia/Bangkok), maintaining same wall clock time
                    const adjustedTimeInTargetZone = DateTime.fromObject(
                      {
                        year: browserLocalTime.year,
                        month: browserLocalTime.month,
                        day: browserLocalTime.day,
                        hour: browserLocalTime.hour,
                        minute: browserLocalTime.minute,
                      },
                      { zone: timezone }
                    );

                    console.log("====================================");
                    console.log(
                      "Adjusted Time in Target Zone (wall clock preserved):",
                      adjustedTimeInTargetZone.toISO()
                    );
                    console.log("====================================");

                    // Step 4: Submit this adjusted time as a JS Date object

                    adjustedTimeInTargetZone.toJSDate();
                    console.log("====================================");
                    console.log(
                      "Adjusted Time in Target Zone (JS Date):",
                      adjustedTimeInTargetZone.toJSDate()
                    );
                    console.log("====================================");

                    // Step 5: I want adjustedTimeInTargetZone.toJSDate() in Date format and verify whether it is in the correct timezone
                    // Step 5: I want adjustedTimeInTargetZone.toJSDate() in Date format and verify whether it is in the correct timezone

                    const jsDate = adjustedTimeInTargetZone.toJSDate();
                    console.log("====================================");
                    console.log(
                      "Adjusted JS Date (system local):",
                      jsDate.toString()
                    ); // Local time (Africa/Johannesburg if that's your browser)
                    console.log(
                      "Adjusted JS Date (ISO / UTC):",
                      jsDate.toISOString()
                    ); // Always in UTC
                    console.log("====================================");

                    // Re-parse with Luxon and show it in the target timezone
                    const check = DateTime.fromJSDate(jsDate).setZone(timezone);
                    console.log(`Re-parsed in "${timezone}":`, check.toISO());
                    console.log("Hour in timezone:", check.hour);
                    console.log("====================================");
                    field.onChange(adjustedTimeInTargetZone.toJSDate());
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          date == null || timezone == null
                            ? "Select a date/timezone first"
                            : "Select a meeting time"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {validTimesInTimezone
                      .filter((time) => isSameDay(time, date))
                      .map((time) => (
                        <SelectItem
                          key={time.toISOString()}
                          value={time.toISOString()}
                        >
                          {formatTimeString(time)}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guestEmail"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="guestNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <button
            disabled={form.formState.isSubmitting}
            type="button"
            className="w-24 transform rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-red-600"
          >
            <Link href={`/book/${clerkUserId}`}>Cancel</Link>
          </button>

          <button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Schedule
          </button>
        </div>
      </form>
    </Form>
  );
}
