import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { formatDateTime } from "@/lib/formatters";
import { getTeacherName } from "@/server/teacher/getTeacherName";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Booking Completed",
  };
}

export const revalidate = 0;

export default async function SuccessPage({
  params: { clerkUserId, eventId, userId, frequency, teacherId },
  searchParams: { startTime },
}: {
  params: { clerkUserId: string; eventId: string, userId: string, frequency: string, teacherId: string };
  searchParams: { startTime: string };
}) {
  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
      and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  });

  if (event == null) notFound();

  const teacherName = await getTeacherName(teacherId);

  const frequencyInt = parseInt(frequency || "0", 10) || 0;

  const session = frequencyInt === 0 || frequencyInt === 1 ? "Trial Session" : `${frequencyInt} Regular Sessions`;
  

  if (teacherName == null) notFound();
  

  const startTimeDate = new Date(startTime);

  return (
    <Card className="max-w-xl mx-auto bg-gradient-to-br from-blue-50 to-gray-100 shadow-lg rounded-2xl p-6">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {`Successfully Booked ${session}!`}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {event.name} with {teacherName}
        </CardDescription>
        <p className="text-sm text-gray-500">
          Starting from {formatDateTime(startTimeDate)}
        </p>
      </CardHeader>
      <CardContent className="text-center text-gray-700">
        🎉 You should receive an email confirmation shortly. Feel free to close
        this page or check your booking details.
      </CardContent>
      <CardFooter className="flex justify-center">
        <a href="https://app.studybuddy.ing" className="inline-block">
          <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Continue
          </button>
        </a>
      </CardFooter>
    </Card>
  );
}
