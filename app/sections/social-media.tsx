import Link from "next/link"

export const SocialMedia = () => {
  const profiles = [
    {
      label: "Twitter",
      url: "https://twitter.com/ricobuilds"
    },
    {
      label: "GitHub",
      url: "https://github.com/ricobuilds"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/enrictrillo"
    },
    {
      label: "Youtube",
      url: "https://youtube.com/@ricobuilds"
    },
    {
      label: "Medium",
      url: "https://medium.com/@enrictrillo"
    },
  ]
  return (
    <section id="social-media" className="flex flex-col gap-2">
      <h2 className="text-slate-500">Elsewhere</h2>
      <ul className="flex justify-between w-full">
        {
          profiles.map((i, idx) => (
            <li key={idx}>
              <Link href={i.url}>{i.label}</Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}