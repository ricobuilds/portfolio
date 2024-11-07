"use client"
import { useUIStore } from "@/stores/ui-store";
import { Plus } from "lucide-react";

export function CreateBucketBtn() {
  const {
    setOpenNewBucketPanel
  } = useUIStore()
  return (
    <button
      onClick={() => setOpenNewBucketPanel()}
      className="flex items-center justify-start w-full gap-2 p-2 text-left rounded-md text-slate-600">
      <Plus className="w-4 h-4" />
      <span className="text-xs">Create Bucket</span>
    </button>
  )
}