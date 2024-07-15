import fs from 'fs';
import path from 'path';
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import { MDXArticle } from '@/app/types/Article';

const root = process.cwd();

const content_path = path.join(root, 'content')

export const allSlugs = fs.readdirSync(content_path).filter((file) => path.extname(file) === '.mdx')

export const extractSlug = (slug: string) => slug.replace(/\.mdx$/, '')

export const formatTag = (tag: string) => tag.toLowerCase().replace(' ', '-')

export const getPostBySlug = async (slug: string) => {
  const postFilePath = path.join(content_path, `${slug}.mdx`);

  const source = fs.readFileSync(postFilePath)

  const { content, data } = await matter(source)

  const { title, date, description, tags, author, youtube } = data

  console.log(`bits: `, {
    slug,
    data,
    source: content,
  })

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

export const getAllPosts = () => {
  const frontMatter: any[] = []

  allSlugs.forEach((slug: string) => {
    const source = fs.readFileSync(path.join(content_path, slug), 'utf-8')

    const { data } = matter(source)

    frontMatter.push({
      ...data,
      slug: extractSlug(slug),
      date: new Date(data.date).toISOString()
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