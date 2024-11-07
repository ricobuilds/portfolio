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
} from "@/components/ui/sheet"
import { getTranslations } from "@/app/[lang]/dictionaries"
import LanguageSwitcher from "./language-switcher"
import { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationSubItem, } from "@/components/ui/navigation-menu"
import { clash } from "@/constants/fonts"

const Navbar = ({
  tl,
}: {
  tl: Awaited<ReturnType<typeof getTranslations>>["navbar"];
}) => {

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]

  return (
    <header className="sticky top-0 z-50 flex flex-col justify-center w-full bg-white border-b-2 border-black h-18">
      <div id="mainnav" className={cn("max-w-[1360px]", "flex w-full py-5 px-6 items-center mx-auto")}>
        <div className="flex items-center gap-4 select-none shrink-0">
          <Image src={'/images/ricobuilds.png'} alt="Enric Trillo Cryptopunk" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
          <span className={cn(clash.className, "font-semibold")}>Enric Trillo</span>
        </div>
        {/* <div className="w-full mx-2 transition-colors duration-300 border-t border-amethyst-500 group-hover:border-green-400"></div> */}
        <div id="right-section" className="flex justify-end flex-1 gap-20">
          <ul className="flex-wrap hidden gap-1 text-sm lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {
                  tl['menu'].map((item, idx) => {
                    return item.type === "single" ? (
                      <NavigationMenuItem key={idx}>
                        <Link href={item.link as string} legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={idx}>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {Array(6).fill({
                              title: "Coming Soon",
                              href: "#",
                              description:
                                "Keep an eye out and come back later. Big things coming soon.",
                            }).map((component) => (
                              <NavigationSubItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                              >
                                {component.description}
                              </NavigationSubItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  })
                }
              </NavigationMenuList>
            </NavigationMenu>
            {/* {nav.map((i, idx) => (
            <li key={idx}>
              <Link className="flex items-center h-8 px-3 rounded-md hover:bg-slate-100" href={i.route}>{i.label}</Link>
            </li>
          ))} */}
          </ul>
          <div className="items-center hidden gap-2 lg:flex shrink-0">
            <LanguageSwitcher />
            <button
              className="px-3 py-2 text-sm border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
            >
              Log In
            </button>
            <Link href={routes.subscribe} className="hidden md:flex">
              <button
                className="px-3 py-2 text-sm bg-amethyst-500 text-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                Join Shift Forward
              </button>
            </Link>

          </div>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Enric Trillo – Fullstack & AI Engineer</SheetTitle>
                <SheetDescription className="text-obsidian-500">
                  Learn the skills to thrive in the age of AI
                </SheetDescription>
              </SheetHeader>
              <p className="mt-8 mb-3 font-bold">Navigation</p>
              <div className="flex flex-col gap-2">
                {
                  tl['menu'].filter(i => i.type === "single").map((i, idx) => (
                    <Link href={i.link as string} key={idx}>
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
      </div>
      <div id="subnav" className={cn("w-full hidden mx-auto", "h-10 px-6 bg-amethyst-500")}>
        <div className="flex items-center justify-center h-10 gap-10 text-white">
          <p>{tl['warning']}.</p>
          {/* <Link href="">HTML5</Link>
          <Link href="">TailwindCSS</Link>
          <Link href="">NextJS</Link>
          <Link href="">Python</Link>
          <Link href="">PyTorch</Link>
          <Link href="">Langchain</Link> */}
        </div>
      </div>
    </header>
  )
}

export { Navbar }