import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { SDK } from "@/lib/sdk/index"
import { CreateBucketBtn } from "./create-bucket-btn"

export async function Sidebar() {
  const collections: { name: string, count: number }[] = await SDK.collection.listCollections().map((col) => {
    return {
      name: col,
      count: SDK.collection.getCollection(col)?.files as number
    }
  }
  )
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block border-obsidian-300">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h2 className="font-semibold">CMS</h2>
        </div>
        <div className="flex-1 py-2 overflow-auto">
          <nav className="grid items-start px-4 text-sm font-medium">
            <h4 className="mb-2 text-xs font-semibold">Collections</h4>
            <ul className="flex flex-col">
              {collections.map((collection, idx) => (
                <SidebarItem key={idx} collectionName={collection.name} count={collection.count} />
              ))}
            </ul>
            <CreateBucketBtn />
          </nav>
        </div>
        <div className="hidden p-4 mt-auto">
          <Button className="w-full">powered by metasyde</Button>
        </div>
      </div>
    </div>
  )
}