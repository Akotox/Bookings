"use server";

import { prisma } from "@/lib/prisma";

export async function getTeacherName(tId: string): Promise<string | null> {
    try {
      const teacher = await prisma.teacher.findFirst({
        where: { id: tId },
      });

      if (!teacher) {
        return null;        
      }

      const applicant = await prisma.applicant.findFirst({
        where: {
            userId: teacher.userId
        }
      })

      if (applicant) {
        return `${applicant.firstName} ${applicant.lastName}`
      }
  
      return null; 
    } catch (error) {
      throw new Error(`Error fetching teacher: ${error}`);
    }
  }