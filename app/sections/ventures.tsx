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

  const showVentures = true
  return (
    <section id="ventures">
      <h2 className="flex items-center gap-2 text-slate-500">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-anchor"><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /><circle cx="12" cy="5" r="3" /></svg></span>
        Ventures
      </h2>
      {
        showVentures ? (
          <div className="grid gap-2 mt-6 md:grid-cols-2">
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
        ) : <p>No ventures... yet.</p>
      }
    </section >
  )
}