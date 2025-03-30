"use client";
import { TypewriterEffectSmooth } from "./typer-writer-effect";

export function TypewriterEffectEvents() {

   
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
      
    
      <p className="text-neutral-600 dark:text-neutral-200 text-xl sm:text-xl  ">
        The road to financial freedom starts here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        
       
      </div>
    </div>
  );
}
