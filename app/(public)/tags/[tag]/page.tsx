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
                        <div className="flex flex-col w-full gap-3 outline-none group">
                          <Link href={`/blog/${post.slug}`} className="w-full overflow-hidden duration-300 ring-0 rounded-2xl">
                            <Image src={"/blog-og.png"} height={1200} width={630} alt={post.title} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:scale-[1.03]" />
                          </Link>
                          <div className="flex flex-col gap-2 px-2">
                            <div className="flex gap-2">
                              {post.tags && post.tags.map((t, idx) => (
                                <Link key={idx} href={`/tags/${formatTag(t)}`} className="text-[10px] w-fit uppercase underline text-amethyst-500">
                                  {t}
                                </Link>
                              ))}
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="font-sans font-semibold">{post.title}</h3>
                            </Link>
                            <p className="text-sm line-clamp-1">{post.description}</p>
                            <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author}</span>  / <span>{convertDate(post.date, { day: "2-digit", month: "long", year: "numeric" })}</span></p>
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