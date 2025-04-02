"use server";

import { prisma } from "@/lib/prisma";
import { ClassBundle } from "@prisma/client";

export async function getClassBundle(tId: string, classCode: string): Promise<ClassBundle | null> {
    try {
        const classbundle = await prisma.classBundle.findFirst({
            where: {
                teacherId: tId,
                classCode: classCode
            },
        });

        if (!classbundle) {
            return null;
        }

        console.log('====================================');
        console.log(classbundle);
        console.log('====================================');



        return classbundle;
    } catch (error) {
        throw new Error(`Error fetching teacher: ${error}`);
    }
}