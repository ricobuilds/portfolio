import { routes } from "@/lib/routes";
import { cn } from "@/lib/shared-utils";
import { Kanit } from "next/font/google";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { generateMetadata } from "@/lib/seo";

const heroFont = Kanit({
  weight: "800",
  subsets: ["latin"]
})


export const metadata = generateMetadata({
  title: "Thank You!"
})

export default function JoinedNewsletter() {
  return (
    <main className="flex h-screen px-6">
      <div className="m-auto max-w-[800px] w-full flex flex-col items-center gap-8 py-36 text-center">
        <h1 className={cn("text-4xl", heroFont.className)}>Thanks for subscribing to The Metasyde</h1>
        <p className=""><Balancer>{"This is your official confirmation. The newsletter is sent out on Thursdays"}</Balancer></p>
        <Link href={routes.home} className="px-4 py-2 w-fit rounded-xl bg-amethyst-400 bg-opacity-20 text-amethyst-500">
          Go to Home page
        </Link>
      </div>
    </main>
  )
}