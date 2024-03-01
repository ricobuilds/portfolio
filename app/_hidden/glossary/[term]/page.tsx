// import { BlockWrapper, serialisers } from "@/app/components/codeblock"
import { components } from "@/app/components/portable"
import { PortableText } from "@portabletext/react"
import { sanityQuery } from "@/lib/sanity/utils"
import { fetchTermByID } from "@/lib/sanity/queries"

async function getGlossaryTerm(slug: string) {
  const article = await sanityQuery(fetchTermByID(slug))
  return article
}

export default async function Term({ params }: { params: { term: string } }) {
  const { term } = params
  const post = await getGlossaryTerm(term)
  return (
    <main>
      {post.title} page
      <article>
        <PortableText value={post?.content} components={components} />
      </article>
    </main>
  )
}