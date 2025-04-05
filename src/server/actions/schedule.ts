"use server"

import { db } from "@/drizzle/db"
import { ScheduleAvailabilityTable, ScheduleTable } from "@/drizzle/schema"
import { prisma } from "@/lib/prisma"
import { scheduleFormSchema } from "@/schema/schedule"
import { auth } from "@clerk/nextjs/server"
import { Day } from "@prisma/client"
import { eq } from "drizzle-orm"
import { BatchItem } from "drizzle-orm/batch"
import "use-server"
import { z } from "zod"

export async function saveSchedule(
  unsafeData: z.infer<typeof scheduleFormSchema>
) {
  const { userId } = auth()
  const { success, data } = scheduleFormSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true }
  }

  const { availabilities, ...scheduleData } = data

  const syncedTeacher = await prisma.syncScheduleApp.findUnique({
    where: { clerkUserId: userId },
  })

  if (!syncedTeacher) {
    return { error: true }
  }

  let availability = await prisma.availability.findFirst({
    where: { teacherId: syncedTeacher.email },
  });

  const user = await prisma.user.findUnique({
    where: { email: syncedTeacher.teacherId },
  });

  if (!user) {
    return { error: true }
  }

  if (!availability) {
    availability = await prisma.availability.create({
      data: {
        teacherId: syncedTeacher.email,
        userId: user.id,
      },
    });
  }

  const existingBlocks = await prisma.timeBlock.findMany({
    where: { availabilityId: availability.id },
  });

  if (existingBlocks.length > 0) {
    // Delete existing time blocks
    await prisma.timeBlock.deleteMany({
      where: { availabilityId: availability.id },
    });

  }

  const padTime = (time: string) => {
    const [hour, minute] = time.split(":");
    return `${hour.padStart(2, "0")}:${minute}`;
  };
  // Create new time blocks
  if (availabilities.length > 0) {
    const newBlocks = availabilities.map((a) => ({
      day: a.dayOfWeek.toLowerCase() as Day,
      startTime: padTime(a.startTime),
      endTime: padTime(a.endTime),
      availabilityId: availability.id,
    }));

    await prisma.timeBlock.createMany({
      data: newBlocks,
    });

    if (newBlocks.length >= 3) {
      await prisma.teacher.update({
        where: {
          id: syncedTeacher.email, // or `teacherId` if you have it available
        },
        data: {
          meetsRequirement: true,
        },
      });
    }else{
      await prisma.teacher.update({
        where: {
          id: syncedTeacher.email, // or `teacherId` if you have it available
        },
        data: {
          meetsRequirement: false,
        },
      });
    }


    const [{ id: scheduleId }] = await db
      .insert(ScheduleTable)
      .values({ ...scheduleData, clerkUserId: userId })
      .onConflictDoUpdate({
        target: ScheduleTable.clerkUserId,
        set: scheduleData,
      })
      .returning({ id: ScheduleTable.id })

    const statements: [BatchItem<"pg">] = [
      db
        .delete(ScheduleAvailabilityTable)
        .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId)),
    ]

    if (availabilities.length > 0) {
      statements.push(
        db.insert(ScheduleAvailabilityTable).values(
          availabilities.map(availability => ({
            ...availability,
            scheduleId,
          }))
        )
      )
    }

    await db.batch(statements)
  }
}