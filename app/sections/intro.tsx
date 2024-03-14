import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Link from "next/link"

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export const Intro = () => {
  return (
    <section id="intro" className="flex flex-col max-w-2xl gap-5 mx-auto">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium md:mx-auto px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        The future of Gaming = AI and the Metaverse
      </h2>
      <div className="flex flex-col gap-6">
        <p className="">Industry research from market reports show that:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>The global Generative AI in Gaming market is <Link className="underline text-amethyst-500 underline-offset-2" href={"https://www.prnewswire.com/news-releases/ai-in-video-games-market-to-reach-11-4-billion-globally-by-2032-at-26-8-cagr-allied-market-research-301955876.html?ref=enrictrillo"}>projected</Link> to reach $11.4 billion by 2032, growing at a CAGR of 26.8% (2023-2032)</li>
          <li>The Metaverse market is <Link className="underline text-amethyst-500 underline-offset-2" href={"https://www.statista.com/outlook/amo/metaverse/worldwide#:~:text=The%20Metaverse%20market%20is%20projected,US%24507.8bn%20by%202030.?ref=enrictrillo"}>expected</Link> to be worth $507.8Bn by 2030, with a staggering CAGR of 37.73% (2024-2030)</li>
        </ul>
        <p>These statistics highlight the immense potential and growth opportunities in AI Gaming and the Metaverse. To capitalise on this rapidly evolving landscape, you must take informed action and innovate.</p>
        <p>Here at Metasyde, we see a future where AI integrates seamlessly with Gaming to create immersive characters, worlds and systems. We&apos;re an AI studio pioneering the future of gaming through groundbreaking AI and Metaverse technologies. Our cutting-edge offers will range from:</p>
        <ul className="ml-6 space-y-2 list-decimal">
          <li>Games - we&apos;re obsessed with building adaptive gaming worlds that respond to players&apos; actions, taking game immersion to the next level.</li>
          <li>Products - we believe in helping forward-facing businesses unlock the world of next-gen technology through the likes of AI models and software.</li>
          <li>Services - offering our skillsets through consulting, research and development services to help teams and businesses leverage the future.</li>
        </ul>
        <p>Join us at the forefront of the AI Gaming and Metaverse revolution. Subscribe to <strong>The Metasyde</strong> to keep up with top news & insights shaping these transformative technologies.</p>
        <p>Don&apos;t get left behind.</p>
        <Link href={routes.subscribe} className="py-2 text-center text-white bg-charkol">Subscribe to The Metasyde</Link>
      </div>

    </section>
  )
}