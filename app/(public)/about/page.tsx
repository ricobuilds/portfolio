import { StructuredData } from "@/app/components/structured-data"
import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import { Metadata } from "next"
import { Kanit } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { BreadcrumbList, WebPage, WithContext } from "schema-dts"

const title = 'About Me'
const description = "Enric J Trillo Nchana is the founder of Metasyde, a fullstack developer and content creator writing daily insights on the future of Web3 Gaming & the Metaverse."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteMetadata.siteUrl + routes.about
  },
  openGraph: {
    title,
    locale: 'en_GB',
    type: 'website',
    images: `/base-og.png`,
    url: siteMetadata.siteUrl + routes.about,
    description,
    siteName: 'Enric Trillo',
  },
  twitter: {
    creator: '@ricobuilds',
    card: 'summary_large_image',
    description,
    site: 'https://enrictrillo.com',
    title,
    images: `/base-og.png`,
  },
  robots: "index, follow"
}

const aboutSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About Me",
  "description": description,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": siteMetadata.siteUrl
  },
}

const aboutBreadcrumbSchema: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteMetadata.siteUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": siteMetadata.siteUrl + "/about"
    },
  ]
}

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export default function About() {

  const intro = () => (
    <section id="intro">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>About me</h2>
      <p className="mb-6">
        I&apos;m a fullstack developer, with 6+ years of development experience, passionate for building the future of gaming using AI and emerging technologies.
        My journey began as a multi-faceted creative. In 2014, I made a name for myself as a DJ at just 15 years old,
        setting the stage for my diverse journey. By 16, I was writing my first line of code in Python and going deep into graphic design during my time at St. Francis Xavier College. Over the years, I&apos;ve honed skills in UI/UX design, motion graphics, videography and more.
      </p>
      <p className="mb-6">
        My journey into the world of AI began during my time at the <strong>University of Northampton</strong>, where I earned a degree in Computing (Graphics & Visualisation) in 2020. The interest for AI sparked from the AI module taught by Professor Mu Mu, where I achieved an A* and later wrote about my experience in a <Link target={"_blank"} href={"https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36"} className="text-amethyst-500">Medium article</Link> featured by The Startup publication.
      </p>
      <p>Some of my recent gigs include working as a Fullstack Web3 Developer at CWJ Capital.</p>
    </section>
  )

  const mission = () => (
    <section id="mission">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>My Mission</h2>
      <p>In 2022,
        <strong>Metasyde was born</strong>, marking the beginning of my quest to follow my curiosity and redefine gaming with emerging technologies.
        My mission is to push the boundaries of what&apos;s possible in gaming through cutting-edge AI technologies. I look to evangelise the <span className="italic">boundless mindset</span> too.
      </p>
    </section>
  )

  const vision = () => (
    <section id="vision">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Metasyde Vision</h2>
      <p className="mb-6">
        At Metasyde, we see a future where blockchain seamlessly integrates with gaming to create immersive, intuitive,
        and dynamic experiences for players. Our goal is to be at the forefront of this evolution, pioneering new ways to engage with games
        and the metaverse.
      </p>
      <p>
        We see Web3 Gaming as a critical layer contributing to the overall concept of the &quot;Metaverse&quot;, alongside emerging technologies like AI and NFTs.
      </p>
    </section>
  )

  const topics = () => (
    <section id="topics">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Topics</h2>
      <p className="mb-6">I write content about my 8 topics to help you keep up with top news & insights on Web3 Gaming and the Metaverse across my <Link href={routes.journal} className="text-amethyst-500">blog</Link>, <Link href={routes.subscribe} className="text-amethyst-500">newsletter</Link> and social media channels:</p>
      <ul className="mb-6 ml-8 list-disc">
        <li>
          <Link href={routes.twitter} className="text-amethyst-500">Twitter</Link>
        </li>
        <li>
          <Link href={routes.linkedin} className="text-amethyst-500">LinkedIn</Link>
        </li>
        <li>
          <Link href={routes.youtube} className="text-amethyst-500">YouTube</Link>
        </li>
      </ul>
      <p>The 8 main topics I discuss online include: AR + VR, Artificial Intelligence, Blockchain, Gaming, Haptic technology, Metaverse, Robotics and Web.</p>
    </section>
  )
  const journey = () => (
    <section id="journey">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Follow the Journey</h2>
      <p>I&apos;m on a mission to shape the future of Web3 Gaming and the Metaverse. Whether you&apos;re a gamer, fellow developer or simply curious about Web3 in gaming, I&apos;d love to connect and collaborate.</p>
    </section>
  )
  return (
    <>
      <StructuredData data={aboutSchema} />
      <StructuredData data={aboutBreadcrumbSchema} />
      <main className="w-full px-6">
        <div className={cn(baseWidth, "w-full mx-auto")}>
          <div className="relative flex flex-col gap-10 pt-20">
            <Image src={'/headshot.jpeg'} alt="Enric Trillo" width={600} height={600} className="inline w-24 h-24 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
            <h1 className="mx-auto">
              <Balancer className={cn(kanit.className, "text-2xl md:text-5xl lg:text-7xl text-center")}>
                Hey, I&apos;m <span className="text-amethyst-500">Enric Trillo</span>, a fullstack developer building the future of gaming.
              </Balancer>
            </h1>
            <div id="content" className="flex flex-col gap-8 max-w-[696px] mx-auto">
              {intro()}
              {mission()}
              {vision()}
              {topics()}
              {journey()}
              <p>Let&apos;s create the next level of gaming together.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}