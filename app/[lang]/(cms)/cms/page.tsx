import { SDK } from "@/lib/sdk"
import { RiMarkdownFill } from "@remixicon/react"

export default async function Page() {
  const bucketCount = SDK.collection.listCollections().length

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-1 px-4 overflow-auto ">
        {
          bucketCount > 0 ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <RiMarkdownFill className="w-20 h-20 text-slate-600" />
              <h2 className="text-lg font-bold">Select a collection</h2>
              <p className="text-sm text-slate-500">Choose a bucket from the sidebar to start.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <RiMarkdownFill className="w-20 h-20 text-slate-600" />
              <h2 className="text-lg font-bold">Build your CMS workspace</h2>
              <p className="text-sm text-slate-500">No <span className="text-amethyst-500">[content]</span> folder or collections found in the current workspace.</p>
              <div className="mt-3">
                <button className="px-3 py-1.5 text-sm text-white rounded-lg bg-amethyst-500">Create content workspace</button>
              </div>
            </div>
          )
        }
      </main>
    </div>
  )
}