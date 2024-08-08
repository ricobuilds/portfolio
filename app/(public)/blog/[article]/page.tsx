import { Viewport } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { MDXArticle } from "@/app/types/Article"
import Link from "next/link"
import { ShareArticleRow } from "@/components/share-article"
import { Kanit } from "next/font/google"
import { ScrollProgress } from "@/components/scroll-progress"
import { allSlugs, extractSlug, formatTag, getAllPosts, getPostBySlug } from "@/lib/mdx"
import { CustomMDX } from "@/components/mdx"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { components } from "@/components/mdx/index"
import { routes } from "@/lib/routes"
import { AuthorBlock } from "@/components/author-block"

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

  return allSlugs.map((slug) => ({
    article: extractSlug(slug)
  }))
}

export async function generateMetadata({ params }: { params: { article: string } }): Promise<any> {

  const post: MDXArticle = getAllPosts().find((p) => p.slug === params.article)

  if (!post) return { title: 'Issue not found!' }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post?.modifiedDate || post.date).toISOString()

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: './',
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
      url: './',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: post.og?.url ? [post.og?.url] : siteMetadata.baseUrlImage,
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
      images: post.og?.url ? [post.og?.url] : siteMetadata.baseUrlImage,
    },
    robots: "index, follow",
  }
}

const CTA = () => {

  return (
    <section id="cta" className={cn("max-w-3xl w-full")}>
      <div className="flex flex-col gap-3 p-6 rounded-lg shadow-xl ring-slate-300 ring-2 bg-obsidian-100">
        <h3 className={cn(heroFont.className, "text-xl")}><strong> Whenever you're ready, these are 3 ways I can help you:</strong></h3>
        <p><strong>#1.</strong> If you want to learn more about how I can help you assemble AI multi-agent systems that handle the boring work for you, let&apos;s connect and schedule a call.</p>
        <p><strong>#2.</strong> Shift Forward is my newsletter focused on breaking hot trends and topics in disruptive technologies to help you thrive in your profession and business in our world with AI <i>{">>>"} <Link href="/subscribe" rel="noopener noreferrer" className={cn("underline text-amethyst-500 font-bold underline-offset-2")}>Subscribe to Shift Forward</Link></i></p>
        <p><strong>#3.</strong> Follow me on <Link href={routes.twitter} target="_blank" className="font-bold underline text-amethyst-500">X</Link> and <Link href={routes.twitter} target="_blank" className="font-bold underline text-amethyst-500">LinkedIn</Link> for more insights on disruptive technologies, AI multi-agent systems, and the Shifter philosophy.</p>
      </div>
    </section>
  )
}

const Share = ({ title, slug }: { title: string, slug: string }) => {
  return (
    <section id="share" className="max-w-3xl mt-4">
      <ShareArticleRow slug={slug} title={title} />
    </section>
  )
}

const Navigation = ({ prevPost, nextPost }: { prevPost: { slug: string }, nextPost: { slug: string } }) => {
  return (
    <section id="article-nav" className={cn("max-w-2xl", "flex justify-between w-full py-10 items-center gap-4 mt-16 border-t-[1px] border-dashed border-border")}>
      <Link href={prevPost ? `/blog/${prevPost.slug}` : ""} id="prev-item" className={cn("flex items-center gap-2 select-none", !prevPost && "text-slate-400 pointer-events-none")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
        <span>Prev Article</span>
      </Link>
      {<Link href={nextPost ? `/blog/${nextPost.slug}` : ""} id="next-item" className={cn("flex items-center gap-2 select-none", !nextPost && "text-slate-400 pointer-events-none")}>
        <span>Next Article</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </Link>}
    </section>
  )
}

const Tags = ({ post }: { post: MDXArticle }) => {
  return (
    <div className="flex items-center gap-4 py-8 mt-4">
      <span>Tags:</span>
      <div className="flex flex-wrap items-center gap-2">
        {post.tags.map((t, idx) => (
          <Link key={idx} href={`/tags/${formatTag(t)}`} className="w-fit">
            <div className={cn("w-fit px-2 py-0.5 rounded-lg", `bg-amethyst-400 bg-opacity-20 text-amethyst-600`)}>{formatTag(t)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function Page({ params }: { params: { article: string } }) {

  const post: MDXArticle = await getPostBySlug(params.article)
  const postIndex = getAllPosts().findIndex((p) => p.slug === params.article)
  const prev = getAllPosts()[(postIndex + 1)]
  const next = getAllPosts()[(postIndex - 1)]

  if (!post) {
    notFound()
  };

  return (
    <>
      {/* <StructuredData data={articleSchema} />
      <StructuredData data={articleBreadcrumbSchema} /> */}
      <ScrollProgress />
      <main id="article" className="relative flex-1 w-full max-w-full px-6 mx-auto">
        <div className="flex flex-col justify-between mt-8 lg:flex-col max-w-[970px] mx-auto">
          <section id="header" className="w-full max-w-2xl mx-auto">
            <div id="meta" className="flex flex-col max-w-3xl gap-2 mt-10">
              <h1 className={cn(
                "text-5xl lg:text-6xl",
                heroFont.className,
                "text-charkol",
              )}>{post.title}</h1>
              <div>
                <p itemProp="description" className="text-obsidian-400">{post.description}</p>
              </div>
              <div className="flex items-center gap-4 text-charkol">
                <div className="flex flex-wrap items-start justify-start gap-1 text-xs">
                  <div className="flex flex-wrap gap-1 uppercase">
                    Written by <span className='text-amethyst-500'>{post.author}</span>
                    <span> /</span>
                  </div>
                  <div className="relative flex items-start justify-start gap-1 uppercase">
                    Published on
                    <time dateTime={post.date}>
                      {convertDate(post.date, { month: "long", weekday: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              {!post.youtube?.url && <Image src={`/blog/${params.article}.png`} className={"w-full object-cover aspect-video"} alt={`${post.title} by Enric Trillo, founder of Metasyde`} width={1200} height={630} />}
              {post.youtube?.url && <YouTubeEmbed url={post.youtube.url} title={`${post.title} embed`} />}
            </div>
          </section>
          <article className='max-w-2xl pt-10 mx-auto prose'>
            <CustomMDX source={post.content} components={components} />
          </article>
        </div>
        <section id="footer" className="w-full max-w-2xl mx-auto mt-8">
          <AuthorBlock title={post.author} />
          <CTA />
          <Tags post={post} />
          <Share title={post.title} slug={params.article} />
          <Navigation prevPost={prev} nextPost={next} />
        </section>
      </main >
    </>
  )
};

const ToC = ({ headings }: any) => {
  return (
    <div className="bg-white overflow-hidden pt-6 px-4 pb-2.5 relative border-2 rounded-xl">
      <div className="font-bold">Table of Contents</div>
      <nav>
        <ul>
          {
            headings?.map((heading: any) => (
              <li key={heading?._key}>
                <Link href={`#${heading.children[0].text}`}>
                  {heading.children[0].text}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}