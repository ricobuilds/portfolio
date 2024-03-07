import { components } from "@/app/components/portable"
import { PortableText } from "@portabletext/react"
import { sanityQuery } from "@/lib/sanity/utils"
import { Metadata, Viewport } from "next"
import { Term } from "@/app/types/Term"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import Image from "next/image"
import { Kanit } from "next/font/google"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateStaticParams() {
  const terms: Term[] = await sanityQuery(`*[_type == "term"] | order(publishedAt desc){
    "slug": slug.current,
  }`)

  return terms.map((term) => ({
    term: term.slug
  }))
}

export async function generateMetadata({ params }: { params: { term: string } }): Promise<Metadata> {

  const { term } = params

  const post = await sanityQuery(`*[_type == "term" && slug.current == "${term}"][0]{
    title,
    description,
    content,
    _updatedAt,
    publishedAt,
    }`)

  if (!post) return { title: 'Issue not found!' }

  return {
    title: "Glossary: " + post.title + " Explained",
    description: post.description,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/glossary/${term}`,
    },
    authors: [
      {
        name: siteMetadata.title,
        url: siteMetadata.siteUrl
      }
    ],
    openGraph: {
      locale: 'en_GB',
      title: post.title,
      type: 'article',
      url: siteMetadata.siteUrl + "/glossary/" + term,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.title}`,
      description: post.description,
      siteName: siteMetadata.title,
      authors: siteMetadata.title
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@ricobuilds',
      site: siteMetadata.siteUrl,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.title}`,
    },
    robots: "index, follow",
  }
}

export default async function Term({ params }: { params: { term: string } }) {
  const { term } = params
  const post = await sanityQuery(`*[_type == "term" && slug.current == "${term}"][0]{
    title,
    description,
    content
  }`)
  return (
    <main id="glossary-term" className="relative flex-1 w-full max-w-full px-6 mx-auto">
      <section id="header" className="w-full max-w-2xl mx-auto">
        <div id="meta" className="flex flex-col w-full gap-2 mt-20">
          <h1 className={cn(
            "text-5xl lg:text-6xl",
            heroFont.className,
            "text-charkol",
          )}>{post.title}</h1>
          <div>
            <p itemProp="description" className="text-obsidian-400">{post.description ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"} </p>
          </div>
        </div>
      </section>
      <section id="content" className="max-w-2xl mx-auto mt-8">
        <article>
          <PortableText value={post?.content} components={components} />
        </article>
      </section>
    </main>
  )
}