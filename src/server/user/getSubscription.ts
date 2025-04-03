"use server";

import { prisma } from "@/lib/prisma";
import { Subscription, SubscriptionStatus } from "@prisma/client";


export async function getSubscription(tId: string, userId: string, bundleId: string): Promise<Subscription | null> {
  try {
   const sub = await prisma.subscription.findFirst({
    where: {
      userId: userId,
      teacherId: tId,
      classBundleId: bundleId,
      status: SubscriptionStatus.PENDING
    }
   });

   if (sub) {
    return sub;
   }

   return null;
    
  } catch (error) {
    throw new Error(`Error clearing booking step: ${error}`);
  }
}