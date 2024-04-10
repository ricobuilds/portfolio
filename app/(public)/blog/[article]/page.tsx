import { Metadata, Viewport } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import { Article } from "@/app/types/Article"
import { WithContext, BreadcrumbList, Article as BlogPosting } from "schema-dts"
import { StructuredData } from "@/app/components/structured-data"
import Link from "next/link"
import { ShareArticleRow } from "@/app/components/share-article"
import { Kanit } from "next/font/google"
import { ScrollProgress } from "@/app/components/scroll-progress"
import { FramerPortal } from "./framer-portal"
import { PortableText } from "@portabletext/react"
import { components } from "@/app/components/portable"
import { sanityQuery } from "@/lib/sanity/utils"

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
  const posts: Article[] = await sanityQuery(`*[_type == "article"] | order(publishedAt desc){
    "slug": slug.current,
  }`)

  return posts.map((post) => ({
    article: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { article: string } }): Promise<Metadata> {

  const { article } = params

  const post = await sanityQuery(`*[_type == "article" && slug.current == "${article}"][0]{
    title,
    description,
    content,
    _updatedAt,
    publishedAt,
    "topic": topic->{title, "slug": slug.current},
    "author": author->{name},
    }`)

  if (!post) return { title: 'Issue not found!' }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${article}`,
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
      url: siteMetadata.siteUrl + "/blog/" + article,
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

const CTA = () => {
  return (
    <section id="cta" className={cn("max-w-2xl w-full")}>
      <div className="flex flex-col gap-3 p-6 rounded-lg shadow-xl ring-slate-300 ring-2 bg-obsidian-100">
        <h3 className={cn(heroFont.className, "text-xl")}><strong>{`Whenever you're ready, these are ${4} ways I can help you:`}</strong></h3>
        <p><strong>1.</strong> <strong className="text-amethyst-500">Metasyde Newsletter:</strong> Join 3,500+ entrepreneurs in my flagship course. The Creator MBA teaches you exactly how to build a lean, focused, and profitable Internet business. Come inside and get 5 years of online business expertise, proven methods, and actionable strategies across 111 in-depth lessons.</p>
        <p><strong>2.</strong> <strong className="text-amethyst-500">YouTube channel:</strong> by sponsoring my newsletter.</p>
      </div>
    </section>
  )
}

const Share = ({ title, slug }: { title: string, slug: string }) => {
  return (
    <section id="share" className="max-w-2xl mt-16">
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

export const revalidate = 3600

export default async function Page({ params }: { params: { article: string } }) {
  const { article } = params

  const post: Article = await sanityQuery(`*[_type == "article" && slug.current == "${article}"][0]{
    title,
    description,
    "headings": content[style in ["h2", "h3", "h4", "h5", "h6"]],
    content,
    _updatedAt,
    publishedAt,
    "slug": slug.current,
    "topic": topic->{title, "slug": slug.current},
    "author": author->{name},
    }`)

  if (!post) {
    notFound()
  };

  const prevArticle: { slug: string } = await sanityQuery(`*[_type == "article" && publishedAt < "${post.publishedAt}"] | order(publishedAt desc)[0]{
    "slug": slug.current
  }`)
  const nextArticle: { slug: string } = await sanityQuery(`*[_type == "article" && publishedAt > "${post.publishedAt}"] | order(publishedAt asc)[0]{
    "slug": slug.current
  }`)

  const articleSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt,
    "author": {
      "@type": "Person",
      "name": siteMetadata.title,
      "url": siteMetadata.siteUrl
    },
    "image": "https://www.mysite.com/path-to-article-image.jpg",
    "url": `${siteMetadata.siteUrl}/blog/${post.slug}`,
    "publisher": {
      "@type": "Person",
      "name": "Enric Trillo",
      "url": siteMetadata.siteUrl
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
      <main id="article" className="relative flex-1 w-full max-w-full px-6 mx-auto">
        <div className="flex flex-col justify-between mt-8 lg:flex-row max-w-[970px] mx-auto">
          <FramerPortal>
            <section id="header" className="w-full max-w-2xl mx-auto">
              <div id="meta" className="flex flex-col max-w-2xl gap-2 mt-20">
                <Link href={`/topic/${post.tag?.slug ?? "ai"}`} className="w-fit">
                  <div className={cn("w-fit px-2 py-0.5 rounded-lg", `bg-amethyst-400 bg-opacity-20 text-amethyst-600`)}>{post.tag?.title ?? "Artificial Intelligence"}</div>
                </Link>
                <h1 className={cn(
                  "text-5xl lg:text-6xl",
                  heroFont.className,
                  "text-charkol",
                )}>{post.title}</h1>
                <div>
                  <p itemProp="description" className="text-obsidian-400">{post.description ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"} </p>
                </div>
                <div className="flex items-center gap-4 text-charkol">
                  <Image src={'/headshot.jpeg'} width={600} height={600} priority className='w-10 h-10 rounded-full pointer-events-none select-none' alt={siteMetadata.title} />
                  <div className="flex flex-wrap items-start justify-start gap-1 text-xs">
                    <div className="flex flex-wrap gap-1 uppercase">
                      Written by <span className='text-amethyst-500'>{post.author?.name ?? "Enric Trillo "}</span>
                      <span> /</span>
                    </div>
                    <div className="relative flex items-start justify-start gap-1 uppercase">
                      <time dateTime={post.publishedAt}>
                        Published on {convertDate(post?.publishedAt as string, { month: "long" })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl">
                <Image src={`/og?title=${post.title}`} className={"w-full object-cover aspect-video"} alt={`${post.title} by Enric Trillo, founder of Metasyde`} width={1200} height={630} />
              </div>
            </section>
            <section id="content" className="max-w-2xl mx-auto mt-8">
              <article>
                <PortableText value={post?.content} components={components} onMissingComponent={(message, options) => { console.log(message + "reekz") }} />
              </article>
            </section>
          </FramerPortal>
          <aside className="lg:min-w-[270px] lg:max-w-[270px] pt-10 lg:pt-20">
            <div className="flex flex-col gap-6 top-24">
              <div className="bg-white overflow-hidden pt-6 px-4 pb-2.5 relative rounded-xl">
                <div className="w-full mb-5">
                  <Image src={'/headshot.jpeg'} alt="Enric Trillo" width={300} height={300} className="w-32 h-32 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
                </div>
                <div className="mb-2 font-bold">Who is {post.author?.name ?? "Enric Trillo"}?</div>
                <p className="text-sm text-obsidian-500">I am a fullstack developer & founder of <Link className="underline text-charkol" href={""}>Metasyde</Link>, a studio building immersive game experiences with Web3. I am obsessed with pushing the bounds of gaming with modern technologies.</p>
              </div>
            </div>
          </aside>
        </div>
        <section id="footer" className="mt-8 max-w-[970px] w-full mx-auto">
          <CTA />
          <Share title={post.title as string} slug={params.article} />
          <Navigation prevPost={prevArticle} nextPost={nextArticle} />
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