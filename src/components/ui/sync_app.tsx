"use client";

import { syncApp } from "@/server/teacher/syncApp";
import { TypewriterEffectSmooth } from "./typer-writer-effect";
import { useRouter } from "next/navigation";
import React from "react";

export function SyncApp({ clerkId, teacherId, email }: { clerkId: string, teacherId: string, email: string }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await syncApp(clerkId, teacherId, email);
            router.push("/"); 
        } catch (error) {
            setIsLoading(false);
            console.error("Error syncing app:", error);
        }
    };


    const isSyncedWords = [
      {
        text: "Continue",
        className: "text-blue-500 dark:text-blue-500",
      },
      {
        text: "and",
      },
      {
        text: "sync",
        className: "text-blue-500 dark:text-blue-500",
      },
      {
        text: "with",
      },
      {
        text: "app to",
      },
      {
        text: "StudyBuddy.",
        className: "text-blue-500 dark:text-blue-500",
      },
    ];

   

  return (
    <div className="flex flex-col items-center justify-center h-[55rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        The road to financial freedom starts here
      </p>
      <TypewriterEffectSmooth words={isSyncedWords} />
      <button disabled={isLoading} onClick={handleSubmit} className="w-80 h-10 transform transition-all duration-300 hover:-translate-y-0.5 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
        Continue
      </button>
    </div>
  );
}

export interface Events {
  id: string;
  name: string;
  description?: string;
  durationInMinutes: number;
  isActive: boolean;
}
