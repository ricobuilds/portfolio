"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image";
import Marquee from "react-fast-marquee"

export const Showcase = () => {
  const imgChildStyles = `w-[385px] h-[385px] mr-5 border border-md`

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
    <section id="showcase" className="w-full mx-auto">
      <div className="flex w-full gap-6 mt-16">
        <Marquee speed={12} autoFill gradient className="flex gap-8 select-none">
          {
            certs.map(({ image, styles }, idx) => (
              <Image key={idx} className={styles} src={`/certs/${image}.jpeg`} alt={`${image}_logo`} width={385} height={385} />
            ))
          }
        </Marquee>
      </div>

    </section>
  )
}
export const cloud = () => {
  return (
    <section id="showcase">
      <div className="text-center">Showcase carousel here</div>
    </section>
  )
}