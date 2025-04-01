import { MeetingForm } from "@/components/forms/MeetingForm";
import NotFound from "@/components/ui/404";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { frequencyMapping, getFrequencyValue } from "@/lib/classesPerWeek";
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule";
import { getTeacher } from "@/server/teacher/getTeacher";
import { getTeacherName } from "@/server/teacher/getTeacherName";
import { checkTrial } from "@/server/user/checkTrial";
import { getUser } from "@/server/user/getUser";
import { clerkClient } from "@clerk/nextjs/server";
import {
  addMonths,
  eachMinuteOfInterval,
  endOfDay,
  roundToNearestMinutes,
} from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Book a class",
  };
}

export const revalidate = 0;

export default async function BookEventPage({
  params: { clerkUserId, eventId, userId, frequency, teacherId },
}: {
  params: {
    clerkUserId: string;
    eventId: string;
    userId: string;
    frequency: string;
    teacherId: string;
  };
}) {
  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  });

  if (event == null)
    return <NotFound message="No events related to the proved information" />;

  const user = await getUser(userId);

  if (!user) return <NotFound message="User not found" />;

  const teacher = await getTeacher(teacherId);

  if (!teacher) return <NotFound message="Teacher not found" />;

  const teacherName: string | null = await getTeacherName(teacherId);

  if (!teacherName) return <NotFound message="Teacher not found" />;

  const hasTrial: boolean = await checkTrial(userId);

  const calendarUser = await clerkClient().users.getUser(clerkUserId);
  const startDate = roundToNearestMinutes(new Date(), {
    nearestTo: 15,
    roundingMethod: "ceil",
  });
  const endDate = endOfDay(addMonths(startDate, 2));

    const v = getFrequencyValue(frequency)
  
    if (!v) {
      return <NotFound message="Please book the correct class" />;
    }
  
    const frequencyInt = v.frequency;
  
    const classPerWeek: number = v.classPerWeek;


  if (
    event.durationInMinutes === 60 &&
    hasTrial === true &&
    (frequencyInt === 0 || frequencyInt === 1)
  ) {
    return <NotFound message="Please book the correct class" />;
  }

  if (
    (event.durationInMinutes === 30 &&
      hasTrial === false &&
      frequencyInt >= 2) ||
    (event.durationInMinutes === 30 && hasTrial === true && frequencyInt > 1)
  ) {
    return <NotFound message="Please book the correct class" />;
  }

  const validTimes = await getValidTimesFromSchedule(
    eachMinuteOfInterval(
      { start: startDate, end: endDate },
      { step: frequencyInt === 0 || frequencyInt === 1 ? 30 : 60 }
    ),
    event
  );

  if (validTimes.length === 0) {
    return <NoTimeSlots event={event} calendarUser={calendarUser} />;
  }

  return (
    <div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="mb-8">
            Book {event.name} with {teacherName}
          </CardTitle>
          {event.description && (
            <CardDescription>{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <MeetingForm
            validTimes={validTimes}
            eventId={event.id}
            clerkUserId={clerkUserId}
            isTrial={frequencyInt === 0 || frequencyInt === 1 ? true : false}
            name={user.name}
            email={user.email}
            userId={userId}
            teacherId={teacherId}
            frequency={frequencyInt}
            classPerWeek={classPerWeek}
            teacherName={teacherName} 
            />
        </CardContent>
      </Card>
    </div>
  );
}

function NoTimeSlots({
  event,
  calendarUser,
}: {
  event: { name: string; description: string | null };
  calendarUser: { id: string; fullName: string | null };
}) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          Book {event.name} with {calendarUser.fullName}
        </CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {calendarUser.fullName} is currently booked up. Please check back later
        or choose a shorter event.
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/book/${calendarUser.id}`}>Choose Another Event</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
