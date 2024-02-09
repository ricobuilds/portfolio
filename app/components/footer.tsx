import Link from "next/link"

const Footer = () => {

  const name = "Enric Trillo"

  const colLeft = "Learn more about me and my journey."

  const colRight = "Read more of my work and learnings."

  return (
    <footer className="w-full px-4">
      <div className="max-w-[696px] mx-auto">
        <div id="copy" className="pb-8 text-center">
          <div className="py-10">Thank you for stopping by.</div>
          <div className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }