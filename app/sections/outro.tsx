import Link from "next/link"

export const Outro = () => {
  const title = `
  If you think I'd be a good fit for your next project, please send me an email.
  I’m currently available for consulting/contract work.`

  const content = "Book a call"

  return (
    <div id="outro" className="flex flex-col gap-8 py-16">
      <h3 className="max-w-[550px] text-lg text-center mx-auto">{title}</h3>
      <Link href={"mailto:hola@enrictrillo.com"} className="mx-auto">
        <button className="relative inline-flex items-center justify-center h-12 px-6 overflow-hidden font-medium rounded-full group w-fit bg-neutral-950 text-neutral-200"><span>{content}</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative w-8 h-full bg-white/20"></div></div></button>
      </Link>
    </div>
  )
}