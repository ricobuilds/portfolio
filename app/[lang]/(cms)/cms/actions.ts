"use server"

import { SDK } from "@/lib/sdk"
import { naniteId } from "naniteid"
import { revalidatePath } from "next/cache"

export const handleCreateBucket = async (bucketName: string) => {
  await SDK.collection.createCollection(bucketName)
  await SDK.schema.createSchema(bucketName)
  revalidatePath("/cms")
}

export const handleDeleteBucket = async (bucketName: string) => {
  await SDK.collection.deleteCollection(bucketName)
  revalidatePath("/cms")
}

export const handleCreateDocument = async (collectionName: string, documentName: string) => {
  await SDK.document.createDocument(documentName)
  await SDK.utility.updatedCollectionMetadata(collectionName)
  revalidatePath("/cms")
}

export const handleImportDocument = async (collectionName: string, documentName: string, mode: 'auto' | 'manual') => {
  await SDK.document.importDocument(collectionName, documentName, mode)
  await SDK.utility.updatedCollectionMetadata(collectionName)
  revalidatePath("/cms")
}

export const handleDeleteDocument = async (collectionName: string, documentId: string) => {
  await SDK.document.deleteDocument(collectionName, documentId)
  await SDK.utility.updatedCollectionMetadata(collectionName)
  revalidatePath("/cms")
}

type ProcessImportParams = {
  lines: string[]
  mode: 'terms' | 'headlines'
  collection: string
}

export const processImport = async ({ lines, mode, collection }: ProcessImportParams) => {
  try {
    console.log("processing...")
    const documents = lines.map((line, idx) => {
      const title = mode === "terms"
        ? `What is ${line.trim()}`
        : line.trim()

      const slug = SDK.utility.slugify(title)

      return {
        id: naniteId(),
        title,
        slug,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        content: '',
      }
    })

    for (const doc of documents) {
      await SDK.document.createDocument(collection, doc)
    }
    revalidatePath("/cms")

  } catch (error) {
    console.error('Failed to process import:', error)
    throw new Error('Import failed')
  }
}