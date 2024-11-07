import { cn } from "@/lib/shared-utils"
import { baseWidth } from "@/constants/index"
import { MDXArticle } from "@/app/types/Article"
import { getAllPosts } from "@/lib/mdx"
import { generateMetadata } from "@/lib/seo"
import { BlogCard } from "@/components/blog-card"
import { Spacer } from "@/components/spacer"
import { Locale } from "@/constants/i18n.config"

export const metadata = generateMetadata({
  title: 'Blog',
  description: "Sharing my thoughts and what I learn as a Fullstack Developer – covering many topics including fullstack development, AI development, gaming and more.",
  keywords: "disruptive technology, full stack developer, blog, tech insights"
})

export default async function Blog({ params }: { params: { lang: Locale } }) {

  const posts: MDXArticle[] = getAllPosts()

  return (
    <>
      {/* <StructuredData data={schema} />
      <StructuredData data={breadcrumbSchema} /> */}
      <main className="w-full">
        <div className={cn("max-w-[1360px]", "w-full mx-auto")}>
          <div className="relative flex flex-col w-full gap-10 px-6 pt-20">
            <h1 className="text-6xl font-semibold">Blog ({posts.length})</h1>
            {
              posts.length > 0 ? (
                <ul className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {
                    posts.map((post) => (
                      <li key={post.slug}>
                        <BlogCard post={post} lang={params.lang} />
                      </li>
                    ))
                  }
                </ul>
              ) : <p>No posts here... yet.</p>
            }
          </div>
          <Spacer className="mt-24"/>
        </div>
      </main>
    </>
  )
}