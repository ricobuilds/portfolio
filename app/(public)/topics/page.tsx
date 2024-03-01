import { Topic } from "@/app/types/Topic"
import { baseWidth } from "@/lib/config"
import { sanityQuery } from "@/lib/sanity/utils"
import { getTopics } from "@/lib/sanity/queries"
import { cn } from "@/lib/shared-utils"
import { Metadata } from "next"
import Link from "next/link"

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

export const metadata: Metadata = {
  title: "Topics"
}

export const revalidate = 3600

export default async function Topics() {
  const topics: Topic[] = await getAllTopics()
  return (
    <>
      <main className="w-full px-4">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <h1 className="text-6xl font-semibold">Topics</h1>
            <div className="grid gap-6 md:grid-cols-2">
              {
                topics.map((topic) => (
                  <Link key={topic._id} href={`/topics/${topic.slug}`}>
                    <div id={topic._id} className="flex items-center gap-3 p-4 border">
                      <div className="text-amethyst-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                      </div>
                      <div className="w-full">
                        <p className="text-lg font-semibold text-amethyst-500"> {topic.title}</p>
                        <p className="text-slate-500"> {topic?.description ?? "Lorem Ipseum and them man"}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}