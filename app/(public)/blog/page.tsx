import { Metadata } from "next"
import { routes } from "@/lib/routes"
import { siteMetadata } from "@/lib/site.metadata"
import { allPosts, Post } from "@/.contentlayer/generated"
import { convertDate } from "@/lib/shared-utils"
import Link from "next/link"

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
  const articles: Post[] = []

  return (
    <main className="w-full px-4">
      <div className="max-w-[696px] min-h-screen w-full mx-auto">
        <div className="relative flex flex-col gap-10 pt-20">
          <h1 className="text-6xl font-semibold">Blog {articles.length > 0 && (
            <span>({articles.length} {articles.length > 1 ? "posts" : "post"})</span>
          )}</h1>
          {
            articles.length > 0 ? (
              <div className="relative -mx-3">
                {
                  // @ts-ignore
                  articles.sort((a, b) => (new Date(b.date) - new Date(a.date))).map((item: Post, idx: number) => (
                    <div key={idx} className="flex flex-col flex-1 w-full">
                      <Link href={item.url ? item.url : `/blog/${item._raw.flattenedPath}`} scroll={false} className="flex items-center justify-between w-full gap-2 px-3 py-2 rounded-lg group hover:bg-slate-100">
                        <p className="text-lg font-medium underline group-hover:text-slate-600 group-hover:decoration-slate-600">{item.title}</p>
                        <p className="flex flex-col">
                          <small className="font-light text-obsidian-600">{convertDate(item.date)}</small>
                        </p>
                      </Link>
                    </div>
                  ))
                }
              </div>
            ) : <p>No posts here... yet.</p>
          }
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