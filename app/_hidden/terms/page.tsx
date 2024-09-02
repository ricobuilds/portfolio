import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Terms of Service"
})

export default function Page() {
  return (
    <div>
      <h1>Hello from Terms</h1>
    </div>
  )
}