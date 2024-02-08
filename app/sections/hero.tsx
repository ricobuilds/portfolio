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
      <div className="max-w-[550px] space-y-6">
        <p>Hey👋 I&apos;m Enric Trillo － a fullstack web developer with 7 years experience developing frontend interfaces.</p>
        <p>I&apos;m obsessed about building immersive games in the dawn of the AI era.</p>
        <p className="">Currently learning new disciplines like game development and expanding my skillset, and now leading AI gaming efforts @ <b>Metasyde Labs</b>.</p>
      </div>
      <div className="hidden">
        <p>Hey👋 I&apos;m Enric Trillo, known online as <b>Rico Builds</b> － my obsession for AI gaming sparked in 2021, when I pivoted from freelance Frontend development to work as a Hybrid SDR/BDR tapping into the NFT market. This role fanned out the spark though, keeping this obsession dormant for months. With a background in fullstack web development, I&apos;ve embarked on a journey to fuse AI and 2D gaming to build engaging game experiences.</p>
        <p>As an eager learner, I&apos;m mastering tools like Keras and Godot to not just play in virtual worlds, but to design them. While I&apos;m still at the beginning of my journey, my mission is clear: to craft immersive RPG experiences that are as intelligent as they are engaging. Join me as I explore the boundaries of gaming and AI, one pixel and one line of code at a time.</p>
      </div>
    </div>
  </section>
  )
}