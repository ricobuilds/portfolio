"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUIStore } from "@/stores/ui-store";
import { RiCloseCircleFill, RiMore2Fill } from "@remixicon/react";
import { Globe } from "lucide-react";

export function EditorPanel() {
  const {
    openNewDocPanel,
    setOpenNewDocPanel
  } = useUIStore()
  return (
    <Sheet open={openNewDocPanel} onOpenChange={setOpenNewDocPanel}>
      <SheetContent className="w-full bg-white p-[30px] flex flex-col gap-4">
        <div>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between h-14">
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
          <Input id="title" className="px-2.5 py-[1px] bg-slate-100" placeholder="What's New" />
        </div>
        <div className="">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" className="px-2.5 py-[1px] bg-slate-100" placeholder="whats-new" />
          <p className="flex items-center gap-2 mt-2 text-xs text-obsidian-400">
            <span><Globe className="w-4 h-4" /></span>
            enrictrillo.com/blog/whats-new
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}