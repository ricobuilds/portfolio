

import { Metadata, Viewport } from "next"
import Image from "next/image"
import styles from './Page.module.css'
import { allPosts } from "@/.contentlayer/generated"
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { Mdx } from "@/app/components/mdx"
import { sanityQuery } from "@/lib/sanity/client"
import { getAllArticles, getArticleBySlug } from "@/lib/sanity/queries"
import { Article } from "@/app/types/Article"
import { WithContext, Article as BlogArticle } from "schema-dts"
import { StructuredData } from "@/app/components/structured-data"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

async function getArticle({ article }: { article: string }) {
  const post = await sanityQuery(getArticleBySlug(article))
  // console.log(post)
  return post
}

async function getArticles() {
  const articles = await sanityQuery(getAllArticles)
  return articles
}

export async function generateStaticParams() {
  const posts: Article[] = await sanityQuery(getAllArticles) //deduped!

  return posts.map((post) => ({
    article: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {

  const articles: Article[] = await getArticles()
  const { article } = params
  const post = articles.find(p => p.slug?.includes(article))

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
  const posts: Article[] = await sanityQuery(getAllArticles) //deduped!
  const { article } = params

  if (!posts.find((p: Article) => p.slug?.includes(article))) return notFound()

  const post = posts.find((p: Article) => p.slug === article)

  if (!post) {
    notFound()
  };

  const articleSchema: WithContext<BlogArticle> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.name,
    "description": post.snippet,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt,
    "author": {
      "@type": "Person",
      "name": siteMetadata.title
    },
    "publisher": {
      "@type": "Organization",
      "name": "Enric",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourwebsite.com/logo.png",
        // "width": 600,
        // "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl + "/blog/" + post.slug
    }
  }

  return (
    <>
      <StructuredData data={articleSchema} />
      <main className="flex flex-col flex-1 min-h-screen px-4">
        <article className={
          cn(
            "max-w-[696px]",
            'flex flex-col gap-1 w-full mt-20 mx-auto relative',
          )
        }>
          <div className="flex flex-col">
            <h1 className={cn(
              "text-5xl lg:text-6xl font-bold",
              "text-charkol",
            )}>{post.name}</h1>
            {/* <p className="text-obsidian-400">{article.summary}</p> */}
          </div>
          <div className="py-2" />
          <div className="flex items-center gap-4 text-charkol">
            <Image src={'/headshot.jpeg'} width={600} height={600} className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
            <div className="flex flex-col gap-1">
              <span className='font-bold text-amethyst-500'>{"Enric Trillo"}</span>
              <time dateTime={post.publishedAt} className="text-sm">{convertDate(post?.publishedAt)}</time>
            </div>
          </div>
          <div className="py-2" />
          <Image src={`http://localhost:3000/og?title=${post.name}`} className={"rounded-lg"} alt={`${post.name} - Enric Trillo`} width={1200} height={630} />
          <div className={styles.bloggo}>
            {/* <Mdx code={post.body.code} /> */}
          </div>
        </article>
        <div id="article-nav" className={cn("max-w-[696px]", "flex justify-between w-full mx-auto py-10 items-center gap-4 mt-16 border-t-[1px] border-dashed border-border")}>
          <div id="prev-item" className="flex items-center gap-2 select-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
            <span>Prev</span>
          </div>
          <div className=""></div>
          <div id="next-item" className="flex items-center gap-2 select-none">
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </div>
        </div>
        <div id="newsletter" className={cn("max-w-[696px]", "w-full mx-auto mb-16")}>
          <p className="mt-6 text-2xl italic font-bold">Metasyde Newsletter</p>
          <p className="mb-8">Get notified when I write something about top news & insights on AI Gaming and the Metaverse, or launch a new project right in your inbox.</p>
          <div className="w-full rounded-lg">
            <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
          </div>
          <div className="w-full">
            <div className="pt-4">
              <span id="lipline" className="flex text-sm text-slate-400">Ps: I send emails every week, never spam or sell your data.</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
};