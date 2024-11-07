import { Schema, SchemaField, SDK } from "@/lib/sdk"

async function main() {
let x = SDK.utility.updatedCollectionMetadata('blog')
  console.log("listCollections: ", x)
}

main().catch((err) => {
  console.error('An error occurred while generating tags:', err)
  process.exit(1)
})