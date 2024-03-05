import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export const Stack = () => {
  const stack = [
    {
      label: "VSCode",
      description: "Code Editor"
    },
    {
      label: "Figma",
      description: "Design"
    },
    {
      label: "Notion",
      description: "Operations"
    },
    {
      label: "Screen Studio",
      description: "Screen Recording"
    },
    {
      label: "Beehiiv",
      description: "Newsletter"
    },
    {
      label: "Typefully",
      description: "Content Scheduler"
    },
  ]
  const showStack = true
  return (
    <section id="stack" className="flex flex-col gap-10">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Stack
      </h2>
      {
        showStack ? (
          <div className="grid gap-2 md:grid-cols-3">
            {
              stack.map((i, idx) => (
                <div key={idx} id="stack-card" className="p-6 py-3 rounded-lg bg-slate-100">
                  <div className="flex flex-col gap-1">
                    <div className="relative flex">
                      <h3 className="font-semibold">{i.label}</h3>
                    </div>
                    <p className="text-sm text-slate-500">{i.description}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : <p>No tools here... yet.</p>
      }
    </section >
  )
}