import React from "react"
import Link from "next/link"
import { MDXArticle } from "../types/Article"
import { cn, convertDate } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Image from "next/image"
import { routes } from "@/lib/routes"
import { formatTag, getAllPosts } from "@/lib/mdx"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

const POSTS_MAX = 5

const PostsList = ({ posts }: { posts: MDXArticle[] }) => {

  const slicedPostList = posts.slice(0, POSTS_MAX)
  return (
    <ul className="grid w-full gap-8 mt-10 md:grid-cols-6">
      {slicedPostList.map((post, idx) => (
        <li key={idx} className={`${idx < 2 ? 'md:col-span-3' : 'col-span-2'}`}>
          <div className="flex flex-col w-full gap-3 outline-none group">
            <Link href={`/blog/${post.slug}`} className="w-full overflow-hidden duration-300 ring-0 rounded-2xl">
              <Image src={"/blog-og.png"} height={1200} width={630} alt={post.title} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:scale-[1.03]" />
            </Link>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex gap-2">
                {post.tags && post.tags.map((t, idx) => (
                  <Link key={idx} href={`/topic/${formatTag(t)}`} className="text-[10px] w-fit uppercase underline text-amethyst-500">
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
      ))}
    </ul>
  )
}

export const Blog = async () => {

  const posts: MDXArticle[] = getAllPosts()

  return (
    <section id="writing" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center mx-auto text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Writing
      </h2>
      <p className="text-center text-obsidian-600">Check out my latest takes and tutorials.</p>
      <PostsList posts={posts} />
      <div className="flex mt-10">
        <Link href={routes.blog} className="flex mx-auto">
          <div className="flex items-center px-3 py-2 text-sm text-white rounded-full bg-charkol hover:bg-charkol/90">View All Posts</div>
        </Link>
      </div>
    </section >
  )
}