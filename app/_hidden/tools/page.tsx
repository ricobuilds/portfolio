import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Free Tools"
})

export default function Page() {
  return (
    <div>
      <h1>Hello from Tools</h1>
    </div>
  )
}