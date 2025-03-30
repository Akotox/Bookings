"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUser(tId: string): Promise<User | null> {
    try {
      const user = await prisma.user.findFirst({
        where: { id: tId },
      });
  
      return user; 
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }