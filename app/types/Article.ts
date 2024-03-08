export type Article = {
  _id?: string
  title?: string
  slug?: string
  description?: string
  youtube_url?: string
  content?: any
  publishedAt?: string
  _updatedAt?: string
  _createdAt?: string
  headings?: Array<string>
  author?: {
    name: string
    slug: string
  },
  tag?: {
    title: string
    slug: string
  }
}