import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MDXArticle } from "@/app/types/Article"
import { formatTag } from "@/lib/mdx"
import { convertDate } from "@/lib/shared-utils"
import { Locale } from "@/constants/i18n.config"

export const BlogCard = ({ post, lang }: { post: MDXArticle, lang: Locale }) => {
  return (
    <article className="flex flex-col w-full gap-3 overflow-hidden transition bg-white border-2 border-black outline-none rounded-2xl group shadow-[8px_8px_0px_rgba(0,0,0,0)] shadow-[#6583E0]">
      <Link href={`/${lang}/blog/${post.slug}`} className="w-full overflow-hidden duration-300 ring-0">
        <Image src={`/images/blog/${post.slug}.png`} height={1200} width={630} alt={post.title} loading="lazy" className="object-cover w-full aspect-video" />
      </Link>
      <div className="flex flex-col gap-2 px-2 mb-3">
        <div className="flex gap-2">
          {post.tags && post.tags.map((t, idx) => (
            <Link key={idx} href={`/${lang}/tags/${formatTag(t)}`} className="text-[10px] w-fit uppercase underline text-amethyst-500">
              {t}
            </Link>
          ))}
        </div>
        <Link href={`/${lang}/blog/${post.slug}`}>
          <h3 className="font-sans font-semibold">{post.title}</h3>
        </Link>
        <p className="text-sm line-clamp-1">{post.description}</p>
        <p className="uppercase text-[10px]">By <span className="text-slate-500">{post.author}</span>  / <span>{convertDate(post.date, { day: "2-digit", month: "long", year: "numeric" })}</span></p>
      </div>
    </article>
  )
}