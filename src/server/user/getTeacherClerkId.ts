"use server";

import { prisma } from "@/lib/prisma";
import { SyncScheduleApp } from "@prisma/client";

export async function getTeacherClerkId(tId: string): Promise<SyncScheduleApp | null> {
    try {
      const app = await prisma.syncScheduleApp.findFirst({
        where: { email: tId },
      });

      if (app) {
        return app;
      }
  
      return null; 
    } catch (error) {
      throw new Error(`Error fetching teacher: ${error}`);
    }
  }