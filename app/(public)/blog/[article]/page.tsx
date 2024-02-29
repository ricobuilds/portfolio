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
import { FramerPortal } from "./framer-portal"

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
      canonical: `${siteMetadata.siteUrl}/blog/${post.slug}`,
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
      authors: siteMetadata.title
    },
    twitter: {
      card: 'summary_large_image',
      title: post.name,
      description: post.snippet,
      creator: '@ricobuilds',
      site: siteMetadata.siteUrl,
      images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/og?title=${post.name}`,
    },
    robots: "index, follow",
  }
}

export const CTA = () => {
  return (
    <section id="cta" className={cn("max-w-2xl mx-auto w-full")}>
      <div className="flex flex-col gap-3 p-6 rounded-lg shadow-xl ring-slate-300 ring-2 bg-obsidian-100">
        <h3 className={cn(heroFont.className, "text-xl")}><strong>{`Whenever you're ready, these are ${4} ways I can help you:`}</strong></h3>
        <p><strong>1.</strong> <strong className="text-amethyst-500">Metasyde Newsletter:</strong> Join 3,500+ entrepreneurs in my flagship course. The Creator MBA teaches you exactly how to build a lean, focused, and profitable Internet business. Come inside and get 5 years of online business expertise, proven methods, and actionable strategies across 111 in-depth lessons.</p>
        <p><strong>2.</strong> <strong className="text-amethyst-500">YouTube channel:</strong> by sponsoring my newsletter.</p>
      </div>
    </section>
  )
}

export const Tags = ({ post }: { post: Article }) => {
  return (
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
  )
}

export const Share = ({ title, slug }: { title: string, slug: string }) => {
  return (
    <section id="share" className="max-w-2xl mx-auto mt-16">
      <ShareArticleRow slug={slug} title={title} />
    </section>
  )
}

export const Navigation = ({ prevPost, nextPost }: { prevPost: { slug: string }, nextPost: { slug: string } }) => {
  return (
    <section id="article-nav" className={cn("max-w-2xl", "flex justify-between w-full mx-auto py-10 items-center gap-4 mt-16 border-t-[1px] border-dashed border-border")}>
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl + "/blog/" + post.slug
    },
    "headline": post.name,
    "description": post.snippet,
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
      <main id="article" className="relative flex-1 w-full max-w-full px-6 mx-auto">
        <FramerPortal>
          <section id="header" className="w-full max-w-2xl mx-auto">
            <nav id="breadcrumb" className={cn("w-fit absolute hidden mx-auto top-10")}>
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
            <div id="meta" className="flex flex-col max-w-2xl gap-2 mt-20">
              <Link href={`/topic/${post.tag?.slug ?? "ai"}`}>
                <div className={cn("w-fit px-2 py-0.5 rounded-lg", `bg-amethyst-400 bg-opacity-20 text-amethyst-600`)}>{post.tag?.title ?? "Artificial Intelligence"}</div>
              </Link>
              <h1 className={cn(
                "text-5xl lg:text-6xl",
                heroFont.className,
                "text-charkol",
              )}>{post.name}</h1>
              <div>
                <p itemProp="description" className="text-obsidian-400">{post.snippet ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"} </p>
              </div>
              <div className="flex items-center gap-4 text-charkol">
                <Image src={'/headshot.jpeg'} width={600} height={600} priority className='w-10 h-10 rounded-full pointer-events-none select-none' alt={siteMetadata.title} />
                <div className="flex flex-wrap items-start justify-start gap-1 text-xs">
                  <div className="flex flex-wrap gap-1 uppercase">
                    by <span className='text-amethyst-500'>{post.author?.name ?? "Enric Trillo "}</span>
                    <span> /</span>
                  </div>
                  <div className="relative flex items-start justify-start gap-1 uppercase">
                    <time dateTime={post.publishedAt}>
                      {convertDate(post?.publishedAt, { month: "long" })} {new Date(post.publishedAt).toLocaleTimeString("en-GB", { timeStyle: "short", hourCycle: "h12" })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              <Image src={post.image ? post.image : `/base-og.png`} className={"w-full object-cover aspect-video"} alt={`${post.name} by Enric Trillo, founder of Metasyde`} width={1200} height={630} />
            </div>
          </section>
          <section id="content" className="max-w-2xl mx-auto mt-8">
            <article className={cn(styles.bloggo)}>
              <p>hello</p>
              <BlockWrapper blocks={post?.content} serializers={serialisers} />
              <h2>don't worry about it sweetheart</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <h3>don't worry about it sweetheart</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <h4>don't worry about it sweetheart</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
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
            </article>
          </section>
          <section id="footer" className="">
            <CTA />
            {/* <Tags post={post} /> */}
            <Share title={post.name} slug={params.article} />
            <Navigation prevPost={prevArticle} nextPost={nextArticle} />
          </section>
        </FramerPortal >
      </main >
    </>
  )

  return (
    <main>
      <div id="articleHeader" className="container px-8 mx-auto xl:px-5 max-w-[970px] w-full py-5 lg:py-8 !pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div className="flex justify-center">
            <div className="flex gap-3">
              <a href="/category/lifestyle"><span className="inline-block mt-5 text-xs font-medium tracking-wider text-purple-600 uppercase">Lifestyle</span></a>
            </div>
          </div>
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center text-brand-primary dark:text-white lg:text-4xl lg:leading-snug">5 Effective Brain Recharging Activities No One is Talking About</h1>
          <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0 w-10 h-10">
                <a href="/author/joshua-wood">
                  <img alt="Joshua Wood" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" style={{ position: "absolute", height: "100 %", width: "100 %", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="40px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=16&amp;q=75 16w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=32&amp;q=75 32w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=48&amp;q=75 48w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=64&amp;q=75 64w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
                </a>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  <a href="/author/joshua-wood">Joshua Wood</a>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time className="text-gray-500 dark:text-gray-400" dateTime="2022-10-21T10:50:00.000Z">October 21, 2022</time>
                  <span>· 5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 max-w-[970px] w-full mx-auto overflow-hidden aspect-video lg:rounded-lg">
        <div className="overflow-hidden rounded-xl">
          <Image priority loading="eager" src={post.image ? post.image : `/base-og.png`} className={"w-full object-cover aspect-video"} alt={`${post.name} by Enric Trillo, founder of Metasyde`} width={1200} height={630} />
        </div>
        <img alt="Graphics" loading="eager" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100 %", width: "100 %", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=3840&amp;q=75" />
      </div>
      <div id="article" className="container max-w-[970px] w-full px-8 py-5 mx-auto xl:px-5 lg:py-8">
        <article className="max-w-screen-md mx-auto ">
          <p>hello</p>
          <BlockWrapper blocks={post?.content} serializers={serialisers} />
          <h2>don't worry about it sweetheart</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <h3>don't worry about it sweetheart</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <h4>don't worry about it sweetheart</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
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
          <div className="mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {/* <p>In a world of back-to-back meetings, hellish commutes, and cramped workspaces, we have normalized serious issues like burnout, depression, and anxiety.</p>
            <p>Our reasons? Productivity and hustle. But the irony—it’s <em>precisely</em> by taking care of our minds that we become manifold effective and keep burnout at bay. To quote <a href="https://www.psychologytoday.com/us/blog/the-science-fandom/202109/why-leisure-is-never-waste-time#:~:text=The%20Benefits%20of%20Leisure&amp;text=There%20are%20both%20physical%20and,blood%20pressure%2C%20and%20heart%20rate." rel="noopener" target="_blank">Psychology Today</a>,</p>
            <blockquote>“There are both physical and psychological benefits of leisure time, with reduced levels of stress, anxiety, and depression; improved mood; and higher levels of positive emotion. They also lower cortisol levels, blood pressure, and heart rate.”</blockquote>
            <p>I want to share 5 such activities — but unlike the cliché ones, I won’t tell you to meditate or stroll. I’ll give you rarely-talked-about ones.</p>
            <p>Sinking Into Your Chair and Relishing the Setting Sun</p><p>There’s something soul-stirring about the orange sun receding into the horizon — the setting of the mighty <a href="https://www.space.com/17170-what-is-the-sun-made-of.html#:~:text=The%20sun%20is%20a%20big,system%20as%20heat%20and%20light." rel="noopener" target="_blank">burning gas ball</a> signals closure and reminds you to rest.</p>
            <p>Add a lean-back chair into the mix and you’ve got a treat. Whenever I shut my laptop and relish this, time screeches to a standstill — peace, calm, and the ever-present beauty of the <em>present</em>.</p>
            <p>As my solar buddy disappears and I return to work, I brim with positivity, focus, and energy.</p>
            <h2><strong>Don’t worry if you don’t have a sun view.</strong> </h2>
            <p>Star-gazing, admiring the shifting clouds, or even observing the barking mongrels, passing vehicles, and chirping birds will work. As time-management expert Selin Malkoc says,</p>
            <blockquote>“The key to enjoying your leisure activities is to live in the moment as much as possible.”</blockquote>
            <p>A Steamy Shower with A Scented Body Wash</p><p>May God bless the person who invented the showerhead — a hot shower is my omnipotent “reset” button.</p>
            <p>Procrastinated for 2 hours? Lacking the motivation to write? Feeling lethargic? No matter what, post a hot shower, I’m a <em>machine.</em></p>
            <p>Hot showers have a&nbsp;<em>ton</em>&nbsp;of benefits — better sleep, healthier skin, reduced headaches, relieved bodily tension, and stress evaporation. With a scented body wash or oil, this climbs up another notch.</p>
            <p>If you’re looking for a jolt of mental energy and alertness rather than a calm mind recharge, go for a cold shower instead.</p>
            <p></p>
            <img alt="Image" loading="lazy" width="4096" height="3112" decoding="async" data-nimg="1" className="object-cover" style={{ color: "transparent" }} sizes="(max-width: 800px) 100vw, 800px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
            <p>Photo by <a href="https://unsplash.com/@chewy?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Chewy</a> on <a href="https://unsplash.com/?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Unsplash</a></p>
            <p>Banter with Your Family</p><p>It’s been over a year since I stopped watching TV, streaming platforms, and anime. But now and then, I’ll land on the sofa and bear through some TV just for the family time.</p>
            <p><strong>Most often, the TV becomes a background noise</strong> — thanks to our chatter and laughter filling the living room. If it gets silent, I’ll get back and even a small such interlude leaves me burning with energy.</p>
            <blockquote>“At the end of your life, you’ll never regret not having passed one more test or not closing one more deal. You will regret time not spent with a husband, a friend, a child, a parent.”<br /><a href="https://www.brainyquote.com/quotes/barbara_bush_121743" rel="noopener" target="_blank">— Barbara Bush</a></blockquote>
            <p>You don’t even need full-blown family time — crossing over to your brother’s room for 5 minutes, visiting your mom in the kitchen, or checking on your half-dozing half-reading grandma is enough.</p><p>A short positive circuit breaker is all you need.</p>
            <h2>Reading Light Fiction</h2>
            <p>Reading has become synonymous with non-fiction, mainly self-help. But fiction is as if not <em>more</em> beneficial.</p>
            <p>While powerful characters and storylines with profound messages transform you from deep within, light-upbeat stories cure the darkest of moods and worries.</p>
            <p>So much so that “<em>Bibliotherapy</em>” or reading therapy is actively used to reduce mental health issues.</p><p>My go-to is fantasy fiction — when you’re teleported to surreal worlds, mundane earth’s vagaries disappear. My top 4 picks would be The Emperor’s Soul, The Final Empire, Assassin’s Apprentice, and Lord Of The Rings.</p>
            <blockquote>“A reader lives a thousand lives before he dies. The man who never reads lives only one.” <br /> — <a href="https://www.goodreads.com/quotes/408441-a-reader-lives-a-thousand-lives-before-he-dies-said" rel="noopener" target="_blank">George R.R Martin</a></blockquote><h2>Strumming Your Guitar</h2>
            <p>Don’t have one? Go for the keyboard. Classical much? The flute’s waiting for you. Have a lot of space to spare? A piano won’t complain.</p>
            <p>Listening to music is widely recommended as a leisure activity, but playing music puts it to shame — deeper empathy, higher self-esteem, better memory, sharper focus, and protection against age-related brain degeneration.</p>
            <p>One 6-month study whose subjects started learning the drums found white matter tract improvements—the brain parts that control the speed of neural transmission. Another linked long-term playing to significant positive neural changes. There are tons of other studies as well.</p>
            <p>This is as much a reminder to brush the dust off my guitar as it is a piece of advice for you. Now that I’m done with this article, let me go strum some strings.</p>
            <blockquote>“Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.”</blockquote> */}
          </div>

          <div className="flex justify-center mb-7 mt-7"><a className="px-5 py-2 text-sm text-blue-600 rounded-full bg-brand-secondary/20 dark:text-blue-500 " href="/">← View all posts</a></div>
          <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
              <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
                <a href="/author/joshua-wood">
                  <img alt="Joshua Wood" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="96px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=16&amp;q=75 16w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=32&amp;q=75 32w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=48&amp;q=75 48w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=64&amp;q=75 64w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
                </a>
              </div>
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">About Joshua Wood</h3>
                </div>
                <div>
                  <p>Joshua is a Microsoft Azure Certified Cloud Professional and a Google Certified Associate Cloud Engineer. A Data Analytics at Acme, specializing in the use of cloud infrastructure for Machine Learning and Deep Learning operation at scale.</p></div>
                <div className="mt-3">
                  <a className="py-2 text-sm text-blue-600 rounded-full bg-brand-secondary/20 dark:text-blue-500 " href="/author/joshua-wood">View Profile</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )

  return (
    <main>
      <div className="container px-8 mx-auto xl:px-5 max-w-[970px] w-full py-5 lg:py-8 !pt-0">
        <div className="max-w-screen-md mx-auto ">
          <div className="flex justify-center">
            <div className="flex gap-3">
              <a href="/category/lifestyle"><span className="inline-block mt-5 text-xs font-medium tracking-wider text-purple-600 uppercase">Lifestyle</span></a>
            </div>
          </div>
          <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center text-brand-primary dark:text-white lg:text-4xl lg:leading-snug">5 Effective Brain Recharging Activities No One is Talking About</h1>
          <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0 w-10 h-10">
                <a href="/author/joshua-wood">
                  <img alt="Joshua Wood" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" style={{ position: "absolute", height: "100 %", width: "100 %", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="40px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=16&amp;q=75 16w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=32&amp;q=75 32w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=48&amp;q=75 48w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=64&amp;q=75 64w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
                </a>
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  <a href="/author/joshua-wood">Joshua Wood</a>
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time className="text-gray-500 dark:text-gray-400" dateTime="2022-10-21T10:50:00.000Z">October 21, 2022</time>
                  <span>· 5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden aspect-video lg:rounded-lg">
        <img alt="Graphics" loading="eager" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100 %", width: "100 %", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="100vw" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F2fda477a7e32f813abb9a8ef425939e6a91c7973-987x1481.png%3Frect%3D0%2C279%2C987%2C607%26w%3D987%26auto%3Dformat&amp;w=3840&amp;q=75" />
      </div>
      <div className="container max-w-screen-lg px-8 py-5 mx-auto xl:px-5 lg:py-8">
        <article className="max-w-screen-md mx-auto ">
          <p>hello</p>
          <BlockWrapper blocks={post?.content} serializers={serialisers} />
          <h2>don't worry about it sweetheart</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <h3>don't worry about it sweetheart</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <h4>don't worry about it sweetheart</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem veniam provident qui vitae cumque nesciunt quos placeat velit similique neque ipsa ratione autem suscipit, optio delectus non quisquam aspernatur temporibus.</p>
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
          <div className="mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {/* <p>In a world of back-to-back meetings, hellish commutes, and cramped workspaces, we have normalized serious issues like burnout, depression, and anxiety.</p>
            <p>Our reasons? Productivity and hustle. But the irony—it’s <em>precisely</em> by taking care of our minds that we become manifold effective and keep burnout at bay. To quote <a href="https://www.psychologytoday.com/us/blog/the-science-fandom/202109/why-leisure-is-never-waste-time#:~:text=The%20Benefits%20of%20Leisure&amp;text=There%20are%20both%20physical%20and,blood%20pressure%2C%20and%20heart%20rate." rel="noopener" target="_blank">Psychology Today</a>,</p>
            <blockquote>“There are both physical and psychological benefits of leisure time, with reduced levels of stress, anxiety, and depression; improved mood; and higher levels of positive emotion. They also lower cortisol levels, blood pressure, and heart rate.”</blockquote>
            <p>I want to share 5 such activities — but unlike the cliché ones, I won’t tell you to meditate or stroll. I’ll give you rarely-talked-about ones.</p>
            <p>Sinking Into Your Chair and Relishing the Setting Sun</p><p>There’s something soul-stirring about the orange sun receding into the horizon — the setting of the mighty <a href="https://www.space.com/17170-what-is-the-sun-made-of.html#:~:text=The%20sun%20is%20a%20big,system%20as%20heat%20and%20light." rel="noopener" target="_blank">burning gas ball</a> signals closure and reminds you to rest.</p>
            <p>Add a lean-back chair into the mix and you’ve got a treat. Whenever I shut my laptop and relish this, time screeches to a standstill — peace, calm, and the ever-present beauty of the <em>present</em>.</p>
            <p>As my solar buddy disappears and I return to work, I brim with positivity, focus, and energy.</p>
            <h2><strong>Don’t worry if you don’t have a sun view.</strong> </h2>
            <p>Star-gazing, admiring the shifting clouds, or even observing the barking mongrels, passing vehicles, and chirping birds will work. As time-management expert Selin Malkoc says,</p>
            <blockquote>“The key to enjoying your leisure activities is to live in the moment as much as possible.”</blockquote>
            <p>A Steamy Shower with A Scented Body Wash</p><p>May God bless the person who invented the showerhead — a hot shower is my omnipotent “reset” button.</p>
            <p>Procrastinated for 2 hours? Lacking the motivation to write? Feeling lethargic? No matter what, post a hot shower, I’m a <em>machine.</em></p>
            <p>Hot showers have a&nbsp;<em>ton</em>&nbsp;of benefits — better sleep, healthier skin, reduced headaches, relieved bodily tension, and stress evaporation. With a scented body wash or oil, this climbs up another notch.</p>
            <p>If you’re looking for a jolt of mental energy and alertness rather than a calm mind recharge, go for a cold shower instead.</p>
            <p></p>
            <img alt="Image" loading="lazy" width="4096" height="3112" decoding="async" data-nimg="1" className="object-cover" style={{ color: "transparent" }} sizes="(max-width: 800px) 100vw, 800px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2F5bdbf693a065af7d96335ae20cc1ee770c9633fe-4096x3112.jpg%3Fw%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
            <p>Photo by <a href="https://unsplash.com/@chewy?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Chewy</a> on <a href="https://unsplash.com/?utm_source=medium&amp;utm_medium=referral" rel="noopener" target="_blank">Unsplash</a></p>
            <p>Banter with Your Family</p><p>It’s been over a year since I stopped watching TV, streaming platforms, and anime. But now and then, I’ll land on the sofa and bear through some TV just for the family time.</p>
            <p><strong>Most often, the TV becomes a background noise</strong> — thanks to our chatter and laughter filling the living room. If it gets silent, I’ll get back and even a small such interlude leaves me burning with energy.</p>
            <blockquote>“At the end of your life, you’ll never regret not having passed one more test or not closing one more deal. You will regret time not spent with a husband, a friend, a child, a parent.”<br /><a href="https://www.brainyquote.com/quotes/barbara_bush_121743" rel="noopener" target="_blank">— Barbara Bush</a></blockquote>
            <p>You don’t even need full-blown family time — crossing over to your brother’s room for 5 minutes, visiting your mom in the kitchen, or checking on your half-dozing half-reading grandma is enough.</p><p>A short positive circuit breaker is all you need.</p>
            <h2>Reading Light Fiction</h2>
            <p>Reading has become synonymous with non-fiction, mainly self-help. But fiction is as if not <em>more</em> beneficial.</p>
            <p>While powerful characters and storylines with profound messages transform you from deep within, light-upbeat stories cure the darkest of moods and worries.</p>
            <p>So much so that “<em>Bibliotherapy</em>” or reading therapy is actively used to reduce mental health issues.</p><p>My go-to is fantasy fiction — when you’re teleported to surreal worlds, mundane earth’s vagaries disappear. My top 4 picks would be The Emperor’s Soul, The Final Empire, Assassin’s Apprentice, and Lord Of The Rings.</p>
            <blockquote>“A reader lives a thousand lives before he dies. The man who never reads lives only one.” <br /> — <a href="https://www.goodreads.com/quotes/408441-a-reader-lives-a-thousand-lives-before-he-dies-said" rel="noopener" target="_blank">George R.R Martin</a></blockquote><h2>Strumming Your Guitar</h2>
            <p>Don’t have one? Go for the keyboard. Classical much? The flute’s waiting for you. Have a lot of space to spare? A piano won’t complain.</p>
            <p>Listening to music is widely recommended as a leisure activity, but playing music puts it to shame — deeper empathy, higher self-esteem, better memory, sharper focus, and protection against age-related brain degeneration.</p>
            <p>One 6-month study whose subjects started learning the drums found white matter tract improvements—the brain parts that control the speed of neural transmission. Another linked long-term playing to significant positive neural changes. There are tons of other studies as well.</p>
            <p>This is as much a reminder to brush the dust off my guitar as it is a piece of advice for you. Now that I’m done with this article, let me go strum some strings.</p>
            <blockquote>“Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.”</blockquote> */}
          </div>

          <div className="flex justify-center mb-7 mt-7"><a className="px-5 py-2 text-sm text-blue-600 rounded-full bg-brand-secondary/20 dark:text-blue-500 " href="/">← View all posts</a></div>
          <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <div className="flex flex-wrap items-start sm:flex-nowrap sm:space-x-6">
              <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
                <a href="/author/joshua-wood">
                  <img alt="Joshua Wood" loading="lazy" decoding="async" data-nimg="fill" className="object-cover rounded-full" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} sizes="96px" srcSet="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=16&amp;q=75 16w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=32&amp;q=75 32w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=48&amp;q=75 48w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=64&amp;q=75 64w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=96&amp;q=75 96w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=128&amp;q=75 128w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=256&amp;q=75 256w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=384&amp;q=75 384w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=640&amp;q=75 640w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=750&amp;q=75 750w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=828&amp;q=75 828w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1080&amp;q=75 1080w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1200&amp;q=75 1200w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=1920&amp;q=75 1920w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=2048&amp;q=75 2048w, /_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75 3840w" src="/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fcijrdavx%2Fproduction%2Fcd477178ed12f28ef668adaf9fcae6b8fc351a08-4480x6415.jpg%3Frect%3D0%2C0%2C4480%2C3760%26w%3D2000%26auto%3Dformat&amp;w=3840&amp;q=75" />
                </a>
              </div>
              <div>
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">About Joshua Wood</h3>
                </div>
                <div>
                  <p>Joshua is a Microsoft Azure Certified Cloud Professional and a Google Certified Associate Cloud Engineer. A Data Analytics at Acme, specializing in the use of cloud infrastructure for Machine Learning and Deep Learning operation at scale.</p></div>
                <div className="mt-3">
                  <a className="py-2 text-sm text-blue-600 rounded-full bg-brand-secondary/20 dark:text-blue-500 " href="/author/joshua-wood">View Profile</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={articleBreadcrumbSchema} />
      <ScrollProgress />
      <main className={cn("w-full", "relative flex flex-col flex-1 min-h-screen px-6")}>
        <div className="max-w-[970px] w-full mx-auto">
          <section id="header">
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
          </section>
          <section id="content" className={
            cn(
              "max-w-2xl",
              'flex flex-col gap-4 mt-20 relative',
            )
          }>
            <div id="articleHeader" className="flex flex-col">
              <h1 className={cn(
                "text-5xl lg:text-6xl",
                heroFont.className,
                "text-charkol",
              )}>{post.name}</h1>
              <div className="articleInfo">
                <p itemProp="description" className="text-obsidian-400">{post.snippet ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsa omnis ratione"} </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-charkol">
              <Image src={'/headshot.jpeg'} width={600} height={600} priority className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />

              <div className="flex flex-wrap items-start justify-start gap-1 text-xs">
                <div className="flex flex-wrap gap-1 uppercase">
                  by <span className='text-amethyst-500'>{post.author?.name ?? "Enric Trillo "}</span>
                  <span> /</span>
                </div>
                <div className="relative flex items-start justify-start gap-1 uppercase">
                  <time dateTime={post.publishedAt}>
                    {convertDate(post?.publishedAt, { month: "long" })} {new Date(post.publishedAt).toLocaleTimeString("en-GB", { timeStyle: "short", hourCycle: "h12" })}
                  </time>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image src={post.image ? post.image : `/base-og.png`} className={"w-full object-cover aspect-video"} alt={`${post.name} by Enric Trillo, founder of Metasyde`} width={1200} height={630} />
            </div>
            <article className={styles.bloggo}>
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
            </article>
          </section>
          <CTA />
          <Tags post={post} />
          {/* <Share post={post} /> */}
          <Navigation prevPost={prevArticle} nextPost={nextArticle} />
          <div className="flex-col hidden mt-20">
            <StickyCard>
              <div className="">
                X ways I can help you
              </div>
            </StickyCard>
          </div>
        </div>
      </main>
    </>
  )
};