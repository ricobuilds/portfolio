import Link from "next/link"

const Footer = () => {

  const title = `
  If you think I'd be a good fit for your next project, please send me an email.
  I’m currently available for consulting/contract work.`

  const email = "hola@enrictrillo.com"

  const name = "Enric Trillo"

  const colLeft = "Learn more about me and my journey."

  const colRight = "Read more of my work and learnings."

  return (
    <footer className="w-full px-4">
      <div className="mx-auto max-w-screen-md">
        <div id="outro" className="py-16 gap-8 flex flex-col border-t">
          <h3 className="max-w-[550px] text-lg">{title}</h3>
          <Link href={"mailto:hola@enrictrillo.com"}>
            <button className="group relative inline-flex h-12 w-fit items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-6 font-medium text-neutral-200"><span>{email}</span><div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>
          </Link>
        </div>
        <div id="links" className="border-t">
          <div className="grid lg:grid-cols-2">
            <div className="border-b lg:border-b-0">
              <div className="w-full lg:border-r py-8 pr-8">
                <h3 className="text-lg">{colLeft}</h3>
              </div>
              <div className="w-full lg:border-r py-8 pr-8">
                <button className="group relative inline-flex h-12 rounded-full items-center justify-center overflow-hidden bg-neutral-950 px-6 font-medium text-neutral-200"><span>About</span><div className="ml-1 transition group-hover:translate-x-1"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
              </div>
            </div>
            <div className="">
              <div className="w-full py-8 pl-0 lg:pl-8">
                <h3 className="text-lg">{colRight}</h3>
              </div>
              <div className="w-full py-8 pl-0 lg:pl-8">
                <button className="group relative inline-flex h-12 rounded-full items-center justify-center overflow-hidden bg-neutral-950 px-6 font-medium text-neutral-200"><span>Blog</span><div className="ml-1 transition group-hover:translate-x-1"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
              </div>
            </div>
          </div>
        </div>
        <div id="copy" className="py-8 border-t text-sm">&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
      </div>
    </footer>
  )
}

export { Footer }