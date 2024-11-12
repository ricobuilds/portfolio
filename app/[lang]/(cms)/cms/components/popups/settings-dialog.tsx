"use client"
import { Input } from "@/components/ui/input"
import { RiAddBoxFill } from "@remixicon/react"
import { Card, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useUIStore } from "@/stores/ui-store"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { handleDeleteBucket } from "../../actions"
import { capitalise } from "@/lib/shared-utils"

export function SettingsDialog() {
  const [bucket, setBucket] = useState("")
  const [error, setError] = useState(false)
  const {
    openSettings,
    setOpenSettings,
  } = useUIStore()

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

  return (
    <Dialog open={openSettings} onOpenChange={setOpenSettings}>
      <DialogContent className="sm:max-w-[640px] h-full max-h-[444px] p-0 outline-none flex flex-col gap-0">
        <div className="flex flex-row text-xs items-center justify-between h-14 p-4 border-b">
          <p className="font-medium">{capitalise(collection as string)} Schema</p>
          <div className="flex gap-2">
            Add Custom Fields
            <RiAddBoxFill className="w-4 h-4" />
          </div>
        </div>
        <div className="flex-1 flex-col">
          <div className="flex w-full h-full border-b divide-x-[1px]">
            <div className="max-w-[40%] w-full p-4 flex flex-col">
              
            </div>
            <div className="max-w-[60%] w-full px-4 pt-6 pb-3">
              props
            </div>
          </div>
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