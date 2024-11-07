import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Explore our Tutorials",
  description: "Learn the latest disruptive technologies you need to thrive in a world with AI, including Generative AI, RAG, Deep Learning, Python, PyTorch, CrewAI, NextJS 14, and more."
})

export default function Page() {
  return (
    <div>
      <h1>Hello from Tutorials</h1>
    </div>
  )
}