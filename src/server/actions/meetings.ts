"use server"
import { db } from "@/drizzle/db"
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule"
import { meetingActionSchema } from "@/schema/meetings"
import "use-server"
import { z } from "zod"
import { createCalendarEvent } from "../googleCalendar"
import { redirect } from "next/navigation"
import { fromZonedTime } from "date-fns-tz"
import { prisma } from "@/lib/prisma"
import {  MeetingStatus } from "@prisma/client"
import { addDays } from "date-fns"

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

  const ti = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq, and }) =>
      and(
        eq(clerkUserId, data.clerkUserId),
      ),
  })

  if (ti == null) return { error: true }


  if (data.isTrial) {
    console.log('====================================');
    console.log("Trial is hit");
    console.log('====================================');
    try {
      const res = await createCalendarEvent({
        ...data,
        startTime: startInTimezone,
        durationInMinutes: event.durationInMinutes,
        eventName: event.name,
        isTrial: true,
        frequency: data.frequency
      })


      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: new Date(res.start!.dateTime!),
          startTime: new Date(res.start!.dateTime!),
          endTime: new Date(res.end!.dateTime!),
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.price,
          description: res!.description!,
          teacherEmail: res.organizer!.email!,
          title: res!.summary!,
          studentTimeZone: data.timezone,
          teacherTimeZone: ti.timezone,
          teacherFinished: false,
          studentFinished: false,
          duration: event.durationInMinutes,
          eventId: res.id
        }
      })
  
      await prisma.user.update({
        where: {
          id: data.userId
        },
        data: {
          hasUsedFreeTrial: true
        }
      })
  
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
    

    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
    )
  }

  if (data.frequency === 4 && data.classPerWeek === 1 || data.frequency === 12 && data.classPerWeek === 1 || data.frequency === 48 && data.classPerWeek === 1) {
   

    const res = await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })


    let startDate = new Date(res.start!.dateTime!);

    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency/data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency/data.frequency,
          description: res!.description!,
          teacherEmail: res.organizer!.email!,
          title: res!.summary!,
          studentTimeZone: data.timezone,
          teacherTimeZone: ti.timezone,
          teacherFinished: false,
          studentFinished: false,
          duration: event.durationInMinutes,
          eventId: res.id
        },
      });
  
     
      startDate = addDays(startDate, 7);
      endDate = addDays(endDate, 7);
    }
  

    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
    )


  }

  if (data.frequency === 8 && data.classPerWeek === 2 || data.frequency === 24 && data.classPerWeek === 2 || data.frequency === 96 && data.classPerWeek === 2) {

    const res = await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    let startDate = new Date(res.start!.dateTime!);
    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency/data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency/data.frequency,
          description: res!.description!,
          teacherEmail: res.organizer!.email!,
          title: res!.summary!,
          studentTimeZone: data.timezone,
          teacherTimeZone: ti.timezone,
          teacherFinished: false,
          studentFinished: false,
          duration: event.durationInMinutes,
          eventId: res.id
        },
      });
  
     
      startDate = addDays(startDate, 7);
      endDate = addDays(endDate, 7);
    }


    if (data.step === 2) {
      redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
      )
    }

    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/2?d=${data.startTime.toISOString()}`
    )
  }

  if (data.frequency === 12 && data.classPerWeek === 3 || data.frequency === 36 && data.classPerWeek === 3 || data.frequency === 144 && data.classPerWeek === 3) {

    const res = await createCalendarEvent({
      ...data,
      startTime: startInTimezone,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    let startDate = new Date(res.start!.dateTime!);
    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency/data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency/data.frequency,
          description: res!.description!,
          teacherEmail: res.organizer!.email!,
          title: res!.summary!,
          studentTimeZone: data.timezone,
          teacherTimeZone: ti.timezone,
          teacherFinished: false,
          studentFinished: false,
          duration: event.durationInMinutes,
          eventId: res.id
        },
      });
  
      startDate = addDays(startDate, 7);
      endDate = addDays(endDate, 7);
    }

    if (data.step === 2 && data.frequency === 12) {
      redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/3?d=${data.startTime.toISOString()}`
      )
    }

    if (data.step === 3 && data.frequency === 12) {
      redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/success?startTime=${data.startTime.toISOString()}`
      )
    }

    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/2?d=${data.startTime.toISOString()}`
    )
  }



}
