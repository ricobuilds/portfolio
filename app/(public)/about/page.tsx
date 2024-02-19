import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import { Metadata } from "next"
import Link from "next/link"

const title = 'About Me'
const description = "Enric J Trillo Nchana is the founder of Metasyde, a fullstack developer and content creator publishing daily insights on the future of AI gaming and the Metaverse."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteMetadata.siteUrl + routes.about
  },
  openGraph: {
    locale: 'en_GB',
    type: 'website',
    images: `/base-og-image.png`,
    description,
    siteName: 'Enric Trillo',
  },
  twitter: {
    creator: '@ricobuilds',
    card: 'summary_large_image',
    description,
    site: 'https://enrictrillo.com',
    title,
    images: `/base-og-image.png`,
  },
  robots: "index, follow"
}

export default function About() {
  return (
    <main className="w-full px-4">
      <div className="max-w-[696px] w-full mx-auto">
        <div className="relative flex flex-col gap-10 pt-20">
          <h1 className="text-6xl font-semibold">About</h1>
          <p>Hey I&apos;m Enric Trillo, a fullstack web developer, based in London, specialising in frontend development.</p>
          <h3 className={cn("font-semibold text-xl")}>My Journey</h3>
          <p>In 2014, I become a sound engineer (a DJ) at the age of 15. A year later, I wrote my first ever line of code in Python, and picked up Graphic design at 16 during my time at St. Francis Xavier college.</p>
          <p>I graduated from University of Northampton in 2020 with a degree in Computing (Graphics & Visualisation).</p>
          <p>During those years, between 2015 and 2020, I picked up more skills in UI/UX design, motion graphics, videography and more along the way.</p>
          <p>Artificial Intelligence Techniques was a module taught by Professor Mu Mu, which was the beginning of my love for AI. I got an A* on the module and wrote a Medium article on what I did, resulting in the article getting featured by The Startup publication. Read it <Link href={"https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36"} target="_blank">here</Link></p>
          <p>Some highlights:</p>
          <ul className="ml-8 list-disc">
            <li>Worked as a Hybrid SDR/BDR at European Gateway</li>
            <li>Contracted as a Fullstack Web3 Developer with CWJ Capital</li>
            <li>Built the GPT2Markdown chrome extension used by 1100+ users</li>
          </ul>
          <h3 className={cn("font-semibold text-xl")}>Now</h3>
          <ul className="ml-8 list-disc">
            <li>Updating my personal website</li>
            <li>Building the site for <Link href={"https://metasyde.com"} target="_blank" className="underline text-celuria-500">metasyde.com</Link></li>
            <li>Relaunching my newsletter as The Metasyde</li>
            <li>Building media channels for business moat throughout Q1 2024</li>
            <li>Grow proficiency in Pixel Art & Game Development through Q1-Q2 2024</li>
          </ul>
        </div>
      </div>
    </main>
  )
}