import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Link from "next/link"

const Footer = () => {

  const name = "Metasyde Ltd"

  const { about, journal, glossary, subscribe } = routes

  const links = [
    about,
    journal,
    glossary,
    subscribe
  ]

  return (
    <footer className="flex flex-col items-center py-10">
      <div className="flex justify-center w-full py-10 mb-4 space-x-4 border-y">
        <Link href={routes.about} className="hover:text-obsidian-500">About</Link>
        <Link href={routes.journal} className="hover:text-obsidian-500">Blog</Link>
        <Link href={routes.topics} className="hover:text-obsidian-500">Topics</Link>
        <Link href={routes.glossary} className="hover:text-obsidian-500">Glossary</Link>
        <Link href={routes.rss} className="inline-flex items-center gap-1 hover:text-obsidian-500">
          RSS
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>
          </span>
        </Link>
      </div>
      <div className="hidden mb-4 space-x-4">
        <Link href={routes.twitter} className="hover:text-obsidian-500">Twitter</Link>
        <Link href={routes.linkedin} className="hover:text-obsidian-500">LinkedIn</Link>
        <Link href={routes.youtube} className="hover:text-obsidian-500">YouTube</Link>
        <Link href={routes.github} className="hover:text-obsidian-500">Github</Link>
      </div>
      <p className="mt-8">Thank you for stopping by.</p>
      <p className="mt-10 text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
    </footer>

  )

  return (
    <footer className="w-full px-6">
      <section className={cn(baseWidth, "mx-auto pb-8 text-center")}>
        <p className="py-10">Thank you for stopping by.</p>
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
      </section>
    </footer>
  )
}

export { Footer }