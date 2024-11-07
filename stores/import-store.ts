import { create } from 'zustand'

type Term = {
  original: string
  title: string
  slug: string
}

type Direction = "up" | "down"

interface ImportState {
  file: File | undefined
  terms: Term[]
  isProcessing: boolean
  isImporting: boolean
  importProgress: number
  importMode: boolean
  editingIndex: number | null
  editValue: string
  draggedIndex: number | null
  setFile: (file: File | undefined) => void
  setTerms: (terms: []) => void
  setIsProcessing: (isProcessing: boolean) => void
  setIsImporting: (isImporting: boolean) => void
  setImportProgress: (progress: number) => void
  setMode: (importMode: boolean) => void
  setEditingIndex: (index: number | null) => void
  setEditValue: (value: string) => void
  setDraggedIndex: (index: number | null) => void
  processTermsAuto: (text: string) => void
  processTermsManual: (text: string) => void
  removeDocument: (index: number) => void
  startEditing: (index: number) => void
  saveEdit: (index: number) => void
  moveDocument: (fromIndex: number, toIndex: number) => void
  resetProcessor: () => void
  moveItem: (index: number, direction: Direction) => void
}

export const useImportStore = create<ImportState>((set, get) => ({
  file: undefined,
  terms: [],
  isProcessing: false,
  isImporting: false,
  importProgress: 0,
  importMode: false,
  editingIndex: null,
  editValue: "",
  draggedIndex: null,
  setFile: (file) => set({ file }),
  setTerms: (terms) => set({ terms }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setIsImporting: (isImporting) => set({ isImporting }),
  setImportProgress: (importProgress) => set({ importProgress }),
  setMode: (importMode) => set({ importMode }),
  setEditingIndex: (editingIndex) => set({ editingIndex }),
  setEditValue: (editValue) => set({ editValue }),
  setDraggedIndex: (draggedIndex) => set({ draggedIndex }),
  processTermsAuto: (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    const processedTerms = lines.map(term => {
      const lowerTerm = term.toLowerCase()
      let title: string
      if (lowerTerm.startsWith('the ') || lowerTerm.endsWith('s')) {
        title = `What are ${term}?`
      } else if (/^[aeiou]/i.test(term)) {
        title = `What is an ${term}?`
      } else {
        title = `What is ${term}?`
      }
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return { original: term, title, slug }
    })
    set({ isProcessing: true })
    setTimeout(() => {
      set({ terms: processedTerms, isProcessing: false })
    }, 1500)
  },
  processTermsManual: (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '')
    set({ isProcessing: true })
    const processedTerms = lines.map(term => ({
      original: term,
      title: term,
      slug: term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }))
    setTimeout(() => {
      set({ terms: processedTerms, isProcessing: false })
    }, 1500)
  },
  removeDocument: (index) => {
    set((state) => ({
      terms: state.terms.filter((_, i) => i !== index)
    }))
  },
  startEditing: (index) => {
    const { terms, importMode } = get()
    set({
      editingIndex: index,
      editValue: importMode ? terms[index].original : terms[index].title
    })
  },
  saveEdit: (index) => {
    const { editValue, importMode } = get()
    if (editValue.trim()) {
      set((state) => ({
        terms: state.terms.map((doc, i) => {
          if (i === index) {
            const title = importMode ? editValue : editValue
            return {
              ...doc,
              original: importMode ? editValue : doc.original,
              title,
              slug: title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
            }
          }
          return doc
        }),
        editingIndex: null
      }))
    }
  },
  moveDocument: (fromIndex, toIndex) => {
    set((state) => {
      const newDocs = [...state.terms]
      const [removed] = newDocs.splice(fromIndex, 1)
      newDocs.splice(toIndex, 0, removed)
      return { terms: newDocs }
    })
  },
  resetProcessor: () => set({
    terms: [],
    file: undefined,
    importMode: false,
    isProcessing: false
  }),
  moveItem: (index, direction) => {
    const { terms } = get()
    if (direction === "up" && index > 0) {
      get().moveDocument(index, index - 1)
    } else if (direction === "down" && index < terms.length - 1) {
      get().moveDocument(index, index + 1)
    }
  }
}))