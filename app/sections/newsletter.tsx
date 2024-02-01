export const Newsletter = () => {
  return (
    <section id="journal" className="flex flex-col gap-2">
      <h2 className="text-slate-500">Newsletter</h2>
      <div className="">
        <p className="mb-8">Get notified when I write something new about AI, gaming & machine learning, or launch a new project right in your inbox.</p>
        <div className="w-full rounded-lg">
          <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
        </div>
      </div>
    </section>
  )
}