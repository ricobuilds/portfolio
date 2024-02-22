import { baseWidth } from "@/lib/config"
import { cn } from "@/lib/shared-utils"
import Link from "next/link"

const Footer = () => {

  const name = "Metasyde Ltd"

  return (
    <footer className="w-full px-4">
      <section className={cn(baseWidth, "mx-auto pb-8 text-center")}>
            <p className="py-10">Thank you for stopping by.</p>
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
      </section>
    </footer>
  )
}

export { Footer }