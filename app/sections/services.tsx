import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export const Services = () => {
  return (
    <section id="services" className="flex flex-col items-center py-16" >
      <h2 className={cn(kanit.className, "flex items-center mx-auto text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Services
      </h2>
      <div className="">
        <p className="text-obsidian-500">Coming soon–innovative services to revolutionize the gaming industry</p>
      </div>
    </section>
  )
}