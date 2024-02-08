import { routes } from "@/lib/routes"
import Link from "next/link"

const Navbar = () => {
  const nav = [
    {
      label: "about",
      route: routes.about
    },
    {
      label: "blog",
      route: routes.journal
    },
  ]
  return (
    <header className="w-full px-4 border-b">
      <nav className="flex justify-between max-w-[966px] py-6 mx-auto">
        <h2>Enric Trillo</h2>
        <ul className="flex gap-2 -mr-2">
          {nav.map((i, idx) => (
            <li key={idx}>
              <Link className="px-2 py-2 rounded-md hover:bg-gray-300" href={i.route}>{i.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }