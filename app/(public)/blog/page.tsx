import { Metadata } from "next"
import { routes } from "@/lib/routes"
import { siteMetadata } from "@/lib/site.metadata"
import { allPosts } from "@/.contentlayer/generated"
import { cn, convertDate, timeSince } from "@/lib/shared-utils"
import Link from "next/link"
import Image from "next/image"

const title = 'Blog'
const description = "Read my thoughts, technical breakdowns and learnings on web development, artificial intelligence, machine learning and more."
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteMetadata.siteUrl + routes.journal
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

export default function Blog() {
  const articles = allPosts

  return (
    <main className="w-full px-4">
      <div className="max-w-[696px] min-h-screen w-full mx-auto">
        <div className="relative flex flex-col gap-10 pt-20">
          <h1 className="text-6xl font-semibold">Blog</h1>

          <h3 className={cn("font-semibold text-xl")}>My Journey</h3>
          <p>In 2014, I become a sound engineer (a DJ) at the age of 15. A year later, I wrote my first ever line of code in Python, and picked up Graphic design at 16 during my time at St. Francis Xavier college.</p>
          <p>I graduated from University of Northampton in 2020 with a degree in Computing (Graphics & Visualisation).</p>
          <p>During those years, between 2015 and 2020, I picked up more skills in UI/UX design, motion graphics, videography and more along the way.</p>
          <p>Artificial Intelligence Techniques was a module taught by Professor Mu Mu, which was the beginning of my love for AI. I got an A* on the module and wrote a Medium article on what I did, resulting in the article getting featured by The Startup publication. Read it <Link href={"https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36"} target="_blank">here</Link></p>
        </div>
      </div>
    </main>
  )
  return (
    <main className="w-full px-4">
      <div className="max-w-[696px] w-full mx-auto">
        <div className="relative flex flex-col gap-10 pt-20">
          <h1 className="text-6xl font-semibold">Blog</h1>
          {
            // @ts-ignore
            articles.sort((a, b) => (new Date(b.date) - new Date(a.date))).map((item: Post, idx: number) => (
              <div key={idx} className="flex flex-col flex-1 w-full">
                <Link href={item.url ? item.url : `/blog/${item._raw.flattenedPath}`} scroll={false} className="flex items-center justify-between w-full gap-2 py-2 hover:bg-slate-100 ">
                  <p className="text-lg font-medium underline">{item.title}</p>
                  <p className="flex flex-col">
                    <small className="font-light text-obsidian-600">{convertDate(item.date)}</small>
                  </p>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}