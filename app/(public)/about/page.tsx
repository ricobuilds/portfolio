import { logos } from "@/app/sections/hero"
import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { generateMetadata } from "@/lib/seo"
import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

export const metadata = generateMetadata({
  title: 'About Me | Disruptive Tech Enthusiast',
  description: "Get to know me, a fullstack developer with a multi-disciplinary background, with a passion for disruptive technologies.",
  keywords: "full stack developer, disruptive technology, about me, tech enthusiast"
})

const kanit = Kanit({
  weight: "800",
  subsets: ["latin"]
})

export default function About() {

  const bio = () => (
    <section id="bio">
      <h2 className={cn(kanit.className, "font-semibold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Bio</h2>
      <p className="mb-6">
        In 2014, I started DJing at 15. A year later, I learned graphic design and coding at <strong>St. Francis Xavier College</strong>. These skills helped me create covers for my mixes and write my first line of Python code at 16.
      </p>
      <p className="mb-6">
        During my time at the <strong>University of Northampton</strong>, between 2017 and 2020, I experimented with a bunch of skills–journalism, UI/UX, motion design, video editing and videography, even bartending.
      </p>
      <p>
        My love for AI sparked in my third year, which led me to an A* grade, and writing about my experience in a <Link target={"_blank"} href={"https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36"} className="text-amethyst-500">featured Medium article</Link> with The Startup.
      </p>
    </section>
  )

  const media = () => (
    <section id="media">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Media</h2>
      <p className="mb-6">Aside from being a developer doing <i>developer</i> things, I publish content about disruptive technologies across my <Link href={routes.blog} className="text-amethyst-500">blog</Link>, <Link href={routes.subscribe} className="text-amethyst-500">email</Link> and media channels:</p>
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
      <p>The tech topics I like to talk about include: AR and VR, Artificial Intelligence, Blockchain, Gaming, Haptic technology, Metaverse, Robotics and Web.</p>
    </section>
  )

  const journey = () => (
    <section id="journey">
      <h2 className={cn(kanit.className, "font-semibold text-xl uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Journey</h2>
      <p>I&apos;m on a mission to learn new skills and disruptive tech. For this, I need to upgrade my current skillset by going back into my ways of being a multi-faceted creative, and develop skills across tech disciplines – this is how I plan to cultivate a multi-disciplinary skillset.</p>
    </section>
  )
  return (
    <>
      {/* <StructuredData data={aboutSchema} />
      <StructuredData data={aboutBreadcrumbSchema} /> */}
      <main className="w-full px-6">
        <div className={cn(baseWidth, "w-full mx-auto")}>
          <div className="relative flex flex-col items-center gap-6 pt-20">

            <div id="content" className="flex flex-col gap-8 max-w-[560px] mx-auto">
              <div className="flex flex-col items-center max-w-[560px] gap-4">
                <Image src={'/headshot.jpeg'} alt="Enric Trillo" width={600} height={600} className="inline w-24 h-24 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
                <h1 className="text-lg font-bold">Enric Trillo</h1>
                <p className="text-slate-600">Fullstack & NoCode Developer</p>
                <p>
                  I&apos;m Enric, born & raised in southern Madrid 🇪🇸, I&apos;ve been living in London 🇬🇧 since my early teens, and I&apos;m from a small hispanic nation in Central Africa few can mark on the map – Equatorial Guinea 🇬🇶.
                </p>
                <div id="socials" className="flex items-center gap-6 mt-4">
                  <Link href={routes.twitter} target={"_blank"}>
                    <div id="𝕏">
                      <span className="text-xl">𝕏</span>
                    </div>
                  </Link>
                  <Link href={routes.linkedin} target={"_blank"}>
                    <div id="linkedin">
                      {logos.linkedin}
                    </div>
                  </Link>
                  <Link href={routes.youtube} target={"_blank"}>
                    <div id="youtube">
                      {logos.youtube}
                    </div>
                  </Link>
                  <Link href={routes.github} target={"_blank"}>
                    <div id="github">
                      {logos.github}
                    </div>
                  </Link>
                  <Link href={routes.rss} target={"_blank"}>
                    <div id="rss">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col gap-3 p-4 border rounded-xl">
                  <h2 className="font-bold">Shift Forward Newsletter</h2>
                  <p className="text-slate-500">Sharing the latest insights and developments in the world of disruptive technologies to help you thrive in a future driven by AI.</p>
                  <Link href={routes.subscribe} className="px-4 py-2 text-center text-white rounded-full bg-amethyst-500">Subscribe</Link>
                </div>
              </div>
              {bio()}
              {media()}
              {journey()}
              <p>Reach out to collaborate.</p>
              <Link href={routes.email} className="w-full px-4 py-2 text-center text-white rounded-md bg-charkol">hola@enrictrillo.com</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}