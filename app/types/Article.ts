export type Article = {
  _id: string
  name: string
  slug: string
  image: string
  snippet: string
  url: string
  content: any
  publishedAt: string
  _updatedAt: string
  _createdAt: string
  author: {
    name: string
    slug: string
  },
  tag: {
    title: string
    slug: string
  }
}