import "use-server"
import { clerkClient } from "@clerk/nextjs/server"
import { google } from "googleapis"
import { addMinutes, endOfDay, startOfDay, addDays, getDay, formatISO } from "date-fns"

export async function getCalendarEventTimes(
  clerkUserId: string,
  { start, end }: { start: Date; end: Date }
) {
  const oAuthClient = await getOAuthClient(clerkUserId)

  const events = await google.calendar("v3").events.list({
    calendarId: "primary",
    eventTypes: ["default"],
    singleEvents: true,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    maxResults: 2500,
    auth: oAuthClient,
  })

  return (
    events.data.items
      ?.map(event => {
        if (event.start?.date != null && event.end?.date != null) {
          return {
            start: startOfDay(event.start.date),
            end: endOfDay(event.end.date),
          }
        }

        if (event.start?.dateTime != null && event.end?.dateTime != null) {
          return {
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
          }
        }
      })
      .filter(date => date != null) || []
  )
}

export async function createCalendarEvent({
  clerkUserId,
  guestName,
  guestEmail,
  startTime,
  guestNotes,
  durationInMinutes,
  eventName,
  isTrial,
  frequency,
  timezone,
  step,
  teacherName,
  classPerWeek
}: {
  clerkUserId: string;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  guestNotes?: string | null;
  durationInMinutes: number;
  eventName: string;
  isTrial: boolean;
  frequency: number;
  timezone: string;
  step?: number;
  teacherName: string;
  classPerWeek: number
}) {
  const oAuthClient = await getOAuthClient(clerkUserId);
  const calendarUser = await clerkClient().users.getUser(clerkUserId);
  if (calendarUser.primaryEmailAddress == null) {
    throw new Error('Clerk user has no email');
  }


  const dayOfWeek = getDay(startTime);
  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const dayAbbreviation = daysOfWeek[dayOfWeek];

  const count = Math.floor(frequency/classPerWeek);

  console.log('====================================');
  console.log(count);
  console.log('====================================');

  const recurrenceRule = `RRULE:FREQ=WEEKLY;BYDAY=${dayAbbreviation};COUNT=${count}`;

  console.log('====================================');
  console.log(recurrenceRule);
  console.log('====================================');

  const calendarEvent = await google.calendar('v3').events.insert({
    calendarId: 'primary',
    auth: oAuthClient,
    sendUpdates: 'all',
    requestBody: {
      attendees: [
        { email: guestEmail, displayName: guestName },
        {
          email: calendarUser.primaryEmailAddress.emailAddress,
          displayName: calendarUser.fullName,
          responseStatus: 'accepted',
        },
      ],
      description: guestNotes ? `Additional Details: ${guestNotes}` : undefined,
      start: {
        dateTime: formatISO(startTime),
        timeZone: timezone,
      },
      end: {
        dateTime: formatISO(addMinutes(startTime, durationInMinutes)),
        timeZone: timezone,
      },
      summary: `This is a Study Buddy Session between ${guestName} and Teacher ${teacherName} for a ${eventName.toLocaleLowerCase()}`,
      recurrence: isTrial ? [] : [recurrenceRule],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 0 },
          { method: 'popup', minutes: 12 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(), // Generate a unique request ID
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
    conferenceDataVersion: 1, 
  });


  return calendarEvent.data;
}

async function getOAuthClient(clerkUserId: string) {
  const token = await clerkClient().users.getUserOauthAccessToken(
    clerkUserId,
    "oauth_google"
  )

  if (token.data.length === 0 || token.data[0].token == null) {
    return
  }

  const client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URL
  )

  client.setCredentials({ access_token: token.data[0].token })

  return client
}
