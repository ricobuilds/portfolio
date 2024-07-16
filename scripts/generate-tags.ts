import { getAllPosts,generateTags } from '../lib/mdx'

async function main() {
  const allPosts = await getAllPosts()
  generateTags(allPosts)
  console.log('Tags generated successfully')
}

main().catch((err) => {
  console.error('An error occurred while generating tags:', err)
  process.exit(1)
})