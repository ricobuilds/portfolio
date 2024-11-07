import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export const Skills = () => {
  return (
    // < !--Key Skills and Technologies Section-- >
    <section id="skills" className="py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className={cn(kanit.className, "flex items-center mx-auto text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
          Skills
        </h2>
        <p className="text-center text-obsidian-600">Some of the technologies I&apos;m most experienced with.</p>
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* <!-- Skill Card 1 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="JavaScript Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">JavaScript</h3>
            <p className="mt-2 text-gray-600">Expert in ES6+, with extensive experience in building dynamic web applications.</p>
          </div>
          {/* <!-- Skill Card 2 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="React Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">React</h3>
            <p className="mt-2 text-gray-600">Proficient in building responsive and scalable single-page applications.</p>
          </div>
          {/* <!-- Skill Card 3 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="Node.js Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Node.js</h3>
            <p className="mt-2 text-gray-600">Skilled in server-side development with Node.js and Express.js.</p>
          </div>
          {/* <!-- Skill Card 4 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="TailwindCSS Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">TailwindCSS</h3>
            <p className="mt-2 text-gray-600">Experienced in designing responsive, modern UI with TailwindCSS.</p>
          </div>
          {/* <!-- Skill Card 5 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="Framer Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Framer</h3>
            <p className="mt-2 text-gray-600">Expertise in creating interactive prototypes and plugins with Framer.</p>
          </div>
          {/* <!-- Skill Card 6 --> */}
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <Image width={64} height={64} src="" alt="Next.js Logo" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Next.js</h3>
            <p className="mt-2 text-gray-600">Skilled in server-side rendering and building performant web applications.</p>
          </div>
        </div>
      </div>
    </section>

  )
}