import { cn } from "@/lib/shared-utils"
import Marquee from "./magicui/marquee"
import { clash } from "@/constants/fonts"


export const FooterMarquee = () => {
  return (
    <div className="py-4 sm:py-9">
      <Marquee>
        <div className="flex items-center">
          <span className={cn(clash.className, "text-xl font-bold uppercase")}>Shift Forward in the age of AI</span>
          <span className="ml-4 text-xl">✦</span>
        </div>
      </Marquee>
    </div>
  )
}