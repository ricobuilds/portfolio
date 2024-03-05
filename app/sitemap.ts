import { routes } from "@/lib/routes";
import { fetchAllArticles, fetchArticleSitemap, fetchTermSitemap, fetchTopicSitemap, fetchTopics } from "@/lib/sanity/queries";
import { MetadataRoute } from "next";
import { Article } from "./types/Article";
import { Topic } from "./types/Topic";
import { Term } from "./types/Term";

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.home,
  routes.about,
  routes.journal,
  routes.glossary,
  routes.rss,
  routes.subscribe,
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const topics: Topic[] = await fetchTopicSitemap()

  const articles: Article[] = await fetchArticleSitemap()

  const terms: Term[] = await fetchTermSitemap()

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const topicRoutes: Sitemap = topics.map((topic) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/topic/${topic.slug}`,
    lastModified: new Date((topic?._updatedAt ?? topic?._createdAt) as string).toISOString().split('T')[0],
  }))

  const articleRoutes: Sitemap = articles.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
    lastModified: new Date((article._updatedAt ?? article.publishedAt) as string).toISOString().split('T')[0],
  }))

  const termRoutes: Sitemap = terms.map((term) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/glossary/${term.slug}`,
    lastModified: new Date((term?._updatedAt ?? term?._createdAt) as string).toISOString().split('T')[0],
  }))

  return [
    ...baseRoutes,
    ...topicRoutes,
    ...articleRoutes,
    ...termRoutes
  ]
}