import { Metadata, Viewport } from "next"
import Image from "next/image"
import styles from './Page.module.css'
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { sanityQuery } from "@/lib/sanity/client"
import { getAllArticles, getArticleBySlug, getNextArticle, getPrevArticle } from "@/lib/sanity/queries"
import { Article } from "@/app/types/Article"
import { WithContext, BreadcrumbList, Article as BlogPosting } from "schema-dts"
import { StructuredData } from "@/app/components/structured-data"
import Link from "next/link"
import { ShareArticleRow } from "@/app/components/share-article"
import { BlockWrapper, serialisers } from "@/app/components/codeblock"
import { BrightCode } from "@/app/components/codeblock/bright"
import { StickyCard } from "./sticky-card"
import { Kanit } from "next/font/google"
import { ScrollProgress } from "@/app/components/scroll-progress"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

async function getArticle(article: string) {
  const post = await sanityQuery(getArticleBySlug(article))
  // console.log(post)
  return post
}

export async function generateStaticParams() {
  const posts: Article[] = await sanityQuery(getAllArticles) //deduped!

  return posts.map((post) => ({
    article: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {

  const { article } = params

  const post = await getArticle(article)

  if (!post) return { title: 'Issue not found!' }

  return {
    title: post.name,
    description: post.snippet,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${post.slug}`
    },
    authors: [
      {
        name: siteMetadata.title,
        url: siteMetadata.siteUrl
      }
    ],
    openGraph: {
      locale: 'en_GB',
      title: post.name,
      type: 'article',
      url: siteMetadata.siteUrl + "/blog/" + post.slug,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.name}`,
      description: post.snippet,
      siteName: siteMetadata.title,
      publishedTime: post.publishedAt,
      authors: "Enric Trillo"
    },
    twitter: {
      card: 'summary_large_image',
      title: post.name,
      description: post.snippet,
      creator: '@ricobuilds',
      site: siteMetadata.siteUrl,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.name}`,
    },
    robots: "index, follow"
  }
}

export default async function Page({ params }: { params: { article: string } }) {
  // const posts: Article[] = await sanityQuery(getAllArticles) //deduped!
  const { article } = params

  // if (!posts.find((p: Article) => p.slug?.includes(article))) return notFound()

  const post: Article = await sanityQuery(getArticleBySlug(article))

  if (!post) {
    notFound()
  };

  const prevArticle: { slug: string } = await sanityQuery(getPrevArticle(post.publishedAt))
  const nextArticle: { slug: string } = await sanityQuery(getNextArticle(post.publishedAt))

  const articleSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.name,
    "description": post.snippet,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": new Date(post._updatedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": siteMetadata.title,
      "url": siteMetadata.siteUrl
    },
    "image": "https://www.mysite.com/path-to-article-image.jpg",
    "url": `${siteMetadata.siteUrl}/blog/${post.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Enric Trillo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourwebsite.com/logo.png",
        // "width": 600,
        // "height": 60
      }
    }
  }

  const articleBreadcrumbSchema: WithContext<BreadcrumbList> = {
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
        "name": "Blog",
        "item": siteMetadata.siteUrl + "/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.tag?.title,
        "item": siteMetadata.siteUrl + "/topic/" + post.tag?.slug,
      },
    ]
  }

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={articleBreadcrumbSchema} />
      <ScrollProgress />
      <main className={cn("w-full", "relative flex flex-col flex-1 min-h-screen px-6")}>
        <section className="max-w-[970px] w-full mx-auto">
          <nav id="breadcrumb" className={cn("max-w-[970px]", "w-fit absolute mx-auto top-10")}>
            <ol className="flex gap-2 text-sm font-medium text-left uppercase text-amethyst-500">
              <li className="flex flex-grow-0">
                <Link href={"/"}>Home</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
              </li>
              <li className="flex flex-grow-0">
                <Link href={"/blog"}>Blog</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
              </li>
              <li>
                <Link href={"/topic" + (post.tag?.slug ?? "/ar-vr")}>{post.tag?.title ?? "AR+VR"}</Link>
              </li>
            </ol>
          </nav>
          <div className="flex justify-between ">
            <article className={
              cn(
                "max-w-2xl",
                'flex flex-col gap-1 mt-20 relative',
              )
            }>
              <div className="flex flex-col">
                <h1 className={cn(
                  "text-5xl lg:text-6xl",
                  heroFont.className,
                  "text-charkol",
                )}>{post.name}</h1>
                <p className="text-obsidian-400">{post.snippet ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"} </p>
              </div>
              <div className="py-2" />
              <div className="flex items-center gap-4 text-charkol">
                <Image src={'/headshot.jpeg'} width={600} height={600} priority className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
                <div className="flex items-center gap-1 text-xs uppercase">
                  <div className="">
                    <span>By </span>
                    <span className='text-amethyst-500'>{post.author?.name ?? "Enric Trillo "}</span>
                    <span>/</span>
                  </div>
                  <time dateTime={new Date(post.publishedAt).toISOString()}> Published {convertDate(post?.publishedAt, { month: "long" })} {new Date(post.publishedAt).toLocaleTimeString("en-GB", { timeStyle: "short", hourCycle: "h12" })}</time>
                </div>
              </div>
              <div className="py-2" />
              <div className="overflow-hidden rounded-xl">
                <Image src={post.image ? post.image : `/base-og.png`} className={"w-full object-cover aspect-video"} alt={`${post.name} - Enric Trillo`} width={1200} height={630} />
              </div>
              <div className={styles.bloggo}>
                <BlockWrapper blocks={post?.content} serializers={serialisers} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
                <BrightCode lang="tsx" code={
                  `// src/app/layout.js

import './globals.css'

//👇 Import Open Sans font
import { Open_Sans } from 'next/font/google'

//👇 Configure our font object
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    // 👇 Attach font to global JSX node
    <html lang="en" className={openSans.className}>
      <body>{children}</body>
    </html>
  )
}
              `
                } />
              </div>
            </article>
            <div className="flex-col hidden mt-20">
              <StickyCard>
                <div className="">
                  X ways I can help you
                </div>
              </StickyCard>
            </div>
          </div>
          <section id="cta" className={cn("max-w-2xl", "w-full")}>
            <div className="flex flex-col gap-3 p-6 rounded-lg shadow-xl ring-slate-300 ring-2 bg-obsidian-100">
              <h3 className={cn(heroFont.className, "text-xl")}><strong>{`Whenever you're ready, these are ${4} ways I can help you:`}</strong></h3>
              <p><strong>1.</strong> <strong className="text-amethyst-500">Metasyde Newsletter:</strong> Join 3,500+ entrepreneurs in my flagship course. The Creator MBA teaches you exactly how to build a lean, focused, and profitable Internet business. Come inside and get 5 years of online business expertise, proven methods, and actionable strategies across 111 in-depth lessons.</p>
              <p><strong>2.</strong> <strong className="text-amethyst-500">YouTube channel:</strong> by sponsoring my newsletter.</p>
            </div>
          </section>
          <section id="tags" className="flex gap-6 py-8 mt-4 uppercase">
            <span className="text-gray-800">Tags:</span>
            <ul className="flex flex-row flex-wrap gap-3 divide">
              {
                (
                  <li>
                    <Link className="transition-all duration-150 text-amethyst-500 hover:text-slate-400" href={`/topic/${post.tag?.slug ?? "ai"}`}>{post.tag?.title ?? "Artificial Intelligence"}</Link>
                  </li>
                )
              }
            </ul>
          </section>

          <section id="share" className="mt-16">
            <ShareArticleRow slug={post.slug} title={post.name} />
          </section>


          <section id="article-nav" className={cn("max-w-[800]", "flex justify-between w-full mx-auto py-10 items-center gap-4 mt-16 border-t-[1px] border-dashed border-border")}>
            <Link href={prevArticle ? `/blog/${prevArticle.slug}` : ""} id="prev-item" className={cn("flex items-center gap-2 select-none", !prevArticle && "text-slate-400 pointer-events-none")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
              <span>Prev Article</span>
            </Link>
            {<Link href={nextArticle ? `/blog/${nextArticle.slug}` : ""} id="next-item" className={cn("flex items-center gap-2 select-none", !nextArticle && "text-slate-400 pointer-events-none")}>
              <span>Next Article</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>}
          </section>
        </section>
      </main>
    </>
  )
};