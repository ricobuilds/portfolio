import { allSlugs } from "@/lib/mdx"
import { RemixiconComponentType, RiArrowRightUpLine, RiCalendarLine, RiHashtag, RiKeyLine, RiLoader2Line, RiMarkdownLine, RiText, RiTimeLine, RiToggleLine } from "@remixicon/react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type UIMode = "view" | "select"

type SortDirection = 'asc' | 'desc'

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

export interface SchemaField {
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

export interface Schema {
  [key: string]: SchemaField
}

interface UIStore {
  bucket: string
  fields: { name: FieldType, icon: any }[]
  currentSchema: string
  selectedPosts: string[]
  sortColumn: string
  sortDirection: SortDirection
  visibleColumns: Record<string, string[]>
  openNewDocPanel: boolean
  openNewBucketPanel: boolean
  openSettings: boolean
  viewMode: UIMode
  setSortColumn: (target: string) => void
  setSortDirection: (target: SortDirection) => void
  setSelectedPosts: (slug: string) => void
  clearSelectedPosts: () => void
  setBucket: (name: string) => void
  setCurrentSchema: (collectionName: string) => void
  toggleColumn: (collectionName: string, column: string, allColumns: string[]) => void
  setVisibleColumns: (collectionName: string, columns: string[]) => void
  getVisibleColumns: (collectionName: string, allColumns: string[]) => string[]
  setOpenNewDocPanel: () => void
  setOpenNewBucketPanel: () => void
  setOpenSettings: () => void
  setViewMode: (viewMode: UIMode) => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  bucket: "",
  fields: [
    {
      name: "id",
      icon: RiKeyLine
    },
    {
      name: "text",
      icon: RiText
    },
    {
      name: "number",
      icon: RiHashtag
    },
    {
      name: "date",
      icon: RiCalendarLine
    },
    {
      name: "boolean",
      icon: RiToggleLine
    },
    {
      name: "status",
      icon: RiLoader2Line
    },
    {
      name: "rich-text",
      icon: RiMarkdownLine
    },
    {
      name: "relation",
      icon: RiArrowRightUpLine
    },
  ],
  visibleColumns: {},
  currentSchema: '',
  selectedPosts: [],
  openNewDocPanel: false,
  openNewBucketPanel: false,
  openSettings: false,
  viewMode: 'view',
  sortColumn: "updated",
  sortDirection: 'desc',
  setSortColumn: (target: string) => {
    set(({
      sortColumn: target
    }))
  },
  setSortDirection: (target: SortDirection) => {
    set(({
      sortDirection: target
    }))
  },
  clearSelectedPosts: () => {
    set(({
      selectedPosts: []
    }))
  },
  setSelectedPosts: (slug: string) => {
    set(state => {
      const isSelected = state.selectedPosts.includes(slug)
      return {
        selectedPosts: isSelected
          ? state.selectedPosts.filter(sp => sp !== slug)
          : [...state.selectedPosts, slug]
      }
    })
  },
  setBucket: (newBucket) => {
    set(({
      bucket: newBucket
    }))
  },
  setCurrentSchema: (collectionName) => {
    const { currentSchema } = get()
    if (currentSchema === collectionName) return
    set(({
      currentSchema: collectionName
    }))
  },
  setVisibleColumns: (collectionName: string, columns: string[]) =>
    set((state) => ({
      visibleColumns: {
        ...state.visibleColumns,
        [collectionName]: columns,
      },
    })),
  toggleColumn: (collectionName, column, allColumns) =>
    set((state) => {
      const currentColumns = state.visibleColumns[collectionName] || []
      const updatedColumns = currentColumns.includes(column)
        ? currentColumns.filter((col) => col !== column)
        : [...currentColumns, column]
      const sortedColumns = allColumns.filter(col => updatedColumns.includes(col))
      return {
        visibleColumns: {
          ...state.visibleColumns,
          [collectionName]: sortedColumns,
        },
      }
    }),
  getVisibleColumns: (collectionName: string, allColumns: string[]) => {
    const state = get()
    if (!state.visibleColumns[collectionName]) {
      // If no columns are set for this collection, use all schema fields
      return allColumns.filter(col => col !== 'id')
    }
    return allColumns.filter(col => state.visibleColumns[collectionName].includes(col))
  },
  setOpenNewDocPanel() {
    const { openNewDocPanel } = get()
    set({
      openNewDocPanel: !openNewDocPanel
    })
  },
  setOpenNewBucketPanel() {
    const { openNewBucketPanel } = get()
    set({
      openNewBucketPanel: !openNewBucketPanel
    })
  },
  setOpenSettings() {
    const { openSettings } = get()
    set({
      openSettings: !openSettings
    })
  },
  setViewMode() {
    const { viewMode } = get()
    set({
      viewMode: viewMode === "view" ? "select" : "view"
    })
  }
}
))