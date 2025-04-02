import { CopyEventButton } from "@/components/CopyEventButton";
import NotFound from "@/components/ui/404";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SyncApp } from "@/components/ui/sync_app";
import { TypewriterEffectSmoothDemo } from "@/components/ui/type_writer_demo";
import { TypewriterEffectSmooth } from "@/components/ui/typer-writer-effect";
import { db } from "@/drizzle/db";
import { formatEventDescription } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { getSyncedApp } from "@/server/teacher/getSyncedApp";
import { getTeacherId } from "@/server/teacher/getTeacherByEmail";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Teacher Events List",
  };
}

export const revalidate = 0;

export default async function EventsPage() {
  const { userId, redirectToSignIn } = auth();

  if (userId == null) return redirectToSignIn();

  const user = await currentUser();

  if (user == null) return redirectToSignIn();

  const teacherId = await getTeacherId(user.emailAddresses[0].emailAddress);

  if (!teacherId) return NotFound({ message: "Teacher not found" });

  const isAppSynced: boolean = await getSyncedApp(userId);

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  const words = [
    {
      text: "Almost",
    },
    {
      text: "there,",
    },
    {
      text: "create",
    },
    {
      text: "schedule",
    },
    {
      text: "to be visible on",
    },
    {
      text: "StudyBuddy.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <>
      {events.length > 0 ? (
        isAppSynced ? (
          <div className="flex flex-col items-center justify-center h-[55rem]">
            <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
              The road to financial freedom starts here
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>
        ) : (
          <SyncApp
            clerkId={userId}
            teacherId={teacherId}
            email={user.emailAddresses[0].emailAddress}
          />
        )
      ) : (
        <div className="flex flex-col items-center gap-4">
          <TypewriterEffectSmoothDemo teacherId={teacherId} />
        </div>
      )}
    </>
  );
}

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border border-neutral-200 rounded-lg shadow-md p-4",
        !isActive && "border-secondary/50"
      )}
    >
      <CardHeader className={cn("mb-4", !isActive && "opacity-50")}>
        <CardTitle className="text-xl font-semibold text-primary dark:text-white">
          {name}
        </CardTitle>
        <CardDescription className="text-lg font-medium text-neutral-500 dark:text-neutral-300">
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent
          className={cn(
            "text-base text-neutral-700 dark:text-neutral-100",
            !isActive && "opacity-50"
          )}
        >
          {description}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2 mt-auto">
        {isActive && (
          <CopyEventButton
            variant="outline"
            eventId={id}
            clerkUserId={clerkUserId}
            className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white"
          />
        )}
      </CardFooter>
    </Card>
  );
}
