"use client"
import { Fragment, useEffect, useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { RiAddBoxFill, RiCheckboxFill, RiCloseCircleFill, RiDeleteBinFill, RiSettings3Fill } from "@remixicon/react";
import { handleDeleteDocument } from "../actions";
import { useParams } from "next/navigation";
import { cn } from "@/lib/shared-utils";

export function ActionItems() {

  const { collection } = useParams()
  const collectionName = collection as string
  const {
    viewMode,
    setViewMode,
    selectedPosts,
    setOpenSettings,
    setSelectedPosts,
    clearSelectedPosts,
    toggleEditorSheet,
  } = useUIStore()

  const handleDelete = async () => {
    for (let i = 0; i < selectedPosts.length; i++) {
      const record = selectedPosts[i];
      await handleDeleteDocument(collectionName, record)
    }
    clearSelectedPosts()
    setViewMode('view')
  }

  const handleCancel = () => {
    clearSelectedPosts()
    setViewMode('view')
  }
  return (
    <div id="left-header" className="flex flex-1 gap-2.5 w-full">
      {viewMode === "view" ? (
        <Fragment>
          <button
            onClick={() => toggleEditorSheet()}
            className="flex items-center gap-2 transition-all group">
            <RiAddBoxFill className="w-5 h-5 text-slate-500 group-hover:text-black" />
            <span className="text-sm text-slate-500 group-hover:text-black">New Document</span>
          </button>
          <button
            onClick={() => setViewMode("select")}
            className="flex items-center gap-2 transition-all group">
            <RiCheckboxFill className="w-5 h-5 text-slate-500 group-hover:text-black" />
            <span className="text-sm text-slate-500 group-hover:text-black">{viewMode === "view" ? "Select" : "Selecting"}</span>
          </button>
          <button
            onClick={() => setOpenSettings()}
            className="flex items-center gap-2 transition-all group">
            <RiSettings3Fill className="w-5 h-5 text-slate-500 group-hover:text-black" />
            <span className="text-sm text-slate-500 group-hover:text-black">Settings</span>
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button
            onClick={selectedPosts.length > 0 ? () => handleDelete() : undefined}
            disabled={selectedPosts.length > 0 ? false : true}
            className={cn(
              selectedPosts.length > 0 ? "text-slate-500" : "text-slate-400 pointer-events-none select-none",
              "flex items-center gap-2 transition-all group"
            )}>
            <RiDeleteBinFill className="w-5 h-5 group-hover:text-black" />
            <span className="text-sm group-hover:text-black">Delete</span>
          </button>
          <button
            onClick={() => handleCancel()}
            className="flex items-center gap-2 transition-all group">
            <RiCloseCircleFill className="w-5 h-5 text-slate-500 group-hover:text-black" />
            <span className="text-sm text-slate-500 group-hover:text-black">Cancel</span>
          </button>
        </Fragment>
      )}
    </div>
  )
}