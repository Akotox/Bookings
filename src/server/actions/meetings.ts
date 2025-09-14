"use server"
import { db } from "@/drizzle/db"
import { getValidTimesFromSchedule } from "@/lib/getValidTimesFromSchedule"
import { meetingActionSchema } from "@/schema/meetings"
import "use-server"
import { z } from "zod"
import { createCalendarEvent, deleteSingleEvent } from "../googleCalendar"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { MeetingStatus, RescheduleStatus } from "@prisma/client"
import { addDays, format, formatISO, parse } from "date-fns"
import { DateTime } from 'luxon';

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

  const formattedTime = format(data.startTime, 'yyyy-MM-dd HH:mm:ss');


  const zonedTime = DateTime.fromFormat(formattedTime, 'yyyy-MM-dd HH:mm:ss', {
    zone: data.timezone,
  });

 console.log('====================================');
 console.log("bookingId:", data.bookingId);
 console.log('====================================');


  const startInTimezone = zonedTime.toJSDate();


  const ti = await db.query.ScheduleTable.findFirst({
    where: ({ clerkUserId }, { eq, and }) =>
      and(
        eq(clerkUserId, data.clerkUserId),
      ),
  })

  if (ti == null) return { error: true }



  if (data.isTrial && data.step === 1) {
    try {
      const res = await createCalendarEvent({
        ...data,
        startTime: data.start,
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

      return { error: true }
    }


    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/trial/success?startTime=${data.start.toISOString()}`
    )
  }


  if (data.isReschedule) {
    try {
      const res = await createCalendarEvent({
        ...data,
        startTime: data.start,
        durationInMinutes: event.durationInMinutes,
        eventName: event.name,
        isTrial: false,
        frequency: data.frequency,
      });

      const meeting = await prisma.meeting.findFirst({
        where: {
          id: data.classBundleId!,
        },
      });

      if (meeting) {
        // Create new rescheduled meeting
        await prisma.meeting.create({
          data: {
            studentId: data.userId,
            teacherId: data.teacherId,
            date: new Date(res.start!.dateTime!),
            startTime: new Date(res.start!.dateTime!),
            endTime: new Date(res.end!.dateTime!),
            googleMeetUrl: res.hangoutLink!,
            status: MeetingStatus.SCHEDULED,
            price: meeting.price,
            description: res.description!,
            teacherEmail: res.organizer!.email!,
            title: res.summary!,
            studentTimeZone: data.timezone,
            teacherTimeZone: ti.timezone,
            teacherFinished: false,
            studentFinished: false,
            duration: event.durationInMinutes,
            eventId: res.id,
          },
        });

        // Delete old calendar event
        await deleteSingleEvent(
          data.clerkUserId,
          meeting.eventId!,
          meeting.startTime,
          meeting.endTime
        );

        // Mark reschedule as completed
        await prisma.reschedule.update({
          where: {
            meetingId: meeting.id,
          },
          data: {
            status: RescheduleStatus.COMPLETED,
          },
        });

        // Delete old meeting entry
        await prisma.meeting.delete({
          where: {
            id: meeting.id,
          },
        });
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }

    // ✅ Redirect should *not* be inside try/catch
    const user = await prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (user) {
      redirect(`https://www.studybuddy.ing/${user.locale}`);
    } else {
      redirect(
        `/reschedule/${data.teacherId}/${data.userId}/${data.classBundleId!}/success?startTime=${data.start.toISOString()}`
      );
    }
  }
  if (data.frequency === 4 && data.classPerWeek === 1 || data.frequency === 12 && data.classPerWeek === 1 || data.frequency === 48 && data.classPerWeek === 1) {


    const res = await createCalendarEvent({
      ...data,
      startTime: data.start,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })



    let startDate = new Date(res.start!.dateTime!);

    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency / data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency / data.frequency,
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

    await prisma.classBooking.update({
      where: {
        id: data.bookingId,
      },
      data: {
        createdClassCount: {
          increment: data.frequency / data.classPerWeek,
        }
      }
    })


    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/success?startTime=${data.start.toISOString()}`
    )


  }

  if (data.frequency === 8 && data.classPerWeek === 2 || data.frequency === 24 && data.classPerWeek === 2 || data.frequency === 96 && data.classPerWeek === 2) {

    const res = await createCalendarEvent({
      ...data,
      startTime: data.start,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    let startDate = new Date(res.start!.dateTime!);
    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency / data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency / data.frequency,
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

    await prisma.classBooking.update({
      where: {
        id: data.bookingId,
      },
      data: {
        createdClassCount: {
          increment: data.frequency / data.classPerWeek,
        }
      }
    })


    if (data.step === 2 && (data.frequency === 8 || data.frequency === 24 || data.frequency === 96)) {
      redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/${data.step}/success?startTime=${data.start.toISOString()}`
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
      startTime: data.start,
      durationInMinutes: event.durationInMinutes,
      eventName: event.name,
      isTrial: false,
      frequency: data.frequency
    })

    let startDate = new Date(res.start!.dateTime!);
    let endDate = new Date(res.end!.dateTime!);

    for (let i = 0; i < data.frequency / data.classPerWeek; i++) {
      await prisma.meeting.create({
        data: {
          studentId: data.userId,
          teacherId: data.teacherId,
          date: startDate,
          startTime: startDate,
          endTime: endDate,
          googleMeetUrl: res.hangoutLink!,
          status: MeetingStatus.SCHEDULED,
          price: data.frequency / data.frequency,
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

    await prisma.classBooking.update({
      where: {
        id: data.bookingId,
      },
      data: {
        createdClassCount: {
          increment: data.frequency / data.classPerWeek,
        }
      }
    })

    if (data.step === 2 && (data.frequency === 12 || data.frequency === 36 || data.frequency === 144)) {
      redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/3?d=${data.startTime.toISOString()}`
      )
    }

    if (data.step === 3 && (data.frequency === 12 || data.frequency === 36 || data.frequency === 144)) {
       redirect(
        `/book/${data.clerkUserId}/${data.eventId
        }/${data.userId
        }/${data.classCode}/${data.teacherId}/${data.step}/success?startTime=${data.start.toISOString()}`
      )
    }

    redirect(
      `/book/${data.clerkUserId}/${data.eventId
      }/${data.userId
      }/${data.classCode}/${data.teacherId}/2?d=${data.start.toISOString()}`
    )
  }
}
