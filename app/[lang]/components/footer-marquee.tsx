import { cn } from "@/lib/shared-utils"
import Marquee from "./magicui/marquee"
import { clash } from "@/constants/fonts"


export const FooterMarquee = () => {
  return (
    <div className="py-4 text-white sm:py-9 bg-gradient-to-r from-tingual-500 to-amethyst-500">
      <Marquee repeat={4}>
        <div className="flex items-center">
          <span className={cn(clash.className, "text-3xl lg:text-5xl font-bold uppercase")}>Thrive in the age of AI</span>
          <span className="ml-4 text-xl text-citrine-500">✦</span>
        </div>
      </Marquee>
    </div>
  )
}