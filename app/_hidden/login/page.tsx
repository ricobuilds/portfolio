import { generateMetadata } from "@/lib/seo"

export const metadata = generateMetadata({
  title: "Get Started",
})

export default function Login() {
  return (
    <div>
      <h1>Hello from Login</h1>
    </div>
  )
}