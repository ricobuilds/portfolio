import { StructuredData } from "@/components/structured-data"
import { Term } from "@/app/types/Term"
import { baseWidth } from "@/constants"
import { sanityQuery } from "@/lib/sanity/utils"
import { cn } from "@/lib/shared-utils"
import { Metadata } from "next"
import { Kanit } from "next/font/google"
import Link from "next/link"
import { WebPage, WithContext } from "schema-dts"
import { routes } from "@/lib/routes"

const font = Kanit({
  weight: "800",
  subsets: ['latin']
})

const title = "Disruptive Technology Glossary"
// const description = "Your complete resource to learn the key terms shaping the world of deep learning, haptic technology, robotics, and the metaverse."
// const desc = 'Explore our Disruptive Tech Glossary, your go-to resource for understanding the latest in AI, blockchain, Web3, and other cutting-edge technologies. Stay ahead with clear definitions, in-depth explanations, and links to tutorials, tools, and courses.'
const description = 'A list of terms and definitions related to disruptive technologies, content creation, and programming. You can use this complete glossary to understand the most common technical terms in the industry as well as the concepts discussed on social media, the blog, and Shift Forward by Enric Trillo.'

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
        <div className={cn("min-h-screen w-full max-w-3xl mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 pt-20">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold sm:text-5xl">{title}</h1>
              <p>{description}</p>
            </div>
            <div className="p-4 border rounded-md border-slate-300 bg-slate-100">
              <h3 className="font-bold">Spot a missing glossary term?</h3>
              <p>Reach out to let me know and I&apos;ll be sure to add it pronto!</p>
              <div className="flex w-full gap-3 mt-3">
                <Link className="flex-1 px-4 py-2 text-center text-white bg-black border rounded-md" href={routes.twitter}>Twitter</Link>
                <Link className="flex-1 px-4 py-2 text-center text-white bg-black border rounded-md" href={routes.linkedin}>LinkedIn</Link>
                <Link className="flex-1 px-4 py-2 text-center text-white bg-black border rounded-md" href={routes.email}>Email</Link>
              </div>
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