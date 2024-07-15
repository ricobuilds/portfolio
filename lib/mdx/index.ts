import fs from 'fs';
import path from 'path';
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

const root = process.cwd();

const content_path = path.join(root, 'content')

export const allSlugs = fs.readdirSync(content_path)

export const extractSlug = (slug: string) => slug.replace(/\.mdx$/, '')

export const getPostBySlug = async (slug: string) => {
  const postFilePath = path.join(content_path, `${slug}.mdx`);

  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content)

  const frontMatter = {
    ...data,
    slug
  }

  return {
    source: mdxSource,
    frontMatter
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
}