import { create } from 'zustand'

interface ISettingsStore {
  selectedField: string
  setSelectedField: (field: string) => void
  resetSelectedField: () => void
}

export const useSettingsStore = create<ISettingsStore>((set, get) => ({
  selectedField: '',
  setSelectedField: (field: string) => {
    set(({
      selectedField: field
    }))
  },
  resetSelectedField: () => {
    set(({
      selectedField: ''
    }))
  }
}))