import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Explore our Tutorials",
  description: "The disruptive technology tutorials you need to thrive in a world with AI. Tools covered include Python, PyTorch, CrewAI and more."
})

export default function Page() {
  return (
    <div>
      <h1>Hello from Tutorials</h1>
    </div>
  )
}