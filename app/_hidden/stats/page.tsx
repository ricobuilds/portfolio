import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Stats"
})

export default function Stats() {
  return (
    <div>
      <h1>Hello from Stats</h1>
    </div>
  )
}