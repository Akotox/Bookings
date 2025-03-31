import { HeroSectionOne } from "@/components/HeroSection"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

// @ts-ignore
export const metadata = {
  title: "Study Buddy Scheduling",
  description: "ScheduleBuddy automates Google Meetings for teachers and students, ensuring seamless lesson scheduling with Google Calendar integration.",
  openGraph: {
    type: 'website',
    title: "Study Buddy Scheduling",
    description: "Effortless lesson scheduling with Google Calendar automation for teachers and students.",
    url: "https://www.schedulebuddy.ing/",
    siteName: "Study Buddy",
    images: [
      {
        url: "https://res.cloudinary.com/derwdq9ut/image/upload/v1743198894/buddy_qeo7hr.png",
        width: 800,
        height: 600,
        alt: "Study Buddy logo",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YourTwitterHandle',
    title: "Study Buddy Scheduling",
    description: "Seamless Google Calendar integration for automated lesson scheduling.",
    image: "https://res.cloudinary.com/derwdq9ut/image/upload/v1743198894/buddy_qeo7hr.png",
  },
  canonical: "https://horizondevelopers.co.za/studybuddy",
  robots: "index, follow",
  keywords: "Study Buddy, ScheduleBuddy, lesson scheduling, Google Calendar automation, education tech, edtech",
  author: "Horizon Developers",
};

export default function HomePage() {
  const { userId } = auth()
  if (userId != null) redirect("/events")

  return (
    <HeroSectionOne />
  )
}


