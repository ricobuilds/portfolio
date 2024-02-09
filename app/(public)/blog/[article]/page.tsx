

import { Metadata } from "next"
import Image from "next/image"
import styles from './Page.module.css'
import { allPosts } from "@/.contentlayer/generated"
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { Mdx } from "@/app/components/mdx"

export async function generateStaticParams() {
  const articles = allPosts //deduped!

  return articles.filter((article) => article.url === undefined).map((article) => ({
    article: article._raw.flattenedPath
  }))
}

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {

  const articles = allPosts
  const { article } = params

  const post = articles.find(p => p.slug?.includes(article))

  if (!post) return { title: 'Issue not found!' }

  return {
    title: post.title,
    description: post.summary,
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
      url: siteMetadata.siteUrl + "/blog/" + params.article,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.title}`,
      description: post.summary,
      siteName: siteMetadata.title,
      publishedTime: post.date,
      authors: "Enric Trillo"
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      creator: '@ricobuilds',
      site: siteMetadata.siteUrl,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.title}`,
    },
    robots: "index, follow"
  }
}

const Page = ({ params }: { params: { article: string } }) => {

  const article = allPosts.filter((article) => article.url === undefined).find((article) => article._raw.flattenedPath === params.article)

  if (!article) notFound();

  return (
    <section className="flex flex-col flex-1 min-h-screen">
      <article className={
        cn(
          'flex flex-col gap-1 w-full max-w-[696px] mt-20 mx-auto relative',
        )
      }>
        <div className="flex flex-col">
          <h1 className={cn(
            "text-5xl lg:text-6xl font-bold",
            "text-charkol",
          )}>{article.title}</h1>
          <p className="text-obsidian-400">{article.summary}</p>
        </div>
        <div className="flex items-center gap-4 text-charkol">
          <Image src={'/headshot.jpeg'} width={600} height={600} className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
          <div className="flex flex-col gap-1">
            <span className='font-bold text-amethyst-500'>{"Enric Trillo"}</span>
            <time dateTime={article.date} className="text-sm">Published {convertDate(article?.date)}</time>
          </div>
        </div>
        <Image src={`${siteMetadata.siteUrl}/og?title=${article.title}`} className={"rounded-lg"} alt={`${article.title} - Promptoor`} width={1200} height={630} />
        <div className={styles.bloggo}>
          <Mdx code={article.body.code} />
        </div>
      </article>
    </section>
  )
};

export default Page;