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
  topic?: {
    title: string
    slug: string
  }
}

export type MDXArticle = {
  slug: string
  title: string
  date: string
  description: string
  author: {
    name: string
    picture: string
  }
  og: {
    url: string
  }
}