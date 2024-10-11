import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import data from "@/tag-data.json"

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.home,
  routes.about,
  routes.blog,
  routes.subscribe,
  routes.rss,
]

const posts = getAllPosts()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const blogRoutes: Sitemap = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate || post.date).toISOString().split('T')[0],
  }))

  const tagRoutes: Sitemap = Object.keys(data).map((tag) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${tag}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // const termRoutes: Sitemap = terms.map((term) => ({
  //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/glossary/${term.slug}`,
  //   lastModified: new Date((term?._updatedAt ?? term?._createdAt) as string).toISOString().split('T')[0],
  // }))

  return [
    ...baseRoutes,
    ...blogRoutes,
    ...tagRoutes,
    // ...termRoutes
  ]
}