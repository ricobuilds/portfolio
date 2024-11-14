import { create } from 'zustand'

interface IDocumentStore {
  selectedDocument: string | null
  setSelectedDocument: () => void
}

export const useImportStore = create<IDocumentStore>((set, get) => ({
  selectedDocument: null,
  setSelectedDocument: () => {
    set(({
      selectedDocument: null
    }))
  }
}))