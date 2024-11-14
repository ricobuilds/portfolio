import { Schema, SchemaField } from '@/lib/sdk'
import { create } from 'zustand'

interface ISettingsStore {
  selectedField: SchemaField | null
  setSelectedField: (field: SchemaField) => void
  resetSelectedField: () => void
}

export const useSettingsStore = create<ISettingsStore>((set, get) => ({
  selectedField: null,
  setSelectedField: (field: SchemaField) => {
    set(({
      selectedField: field
    }))
  },
  resetSelectedField: () => {
    set(({
      selectedField: null
    }))
  }
}))