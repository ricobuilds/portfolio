import { components } from "@/app/components/portable"
import { PortableText } from "@portabletext/react"
import { fetchTermBySlug } from "@/lib/sanity/queries"

export default async function Term({ params }: { params: { term: string } }) {
  const { term } = params
  const post = await fetchTermBySlug(term)
  return (
    <main>
      {post.title} page
      <article>
        <PortableText value={post?.content} components={components} />
      </article>
    </main>
  )
}