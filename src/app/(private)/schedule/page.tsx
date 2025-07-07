import { EventForm } from "@/components/forms/EventForm"
import { ScheduleForm } from "@/components/forms/ScheduleForm"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { getSyncedApp } from "@/server/teacher/getSyncedApp"
import { auth } from "@clerk/nextjs/server"
import { LinkIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Change Schedule",
  };
}

export const revalidate = 0

export default async function SchedulePage() {
  const { userId, redirectToSignIn } = auth()
  if (userId == null) return redirectToSignIn()

  const syncedApp = await getSyncedApp(userId)

if (!syncedApp) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md mx-auto">
         <CardHeader className="items-center text-center">
          {/* A prominent icon in the header */}
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <LinkIcon className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Connect Your Account</CardTitle>
          <CardDescription>
            Sync your account to manage your schedule.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Syncing your account will allow you to view and manage your schedule
            directly from this application.
          </p>
        </CardContent>
        <CardFooter>
          {/* Add a function to handle the sync process */}
          <Link href="/events" className="btn btn-primary text-center font-semibold rounded-xl w-full bg-blue-500 hover:bg-blue-600 text-white">
            Sync Account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

  const schedule = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  })

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule} />
      </CardContent>
    </Card>
  )
}
