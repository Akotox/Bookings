"use server";

import { prisma } from "@/lib/prisma";

export async function getSyncedApp(tId: string): Promise<boolean> {
    try {
      const app = await prisma.syncScheduleApp.findFirst({
        where: { clerkUserId: tId },
      });

      if (app) {
        return true
      }
  
      return false; 
    } catch (error) {
      throw new Error(`Error fetching teacher: ${error}`);
    }
  }