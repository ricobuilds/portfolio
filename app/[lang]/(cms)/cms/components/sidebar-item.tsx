"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/shared-utils"
import { RiDatabase2Fill } from "@remixicon/react"
import { useRouter, useParams } from "next/navigation"


export function SidebarItem({ collectionName, count }: { collectionName: string, count: number }) {

  const router = useRouter()

  const { collection } = useParams()

  const navigateToCollection = (collectionName: string) => {
    router.push(`/cms/${collectionName}`)
  }
  return (
    <Button
      key={collectionName}
      variant="ghost"
      onClick={() => navigateToCollection(collectionName)}
      className={cn(
        "justify-start gap-2 px-2 h-7 text-xs group",
        collection === collectionName ? "bg-slate-200" : null
      )}
    >
      <span><RiDatabase2Fill className={cn(
        "text-slate-400 w-4 h-4",
        collection === collectionName ? "text-amethyst-500" : null
      )} /></span>
      {collectionName}
      <span className="ml-auto text-gray-500">{count}</span>
    </Button>
  )
}