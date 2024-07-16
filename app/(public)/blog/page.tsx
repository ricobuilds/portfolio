import { Metadata } from "next"
import { routes } from "@/lib/routes"
import { siteMetadata } from "@/lib/site.metadata"
import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import { baseWidth } from "@/lib/config"
import { MDXArticle } from "@/app/types/Article"
import Image from "next/image"
import { BreadcrumbList, WithContext, Blog as BlogSchema} from "schema-dts"
import { StructuredData } from "@/components/structured-data"
import { formatTag, getAllPosts } from "@/lib/mdx"

const title = 'Blog'
const description = "Articles to share my thoughts, technical breakdowns and learnings on web development, artificial intelligence, machine learning and more."
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: siteMetadata.siteUrl + routes.journal
  },
  openGraph: {
    title,
    description,
    locale: 'en_GB',
    type: 'website',
    images: `/base-og.png`,
    url: siteMetadata.siteUrl + routes.journal,
    siteName: 'Enric Trillo',
  },
  twitter: {
    creator: '@ricobuilds',
    card: 'summary_large_image',
    description,
    site: 'https://enrictrillo.com',
    title,
    images: `/base-og.png`,
  },
  robots: "index, follow"
}

function formatSixArticles(posts: MDXArticle[]) {
  const fortmattedSixArticles = posts.map((post) => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": siteMetadata.title
    },
    "image": siteMetadata.siteUrl + `/og?title=${post.title}`,
    "publisher": {
      "@type": "Organization",
      "name": "Metasyde",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mysite.com/path-to-logo-image.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": siteMetadata.siteUrl + "/blog/" + post.slug
    }
  }))

  return fortmattedSixArticles
}

export const revalidate = 3600 // revalidate at most every hour

export default async function Blog() {

  const posts: MDXArticle[] = getAllPosts()

  const schema: WithContext<BlogSchema> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog",
    "description": "Stay updated with the latest articles on Web3 Gaming and the Metaverse.",
    "url": siteMetadata.siteUrl + "/blog",
    // @ts-ignore
    "mainEntity": formatSixArticles(posts)
  }

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
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
        "item": siteMetadata.siteUrl + "/blog"
      },
    ]
  }

  return (
    <>
      <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} />
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Blog ({posts.length})</h1>
            {
              posts.length > 0 ? (
                <ul className="grid w-full gap-8 md:grid-cols-2">
                  {
                    posts.map((post) => (
                      <li key={post.slug}>
                        <div className="group flex flex-col gap-3 active:scale-[0.98] outline-none w-full">
                          <Link href={`/blog/${post.slug}`} className="w-full transition-all duration-300 ring-0 group-hover:ring-2 rounded-2xl group-hover:ring-amethyst-500 ring-offset-2">
                            <Image src={"/blog-og.png"} height={1200} width={630} alt={post.title as string} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:grayscale" />
                          </Link>
                          <div className="flex flex-col gap-2 px-2">
                            <Link href={`/topic/${formatTag(post.tags?.[0]) ?? "ai"}`} className="text-[10px] w-fit uppercase text-amethyst-500">
                              {post.tags?.[0] ?? "Artificial Intelligence"}
                            </Link>
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="font-sans font-semibold hover:text-amethyst-500">{post.title}</h3>
                            </Link>
                            <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author?.name ?? "Enric Trillo"}</span>  / <span>{convertDate(post.date as string, { month: "long" })}</span></p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
                // <div className="relative -mx-3">
                //   {
                //     // @ts-ignore
                //     articles.sort((a, b) => (new Date(b.publishedAt) - new Date(a.publishedAt))).map((item: Article, idx: number) => (
                //       <div key={idx} className="flex flex-col flex-1 w-full">
                //         <Link href={item.url ? item.url : `/blog/${item.slug}`} scroll={false} className="flex items-center justify-between w-full gap-2 px-3 py-2 rounded-lg group hover:bg-slate-100">
                //           <p className="text-lg font-medium underline group-hover:text-slate-600 group-hover:decoration-slate-600">{item.name}</p>
                //           <p className="flex flex-col">
                //             <small className="font-light text-obsidian-600">{convertDate(item.publishedAt)}</small>
                //           </p>
                //         </Link>
                //       </div>
                //     ))
                //   }
                // </div>
              ) : <p>No posts here... yet.</p>
            }
          </div>
        </div>
      </main>
    </>
  )
  return (
    <main className="w-full px-4">
      <div className="w-full mx-auto baseWidth">
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