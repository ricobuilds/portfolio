
import { sanityQuery } from "@/lib/sanity/utils";
import Link from "next/link";

export async function InternalLink({ value }: { value: { _ref: string, _type: string, _key: string } }) {
  
  const resource = await sanityQuery(`*[_type == "term" && _id == "${value._ref}"][0]{
    title,
    "slug": slug.current
  }`)
  return (
    <Link
      href={`/glossary/${resource?.slug}`}
      className="inline-flex items-baseline gap-0.5 underline text-amethyst-500 underline-offset-2">
      <span className="my-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
      </span>
      {resource?.title}
    </Link>
  )
}