"use server";

import { prisma } from "@/lib/prisma";
import { ClassBooking } from "@prisma/client";

export async function getFirstStageClassBooking(tId: string): Promise<ClassBooking | null> {
    try {
      const classBooking = await prisma.classBooking.findFirst({
        where: { id: tId },
      });

      if (!classBooking) {
        return null;
      }
  
      return classBooking; 
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }