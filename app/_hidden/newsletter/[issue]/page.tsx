import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Fragment } from "react"
import parse from 'html-react-parser';
import { getBBIssue, getBBIssues } from "@/lib/beehiiv"
import styles from './Page.module.css'
import Link from "next/link"
import { cn, convertDate } from "@/lib/shared-utils"

export async function generateStaticParams() {
  const posts = await getBBIssues() //deduped!

  return posts.map((post) => ({
    issue: post.guid?.split("p/")[1]
  }))
}

export async function generateMetadata({ params }: { params: { issue: string } }): Promise<Metadata> {

  const posts = await getBBIssues()
  const { issue } = params

  const post = posts.find(p => p.guid?.includes(issue))

  if (!post) return { title: 'Issue not found!' }

  return {
    title: post.title,
    description: post.contentSnippet,
    authors: [
      {
        name: 'Enric Trillo',
        url: 'https://enrictrillo.com'
      }
    ],
    viewport: {
      width: 'device-width',
      initialScale: 1
    },
    alternates: {
      canonical: `${process.env.NODE_ENV === "development" ? "https://localhost:3001" : process.env.NEXT_PUBLIC_BASE_URL}/newsletter/${params.issue}`
    },
    openGraph: {
      locale: 'en_GB',
      type: 'article',
      images: post.enclosure?.url ?? "https://media.beehiiv.com/cdn-cgi/image/format=auto,width=800,height=421,fit=scale-down,onerror=redirect/uploads/publication/thumbnail/028cc44d-1cfa-45e5-94e6-b2536e67a893/landscape_Break_Bytes__Base_Cover_.png",
      description: post.contentSnippet,
      siteName: 'Enric Trillo',
      publishedTime: post.isoDate,
      authors: 'Enric Trillo',
    },
    creator: 'ricobuilds',
    twitter: {
      creator: '@ricobuilds',
      card: 'summary_large_image',
      description: post.contentSnippet,
      site: 'https://enrictrillo.com',
      title: post.title,
      images: post.enclosure?.url ?? "https://media.beehiiv.com/cdn-cgi/image/format=auto,width=800,height=421,fit=scale-down,onerror=redirect/uploads/publication/thumbnail/028cc44d-1cfa-45e5-94e6-b2536e67a893/landscape_Break_Bytes__Base_Cover_.png",
    },
    robots: "index, follow"
  }
}

const Page = async ({ params }: { params: { issue: string } }) => {

  const posts = await getBBIssues()
  const { issue } = params

  if (!posts.find(p => p.guid?.includes(issue))) return notFound()

  const content = await getBBIssue(issue)

  let removedFooter = content?.['content:encoded'].replace(/<div class='beehiiv__footer'>[\s\S]*<\/div>/g, '')


  // console.log(piece.replace(/<div class='beehiiv__footer'>[\s\S]*<\/div>/g, ''))

  const processedContent = parse(removedFooter)

  return (
    <Fragment>

      <main className="flex flex-col flex-1 min-h-[calc(100%-52px)]">
        <section className={
          cn(
            'flex flex-col gap-4 items-center w-full px-8 mx-auto relative',
          )
        }>
          <Link href={'/newsletter'} className="absolute mt-[110px] -left-24 border group border-obsidian-300 hover:border-obsidian-600 rounded-lg p-1 active:outline-2">
            `{'>'}`
          </Link>
          <div className="flex flex-col max-w-3xl gap-4 mx-auto mt-[100px]">
            <div className="flex flex-col text-center">
              <h1 className={cn(
                "text-3xl font-bold text-center uppercase",
                "text-charkol",
              )}>{content?.title}</h1>
              <p className="text-obsidian-400">{content?.content}</p>
            </div>
            <div className="flex items-center gap-4 text-charkoalite">
              <Image src={'/headshot.jpeg'} width={600} height={600} className='w-10 h-10 rounded-full pointer-events-none select-none' alt='Enric Trillo punk avatar' />
              <div className="flex flex-col gap-1">
                <span className='font-bold text-amethyst-500'>{content?.creator}</span>
                <time dateTime={content?.isoDate as string} className="text-sm">Published {convertDate(content?.isoDate as string)}</time>
              </div>
            </div>
            <article className={styles.bloggo}>
              {processedContent}
            </article>
          </div>
        </section>
      </main>
    </Fragment>
  )
};

export default Page;