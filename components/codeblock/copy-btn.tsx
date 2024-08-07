"use client"

import { logos } from "@/app/sections/hero"
import { cn } from "@/lib/shared-utils"
import { useState } from "react"

export const CopyButton = ({ node }: { node: any }) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(node)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1500);
  }
  return (
    <button
      onClick={() => handleCopy()}
      className={cn(
        "text-obsidian-500",
        "bg-transparent",
        "w-fit h-6 p-0",
      )}>
      {!copy ? (
        <div className="relative flex items-baseline">
          {logos.copy}
        </div>
      ) : (
        <div className="relative flex items-baseline text-jade-500">
          {logos.check}
        </div>
      )}
    </button>
  )
}