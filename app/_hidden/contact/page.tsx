import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Contact",
  description: "This EnricTrillo.com contact page is for hiring/contracting, media, collaboration inquiries, feedback and suggestions. We do not respond to each request but do read each one."
})

export default function Contact() {
  return (
    <div>
      <h1>Hello from Contact</h1>
    </div>
  )
}