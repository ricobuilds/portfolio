"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/shared-utils";
import { useUIStore } from "@/stores/ui-store";
import { RiCloseCircleFill, RiMore2Fill } from "@remixicon/react";
import { format } from "date-fns";
import { CalendarIcon, Globe } from "lucide-react";
import { useState } from "react";

export function EditorPanel() {
  const {
    openNewDocPanel,
    setOpenNewDocPanel
  } = useUIStore()
  const [selectedArticle, _] = useState()
  const [date, setDate] = useState( )
  return (
    <Sheet open={openNewDocPanel} onOpenChange={setOpenNewDocPanel}>
      <SheetContent className="w-full bg-white p-[30px] flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>{selectedArticle ? 'Edit Document' : 'New Document'}</SheetTitle>
          <SheetDescription>
            {selectedArticle ? "Make changes to the document here." : "Enter the details for the new document."} Click save when you're done.
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
        <div className="">
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300" placeholder="What's New" />
        </div>
        <div className="">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300" placeholder="whats-new" />
          <p className="flex items-center gap-2 mt-2 text-xs text-obsidian-400">
            <span><Globe className="w-4 h-4" /></span>
            enrictrillo.com/blog/whats-new
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            className="px-2.5 py-[1px] bg-slate-100 border border-obsidian-300"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}