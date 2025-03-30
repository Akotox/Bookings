import { HeroSectionOne } from "@/components/HeroSection"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { userId } = auth()
  if (userId != null) redirect("/events")

  return (
    <HeroSectionOne />
  )
}


