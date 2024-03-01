import { baseWidth } from "@/lib/config"
import { cn } from "@/lib/shared-utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Glossary"
}

export default function Glossary() {
  return (
    <>
      <main className="w-full px-4">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Glossary</h1>
          </div>
        </div>
      </main>
    </>
  )
}