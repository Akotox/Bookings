import { MobileLogo } from "@/components/assets/logo";
import { NavLink } from "@/components/NavLink";
import { UserButton } from "@clerk/nextjs";
import { CalendarRange } from "lucide-react";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex py-2 border-b bg-card">
        <nav className="font-medium flex items-center text-sm gap-6 container">
          <div className="flex items-center gap-2 font-semibold mr-auto">
            <MobileLogo />
            <span className="sr-only md:not-sr-only">Study Buddy</span>
          </div>
          <NavLink
            href="/events"
            className="relative px-3 py-1 transition-colors duration-300 hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Events
          </NavLink>
          <NavLink
            href="/schedule"
            className="relative px-3 py-1 transition-colors duration-300 hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Schedule
          </NavLink>
          <div className="ml-auto size-10">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-full" } }}
            />
          </div>
        </nav>
      </header>
      <main className="container my-6">{children}</main>
    </>
  );
}
