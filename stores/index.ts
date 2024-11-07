import { create } from 'zustand'
import { Bucket, Record, ImportMode } from "./types";

const useUIStore = create((set, get) => ({
  viewMode: true,
  toggleView: async () => {
    set((state: any) => ({viewMode: state.viewMode}))
  }
}))
const useImportStore = create((set, get) => ({
  file: {},
  documents: [],
  isProcessing: false,
  isImporting: false,
  progress: 0,
  mode: false 
}))