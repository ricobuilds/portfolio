import Link from "next/link"

const Navbar = () => {
  const nav = [
    {
      label: "about",
      route: "/about"
    },
    {
      label: "blog",
      route: "/blog"
    },
    {
      label: "store",
      route: "/store"
    },
  ]
  return (
    <header className="w-full px-4 border-b">
      <nav className="flex justify-between max-w-[696px] py-6 mx-auto">
        <h2>Enric Trillo</h2>
        <ul className="flex gap-2">
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