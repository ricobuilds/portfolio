import { sanityQuery } from "@/lib/sanity/client"
import { getLatestArticles } from "@/lib/sanity/queries"
import Link from "next/link"
import { Article } from "../types/Article"
import { convertDate } from "@/lib/shared-utils"
import Image from "next/image"

async function getBlogs() {
  const query = await sanityQuery(getLatestArticles)
  // console.log(query)
  return query
}

export const Journal = async () => {

  const blogs: Article[] = await getBlogs()

  const showBlogs = true
  return (
    <section id="journal" className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-anchor"><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" /></svg>
        <span>Articles</span>
      </h2>
      {
        showBlogs ? (
          <ul className="grid grid-cols-3 gap-8">
            {
              blogs.map((i, idx: number) => (
                <li key={idx} className="">
                  <Link href={i.url ? i.url : `/blog/${i.slug}`} className="group flex flex-col gap-2 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <Image src={"/base-og.png"} height={300} width={300} alt="" priority className="transition-all duration-500 ease-in-out group-hover:grayscale" />
                    <div className="flex flex-col gap-2 px-2">
                      <p className="text-sm text-slate-400">{convertDate(i.publishedAt)}</p>
                      <h3>{i.name}</h3>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        ) : <p className="pt-6">No posts here... yet.</p>
      }
    </section >
  )
}