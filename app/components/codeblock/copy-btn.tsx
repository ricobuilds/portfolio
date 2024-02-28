"use client"

import { cn } from "@/lib/shared-utils"
import { useState } from "react"

export const CopyButton = (node: any) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(node.code)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1500);
  }
  return (
    <button
      onClick={() => handleCopy()}
      className={cn(
        "border border-obsidian-300",
        "bg-transparent",
        "w-6 h-6 p-0",
      )}>
      {!copy ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>}
    </button>
  )
}