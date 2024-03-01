import { Topic } from "@/app/types/Topic"
import { baseWidth } from "@/lib/config"
import { sanityQuery } from "@/lib/sanity/client"
import { getTopics } from "@/lib/sanity/queries"
import { cn } from "@/lib/shared-utils"

async function getAllTopics() {
  const tags = await sanityQuery(getTopics)
  // @ts-ignore
  return tags.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
  })
}

export default async function Topics() {
  const topics: Topic[] = await getAllTopics()
  console.log(topics)
  return (
    <>
      <main className="w-full px-4">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Topics</h1>
          </div>
        </div>
      </main>
    </>
  )
}