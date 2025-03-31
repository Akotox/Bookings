"use server"
import { db } from "@/drizzle/db"
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule"
import { meetingActionSchema } from "@/schema/meetings"
import "use-server"
import { z } from "zod"
import { createCalendarEvent } from "../googleCalendar"
import { redirect } from "next/navigation"
import { fromZonedTime } from "date-fns-tz"

export async function createMeeting(
  unsafeData: z.infer<typeof meetingActionSchema>
) {
  const { success, data } = meetingActionSchema.safeParse(unsafeData)

  if (!success) return { error: true }

  const event = await db.query.EventTable.findFirst({
    where: ({ clerkUserId, isActive, id }, { eq, and }) =>
      and(
        eq(isActive, true),
        eq(clerkUserId, data.clerkUserId),
        eq(id, data.eventId)
      ),
  })

  if (event == null) return { error: true }
  const startInTimezone = fromZonedTime(data.startTime, data.timezone)

  const validTimes = await getValidTimesFromSchedule([startInTimezone], event)
  if (validTimes.length === 0) return { error: true }


  if(data.isTrial){
    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: true,
      frequency: data.frequency
    })

    redirect(
      `/book/${data.clerkUserId}/${
        data.eventId
      }/${
        data.userId
      }/${data.frequency}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
    )
  }

  if (data.frequency === 4 || data.frequency === 24 || data.frequency === 48 ) {
  
    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    redirect(
      `/book/${data.clerkUserId}/${
        data.eventId
      }/${
        data.userId
      }/${data.frequency}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
    )

   
  }

  if (data.frequency === 8 ) {
  
    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    if(data.step === 2 && data.count == null){
      redirect(
        `/book/${data.clerkUserId}/${
          data.eventId
        }/${
          data.userId
        }/${data.frequency}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
      )
    }

    redirect(
      `/book/${data.clerkUserId}/${
        data.eventId
      }/${
        data.userId
      }/${data.frequency}/${data.teacherId}/2?d=${data.startTime.toISOString()}`
    )
  }

  if (data.frequency === 12 ) {
  
    await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    if(data.step === 2 ){
      redirect(
        `/book/${data.clerkUserId}/${
          data.eventId
        }/${
          data.userId
        }/${data.frequency}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
      )
    }
    
    redirect(
      `/book/${data.clerkUserId}/${
        data.eventId
      }/${
        data.userId
      }/${data.frequency}/${data.teacherId}/2?d=${data.startTime.toISOString()}`
    )
  }
  

  
}
