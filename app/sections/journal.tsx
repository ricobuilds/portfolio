import Link from "next/link"

export const Journal = () => {
  return (
    <section id="journal" className="flex flex-col gap-2">
      <h2 className="text-slate-500">Journal</h2>
      <ul>
        <li className="-mx-3">
          <Link href={""} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Activo
          </Link>
        </li>
        <li className="-mx-3">
          <Link href={""} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Activo
          </Link>
        </li>
        <li className="-mx-3">
          <Link href={""} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Activo
          </Link>
        </li>
        <li className="-mx-3">
          <Link href={""} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Activo
          </Link>
        </li>
        <li className="-mx-3">
          <Link href={""} className="flex items-center justify-between gap-2 p-3 sm:gap-3 active:scale-[0.98] text-accent hover:bg-white/5 transition-all rounded-2xl hover:ring-1 ring-border outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Activo
          </Link>
        </li>
      </ul>
    </section>
  )
}