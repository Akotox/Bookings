"use server"

import { Events } from "@/components/ui/type_writer_demo"
import { db } from "@/drizzle/db"
import { EventTable } from "@/drizzle/schema"
import { prisma } from "@/lib/prisma"
import { eventFormSchema } from "@/schema/events"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import "use-server"
import { z } from "zod"

export async function createEvents(
  eventsData: Events[],
  teacherId: string
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth();

  if (!userId) {
    return { error: true };
  }

  const eventsWithUser = eventsData.map(event => ({
    ...event,
    clerkUserId: userId,
  }));

  const data = await db.insert(EventTable).values(eventsWithUser).returning({ id: EventTable.id, title: EventTable.name });



  if (data) {
    const trialEvent = data.find(event => event.title === "Trial Class")?.id;
    const regularEvent = data.find(event => event.title === "Regular Class")?.id;

    await prisma.teacher.update({
      where: {
        id: teacherId
      },
      data: {
        clerkUsedId: userId,
        trialEventId: trialEvent,
        regularEventId: regularEvent
      }
    })
  }


  redirect("/events");
}

export async function updateEvent(
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth()
  const { success, data } = eventFormSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true }
  }

  const { rowCount } = await db
    .update(EventTable)
    .set({ ...data })
    .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))

  if (rowCount === 0) {
    return { error: true }
  }

  redirect("/events")
}

export async function deleteEvent(
  id: string
): Promise<{ error: boolean } | undefined> {
  const { userId } = auth()

  if (userId == null) {
    return { error: true }
  }

  const { rowCount } = await db
    .delete(EventTable)
    .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))

  if (rowCount === 0) {
    return { error: true }
  }

  redirect("/events")
}
