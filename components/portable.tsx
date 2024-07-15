import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/shared-utils";
import { InternalLink } from "./internal-link";
import { BrightCode } from "./codeblock/bright";
import { urlForImage } from "@/lib/sanity/utils";
import { CopyButton } from "./codeblock/copy-btn";
import { PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  types: {
    reference: (props) => {
      return (
        <>@@</>
      )
    },
    image: ({ value, isInline }) => {
      return (
        <div className="flex flex-col items-center object-cover gap-3 p-2 mb-4 aspect-auto rounded-xl">
          <Image
            width={700}
            height={700}
            alt={value.alt}
            src={urlForImage(value).url()}
            loading="lazy"
            priority={false}
            className={cn(isInline ? 'inline-block' : 'block', "border")} />
          <figcaption className="text-sm text-center text-slate-500">
            <em>{value.alt}</em>
          </figcaption>
        </div>
      )
    },
    code: ({ value, isInline }) => {
      return isInline ? (
        <code className="text-amethyst-500 bg-amethyst-400 bg-opacity-20">{value.text}</code>
      ) : (
        <div className='relative w-full mb-3'>
          <div className="absolute flex items-center justify-end w-full p-2">
            <CopyButton node={value} />
          </div>
          <BrightCode lang={value.language} code={value.code} />
        </div>
      )
    },
    // internalLink: (props) => {
    //   return (
    //     <InternalLink value={props.value} />
    //   )
    // }
  },
  block: {
    h2: ({ children }) => <h2 className="mt-3 mb-2 font-sans text-3xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-3 mb-2 font-sans text-2xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-3 mb-2 font-sans text-xl font-semibold">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-3 mb-2 font-sans text-lg font-normal">{children}</h5>,
    normal: ({ children }) => {
      return (
        <p className="mb-6">{children}</p>
      )
    },
    blockquote: ({ children }) => {
      return (
        <div className="px-3 pt-4 pb-px my-6 bg-gray-100 border-l-8 border-gray-300">{children}</div>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="ml-8 list-disc mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="ml-8 list-decimal mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => <ol className="m-auto text-lg">{children}</ol>,
  },
  marks: {
    code: ({ text }) => {
      return (
        <code className="p-1 font-mono text-sm font-medium rounded bg-amethyst-400 bg-opacity-20 text-amethyst-500">{text}</code>
      )
    },
    internalLink: (props) => {
      return (
        <InternalLink value={props.value.reference} />
      )
    },
    link: (props) => {
      const target = (props.value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <Link
          target={target}
          href={props.value?.href}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="underline text-amethyst-500 underline-offset-2">
          {props.children}
        </Link>
      )
    },
  }
}

export { components }