"use client"

import { useState } from "react"
import { Button, ButtonProps } from "./ui/button"
import { Copy, CopyCheck, CopyX } from "lucide-react"

type CopyState = "idle" | "copied" | "error"

export function CopyEventButton({
  eventId,
  clerkUserId,
  ...buttonProps
}: Omit<ButtonProps, "children" | "onClick"> & {
  eventId: string
  clerkUserId: string,
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle")

  const CopyIcon = getCopyIcon(copyState)

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        const userId = "abc123";
        const frequency = "0";
        const teacherId = "0";
  
    
        // Construct the final URL
        const url = `${location.origin}/book/${clerkUserId}/${eventId}/${userId}/${frequency}/${teacherId}`;
        navigator.clipboard
          .writeText(url)
          .then(() => {
            setCopyState("copied")
            setTimeout(() => setCopyState("idle"), 2000)
          })
          .catch(() => {
            setCopyState("error")
            setTimeout(() => setCopyState("idle"), 2000)
          })
      }}
    >
      <CopyIcon className="size-4 mr-2" />
      {getChildren(copyState)}
    </Button>
  )
}

function getCopyIcon(copyState: CopyState) {
  switch (copyState) {
    case "idle":
      return Copy
    case "copied":
      return CopyCheck
    case "error":
      return CopyX
  }
}

function getChildren(copyState: CopyState) {
  switch (copyState) {
    case "idle":
      return "Copy Link"
    case "copied":
      return "Copied!"
    case "error":
      return "Error"
  }
}
