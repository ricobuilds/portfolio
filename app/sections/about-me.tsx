import { Kanit } from "next/font/google"
import { cn } from "@/lib/shared-utils"

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export const AboutMe = () => {

  return (
    <section id="usp" className="left-0 flex flex-col px-4 py-16 max-w-screen">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium mx-auto px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        About Me
      </h2>
      <p className="text-center text-obsidian-600">The obsession-driven man behind Metasyde</p>
      <div className="max-w-xl mx-auto mt-10 text-center text-balance">
        <p>
          I&apos;m Enric, and I have 6+ years of development experience. I enjoy creating pixel-perfect designs and build them out on Framer, a no-code website builder.
          But I truly enjoy helping businesses achieve their goals by delivering an exceptional website that communicates their business value to their target audience.
        </p>
        <button className="px-4 py-2 mt-8 text-sm text-white bg-black">Read My Story</button>
      </div>
    </section>
  )
}