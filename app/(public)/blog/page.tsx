import { Metadata } from "next"
import { routes } from "@/lib/routes"
import { siteMetadata } from "@/lib/site.metadata"
import { allPosts } from "@/.contentlayer/generated"
import { convertDate, timeSince } from "@/lib/shared-utils"
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
      <div className="flex flex-col max-w-[696px] gap-16 py-24 mx-auto">
      <h1 className="text-6xl font-semibold">Blog</h1>
        <div className="w-full">
          {
            // @ts-ignore
            allPosts.sort((a, b) => (new Date(b.date) - new Date(a.date))).map((item: Post, idx: number) => (
              <div className="">
                <Link href={item.url ? item.url : `/blog/${item._raw.flattenedPath}`} scroll={false} key={idx} className="flex items-center justify-between w-full gap-2 py-2 hover:bg-slate-100 ">
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