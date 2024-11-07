import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Privacy Policy"
})

export default function Page() {
  return (
    <div>
      <h1>Hello from Privacy</h1>
    </div>
  )
}