"use client"
import Image from "next/image";
import Marquee from "react-fast-marquee"

export const LogoCloud = () => {
  const imgChildStyles = `w-10 h-10 mx-6 grayscale`

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
        <Marquee speed={25} autoFill gradient className="flex gap-8 select-none">
          {
            skills.map((image, idx) => (
              <Image key={idx} className={imgChildStyles} src={`/skills/${image}.webp`} alt={`${image}_logo`} width={300} height={300} />
            ))
          }
        </Marquee>
      </div>

    </section>
  )
}