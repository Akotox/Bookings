"use server";

import { prisma } from "@/lib/prisma";

export async function syncApp(tId: string, email: string, teacherId: string): Promise<boolean> {
    try {
        
        const app = await prisma.syncScheduleApp.create({
            data: {
                clerkUserId: tId,
                email: email,
                teacherId: teacherId
            },
        });

        if (app) {
            return true
        }

        return false;
    } catch (error) {
        throw new Error(`Error fetching teacher: ${error}`);
    }
}