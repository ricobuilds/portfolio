import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Link from "next/link"
import { logos } from "@/constants/logos"

const Footer = () => {

  const name = "Metasyde Ltd"

  const profiles = [
    {
      label: "Twitter",
      url: "https://x.com/ricobuilds",
      logo: logos.twitter,
      styles: "fill-lazure-500 group-hover:fill-lazure-600"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/enrictrillo",
      logo: logos.linkedin,
      styles: "fill-celuria-500 group-hover:fill-celuria-600"
    },
    {
      label: "Youtube",
      url: "https://youtube.com/@ricobuilds",
      logo: logos.youtube,
      styles: "fill-scarlet-500 group-hover:fill-scarlet-600"
    },
    {
      label: "GitHub",
      url: "https://github.com/ricobuilds",
      logo: logos.github,
      styles: "group-hover:opacity-70"
    },
  ]

  return (
    <footer className="flex flex-col items-center max-w-2xl pb-10 mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 py-10 mb-4">
        <div className="flex justify-center w-full gap-4 ">
          <Link href={routes.home} className="hover:text-obsidian-500">Home</Link>
          <Link href={routes.about} className="hover:text-obsidian-500">About</Link>
          <Link href={routes.blog} className="hover:text-obsidian-500">Blog</Link>
          <Link href={routes.rss} className="inline-flex items-center gap-1 hover:text-obsidian-500">
            RSS
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {
            profiles.map((profile, idx) => (
              <Link key={idx} href={profile.url}>
                {profile.logo}
              </Link>
            ))
          }
        </div>
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