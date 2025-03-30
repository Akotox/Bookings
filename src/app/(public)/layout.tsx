import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeamsWithCollision";
import { ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
        {children}
    </main>
  );
}