import { routes } from "@/lib/routes";
import { fetchAllArticles, fetchTopics } from "@/lib/sanity/queries";
import { MetadataRoute } from "next";
import { Article } from "./types/Article";
import { Topic } from "./types/Topic";

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.home,
  routes.rss,
  routes.about,
  routes.journal,
  routes.subscribe,
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const topics: Topic[] = await fetchTopics()

  const articles: Article[] = await fetchAllArticles()

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const topicRoutes: Sitemap = topics.map((topic) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/topic/${topic.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const articleRoutes: Sitemap = articles.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article._updatedAt ?? article.publishedAt).toISOString().split('T')[0],
  }))

  return [
    ...baseRoutes,
    ...topicRoutes,
    ...articleRoutes,
  ]
}