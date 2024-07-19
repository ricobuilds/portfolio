import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import { baseWidth } from "@/lib/config"
import { MDXArticle } from "@/app/types/Article"
import Image from "next/image"
import { extractSlug, formatTag, getAllPosts } from "@/lib/mdx"
import { generateMetadata as genMetadata } from "@/lib/seo"
import data from "@/tag-data.json"
import { notFound } from "next/navigation"

export async function generateStaticParams() {

  const tags = Object.keys(data)

  return tags.map((slug) => ({
    tag: slug
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<any> {

  const tag = params.tag.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  const metadata = genMetadata({
    title: `${tag} Articles`,
    description: `The latest trends and developments I talk and write about around ${tag}`,
    keywords: "disruptive technology, full stack developer, blog, tech insights"
  })
  return metadata
}

export default async function Tag({ params }: { params: { tag: string } }) {

  const posts: MDXArticle[] = getAllPosts()
  const formattedTag = formatTag(params.tag)
  const filtered = posts.filter((p) => p.tags?.some(tag => formatTag(tag) === formattedTag))

  return (
    <>
      {/* <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} /> */}
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Posts tagged {`"${params.tag}"`}</h1>
            {
              filtered.length > 0 ? (
                <ul className="grid w-full gap-8 md:grid-cols-2">
                  {
                    filtered.map((post) => (
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
                            <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author}</span>  / <span>{convertDate(post.date as string, { month: "long" })}</span></p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ) : notFound()
            }
          </div>
        </div>
      </main>
    </>
  )
}