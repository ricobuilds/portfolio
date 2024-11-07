"use client"

import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Link from "next/link"
import { logos } from "@/constants/logos"
import Image from "next/image"
import { getTranslations } from "../dictionaries"
import { clash } from "@/constants/fonts"
import BackToTop from "./back-to-top"
import { useRouter, usePathname } from 'next/navigation'
import { i18n, Locale, i18nSwitcher as languages } from '@/constants/i18n.config';

const Footer = ({
  tl,
  lang
}: {
  tl: Awaited<ReturnType<typeof getTranslations>>["footer"],
  lang: string
}) => {

  const name = "Metasyde Ltd"

  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    const currentLocale = pathname.split('/')[1] as Locale
    
    if (i18n.locales.includes(currentLocale)) {
      // If the current path already includes a locale, replace it
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
      router.push(newPath)
    } else {
      // If the current path doesn't include a locale, add the new locale
      router.push(`/${newLocale}${pathname}`)
    }
    
    // @ts-ignore
    setCurrentLanguage(getLanguageName(newLocale))
  }

  return (
    <footer className=" bg-obsidian-100">
      <div className="border-t-2 border-black">
        <div className="max-w-[1360px] px-6 py-16 mx-auto space-y-8 lg:space-y-16">
          <div id="top-footer" className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div id="brand">
              <div className="flex items-center gap-4 shrink-0">
                <Image src={'/images/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
                <span className={cn(clash.className, "font-semibold")}>Enric Trillo</span>
              </div>
              <p className="max-w-xs mt-4 text-gray-500">
                {tl['blurb']}.
              </p>
              <p className="mt-8 font-bold">{tl['connect']}.</p>
              <ul id="socials" className="flex gap-6 mt-4">
                <li className="transition border-2 border-lazure-700 group hover:bg-lazure-700">
                  <Link
                    href={routes.twitter}
                    rel="noreferrer"
                    target="_blank"
                    className="transition text-lazure-600 group-hover:text-white"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="size-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="transition border-2 border-celuria-700 group hover:bg-celuria-700">
                  <Link
                    href={routes.linkedin}
                    rel="noreferrer"
                    target="_blank"
                    className="transition fill-celuria-700 group-hover:fill-white"
                  >
                    <span className="sr-only">LinkedIn</span>
                    {logos.linkedin(8)}
                  </Link>
                </li>
                <li className="transition border-2 border-scarlet-700 group hover:bg-scarlet-700">
                  <a
                    href={routes.youtube}
                    rel="noreferrer"
                    target="_blank"
                    className="transition fill-scarlet-600 group-hover:fill-white"
                  >
                    <span className="sr-only">YouTube</span>
                    {logos.youtube(8)}
                </a>
                </li>
                <li className="transition border-2 border-gray-700 group hover:bg-gray-700">
                  <Link
                    href={routes.github}
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition group-hover:text-white"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="size-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            <div id="site-map" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-5">
              <div>
                <p className="font-medium text-gray-900">Enric Trillo</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">About</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Blog</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Contact</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Stats</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Testimonials</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Editorial Guidelines</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">Resources</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Free Tools</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Courses</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Tutorials</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Glossary</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Salaries</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Cheatsheets</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">Legal</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Terms</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Privacy</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Disclaimer</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 transition hover:opacity-75">Beehiiv Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">Language</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {
                    languages.map((l, idx) => (

                      <li key={idx}>
                        <button onClick={() => handleLanguageChange(l.code)} className={cn(lang === l.code ? "font-bold" : null, "text-gray-700 transition hover:opacity-75")}> {l.name} </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="flex w-full sm:justify-end">
                <BackToTop />
              </div>

            </div>
          </div>
          <div id="bottom-footer" className="flex flex-col justify-between text-xs text-gray-500 lg:flex-row">
            <p id="copyright">&copy; 1999–{new Date().getFullYear()}. {tl['ownedBy']} <span className="text-charkol">{name}</span>. {tl['copyright']}.</p>
            <p>{tl['company']}: 14006690</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }