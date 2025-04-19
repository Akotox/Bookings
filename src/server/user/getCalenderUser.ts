"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function getCalendarUser(clerkUserId: string) {
  try {
    const user = await clerkClient.users.getUser(clerkUserId);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error: any) {
    console.error("Error retrieving user from Clerk:", error);

    return {
      success: false,
      error:
        error?.errors?.[0]?.longMessage ??
        "An unexpected error occurred while fetching calendar user.",
    };
  }
}