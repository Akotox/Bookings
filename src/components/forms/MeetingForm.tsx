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
import { en, vi } from "@/lib/languages"; // Adjust the import path

const translations = {
  en,
  vi,
};

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
  language = "en",
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
  language?: "en" | "vi";
}) {
  const t = translations[language];

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      guestName: name,
      guestEmail: email,
       guestNotes: isTrial
        ? t.placeholders.notes
        : t.placeholders.regularNotes, 
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
              <FormLabel>{t.fields.timezone}</FormLabel>
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
                  <FormLabel>{t.fields.date}</FormLabel>
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
                           <span>{t.placeholders.date}</span>
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
                 <FormLabel>{t.fields.time}</FormLabel>
                <Select
                  disabled={date == null || timezone == null}
                  onValueChange={(value) => {
                    const selectedUtcTime = DateTime.fromISO(value, {
                      zone: "utc",
                    });

                    // Step 2: Convert to browser local time (for context)
                    const browserLocalTime =
                      selectedUtcTime.setZone(browserTimeZone);
                  
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


                    adjustedTimeInTargetZone.toJSDate();

                    const jsDate = adjustedTimeInTargetZone.toJSDate();

                    // Re-parse with Luxon and show it in the target timezone
                    const check = DateTime.fromJSDate(jsDate).setZone(timezone);
                    field.onChange(adjustedTimeInTargetZone.toJSDate());
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          date == null || timezone == null
                           ? t.placeholders.time
                            : t.placeholders.selectTime
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
                 <FormLabel>{t.fields.yourName}</FormLabel>
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
                <FormLabel>{t.fields.yourEmail}</FormLabel>
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
             <FormLabel>{t.fields.notes}</FormLabel>
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
            <Link href={`/book/${clerkUserId}`}>{t.buttons.cancel}</Link>
          </button>

          <button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
             {t.buttons.schedule}
          </button>
        </div>
      </form>
    </Form>
  );
}
