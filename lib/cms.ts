import {promises as fs} from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod'

export type Bucket = {
  name: string
  path: string
}

export type Content<T extends z.ZodType> = {
  slug: string;
  content: string;
  frontmatter: z.infer<T>;
}

const root = process.cwd();

// Bucket operations
export async function createBucket(name: string): Promise<Bucket> {
  const bucketPath = path.join(root, 'content', name);
  await fs.mkdir(bucketPath, { recursive: true });
  return { name, path: bucketPath };
}

export async function listBuckets(): Promise<Bucket[]> {
  const contentDir = path.join(root, 'content');
  const buckets = await fs.readdir(contentDir);
  return buckets.map(name => ({ name, path: path.join(contentDir, name) }));
}

export async function getAllPosts<T extends z.ZodType>(
  bucket: Bucket,
  schema: T
): Promise<Content<T>[]> {
  const files = await fs.readdir(bucket.path);
  const contentPromises = files
    .filter(file => file.endsWith('.mdx'))
    .map(async file => {
      const slug = extractSlug(file);
      return readContent(bucket, slug, schema);
    });
  
  const allPosts = await Promise.all(contentPromises);

  return allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

// Content operations
export async function createContent<T extends z.ZodType>(
  bucket: Bucket,
  slug: string,
  content: string,
  frontmatter: z.infer<T>,
  schema: T
): Promise<Content<T>> {
  const validatedFrontmatter = schema.parse(frontmatter);
  const fileContent = matter.stringify(content, validatedFrontmatter);
  const filePath = path.join(bucket.path, `${slug}.mdx`);
  await fs.writeFile(filePath, fileContent);
  return { slug, content, frontmatter: validatedFrontmatter };
}

export async function readContent<T extends z.ZodType>(
  bucket: Bucket,
  slug: string,
  schema: T
): Promise<Content<T>> {
  const filePath = path.join(bucket.path, `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { content, data } = matter(fileContent);
  const validatedFrontmatter = schema.parse(data);
  return { slug, content, frontmatter: validatedFrontmatter };
}

export async function updateContent<T extends z.ZodType>(
  bucket: Bucket,
  slug: string,
  content: string,
  frontmatter: Partial<z.infer<T>>,
  schema: T
): Promise<Content<T>> {
  const existingContent = await readContent(bucket, slug, schema);
  const updatedFrontmatter = { ...existingContent.frontmatter, ...frontmatter };
  const validatedFrontmatter = schema.parse(updatedFrontmatter);
  const fileContent = matter.stringify(content, validatedFrontmatter);
  const filePath = path.join(bucket.path, `${slug}.mdx`);
  await fs.writeFile(filePath, fileContent);
  return { slug, content, frontmatter: validatedFrontmatter };
}

export async function deleteContent(bucket: Bucket, slug: string): Promise<void> {
  const filePath = path.join(bucket.path, `${slug}.mdx`);
  await fs.unlink(filePath);
}

export async function listContent<T extends z.ZodType>(
  bucket: Bucket,
  schema: T
): Promise<Content<T>[]> {
  const files = await fs.readdir(path.join(root, 'content', bucket.name))
  if (files.length < 0) {
    return []
  }
  const conten = files
    .filter((file) => path.extname(file) === '.mdx')
    .map(async file => {
      const slug = path.basename(file, '.mdx');
      return readContent(bucket, slug, schema);
    });
  return Promise.all(conten);
}

// utility functions
export function createFrontmatterSchema<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape);
}
export const extractSlug = (slug: string) => slug.replace(/\.mdx?$/, '');
export const formatTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, '-');