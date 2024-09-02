import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "DMCA Notice"
})

export default function DMCA() {
  return (
    <div>
      <h1>Hello from DMCA</h1>
    </div>
  )
}