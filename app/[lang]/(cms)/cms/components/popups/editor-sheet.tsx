"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BaseDocument, Schema, SchemaField } from "@/lib/sdk";
import { cn } from "@/lib/shared-utils";
import { useUIStore } from "@/stores/ui-store";
import { RiCloseCircleFill, RiMore2Fill } from "@remixicon/react";
import { format } from "date-fns";
import { CalendarIcon, Globe } from "lucide-react";
import { Fragment, useState } from "react";

export function EditorSheet({ schema }: { schema: Schema }) {
  const {
    currentRecord,
    resetCurrentRecord,
    isEditorSheetOpen,
    toggleEditorSheet
  } = useUIStore()
  // const [selectedArticle, _] = useState()

  const handleResetForm = () => {
    resetCurrentRecord()
    toggleEditorSheet()
  }

  return (
    <Sheet open={isEditorSheetOpen} onOpenChange={handleResetForm}>
      <SheetContent className="w-full bg-white p-[30px] overflow-scroll flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>{currentRecord ? 'Edit Document' : 'New Document'}</SheetTitle>
          <SheetDescription>
            {currentRecord ? "Make changes to the document here." : "Enter the details for the new document."} Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="hidden items-center justify-between h-14">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <RiCloseCircleFill className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Saved
                </Button>
                <Button size="sm">Publish</Button>
                <Button variant="ghost" size="icon">
                  <RiMore2Fill className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </header>
        </div>
        <div className="flex-1">
          {schema.fields
            .filter(field => field.name !== "id" && field.name !== "created" && field.name !== "updated")
            .map((field) => {
              {/* @ts-ignore */ }
              const recordField = currentRecord && currentRecord[field.name]
              console.log(recordField)
              return (
                <div key={field.name}>
                  {/* @ts-ignore */}
                  {renderFieldContent(recordField, field)}
                </div>
              )
            })}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="">
              <textarea id="content" className="border border-obsidian-300 w-full p-3 resize-none rounded-md" value={"hello"}></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleResetForm()}
            className="border border-obsidian-300 hover:bg-slate-100 duration-300 px-2 py-1.5 text-sm rounded-md"
          >Cancel
          </button>
          <button
            className="bg-black px-2 py-1.5 text-white text-sm rounded-md"
          >{currentRecord ? "Update Document" : "Create Document"}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function renderFieldContent(value: any, field?: SchemaField) {
  if (!field) return "No active component in [renderFieldContent]"

  switch (field.type) {
    case 'id':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input value={value || ""} disabled />
        </div>
      )
    case 'text':
      return field.name === 'title' ? (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            placeholder="What's New"
            value={value || ''}
            className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300" placeholder="What's New" />
        </div>
      )
    case 'slug':
      return (
        <div className="space-y-2">
          <Label htmlFor="slug">{field.label}</Label>
          <Input id="slug"
            placeholder="whats-new"
            value={value || ''}
            className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300"
          />
          <p className="flex items-center gap-2 mt-2 text-xs text-obsidian-400">
            <span><Globe className="w-4 h-4" /></span>
            enrictrillo.com/blog/{value}
          </p>
        </div>
      )
    case 'date':
      return field.name === "created" || "updated" ? (
        <div className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            type="date"
            className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300"
            value={value}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300"
          />
        </div>
      )
    // return value ? format(new Date(value), 'dd/MM/yyyy, HH:mm') : ''
    case 'boolean':
      return value ? 'Yes' : 'No'
    case 'rich-text':
      return value ? `${value.substring(0, 50)}...` : ''
    default:
      return String(value || '')
  }
}