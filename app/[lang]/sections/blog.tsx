import React from "react"
import Link from "next/link"
import { MDXArticle } from "../../types/Article"
import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import { routes } from "@/lib/routes"
import { getAllPosts } from "@/lib/mdx"
import { BlogCard } from "../components/blog-card"


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
          <BlogCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export const Blog = async () => {

  const posts: MDXArticle[] = getAllPosts()

  // @ts-ignore
  if (posts.some(p => p.error)) {
    return 
  }

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