import Image from "next/image"

export const Hero = () => {
  return (
    <section id="hero">
    <div className="w-full mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Image src={'/headshot.jpeg'} alt="Enric Trillo" width={64} height={64} className="inline w-16 h-16 transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Enric Trillo</h1>
          <p className="text-obsidian-400">Fullstack Developer</p>
        </div>
      </div>
      <div className="space-y-6 ">
        <p>Hey👋 I&apos;m a fullstack developer with 7 years experience developing frontend interfaces, currently building the future of gaming with AI @ <b>Metasyde Labs</b>.</p>
      </div>
    </div>
  </section>
  )
}