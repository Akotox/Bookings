"use server";

import { prisma } from "@/lib/prisma";

export async function checkTrial(tId: string): Promise<boolean> {
    try {
      const user = await prisma.user.findFirst({
        where: { id: tId },
      });

      if (!user) {
        return false;
      }
  
      return user?.hasUsedFreeTrial; 
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }