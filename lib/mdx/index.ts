import fs from 'fs';
import path from 'path';
import matter from "gray-matter"
import { MDXArticle } from '@/app/types/Article';

const root = process.cwd();

export const allSlugs = fs.readdirSync(path.join(root, 'content', 'blog')).filter((file) => path.extname(file) === '.mdx')

export const extractSlug = (slug: string) => slug.replace(/\.mdx$/, '')

export const formatTag = (tag: string) => tag.toLowerCase().replace(' ', '-')

export const getPostBySlug = async (slug: string) => {
  const postFilePath = path.join(root, 'content', 'blog', `${slug}.mdx`);

  const source = fs.readFileSync(postFilePath)

  const { content, data } = await matter(source)

  const { title, date, description, tags, author, youtube } = data

  return {
    slug,
    title,
    date,
    description,
    tags,
    author,
    youtube,
    content: content,
  }
}

export const getPostsByTag = async (tag: string) => {
  const allPosts: MDXArticle[] = getAllPosts()

  const filtered = allPosts.filter((p) => p.tags.includes(tag))

  return filtered
}

export const generateTags = (allPosts: MDXArticle[]) => {
  const tags: Record<string, number> = {}
  allPosts.forEach((p) => {
    if (p.tags) {
      p.tags.forEach((tag) => {
        const formattedTag = formatTag(tag)
        if (formattedTag in tags) {
          tags[formattedTag] += 1
        } else {
          tags[formattedTag] = 1
        }
      })
    }
  })
  fs.writeFileSync(path.join(root, 'tag-data.json'), JSON.stringify(tags))
}

export const getAllPosts = () => {
  const frontMatter: any[] = []

  allSlugs.forEach((slug: string) => {
    const source = fs.readFileSync(path.join(root, 'content', 'blog', slug), 'utf-8')

    const { data } = matter(source)
    
    if (Object.keys(data).length <= 0) {
      return {
        error: "The file has been corrupted"
      }
    }

    frontMatter.push({
      ...data,
      slug: extractSlug(slug),
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
    })
  })

  // @ts-ignore
  return frontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}

const dateSortDesc = (a: any, b: any) => {
  if (a > b) return -1
  if (a < b) return 1

  return 0
}