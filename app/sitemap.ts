import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.home,
  routes.about,
  routes.blog,
  routes.subscribe,
]

const posts = getAllPosts()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const blogRoutes: Sitemap = posts.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date).toISOString().split('T')[0],
  }))

  // const termRoutes: Sitemap = terms.map((term) => ({
  //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/glossary/${term.slug}`,
  //   lastModified: new Date((term?._updatedAt ?? term?._createdAt) as string).toISOString().split('T')[0],
  // }))

  return [
    ...baseRoutes,
    ...blogRoutes,
    // ...termRoutes
  ]
}