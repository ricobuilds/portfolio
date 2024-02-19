import { routes } from "@/lib/routes"
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
      label: "Blog",
      route: routes.journal
    },
  ]
  return (
    <header className="w-full px-4 border-b h-18">
      <nav className="flex justify-between w-full max-w-[696px] py-5 mx-auto items-center">
        <div><Image src={'/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" /></div>
        <ul className="flex gap-2 -mr-2">
          {nav.map((i, idx) => (
            <li key={idx}>
              <Link className="px-2 py-2 rounded-md hover:bg-slate-100" href={i.route}>{i.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }