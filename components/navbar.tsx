import { baseWidth } from "@/lib/config"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet"



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
      route: routes.blog
    },
    {
      label: "Work",
      route: routes.home + "/#work"
    },
  ]
  return (
    <header className="flex justify-center w-full px-6 border-b h-18">
      <nav className={cn(baseWidth, "flex justify-between w-full py-5 items-center")}>
        <div className="flex items-center gap-4">
          <Image src={'/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
        </div>
        <ul className="absolute flex-wrap hidden gap-1 text-sm -translate-x-1/2 md:flex left-1/2">
          {nav.map((i, idx) => (
            <li key={idx}>
              <Link className="flex items-center h-8 px-3 rounded-md hover:bg-slate-100" href={i.route}>{i.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex">
          <Link href={routes.subscribe} className="hidden md:flex">
            <button className="flex items-center px-3 py-2 text-sm text-white rounded-full bg-charkol hover:bg-charkol/90">Join Shift Forward</button>
          </Link>
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Enric Trillo － Disruptive Technology</SheetTitle>
                <SheetDescription className="text-obsidian-500">
                  Fullstack dev writing and building around disruptive tech.
                </SheetDescription>
              </SheetHeader>
              <p className="mt-8 mb-3 font-bold">Navigation</p>
              <div className="flex flex-col gap-2">
                {nav.map((i, idx) => (
                  <Link href={i.route} key={idx}>
                    <div className="cursor-pointer before:content-['→'] before:mr-2">{i.label}</div>
                  </Link>
                ))}
              </div>
              <div className="mt-3">
                <Link href={routes.subscribe}>
                  <div className="px-3 py-2 text-sm text-center text-white bg-charkol hover:bg-charkol/90">Join Shift Forward</div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export { Navbar }