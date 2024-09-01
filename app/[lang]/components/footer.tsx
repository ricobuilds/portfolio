import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Link from "next/link"
import { logos } from "@/constants/logos"
import Image from "next/image"

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
    <footer className="bg-white">
      <div className="max-w-[1360px] border-t px-6 py-16 mx-auto space-y-8 lg:space-y-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-4 shrink-0">
              <Image src={'/images/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
              <span className="font-bold">Enric Trillo</span>
            </div>

            <p className="max-w-xs mt-4 text-gray-500">
              I&apos;m Enric Trillo, a fullstack developer building multi-agent systems, and sharing knowledge and what I learn online.
            </p>

            <ul className="flex gap-6 mt-8">
              <li>
                <Link
                  href={routes.twitter}
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href={routes.linkedin}
                  rel="noreferrer"
                  target="_blank"
                  className="transition fill-gray-700 hover:opacity-75"
                >
                  <span className="sr-only">LinkedIn</span>
                  {logos.linkedin}
                </Link>
              </li>
              <li>
                <a
                  href={routes.youtube}
                  rel="noreferrer"
                  target="_blank"
                  className="transition fill-gray-700 hover:opacity-75"
                >
                  <span className="sr-only">YouTube</span>

                 {logos.youtube}
                </a>
              </li>

              <li>
                <Link
                  href={routes.github}
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> SEO Optimisation </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75"> Hiring Statistics </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <p>&copy; 1999–{new Date().getFullYear()}. Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
          <p>UK Company No: 14006690</p>
        </div>
      </div>
    </footer>
  )

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