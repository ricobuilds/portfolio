import { Post } from "@/.contentlayer/generated"
import Link from "next/link"

export const Journal = () => {
  const blogs: Post[] = []

  const showBlogs = false
  return (
    <section id="journal" className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-slate-500">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-anchor"><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" /></svg></span>
        Journal
      </h2>
      {
        showBlogs ? (
          <ul>
            {
              blogs.map((i, idx) => (
                <li key={idx} className="-mx-3">
                  <Link href={i.url ? i.url : `/blog/${i._raw.flattenedPath}`} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    {i.title}
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