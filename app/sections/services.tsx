import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export const Services = () => {
  return (
    <section id="services">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Services
      </h2>
    </section>
  )
}