import { cn, convertDate } from "@/lib/shared-utils"
import Link from "next/link"
import { baseWidth } from "@/lib/config"
import { MDXArticle } from "@/app/types/Article"
import Image from "next/image"
import { formatTag, getAllPosts } from "@/lib/mdx"
import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: 'Blog',
  description: "Sharing my thoughts, personal experiences and what I learn as a Fullstack Developer – covering many topics including fullstack development, AI development, gaming and more.",
  keywords: "disruptive technology, full stack developer, blog, tech insights"
})

export default async function Blog() {

  const posts: MDXArticle[] = getAllPosts()

  return (
    <>
      {/* <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} /> */}
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
                            <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author}</span>  / <span>{convertDate(post.date as string, { month: "long" })}</span></p>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ) : <p>No posts here... yet.</p>
            }
          </div>
        </div>
      </main>
    </>
  )
}