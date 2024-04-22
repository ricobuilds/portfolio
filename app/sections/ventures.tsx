import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export const Ventures = () => {
  const ventures = [
    {
      label: "Metasyde",
      description: "AI studio building the future of gaming with tools and products.",
      ready: false
    },
    {
      label: "Metasyde Newsletter",
      description: "Keep up with top news & insights on AI Gaming and the Metaverse.",
      ready: true
    },
  ]

  const showVentures = false
  return (
    <section id="ventures" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium mx-auto px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Ventures
      </h2>
      {
        showVentures ? (
          <div className="grid gap-6 md:grid-cols-2">
            {
              ventures.map((i, idx) => (
                <div key={idx} id="venture-card" className="p-6 rounded-lg bg-slate-100">
                  <div className="flex flex-col gap-6">
                    <div className="relative flex">
                      <h3 className="font-semibold">{i.label}</h3>
                      {!i.ready && <div className="absolute px-2 py-1 text-xs text-white rounded-lg left-20 bg-slate-700 w-fit">Coming Soon</div>}
                    </div>
                    <p className="text-sm">{i.description}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : <p className="mx-auto text-obsidian-500">Stay tuned for exciting projects in the pipeline.</p>
      }
    </section >
  )
}