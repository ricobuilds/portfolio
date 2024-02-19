import Link from "next/link"

const Footer = () => {

  const name = "Metasyde Ltd"

  return (
    <footer className="w-full px-4">
      <div className="max-w-[696px] mx-auto">
        <div id="copy" className="pb-8 text-center">
          <div className="py-10">Thank you for stopping by.</div>
          <div className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by {name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }