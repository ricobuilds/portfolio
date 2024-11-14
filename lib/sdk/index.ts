import matter from 'gray-matter'
import path from 'path';
import fs, { rmdirSync } from 'fs';
import { naniteId } from 'naniteid'
import { capitalise } from '../shared-utils';

export type FieldType =
  | "id"
  | "text"
  | "rich-text"
  | "number"
  | "date"
  | "boolean"
  | "status"
  | "list"
  | "url"
  | "slug"
  | "image"
  | "relation"

export type SchemaField = {
  name: string
  label: string;
  type: FieldType
  required?: boolean
  mutable?: boolean
  // default?: boolean
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: string[];
  };
}

export type Schema = {
  name: string
  fields: SchemaField[]
}

type Metadata = {
  name: string;
  created: string;
  updated: string;
  files: number;
}

export type BaseDocument = {
  id: string
  title: string
  slug: string
  created: Date
  updated: Date
  content: string
}

export type GenerateDocumentType<T extends Schema> = BaseDocument & {
  [K in T['fields'][number]['name']]: T['fields'][number] extends { name: K, type: infer Type }
  ? Type extends 'text' | 'rich-text' | 'url' | 'slug' | 'image' | 'relation'
  ? string
  : Type extends 'number'
  ? number
  : Type extends 'boolean'
  ? boolean
  : Type extends 'date'
  ? Date
  : Type extends 'list'
  ? any[]
  : Type extends 'status'
  ? string
  : never
  : null
}

export type MDXDocument = {
  id?: string;
  content: string;
  [key: string]: any;
}

const ROOT = process.cwd()

// workspace
function createWorkspace() {
  try {
    const workspace = path.join(ROOT, 'content')
    if (!fs.existsSync(workspace)) {
      fs.mkdirSync(workspace)
    }
  } catch (error) {
    return {
      message: `Error: ${error}`
    }
  }
}
function getWorkspace(): boolean {
  const workspace = path.join(ROOT, 'content')
  if (fs.existsSync(workspace)) {
    return true
  }
  return false
}
function deleteWorkspace() {
  const workspace = path.join(ROOT, 'content')
  if (fs.existsSync(workspace)) {
    fs.rmSync(workspace, { recursive: true })
  }
}

// schemas
function createSchema(collectionName: string, customFields: SchemaField[] = []) {
  const SCHEMA_DIR = path.join(ROOT, 'schemas')
  const schemaPath = path.join(SCHEMA_DIR, `${collectionName}.json`);
  const defaultFields: SchemaField[] = [
    { name: "id", label: "ID", type: "id", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "slug", required: true },
    { name: "created", label: "Created", type: "date", required: true },
    { name: "updated", label: "Updated", type: "date", required: true, },
  ]

  const schema = {
    name: collectionName,
    fields: [...defaultFields, ...customFields]
  }

  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
}
function getSchema(collectionName: string): Schema | { message: string } {
  const schemaPath = path.join(ROOT, 'schemas', `${collectionName}.json`)
  if (!fs.existsSync(schemaPath)) {
    return { message: `Bucket "${collectionName}" doesn't exist` }
  }
  const schema: Schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))

  return schema
}
function updateSchema(collectionName: string, newFields: Partial<Schema>) { }
function deleteSchema(collectionName: string) {
  const SCHEMA_DIR = path.join(ROOT, 'schemas')
  const schemaPath = path.join(SCHEMA_DIR, `${collectionName}.json`)
  if (!fs.existsSync(schemaPath)) {
    return { message: `Bucket "${schemaPath}" doesn't exist` }
  }
  fs.rmSync(schemaPath, { recursive: true, force: true })
}
function validateSchema(schema: Schema) { }
function listAllSchemas() {
  const SCHEMA_DIR = path.join(ROOT, 'schemas')
  const allSchemas = fs.readdirSync(SCHEMA_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .filter(file => file.name.endsWith('.mdx'))
    .map((col) => col.name)

  return allSchemas
}

// collections
function createCollection(collectionName: string) {
  const COLLECTION_DIR = path.join(ROOT, 'content', collectionName)
  if (fs.existsSync(COLLECTION_DIR)) {
    return { message: "This collection already exists" }
  }
  fs.mkdirSync(COLLECTION_DIR, { recursive: true })
  createSchema(collectionName)
  return { message: `Created collection "${collectionName}" successfully` }
}
function getCollection(collectionName: string): Metadata | null {
  const METADATA_DIR = path.join(ROOT, 'content', collectionName, 'metadata.json')
  if (!fs.existsSync(METADATA_DIR)) {
    createCollectionMetadata(collectionName)
  }
  if (fs.existsSync(METADATA_DIR)) {
    return JSON.parse(fs.readFileSync(METADATA_DIR, 'utf8'))
  }
  return null
}
function listCollections(): string[] {
  const COLLECTIONS_DIR = path.join(ROOT, 'content')
  const allCollections = fs.readdirSync(COLLECTIONS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map((col) => col.name)

  return allCollections
}
function deleteCollection(collectionName: string) {
  const bucketPath = path.join(ROOT, 'content', collectionName);
  if (!fs.existsSync(bucketPath)) {
    return { message: `Bucket "${collectionName}" doesn't exist` }
  }
  fs.rmSync(bucketPath, { recursive: true, force: true })
  deleteSchema(collectionName)
  deleteTypesFile(collectionName)
}
function renameCollection(oldCollectionName: string, newCollectionName: string) { }

// documents
function createDocument(collectionName: string, fields?: MDXDocument) {
  const DOCUMENT_DIR = path.join(ROOT, 'content', collectionName)
  const slugifiedTitle = slugify(fields?.title)
  const filePath = path.join(DOCUMENT_DIR, `${slugifiedTitle}.mdx`);

  const frontmatter = {
    title: fields?.title,
    slug: slugifiedTitle,
    created: fields?.frontmatter?.created || new Date().toISOString(),
    updated: fields?.frontmatter?.updated || new Date().toISOString(),
  }
  const fileContent = matter.stringify(fields?.content as string || "", frontmatter);
  fs.writeFileSync(filePath, fileContent);
  updatedCollectionMetadata(collectionName)
}
// createDocument('blog', 'How to get started with Phidata agents', { name: "", content: "" })
async function importDocument(collectionName: string, text: string, mode: 'auto' | 'manual') {
  const lines = text.split('\n').filter(line => line.trim() !== '')
  const errors: string[] = []
  let created = 0

  for (const line of lines) {
    try {
      const document = mode === 'auto' ? autoFormatDocument(line) : manualFormatDocument(line)
      await createDocument(collectionName, document.name)
      created++
    } catch (error: any) {
      errors.push(`Error creating document for "${line}": ${error.message}`)
    }
  }

  return { created, errors }
}

function autoFormatDocument(term: string): MDXDocument {
  const lowerTerm = term.toLowerCase()
  let title: string

  if (lowerTerm.startsWith('the ') || lowerTerm.endsWith('s')) {
    title = `What are ${term}?`
  } else if (/^[aeiou]/i.test(term)) {
    title = `What is an ${term}?`
  } else {
    title = `What is ${term}?`
  }

  return {
    name: title,
    content: `# ${title}\n\nAdd your content here.`,
    frontmatter: {
      id: naniteId,
      title: title,
      slug: slugify(title),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    }
  }
}

function manualFormatDocument(term: string): MDXDocument {
  return {
    name: term,
    content: `# ${term}\n\nAdd your content here.`,
    frontmatter: {}
  }
}

function getDocument(collectionName: string, documentId: string) {
  const DOCUMENT_DIR = path.join(ROOT, 'content', collectionName)
  const documentPath = path.join(DOCUMENT_DIR, `${documentId}.mdx`)
  const file = fs.readFileSync(documentPath, 'utf8')
  const { data, content: markdownContent } = matter(file)
  return {
    ...data as MDXDocument,
    content: markdownContent,
  }
}
function updateDocument(collectionName: string, documentId: string, newData: Partial<Schema>) { }
function deleteDocument(collectionName: string, documentId: string) {
  const DOCUMENT_DIR = path.join(ROOT, 'content', collectionName)
  const documentPath = path.join(DOCUMENT_DIR, `${documentId}.mdx`)
  if (!fs.existsSync(documentPath)) {
    return { message: (`File "${documentPath}" doesn't exist`) };
  }
  fs.rmSync(documentPath, { recursive: true, force: true })
}
function listDocuments(collectionName: string) {
  const COLLECTION_DIR = path.join(ROOT, 'content', collectionName)
  return fs.readdirSync(COLLECTION_DIR)
    .filter(file => file.endsWith('.mdx'))
    .map(slug => {
      const filePath = path.join(COLLECTION_DIR, slug)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content: markdownContent } = matter(fileContent)
      return {
        name: data.title,
        slug: slug.replace('.mdx', ''),
        frontmatter: data,
        content: markdownContent
      }
    })
}

// frontmatter
function generateFrontmatter(schema: Schema, documentData: MDXDocument) { }
function parseFrontmatter(markdown: string) {
  const { data, content } = matter(markdown)
  return { frontmatter: data, content };
}
function updateFrontmatter(markdown: string, newFrontmatter: string) { }
function validateFrontmatter(frontmatter: string, schema: Schema) { }

// utility
function convertSchemaToFrontmatterTemplate(schema: Schema) { }
function toCamelCase(str: string): string {
  return str
    .split(" ")
    .map((word, idx) => {
      if (idx === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

function generateTypeScriptTypes(collectionName: string, schema: Schema): string {
  const typeMap: { [key: string]: string } = {
    'id': 'string',
    'text': 'string',
    'rich-text': 'string',
    'boolean': 'boolean',
    'date': 'Date',
    'array': 'any[]',
    'object': 'Record<string, any>',
    'url': 'string',
    'slug': 'string',
    'image': 'string',
    'relation': 'string', // Assuming relation is stored as an ID
  };

  const fields = schema.fields.map((field) => {
    const type = typeMap[field.type] || 'any';
    return `  ${field.name}${field.required ? '' : '?'}: ${type};`;
  });

  return `export interface ${capitalise(collectionName)} {
${fields.join('\n')}
}`;
}

export async function generateTypesFile(collectionName: string): Promise<void> {
  const schemaPath = path.join(ROOT, 'schemas')
  const schema = await getSchema(collectionName);
  const typesContent = generateTypeScriptTypes(collectionName, schema as Schema);
  const typesPath = path.join(schemaPath, `${collectionName}.types.ts`);
  await fs.writeFileSync(typesPath, typesContent);
}
function deleteTypesFile(collectionName: string) {
  const TYPES_DIR = path.join(ROOT, 'schemas')
  const typesPath = path.join(TYPES_DIR, `${collectionName}.types.ts`)
  if (!fs.existsSync(typesPath)) {
    return { message: (`File "${typesPath}" doesn't exist`) };
  }
  fs.rmSync(typesPath, { recursive: true, force: true })
}
function createCollectionMetadata(collectionName: string): void {
  const bucketPath = path.join(ROOT, 'content', collectionName)
  const metadataPath = path.join(bucketPath, 'metadata.json')
  const contentFiles = fs.readdirSync(bucketPath).filter(file => file.endsWith(".mdx"))
  const metadata = {
    "name": (collectionName).toLowerCase(),
    "created": fs.statSync(bucketPath).birthtime.toISOString(),
    "updated": new Date().toISOString(),
    "files": contentFiles.length,
  }

  // @ts-ignore
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), (err) => {
    if (err) {
      console.error(`Error creating "${collectionName}" metadata:`, err);
    } else {
      console.log(`Created "${collectionName}" schema successfully!`);
    }
  });
}

function updatedCollectionMetadata(collectionName: string): void {
  const collectionPath = path.join(ROOT, 'content', collectionName)
  const metadataPath = path.join(collectionPath, 'metadata.json')
  const documentCount = fs.readdirSync(collectionPath).filter(file => file.endsWith(".mdx")).length
  const metadata: Metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
  if (documentCount === metadata.files) {
    return
  }

  metadata.files = documentCount

  // @ts-ignore
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), (err) => {
    if (err) {
      console.error(`Error creating "${collectionName}" metadata:`, err);
    } else {
      console.log(`Created "${collectionName}" schema successfully!`);
    }
  });
}

function getCollectionMetadata(collectionName: string): Metadata {
  const metadataPath = path.join(ROOT, 'content', collectionName, 'metadata.json')
  const metadata = fs.readFileSync(metadataPath, 'utf8')
  return JSON.parse(metadata)
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

export const SDK = {
  schema: {
    createSchema,
    getSchema,
    updateSchema,
    deleteSchema,
    validateSchema,
    listAllSchemas,
  },
  collection: {
    createCollection,
    getCollection,
    listCollections,
    deleteCollection,
    renameCollection,
  },
  document: {
    createDocument,
    importDocument,
    getDocument,
    updateDocument,
    deleteDocument,
    listDocuments,
  },
  frontmatter: {},
  utility: {
    slugify,
    toCamelCase,
    createCollectionMetadata,
    updatedCollectionMetadata,
    getCollectionMetadata,
    generateTypesFile,
  },
}