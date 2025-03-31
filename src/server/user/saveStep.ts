"use server";

import { BookingSteps } from "@/app/interfaces/BookingSteps";
import { connectToRedis, redisClient } from "@/lib/redisClient";

export async function saveBookingStep(tId: string, data: BookingSteps): Promise<void> {
  try {
    await connectToRedis();

    await redisClient!.set(tId, JSON.stringify(data));

  } catch (error) {
    throw new Error(`Error saving booking step: ${error}`);
  }
}
