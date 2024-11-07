"use client"
import { Input } from "@/components/ui/input"
import { RiAddBoxFill } from "@remixicon/react"
import { Card, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useUIStore } from "@/stores/ui-store"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { handleDeleteBucket } from "../../actions"

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
      <DialogContent className="sm:max-w-[640px] p-0 outline-none">
        <Card>
          <div className="flex flex-row items-center justify-between p-3 py-4 border-b">
            <CardTitle className="text-xs font-medium">Blog Settings</CardTitle>
            <div>
              <RiAddBoxFill className="w-4 h-4" />
            </div>
          </div>
          <div className="flex flex-row w-full border-b divide-x-[1px]">
            <div className="max-w-[40%] w-full p-4">
              attributes
            </div>
            <div className="max-w-[60%] w-full px-4 pt-6 pb-3">
              props
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 py-6">
            <p className="text-sm font-medium"> → Please type in the name of the bucket to confirm removal.</p>
            <Input placeholder="Enter the bucket's name" onChange={(e) => setBucket(e.target.value)} />
            {error && (
              <span className="text-scarlet-500">The bucket name entered does not match the current active bucket!</span>
            )}
            <button onClick={() => deleteBucket(bucket)} className="px-3 py-2 text-white border rounded-md bg-scarlet-500">I understand the consequences, delete this bucket</button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}