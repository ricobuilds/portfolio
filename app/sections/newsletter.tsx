export const Newsletter = () => {
  return (
    <section id="newsletter" className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-slate-500">
      <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-anchor"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></svg></span>
        Newsletter
      </h2>
      <p className="mt-6 text-2xl italic font-bold">The Metasyde</p>
      <div className="">
        <p className="mb-8">Get notified when I write something about top news & insights on AI Gaming and the Metaverse, or launch a new project right in your inbox.</p>
        <div className="w-full rounded-lg">
          <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
        </div>
        <div className="w-full">
          <div className="pt-4">
            <span id="lipline" className="flex text-sm text-slate-400">Ps: I send emails every week, never spam or sell your data.</span>
          </div>
        </div>
      </div>
    </section>
  )
}