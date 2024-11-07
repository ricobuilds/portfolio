import path from 'path';
import matter from 'gray-matter';
import { promises as fs } from 'fs';

const root = process.cwd()

// bucket operations
function createBucket() { }
async function readBucket(name: string) {
  const bucketDir = path.join(root, 'content', name);
  if (!bucketDir) throw new Error(`Bucket ${name} not found`)
  const posts = await fs.readdir(bucketDir);
  return posts
}
async function readBuckets() {
  const contentDir = path.join(root, 'content');
  const buckets = await fs.readdir(contentDir);
  return buckets.map(name => ({ name, path: path.join(contentDir, name) }));
}

// post operations
function createPost() { }
function readPostbySlug(slug: string) { }
function readPosts() { }
function updatePost(slug: string) { }
function deletePost(slug: string) { }