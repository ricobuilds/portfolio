import Image from "next/image";

export function BlogEditor() {
  return (
    <div className="flex items-start">
      <div className="">
        <Image src="/headshot.jpeg" alt="" fill/>
      </div>
      <div className="">
        <div className="flex gap-2">
          <span className="font-bold">Enric Trillo</span>
        </div>
       <span>I&apos;m a multi agents developer with over 7 years of experience in developinging robus fullstack applications. At Semrush, he’s involved in research, editing, and writing for the English blog. He also owns Semrush’s Educational Newsletter (4M+ subscribers).</span>
      </div>
    </div>
  )
}