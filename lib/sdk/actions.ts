import Modox from "../modox/index";
import { Bucket } from "../modox/types";

export async function fetchCollections() {
  const collections = Modox.bucket.list().map(c => {
    return {
      name: c.name,
      count: Modox.content.list(c).length
    }
  })
  return collections
}

export async function fetchDocuments(collectionName: string) {
  const bucket = Modox.bucket.get(collectionName)
  const documents = Modox.content.list(bucket as Bucket)
  return documents
}