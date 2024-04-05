"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image";
import Marquee from "react-fast-marquee"

export const LogoCloud = () => {
  const imgChildStyles = `w-10 h-10 mx-6`

  const certs = [
    {
      image: "microsoft",
      styles: imgChildStyles
    },
    {
      image: "semrush",
      styles: imgChildStyles
    },
    {
      image: "google",
      styles: imgChildStyles
    },
    {
      image: "amazon",
      styles: imgChildStyles
    },
    {
      image: "nvidia",
      styles: imgChildStyles
    },
    {
      image: "deeplearningai",
      styles: imgChildStyles
    },
    {
      image: "ibm",
      styles: imgChildStyles
    },
    {
      image: "activeloop",
      styles: imgChildStyles
    },
    {
      image: "linkedin",
      styles: imgChildStyles
    },
  ]
  return (
    <section id="logo-cloud" className="w-full max-w-xl mx-auto">
      <h2 className="text-sm text-center text-obsidian-400">Recognised by top technology companies</h2>
      <div className="flex w-full h-16 max-w-2xl gap-6 mt-10">
        <Marquee speed={12} autoFill gradient className="flex gap-8 select-none">
          {
            certs.map(({image, styles}) => (
              <Image className={styles} src={`/certs/${image}.jpeg`} alt={`${image}_logo`} width={300} height={300} />
            ))
          }
        </Marquee>
      </div>

    </section>
  )
}