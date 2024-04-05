import { StructuredData } from "@/app/components/structured-data"
import { Term } from "@/app/types/Term"
import { baseWidth } from "@/lib/config"
import { sanityQuery } from "@/lib/sanity/utils"
import { cn } from "@/lib/shared-utils"
import { Metadata } from "next"
import { Kanit } from "next/font/google"
import Link from "next/link"
import { WebPage, WithContext } from "schema-dts"

const font = Kanit({
  weight: "800",
  subsets: ['latin']
})

const title = "Web3 Gaming & Metaverse Glossary"
const description = "Your complete resource to learn the key terms shaping the world of deep learning, haptic technology, robotics, and the metaverse."

export const metadata: Metadata = {
  title: title,
  description: description
}

const schema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  headline: title,
  description: description,
}

function groupByFirstLetter(terms: Term[]) {
  return terms.reduce((acc, term) => {
    const firstLetter = term.title?.charAt(0).toUpperCase();
    // @ts-ignore
    if (!acc[firstLetter]) {
      // @ts-ignore
      acc[firstLetter] = []
    }
    // @ts-ignore
    acc[firstLetter].push(term)
    return acc
  }, {})
}

export default async function Glossary() {
  const terms: Term[] = await sanityQuery(`*[_type == "term"]{
    _id,
    title,
    "slug": slug.current,
    description
  }`)
  const groupedTerms = groupByFirstLetter(terms)
  return (
    <>
      <StructuredData data={schema} />
      <main className="w-full px-6">
        <div className={cn(baseWidth, "min-h-screen w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <div className="space-y-3">
              <h1 className="text-6xl font-semibold">{title}</h1>
              <p>{description} Brought to you by the founder of Metasyde - an AI studio building the future of gaming.</p>
            </div>
            {
              terms.length > 0 ?
                Object.entries(groupedTerms).map(([letter, terms]) => (
                  <div key={letter} className="flex flex-col gap-8">
                    <div className={cn(font.className, "px-4 text-white bg-amethyst-500 w-fit mt-8 rounded-md")}>
                      <h2 className="text-4xl ">
                        {letter}
                      </h2>
                    </div>
                    {/* @ts-ignore */}
                    {terms.map((term) => (
                      <div key={term._id} className="px-4 py-2 rounded hover:bg-obsidian-100">
                        <Link href={`/glossary/${term?.slug}`} className="flex flex-col gap-1">
                          <h3 className="font-sans text-2xl font-medium">{term.title}</h3>
                          <p className="text-obsidian-600 w-fit">{term?.description ?? "lorem ipsum in this description ya so. lorem ipsum in this description ya so.lorem ipsum in this description ya so.lorem ipsum in this description ya so.lorem ipsum in this description ya so."}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                ))
                : (
                  <p className="pt-6">No posts here... yet.</p>
                )
            }
          </div>
        </div>
      </main>
    </>
  )
}