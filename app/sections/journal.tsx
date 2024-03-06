import { sanityQuery } from "@/lib/sanity/utils"
import Link from "next/link"
import { Article } from "../types/Article"
import { cn, convertDate } from "@/lib/shared-utils"
import Image from "next/image"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export const Journal = async () => {

  const articles: Article[] = await sanityQuery(`*[_type == "article"] | order(_createdAt desc)[0..2]{
    _id,
    title,
    description,
    publishedAt,
    "slug": slug.current,
  }`)

  const showBlogs = true
  return (
    <section id="journal" className="flex flex-col gap-10">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Articles
      </h2>
      {
        showBlogs ? (
          <ul className="grid gap-8 md:grid-cols-3">
            {
              articles.map((article, idx: number) => (
                <li key={idx} className="">
                  <div className="group flex flex-col gap-3 active:scale-[0.98] outline-none w-full">
                    <Link href={`/blog/${article.slug}`} className="w-full transition-all duration-300 ring-0 group-hover:ring-2 rounded-2xl group-hover:ring-amethyst-500 ring-offset-2">
                      <Image src={"/og?title=" + article?.title} height={1200} width={630} alt={article?.title as string} loading="lazy" className="object-cover w-full transition-all duration-300 ease-in-out rounded-2xl group-hover:grayscale" />
                    </Link>
                    <div className="flex flex-col gap-2 px-2">
                      <Link href={`/topic/${article.tag?.slug ?? "ai"}`} className="text-[10px] w-fit uppercase text-amethyst-500">
                        {article.tag?.title ?? "Artificial Intelligence"}
                      </Link>
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="font-sans font-semibold hover:text-amethyst-500">{article.title}</h3>
                      </Link>
                      <p className="uppercase text-[10px]">By <span className="text-slate-500">{article.author?.name ?? "Enric Trillo"}</span>  / <span>{convertDate(article.publishedAt as string, { month: "long" })}</span></p>
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