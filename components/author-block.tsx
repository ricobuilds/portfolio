import { authors } from "@/lib/author";
import Image from "next/image";

interface AuthorBlock {
  title: string
  caption: string
}

export function AuthorBlock({ title }: { title: string }) {
  const author = authors[title]
  return (
    <div id="author" className="flex items-start gap-4 my-10 text-sm">
      <Image id="author-image" src={'/headshot.jpeg'} width={600} height={600} priority className='w-16 h-16 rounded-full pointer-events-none select-none' alt={title} />
      <div className="">
        <div className="flex gap-2">
          <span id="author-name" className="font-bold uppercase">{author.title}</span>
          <div id="author-socials" className="flex items-center gap-2"></div>
        </div>
        <span id="author-caption">{author.caption}</span>
      </div>
    </div>
  )
}