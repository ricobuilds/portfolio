import fs from 'fs';
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

// Bucket operations
export async function createBucket(name: string): Promise<Bucket> {
  const bucketPath = path.join(process.cwd(), 'content', name);
  fs.mkdirSync(bucketPath);
  return { name, path: bucketPath };
}

export async function listBuckets(): Promise<Bucket[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const buckets = fs.readdirSync(contentDir);
  return buckets.map(name => ({ name, path: path.join(contentDir, name) }));
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
  const filePath = path.join(bucket.path, `${slug}.md`);
  await fs.writeFileSync(filePath, fileContent);
  return { slug, content, frontmatter: validatedFrontmatter };
}

export async function readContent<T extends z.ZodType>(
  bucket: Bucket,
  slug: string,
  schema: T
): Promise<Content<T>> {
  const filePath = path.join(bucket.path, `${slug}.md`);
  const fileContent = await fs.readFileSync(filePath, 'utf-8');
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
  const filePath = path.join(bucket.path, `${slug}.md`);
  await fs.writeFileSync(filePath, fileContent);
  return { slug, content, frontmatter: validatedFrontmatter };
}

export async function deleteContent(bucket: Bucket, slug: string): Promise<void> {
  const filePath = path.join(bucket.path, `${slug}.md`);
  await fs.unlinkSync(filePath);
}

export async function listContent<T extends z.ZodType>(
  bucket: Bucket,
  schema: T
): Promise<Content<T>[]> {
  const files = await fs.readdirSync(bucket.path);
  const contentPromises = files
    .filter(file => file.endsWith('.md'))
    .map(async file => {
      const slug = path.basename(file, '.md');
      return readContent(bucket, slug, schema);
    });
  return Promise.all(contentPromises);
}