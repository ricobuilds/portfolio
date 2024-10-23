import { createBucket } from "@/lib/cms";

async function main() {
  const bucket = await createBucket('test-bucket')
  console.log('Test Bucket generated successfully', bucket)
}

main().catch((err) => {
  console.error('An error occurred while generating tags:', err)
  process.exit(1)
})