import { components } from "@/app/components/portable"
import { PortableText } from "@portabletext/react"
import { sanityQuery } from "@/lib/sanity/utils"

export default async function Term({ params }: { params: { term: string } }) {
  const { term } = params
  const post = await sanityQuery(`*[_type == "term" && slug.current == "${term}"][0]{
    title,
    description,
    content
  }`)
  return (
    <main>
      {post.title} page
      <article>
        <PortableText value={post?.content} components={components} />
      </article>
    </main>
  )
}