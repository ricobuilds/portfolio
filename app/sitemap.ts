import { routes } from "@/lib/routes";
import { sanityQuery } from "@/lib/sanity/utils";
import { getAllArticles, getTopics } from "@/lib/sanity/queries";
import { MetadataRoute } from "next";
import { Article } from "./types/Article";
import { Topic } from "./types/Topic";

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.rss,
  routes.home,
  routes.about,
  routes.topics,
  routes.journal,
  routes.subscribe,
]

const getArticles = async () => {
  const articles: Article[] = await sanityQuery(getAllArticles)
  return articles
}

const getTags = async () => {
  const topics: Topic[] = await sanityQuery(getTopics)
  return topics
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const topics = await getTags()
  
  const articles = await getArticles()

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const topicRoutes: Sitemap = topics.map((topic) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/topics/${topic.slug}`,
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