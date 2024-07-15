import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";
import { Article } from "./types/Article";
import { Topic } from "./types/Topic";
import { Term } from "./types/Term";
import { sanityQuery } from "@/lib/sanity/utils";

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

  const topics: Topic[] = await sanityQuery(`*[_type == "topic"]{
    "slug": slug.current,
    _updatedAt,
    _createdAt
  }`)

  const articles: Article[] = await sanityQuery(`*[_type == "article"]{
    "slug": slug.current,
    _updatedAt,
    publishedAt
  }`)

  const terms: Term[] = await sanityQuery(`*[_type == "term"]{
    "slug": slug.current,
    _updatedAt,
    _createdAt
  }`)

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // const topicRoutes: Sitemap = topics.map((topic) => ({
  //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/topic/${topic.slug}`,
  //   lastModified: new Date((topic?._updatedAt ?? topic?._createdAt) as string).toISOString().split('T')[0],
  // }))

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
    ...articleRoutes,
    ...termRoutes
  ]
}