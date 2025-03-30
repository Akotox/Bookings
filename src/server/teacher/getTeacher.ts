"use server";

import { prisma } from "@/lib/prisma";
import { Teacher } from "@prisma/client";

export async function getTeacher(tId: string): Promise<Teacher | null> {
    try {
      const teacher = await prisma.teacher.findFirst({
        where: { id: tId },
      });
  
      return teacher; 
    } catch (error) {
      throw new Error(`Error fetching teacher: ${error}`);
    }
  }