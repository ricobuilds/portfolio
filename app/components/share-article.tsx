"use client";

import { siteMetadata } from "@/lib/site.metadata";
import Link from "next/link";
import { useState } from "react";
import { logos } from "../sections/hero";

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
    <div className="flex flex-col gap-4">
      <div className="">Share this article online:</div>
      <div className="flex items-center gap-3">
        <Link title={"Share article to Twitter via Enric Trillo"} href={`https://x.com/share?url=${siteMetadata.siteUrl}/blog/${slug}&text=${"Read " + title}&via=ricobuilds`}>
          <span>
            {logos.twitter}
          </span>
        </Link>
        <Link title={"Share article to LinkedIn via Enric Trillo"} href={`https://www.linkedin.com/shareArticle/?url=${siteMetadata.siteUrl}/blog/${slug}&mini=true&title=${"Read " + title}`}>
          <span>
            {logos.linkedin}
          </span>
        </Link>
        <Link title={"Email"} href={`mailto:?subject=${title}&body=Hey!%0ACheck%20out%20this%20article%20on%20${title}%20from%20${siteMetadata.title+"'s"}%20Blog:%0A${siteMetadata.siteUrl}/blog/${slug}`}>
          <span>
            {logos.mail}
          </span>
        </Link>
        <div title="Copy link" onClick={() => handleCopy(`${siteMetadata.siteUrl}/blog/${slug}`)}>
          {!copy ? logos.link : logos.check}
        </div>
      </div>
    </div>
  )
}