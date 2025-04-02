"use client";
import { v4 as uuidv4 } from "uuid";
import { createEvents } from "@/server/actions/events";
import { MeetingTicket } from "../assets/logo";
import { TypewriterEffectSmooth } from "./typer-writer-effect";


export function TypewriterEffectSmoothDemo({teacherId}: {
  teacherId: string
}) {
  const handleSubmit = async () => {
    const defaultEvents: Events[] = [
      {
        id: uuidv4(),
        name: "Regular Class",
        description:
          "You may schedule regular 60-minute classes, with the flexibility to choose a preferred day and time. The number of classes available to book is based on your active subscription. Subsequent classes will automatically recur at the same time each week.",
        durationInMinutes: 60,
        isActive: true,
      },
      {
        id: uuidv4(),
        name: "Trial Class",
        description:
          "Users are permitted to take one trial class within a 2-week period of booking. To book a trial class, select an available slot from the schedule, confirm your details, and proceed with the booking. You will receive an email confirmation with further details upon successful booking.",
        durationInMinutes: 30,
        isActive: true,
      },
    ];
    await createEvents(defaultEvents,teacherId);
  };
  const words = [
    {
      text: "Start",
    },
    {
      text: "your",
    },
    {
      text: "teaching",
    },
    {
      text: "journey",
    },
    {
      text: "with",
    },
    {
      text: "StudyBuddy.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[55rem]  ">
      <MeetingTicket />

      <p className="text-neutral-600 dark:text-neutral-200 text-xl sm:text-xl  ">
        The road to financial freedom starts here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          onClick={handleSubmit}
          className="w-80 h-10 transform transition-all duration-300 hover:-translate-y-0.5 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
        >
          Create Default Events
        </button>
      </div>
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
