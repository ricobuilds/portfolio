import { promises as fs } from 'fs'
import path from 'path';
import matter from 'gray-matter';

export type Bucket = {
  name: string
  path: string
}

export type Content<T> = {
  slug: string
  content: string
  frontmatter: T
}