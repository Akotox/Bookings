import { EventForm } from "@/components/forms/EventForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { getSyncedApp } from "@/server/teacher/getSyncedApp"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Booking Completed",
  };
}

export const revalidate = 0

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string }
}) {
  const { userId, redirectToSignIn } = auth()
  if (userId == null) return redirectToSignIn()


  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(clerkUserId, userId), eq(id, eventId)),
  })

  if (event == null) return notFound()

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description || undefined }}
        />
      </CardContent>
    </Card>
  )
}
