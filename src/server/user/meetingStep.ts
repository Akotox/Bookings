"use server";

import { BookingSteps } from "@/app/interfaces/BookingSteps";
import { connectToRedis, redisClient } from "@/lib/redisClient";

export async function getBookingStep(tId: string): Promise<BookingSteps | null> {
  try {
    await connectToRedis();

    const data = await redisClient!.get(tId);

    if (data === null) {
      return null;
    }

    const bookingStep: BookingSteps = JSON.parse(data);

    return bookingStep;
  } catch (error) {
    throw new Error(`Error fetching booking step: ${error}`);
  }
}

