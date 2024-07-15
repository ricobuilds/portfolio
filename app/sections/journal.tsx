import { sanityQuery } from "@/lib/sanity/utils"
import Link from "next/link"
import { Article, MDXArticle } from "../types/Article"
import { cn, convertDate } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Image from "next/image"
import { routes } from "@/lib/routes"
import { formatTag, getAllPosts } from "@/lib/mdx"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

const PostsList = ({ posts }: { posts: MDXArticle[] }) => {

  return (
    <ul className="grid w-full gap-8 mt-10 md:grid-cols-2">
      {posts.map((post, idx) => (
        <li key={idx}>
          <div className="flex flex-col w-full gap-3 outline-none group">
            <Link href={`/blog/${post.slug}`} className="w-full transition-all duration-300 ring-0 group-hover:ring-2 rounded-2xl group-hover:ring-amethyst-500 ring-offset-2">
              <Image src={"/blog-og.png"} height={1200} width={630} alt={post.title} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:grayscale" />
            </Link>
            <div className="flex flex-col gap-2 px-2">
              <Link href={`/topic/${formatTag(post.tags[0]) ?? "ai"}`} className="text-[10px] w-fit uppercase text-amethyst-500">
                {post.tags[0] ?? "Artificial Intelligence"}
              </Link>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-sans font-semibold hover:text-amethyst-500">{post.title}</h3>
              </Link>
              <p className="text-sm line-clamp-1">{post.description ?? "This is a lorem ipsum alternative since there's no bio for this post in the Sanity backend."}</p>
              <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author.name}</span>  / <span>{convertDate(post.date as string, { month: "long" })}</span></p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export const Journal = async () => {

  const articles: Article[] = await sanityQuery(`*[_type == "article"] | order(_createdAt desc)[0..2]{
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "topic": topic->{title, "slug": slug.current},
  }`)

  const posts: MDXArticle[] = getAllPosts()

  const showBlogs = true
  return (
    <section id="writing" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center mx-auto text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Writing
      </h2>
      <p className="text-center text-obsidian-600">Check out my latest takes and tutorials.</p>
      <PostsList posts={posts} />
      {/* {
        showBlogs ? (
          <ul className="grid w-full max-w-3xl grid-cols-3 gap-8 mx-auto mt-10">
            {
              articles.map((article, idx: number) => (
                <li key={idx} className="before:content-['≫'] flex w-full">
                  <div className="group flex items-center gap-3 active:scale-[0.98] outline-none w-full">
                    <div className="flex items-center w-full gap-2 px-2">
                      {article.topic?.slug ? <Link href={`/topic/${article.topic?.slug}`} className="text-[10px] w-fit px-2 py-1 uppercase hover:text-amethyst-500 border border-amethyst-500">
                        {article.topic?.title}
                      </Link> : <></>}
                      <Link href={`/blog/${article.slug}`} className="flex flex-1 ">
                        <h3 className="w-full font-sans font-semibold hover:text-amethyst-500">{article.title}</h3>
                      </Link>
                      <p className="uppercase text-[10px]"><span>{convertDate(article.publishedAt as string, { month: "numeric" })}</span></p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : <p className="pt-6">No posts here... yet.</p>
      } */}
      {
        showBlogs ? (
          <ul className="grid gap-8 mt-8 md:grid-cols-3">
            {
              articles.map((article, idx: number) => (
                <li key={idx}>
                  <div className="group flex flex-col gap-3 active:scale-[0.98] outline-none w-full">
                    <Link href={`/blog/${article.slug}`} className="w-full transition-all duration-300 ring-0 group-hover:ring-2 rounded-2xl group-hover:ring-amethyst-500 ring-offset-2">
                      <Image src={"/blog-og.png"} height={1200} width={630} alt={article?.title as string} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:grayscale" />
                    </Link>
                    <div className="flex flex-col gap-2 px-2">
                      <Link href={`/topic/${article.topic?.slug ?? "ai"}`} className="text-[10px] w-fit uppercase text-amethyst-500">
                        {article.topic?.title ?? "Artificial Intelligence"}
                      </Link>
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="font-sans font-semibold hover:text-amethyst-500">{article.title}</h3>
                      </Link>
                      <p className="text-sm line-clamp-1">{article.description ?? "This is a lorem ipsum alternative since there's no bio for this post in the Sanity backend."}</p>
                      <p className="uppercase text-[10px]">By <span className="text-slate-500">{article.author?.name ?? "Enric Trillo"}</span>  / <span>{convertDate(article.publishedAt as string, { month: "long" })}</span></p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : <p className="pt-6">No posts here... yet.</p>
      }
      <div className="flex mt-10">
        <Link href={routes.journal} className="flex mx-auto">
          <div className="flex items-center px-3 py-2 text-sm text-white rounded-full bg-charkol hover:bg-charkol/90">View All Posts</div>
        </Link>
      </div>
    </section >
  )
}