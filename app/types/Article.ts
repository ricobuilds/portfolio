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
  description: string
  date: string
  modifiedDate?: string
  tags: string[]
  author: string
  og?: {
    url: string
  }
  youtube?: {
    url: string
  }
  content: any
}