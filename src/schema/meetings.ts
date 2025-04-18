import { startOfDay } from "date-fns"
import { z } from "zod"

const meetingSchemaBase = z.object({
  startTime: z.date().min(new Date()),
  guestEmail: z.string().email().min(1, "Required"),
  guestName: z.string().min(1, "Required"),
  guestNotes: z.string().optional(),
  classBundleId: z.string().optional(),
  bookingId: z.string().optional(),
  timezone: z.string().min(1, "Required"),
  classPerWeek: z.number().min(1, "Required"),
  isTrial: z.boolean().default(false),
  step: z.number().default(1),
  teacherName: z.string().min(1, "Required"),
  classCode: z.string().min(1, "Required"),
  price: z.number().min(0, "Required").default(0),
  isReschedule:z.boolean().default(false),
})

export const meetingFormSchema = z
  .object({
    date: z.date().min(startOfDay(new Date()), "Must be in the future"),
  })
  .merge(meetingSchemaBase)

export const meetingActionSchema = z
  .object({
    eventId: z.string().min(1, "Required"),
    clerkUserId: z.string().min(1, "Required"),
    userId: z.string().min(1, "Required"),
    frequency: z.number(),
    teacherId: z.string().min(1, "Required"),
    start: z.date().min(startOfDay(new Date()), "Must be in the future"),
    browserTimeZone: z.string().min(1, "Required")
  })
  .merge(meetingSchemaBase)
