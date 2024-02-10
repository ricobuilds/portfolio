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
    <section id="stack" className="flex flex-col gap-2">
      <h2 className="text-slate-500">Stack</h2>
      {
        showStack ? (
          <div className="grid gap-2 mt-6 md:grid-cols-3">
            {
              stack.map((i, idx) => (
                <div key={idx} id="stack-card" className="p-6 rounded-lg bg-slate-100">
                  <div className="flex flex-col gap-4">
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