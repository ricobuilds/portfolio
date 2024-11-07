"use client"
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

export const Showcase = () => {
  const imgChildStyles = `w-[385px] h-[385px] border border-md`

  const certs = [
    "microsoft",
    "google",
    "amazon",
    "nvidia",
    "deeplearningai",
    "ibm",
    "activeloop",
    "linkedin",
  ]

  return (
    <section id="showcase" className="w-full mx-auto">
      <div className="flex w-full gap-6 mt-16">
        <Marquee speed={12} autoFill className="flex gap-8 select-none">
          {
            certs.map((image , idx) => (
              <div id="hero__img-wrapper" className="mr-5">
                <Image key={idx} className={imgChildStyles} src={`/certs/${image}.jpeg`} alt={`${image}_logo`} width={385} height={385} />
              </div>
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