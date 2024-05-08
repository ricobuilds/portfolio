import { Kanit } from "next/font/google"
import { cn } from "@/lib/shared-utils"

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export const USP = () => {

  return (
    <section id="usp" className="left-0 flex flex-col px-4 py-16 mx-auto bg-black rounded max-w-screen">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium mx-auto px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        How I Help You
      </h2>
      <p className="text-center text-obsidian-300">These are the 4 ways I can help you</p>
      <div className="grid gap-6 px-0 mt-10 md:grid-cols-2 max-w-[970px] w-full">
        <div className="px-4 py-2 text-white border rounded bg-obsidian-800/40 border-obsidian-800">
          <h3 className="text-lg font-bold">Content Creation</h3>
          <p title="description" className="text-obsidian-400">Sharing my insights and learnings with other developers and entrepreneurs through my social media channels.</p>
        </div>
        <div className="px-4 py-2 text-white border rounded bg-obsidian-800/40 border-obsidian-800">
          <h3 className="text-lg font-bold">Games</h3>
          <p title="description" className="text-obsidian-400">Building a portfolio of immersive games that make use of emerging technologies like AI and Blockchain.</p>
        </div>
        <div className="px-4 py-2 text-white border rounded bg-obsidian-800/40 border-obsidian-800">
          <h3 className="text-lg font-bold">Products</h3>
          <p title="description" className="text-obsidian-400">Developing high-quality platforms to solve burning problems that you need, with modern technologies.</p>
        </div>
        <div className="px-4 py-2 text-white border rounded bg-obsidian-800/40 border-obsidian-800">
          <h3 className="text-lg font-bold">Services</h3>
          <p title="description" className="text-obsidian-400">Offering my development and consulting experience to serve your business needs in the dawn of Metaverse.</p>
        </div>
      </div>
    </section>
  )
}