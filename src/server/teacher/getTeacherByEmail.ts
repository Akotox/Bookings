import { prisma } from "@/lib/prisma";

export async function getTeacherId(tId: string): Promise<string | null> {
    try {
      const user = await prisma.user.findFirst({
        where: { email: tId },
      });

      if (user) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                userId: user.id
            }
        })

        if (teacher) {
            return teacher.id
        }
      }
  
      return null; 
    } catch (error) {
      throw new Error(`Error fetching teacher: ${error}`);
    }
  }