import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const nav = [
    {
      label: "Home",
      route: routes.home
    },
    {
      label: "About",
      route: routes.about
    },
    {
      label: "Topics",
      route: routes.topics
    },
    {
      label: "Blog",
      route: routes.journal
    },
    {
      label: "Glossary",
      route: routes.glossary
    },
  ]
  return (
    <header className="flex justify-center w-full px-6 border-b h-18">
      <nav className={cn(baseWidth, "flex justify-between w-full py-5 items-center")}>
        <div className="flex items-center gap-4">
          <Image src={'/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
          <ul className="flex flex-wrap gap-1 text-sm">
            {nav.map((i, idx) => (
              <li key={idx}>
                <Link className="flex items-center h-8 px-3 rounded-md hover:bg-slate-100" href={i.route}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={routes.subscribe} className="hidden md:flex">
          <div className="px-3 py-2 text-sm text-white bg-charkol hover:bg-charkol/90">Join Metasyde</div>
        </Link>
      </nav>
    </header>
  )
}

export { Navbar }