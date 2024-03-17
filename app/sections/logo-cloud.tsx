"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image";
import Marquee from "react-fast-marquee"

export const LogoCloud = () => {
  const imgChildStyles = `w-20 mx-6`
  return (
    <section id="logo-cloud" className="w-full max-w-xl mx-auto">
      <h2 className="text-sm text-center text-obsidian-400">Certified by top technology companies</h2>
      <div className="flex w-full max-w-2xl gap-6 mt-10 h-14">
        <Marquee speed={24} autoFill gradient className="flex gap-8">
          <img
            className={imgChildStyles}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png" />
          <img
            className={imgChildStyles}
            src="https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/60169/assets/601033/-3615fa28b9cc73e5ae4f89a58a296603.png" />
          <img
            className={imgChildStyles}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png" />
          <img
            className={imgChildStyles}
            src="https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png" />
          <img
            className={imgChildStyles}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/2560px-Microsoft_Azure_Logo.svg.png" />
        </Marquee>
      </div>

    </section>
  )
}