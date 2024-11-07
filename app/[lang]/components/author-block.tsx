import { logos } from "@/constants/logos"
import { authors } from "@/lib/author";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";

interface AuthorBlock {
  title: string
  caption: string
}

export function AuthorBlock({ title }: { title: string }) {
  const author = authors[title]
  return (
    <div id="author" className="flex flex-col items-start gap-4 my-10 text-sm sm:flex-row">
      <Image id="author-image" src={'/images/headshot.jpeg'} width={600} height={600} className='w-16 h-16 rounded-full pointer-events-none select-none' alt={title} />
      <div className="">
        <div className="flex gap-2">
          <span id="author-name" className="font-bold uppercase">{author.title}</span>
          <div id="author-socials" className="flex items-center gap-2 ml-2">
            <Link href={routes.twitter} target="_blank" rel="noopener noreferrer nofollow" className="flex hover:bg-amethyst-500 select-none text-white items-center justify-center w-5 h-5 p-0.5 rounded-sm bg-slate-400">
              𝕏
            </Link>
            <Link href={routes.linkedin} target="_blank" rel="noopener noreferrer nofollow" className="flex hover:bg-amethyst-500 fill-white items-center justify-center w-5 h-5 p-0.5 rounded-sm bg-slate-400">
              {logos.linkedin(5)}
            </Link>
          </div>
        </div>
        <span id="author-caption">{author.caption}</span>
      </div>
    </div>
  )
}