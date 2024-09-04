"use client";

import { siteMetadata } from "@/lib/site.metadata";
import Link from "next/link";
import { useState } from "react";
import { logos } from "@/constants/logos"

export const ShareArticle = ({ slug, title }: { slug: string, title: string }) => {
  const [copy, setCopy] = useState(false)
  const handleCopy = (str: string) => {
    navigator.clipboard.writeText(str)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="font-semibold">Share this article</div>
      <div className="flex items-center gap-2">
        <Link title={"Share article to Twitter - Enric Trillo"} href={`https://x.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${"Read " + title}&via=ricobuilds`}>Twitter</Link>
        <Link title={"Share article to LinkedIn - Enric Trillo"} href={`https://www.linkedin.com/shareArticle/?url=${siteMetadata.siteUrl}/blog/${slug}&mini=true&title=${"Read " + title}`}>Linkedin</Link>
        <div onClick={() => handleCopy(`${siteMetadata.siteUrl}/blog/${slug}`)}>
          {!copy ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>}
        </div>
      </div>
    </div>
  )
}

export const ShareArticleRow = ({ slug, title }: { slug: string, title: string }) => {
  const [copy, setCopy] = useState(false)
  const handleCopy = (str: string) => {
    navigator.clipboard.writeText(str)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1500);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="">Share</div>
      <div className="flex items-center gap-3">
        <Link className="p-1 rounded-md bg-slate-200 hover:bg-amethyst-400" title={"Share on X"} href={`https://x.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${"Read " + title}&via=ricobuilds`}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
            </svg>
          </span>
        </Link>
        <Link className="p-1 rounded-md bg-slate-200 hover:bg-amethyst-400" title={"Share on LinkedIn"} href={`https://www.linkedin.com/shareArticle/?url=${siteMetadata.siteUrl}/blog/${slug}&mini=true&title=${"Read " + title}`}>
          <span>
            {logos.linkedin(4)}
          </span>
        </Link>
        <Link className="p-1 rounded-md bg-slate-200 hover:bg-amethyst-400" title={"Share via Email"} href={`mailto:?subject=${title}&body=Hey!%0ACheck%20out%20this%20article%20on%20${title}%20from%20${siteMetadata.title + "'s"}%20Blog:%0A${siteMetadata.siteUrl}/blog/${slug}`}>
          <span>
            {logos.mail(4)}
          </span>
        </Link>
        <Link className="p-1 rounded-md bg-slate-200 hover:bg-amethyst-400" title={"Share on Facebook"} href={`https://www.facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/blog/${slug}`}>
          <span>
            {logos.facebook(4)}
          </span>
        </Link>
        <Link className="p-1 rounded-md bg-slate-200 hover:bg-amethyst-400" title={"Share via Whatsapp"} href={`https://api.whatsapp.com/send?text=${siteMetadata.siteUrl}/blog/${slug}&resubmit=true&title=${title}`}>
          <span>
            {logos.whatsapp(4)}
          </span>
        </Link>
        {/* <div title="Copy link" onClick={() => handleCopy(`${siteMetadata.siteUrl}/blog/${slug}`)}>
          {!copy ? logos.link : logos.check}
        </div> */}
      </div>
    </div>
  )
}