import { MDXComponents } from "mdx/types";
import { BrightCode } from "../codeblock/bright";
import { CopyButton } from "../codeblock/copy-btn";
import Image from "next/image";
import Link from "next/link";
import { formatTag } from "@/lib/mdx";
import React from "react";
import { TweetComponent } from "../tweet";

function createHeading(level: number) {
  return ({ children }: any) => {
    let slug = formatTag(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} className="underline underline-offset-2 decoration-amethyst-500" {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-amethyst-500" {...props} />;
}

function Table({ data }: any) {
  let headers = data.headers.map((header: any, index: number) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row: any, index: number) => (
    <tr key={index}>
      {row.map((cell: any, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Link: (props: any) => {
    return (
      <Link {...props}  />
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
  },
  Table,
  StaticTweet: TweetComponent
};