"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { handleCreateBucket } from "../../actions"
import { useUIStore } from "@/stores/ui-store"

export function BucketDialog() {
  const {
    bucket,
    setBucket,
    openNewBucketPanel,
    setOpenNewBucketPanel
  } = useUIStore()
  return (
    <Dialog open={openNewBucketPanel} onOpenChange={setOpenNewBucketPanel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a collection</DialogTitle>
          <DialogDescription>Enter a name for the new collection.</DialogDescription>
        </DialogHeader>
        <Input id="bucketName" autoComplete="off" placeholder="Enter a collection name" onChange={(e) => setBucket(e.target.value)} />
        <DialogFooter>
          <Button type="submit" onClick={() => handleCreateBucket(bucket.toLowerCase() ?? "").then(() => setOpenNewBucketPanel()).then(() => setBucket(""))}>Create Collection</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}