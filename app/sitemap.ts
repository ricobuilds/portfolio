import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";

type Sitemap = Array<{
  url: string
  lastModified?: string | Date
}>

const listOfRoutes = [
  routes.home,
  routes.about,
  routes.newsletter,
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const baseRoutes: Sitemap = listOfRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [
    ...baseRoutes
  ]
}