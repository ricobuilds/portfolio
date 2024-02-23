

import { Metadata, Viewport } from "next"
import Image from "next/image"
import styles from './Page.module.css'
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { Mdx } from "@/app/components/mdx"
import { sanityQuery } from "@/lib/sanity/client"
import { getAllArticles, getArticleBySlug } from "@/lib/sanity/queries"
import { Article } from "@/app/types/Article"
import { WithContext, Article as BlogArticle, BreadcrumbList, BlogPosting } from "schema-dts"
import { StructuredData } from "@/app/components/structured-data"
import Link from "next/link"
import { ShareArticleRow } from "@/app/components/share-article"
import { baseWidth } from "@/lib/config"
import { BlockWrapper, serialisers } from "@/app/components/codeblock"

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

  const articleSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.name,
    "description": post.snippet,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt,
    "author": {
      "@type": "Person",
      "name": siteMetadata.title
    },
    "image": "https://www.mysite.com/path-to-article-image.jpg",
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
      <main className={cn(baseWidth, "relative flex flex-col flex-1 min-h-screen px-4 mx-auto")}>
        <nav id="breadcrumb" className={cn("max-w-[696px]", "w-fit absolute top-10")}>
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
        <article className={
          cn(
            "max-w-[696px]",
            'flex flex-col gap-1 w-full mt-20 relative',
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
            <Image src={'/headshot.jpeg'} width={600} height={600} priority className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
            <div className="flex flex-col gap-1">
              <span className='font-bold text-amethyst-500'>{"Enric Trillo"}</span>
              <time dateTime={post.publishedAt} className="text-sm">{convertDate(post?.publishedAt)}</time>
            </div>
          </div>
          <div className="py-2" />
          <Image src={`http://localhost:3000/og?title=${post.name}`} className={"rounded-lg"} alt={`${post.name} - Enric Trillo`} width={1200} height={630} />
          <div className={styles.bloggo}>
            <BlockWrapper blocks={post?.content} serializers={serialisers} />
          </div>
        </article>
        <section id="cta" className={cn("max-w-[696px]", "w-full mx-auto hidden")}>
          <div className="flex flex-col gap-3 p-6 border rounded-lg bg-onyx">
            <h3 className="text-lg"><strong>{`Whenever you're ready, these are ${4} ways I can help you:`}</strong></h3>
            <p><strong>1.</strong> <strong className="text-amethyst-500">Metasyde Newsletter:</strong> Join 3,500+ entrepreneurs in my flagship course. The Creator MBA teaches you exactly how to build a lean, focused, and profitable Internet business. Come inside and get 5 years of online business expertise, proven methods, and actionable strategies across 111 in-depth lessons.</p>
            <p><strong>2.</strong> <strong className="text-amethyst-500">YouTube channel:</strong> by sponsoring my newsletter.</p>
          </div>
        </section>
        <section id="article-nav" className={cn(baseWidth, "flex justify-between w-full mx-auto py-10 items-center gap-4 mt-16 border-t-[1px] border-dashed border-border")}>
          <div id="prev-item" className="flex items-center gap-2 select-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
            <span>Prev Article</span>
          </div>
          <div id="next-item" className="flex items-center gap-2 select-none">
            <span>Next Article</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </div>
        </section>
      </main>
    </>
  )
};