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

// Bucket operations
export async function createBucket(name: string): Promise<Bucket> {
  const bucketPath = path.join(process.cwd(), 'content', name);
  await fs.mkdir(bucketPath, { recursive: true });
  return { name, path: bucketPath };
}

export async function listBuckets(): Promise<Bucket[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const buckets = await fs.readdir(contentDir);
  return buckets.map(name => ({ name, path: path.join(contentDir, name) }));
}