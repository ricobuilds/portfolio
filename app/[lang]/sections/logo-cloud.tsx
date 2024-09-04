"use client"
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

export const LogoCloud = () => {
  const imgChildStyles = `w-8 h-8 mx-6 grayscale inline-block`

  const skills = [
    "nextjs",
    "react",
    "framer",
    "tailwind",
    "expressjs",
    "javascript",
    "typescript",
    "mongo",
    "python",
    "fastapi",
    "pytorch",
    "langchain",
    "git",
    "ollama",
  ]
  return (
    <section id="skill-cloud" className="w-full max-w-xl mx-auto">
      <div className="flex w-full h-16 max-w-3xl gap-6">
        <Marquee speed={25} autoFill className="flex gap-8 select-none">
          {
            skills.map((image, idx) => (
              <div className={imgChildStyles}>
                <Image key={idx} src={`/images/skills/${image}.webp`} alt={`${image}_logo`} width={300} height={300} />
              </div>
            ))
          }
        </Marquee>
      </div>

    </section>
  )
}