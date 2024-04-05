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
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium md:mx-auto px-4 py-1 mb-3 text-white uppercase max-w-fit bg-amethyst-500")}>
        The future of Gaming = Web3 & the Metaverse
      </h2>
      <div className="flex flex-col gap-6">
        <p className="">Industry research from market reports show that:</p>
        <ul className="ml-6 space-y-2 list-disc">
          <li>The global Web3 Gaming market is <Link className="underline text-amethyst-500 underline-offset-2" href={"https://www.futuremarketinsights.com/reports/web3-gaming-market"}>projected</Link> to reach $113.22 billion by 2033, growing at a CAGR of 18.7% (2023-2033)</li>
          <li>The Metaverse market is <Link className="underline text-amethyst-500 underline-offset-2" href={"https://www.statista.com/outlook/amo/metaverse/worldwide#:~:text=The%20Metaverse%20market%20is%20projected,US%24507.8bn%20by%202030.?ref=enrictrillo"}>expected</Link> to be worth $507.8Bn by 2030, with a staggering CAGR of 37.73% (2024-2030)</li>
        </ul>
        <p>These statistics highlight the immense potential and growth opportunities in Web3 Gaming and the Metaverse. To capitalise on this rapidly evolving landscape, you must take informed action and innovate.</p>
        <p>Here at Metasyde, we see a future where AI integrates seamlessly with Gaming to create immersive characters, worlds and systems. We&apos;re a Web3 gaming studio making use of AI, NFTs and blockchain to shake up the gaming landscape. Our offers range from:</p>
        <ul className="ml-6 space-y-2 list-decimal">
          <li>Games: We&apos;re obsessed with building immersive gaming worlds that respond to players&apos; actions, taking game immersion to the next level.</li>
          <li>Products: Equipping individuals to businesses with next-gen technology through AI systems, NFTs, and blockchain solutions.</li>
          <li>Services: From consulting, research, to development, we&apos;re here to help teams leverage emerging technologies to build the future.</li>
        </ul>
        <p>Join us at the forefront of the Web3 Gaming and Metaverse revolution. Join the <strong>Metasyde</strong> to keep up with top insights being shaped by these game-changing technologies.</p>
        <p>Don&apos;t get left behind.</p>
        <Link href={routes.subscribe} className="py-2 text-center text-white bg-charkol">Join the Metasyde</Link>
      </div>
    </section>
  )
}