import { sanityQuery } from "@/lib/sanity/utils"
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
    <section id="journal" className="flex flex-col gap-10">
      <h2 className="flex items-center gap-2 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-anchor"><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" /></svg>
        <span className="text-2xl font-medium">Articles</span>
      </h2>
      {
        showBlogs ? (
          <ul className="grid gap-8 md:grid-cols-3">
            {
              blogs.map((i, idx: number) => (
                <li key={idx} className="">
                  <div className="group flex flex-col gap-3 active:scale-[0.98] outline-none w-full">
                    <Link href={`/blog/${i.slug}`} className="w-full transition-all duration-300 ring-0 group-hover:ring-2 rounded-2xl group-hover:ring-amethyst-500 ring-offset-2">
                      <Image src={"/og?title=" + i.name} height={1200} width={630} alt="" loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:grayscale" />
                    </Link>
                    <div className="flex flex-col gap-2 px-2">
                      <Link href={`/topics/${i.tag?.slug ?? "ai"}`} className="text-[10px] w-fit uppercase text-amethyst-500">
                        {i.tag?.title ?? "Artificial Intelligence"}
                      </Link>
                      <Link href={`/blog/${i.slug}`}>
                        <h3 className="font-sans font-semibold hover:text-amethyst-500">{i.name}</h3>
                      </Link>
                      <p className="uppercase text-[10px]">By <span className="text-slate-500">{i.author?.name ?? "Enric Trillo"}</span>  / <span>{convertDate(i.publishedAt, { month: "long" })}</span></p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : <p className="pt-6">No posts here... yet.</p>
      }
    </section >
  )
}