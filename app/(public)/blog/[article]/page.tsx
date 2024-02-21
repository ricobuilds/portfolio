

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
    <section className="flex flex-col flex-1 min-h-screen px-4">
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
          {/* <p className="text-obsidian-400">{article.summary}</p> */}
        </div>
        <div className="py-2" />
        <div className="flex items-center gap-4 text-charkol">
          <Image src={'/headshot.jpeg'} width={600} height={600} className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
          <div className="flex flex-col gap-1">
            <span className='font-bold text-amethyst-500'>{"Enric Trillo"}</span>
            <time dateTime={article.date} className="text-sm">Published {convertDate(article?.date)}</time>
          </div>
        </div>
        <div className="py-2" />
        <Image src={`${siteMetadata.siteUrl}/og?title=${article.title}`} className={"rounded-lg"} alt={`${article.title} - Enric Trillo`} width={1200} height={630} />
        <div className={styles.bloggo}>
          <Mdx code={article.body.code} />
        </div>
      </article>
      <div id="article-nav" className="flex justify-between w-full max-w-[696px] mx-auto py-10 items-center gap-4 mt-16 border-t-[1px] border-border">
        <div id="prev-item" className="flex items-center gap-2 select-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          <span>Prev</span>
        </div>
        <div className=""></div>
        <div id="next-item" className="flex items-center gap-2 select-none">
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </div>
      </div>
      <div id="newsletter" className="w-full max-w-[696px] mx-auto mb-16">
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
    </section>
  )
};

export default Page;