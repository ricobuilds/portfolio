import { MDXComponents } from "mdx/types";
import { BrightCode } from "../codeblock/bright";
import { CopyButton } from "../codeblock/copy-btn";
import Image from "next/image";
import Link from "next/link";

export const components: MDXComponents = {
  Link: (props: any) => {
    return (
      <Link {...props} className="underline underline-offset-2 decoration-amethyst-500 hover:text-amethyst-500" />
    )
  },
  code: ({ children }: any) => {
    return (
      <code className="text-amethyst-500 bg-amethyst-400 bg-opacity-20 font-bold font-mono before:content-[''] after:content-[''] px-1 py-1 rounded">{children}</code>
    )
  },
  pre: ({ children }: any) => {
    return (
      <>
        <div className='relative w-full mb-3'>
          <div className="absolute flex items-center justify-end w-full p-2">
            <CopyButton node={children.props.children} />
          </div>
          <BrightCode lang={children.props.className.split("-")[1]} code={children.props.children} />
        </div>
      </>
    );
  },
  Image: ({ src, alt, ...rest }: any) => {
    return (
      <>
        <Image className='mb-0 border rounded-lg' alt={alt} src={src} {...rest} />
        <figcaption className='text-center'>{alt}</figcaption>
      </>
    )
  }
};