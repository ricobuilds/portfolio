"use client"
import { Input } from "@/components/ui/input"
import { RiAddLine, RiArrowRightUpLine, RiCalendarLine, RiHashtag, RiKeyLine, RiLink, RiLoader2Line, RiMarkdownLine, RiText, RiToggleLine } from "@remixicon/react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useUIStore } from "@/stores/ui-store"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { handleDeleteBucket } from "../../actions"
import { capitalise } from "@/lib/shared-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FieldType, Schema, SchemaField } from "@/lib/sdk"
import { useSettingsStore } from "@/stores/settings-store"

export function SettingsDialog({ schema }: { schema: Schema }) {
  const [bucket, setBucket] = useState("")
  const [error, setError] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>()
  const {
    openSettings,
    setOpenSettings,
  } = useUIStore()

  const {
    selectedField,
    setSelectedField
  } = useSettingsStore()

  const { collection } = useParams()
  const router = useRouter()

  const deleteBucket = (bucketName: string) => {
    if (bucketName !== collection) {
      setError(true)
      return
    }
    handleDeleteBucket(bucketName)
    setBucket("")
    setOpenSettings()
    router.push("/cms")
  }

  const typetoIconMap: { [key in FieldType]: JSX.Element } = {
    // id: <RiKeyLine className="w-4 h-4" />,
    text: <RiText className="w-4 h-4" />,
    // "rich-text": <RiMarkdownLi ne className="w-4 h-4" />,
    number: <RiHashtag className="w-4 h-4" />,
    date: <RiCalendarLine className="w-4 h-4" />,
    boolean: <RiToggleLine className="w-4 h-4" />,
    status: <RiLoader2Line className="w-4 h-4" />,
    relation: <RiArrowRightUpLine className="w-4 h-4" />,
    image: <RiArrowRightUpLine className="w-4 h-4" />,
    list: <RiArrowRightUpLine className="w-4 h-4" />,
    url: <RiArrowRightUpLine className="w-4 h-4" />,
    slug: <RiLink className="w-4 h-4" />,
  };

  const fieldTypes = [
    "text",
    "url",
    "status",
    "boolean",
    "image",
    "relation",
    "slug",
  ]

  const clickField = (field: SchemaField) => {
    setSelectedField(field)
  }

  const addField = () => {
    // const newField: SchemaField = {
    //   id: Date.now().toString(),
    //   type,
    //   name: `New ${type}`,
    //   required: false,
    //   isTextArea: false,
    //   localization: false,
    //   icon,
    // }
    // setFields([...fields, newField])
    // setSelectedField(newField)
    console.log("new field created!")
  }

  return (
    <Dialog open={openSettings} onOpenChange={setOpenSettings}>
      <DialogContent className="sm:max-w-[640px] max-w-[644px] p-0 outline-none flex flex-col gap-0">
        <div className="flex flex-row text-xs items-center justify-between h-14 p-4 border-b">
          <p className="font-medium">{capitalise(collection as string)} Schema</p>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <p className="text-sm font-medium"> → Please type in the name of the bucket to confirm removal.</p>
          <Input placeholder="Enter the bucket's name" onChange={(e) => setBucket(e.target.value)} />
          {error && (
            <span className="text-scarlet-500">The bucket name entered does not match the current active bucket!</span>
          )}
          <button onClick={() => deleteBucket(bucket)} className="px-3 py-2 text-white border rounded-md bg-scarlet-500">I understand the consequences, delete this bucket</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}