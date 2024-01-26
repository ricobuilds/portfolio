import Link from "next/link"

const Navbar = () => {
  const nav = [
    {
      label: "About",
      route: "/about"
    },
    {
      label: "Blog",
      route: "/blog"
    },
    {
      label: "Store",
      route: "/store"
    },
  ]
  return (
    <header className="w-full px-4 border-b">
      <nav className="py-6 max-w-screen-md mx-auto flex justify-between">
        <h2>Enric Trillo</h2>
        <ul className="flex gap-2">
          {nav.map((i, idx) => (
            <li key={idx}>
              <Link className="hover:bg-gray-300 px-4 rounded-md py-2" href={i.route}>{i.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export { Navbar }