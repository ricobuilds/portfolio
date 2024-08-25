import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export const Work = () => {
  const work = [
    {
      label: "GPT2Markdown",
      description: "A Chrome extension that converts GPT conversations to Markdown.",
      ready: true
    },
    {
      label: "Shift Forward Newsletter",
      description: "Get the latest updates & insights on Disruptive Technologies.",
      ready: true
    },
  ]

  const showWork = true
  return (
    <section id="work" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium mx-auto px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Work
      </h2>
      <p className="text-center text-obsidian-600">Some of the projects I&apos;ve built, or have been working on.</p>
      {
        showWork ? (
          <div className="grid w-full grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {
              work.map((i, idx) => (
                <div key={idx} id="work-card" className="p-6 rounded-lg bg-slate-100">
                  <h3 className="text-lg font-semibold text-gray-900">{i.label}</h3>
                  <p className="mt-2 text-gray-600">{i.description}</p>
                  <a href="#" className="inline-flex items-center px-4 py-2 mt-4 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700">
                    View Project
                  </a>
                </div>
              ))}
          </div>
        ) : <p className="mx-auto text-obsidian-500">Stay tuned for exciting projects in the pipeline.</p>
      }
    </section >
  )
}