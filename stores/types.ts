// types
type Bucket = {
  id: string
  name: string
  count: number
}

type Record = {
  id: string
  title: string
  slug: string
  date: string
  image?: string
}

type ImportMode = 'auto' | 'manual'

export type {
  Bucket,
  Record,
  ImportMode,
}