import { baseWidth } from "@/lib/config"
import { cn } from "@/lib/shared-utils"
import { Metadata } from "next"

const title = "AI Gaming & Metaverse Glossary"
const description = "Your complete resource to learn the key terms shaping the world of deep learning, haptic technology, robotics, and the metaverse."

export const metadata: Metadata = {
  title: title,
  description: description
}

export default function Glossary() {
  return (
    <>
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">{title}</h1>
          </div>
        </div>
      </main>
    </>
  )
}