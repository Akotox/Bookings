"use server";

import { connectToRedis, redisClient } from "@/lib/redisClient";

export async function clearBookingStep(tId: string): Promise<void> {
  try {
    await connectToRedis();

    await redisClient!.del(tId);
    
  } catch (error) {
    throw new Error(`Error clearing booking step: ${error}`);
  }
}