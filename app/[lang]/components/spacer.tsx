import React from 'react'
import { cn } from "@/lib/shared-utils"

export const Spacer = ({ className }: { className?: string }) => {
  return (
    <div id="spacer" className={cn(
      "w-full",
      className ?? 'h-12',
    )}></div>
  )
}