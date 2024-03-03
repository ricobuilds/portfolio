import { StructuredData } from "@/app/components/structured-data"
import { cn } from "@/lib/shared-utils"
import { siteMetadata } from "@/lib/site.metadata"
import Image from "next/image"
import { WebPage, WithContext } from "schema-dts"
import { Kanit } from "next/font/google"
import { Metadata } from "next"
import { routes } from "@/lib/routes"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

const title = "The Metasyde: AI Gaming & Metaverse News"
const description = "Stay ahead with The Metasyde newsletter for top AI Gaming and Metaverse insights. Subscribe now for the latest news and analysis."

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: siteMetadata + routes.subscribe
  },
  openGraph: {
    locale: 'en_GB',
    title: title,
    type: 'website',
    url: siteMetadata.siteUrl + routes.subscribe,
    images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/subscribe-og.png`,
    description: description,
    siteName: siteMetadata.title,
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@ricobuilds',
    site: '@ricobuilds',
    images: `${process.env.NODE_ENV === "production" ? "https://enrictrillo.com" : "http://localhost:3000"}/subscribe-og.png`,
  },
  robots: "index, follow"
}

export default function Subscribe() {
  const name = "Metasyde Ltd"

  const subscribeSchema: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    "name": "Subscribe Page",
    "description": "Subscribe to the Metasyde newsletter for the latest updates on AI Gaming and the Metaverse.",
    "url": siteMetadata.siteUrl + "/subscribe",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteMetadata.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Newsletter",
          "item": siteMetadata.siteUrl + "/subscribe",
        }
      ]
    },
  }

  return (
    <>
      <StructuredData data={subscribeSchema} />
      <main className="w-full">
        <div className="relative flex items-center h-screen p-4">
          <div className="flex w-full max-w-5xl mx-auto -mt-10 space-x-0 sm:space-x-8">
            <div className="">
              <div className="flex justify-center mb-8 sm:justify-start">
                <div className="relative w-24 h-24 overflow-hidden bg-white border rounded-full shadow-md">
                  <Image priority src={"/headshot.jpeg"} className="absolute inset-0 object-cover w-full h-full" height={200} width={200} alt="headshot of Enric Trillo, Founder of Metasyde" />
                </div>
              </div>
              <div className="w-full mb-8">
                <h1 className={cn(heroFont.className, "text-6xl font-semibold text-center sm:text-left")}>The Metasyde</h1>
                <p className="text-2xl text-center sm:text-left">Keep up with top news & insights on AI Gaming and the Metaverse, by Metasyde － relaunching soon.</p>
              </div>
              <div className="w-full mb-10">
                <div className="w-full rounded-lg sm:max-w-md">
                  <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
                </div>
              </div>
              <div className="w-full">
                <div className="pt-4">
                  <span id="lipline" className="flex justify-center text-slate-400 sm:justify-start">I never spam or sell your data. Unsubscribe anytime.</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative hidden w-64 h-64 overflow-hidden shadow-lg pointer-events-none sm:block">
                <Image priority src={"https://illustrations.popsy.co/purple/man-riding-a-rocket.svg"} fill className="inset-0 scale-x-100 border-2 rounded border-charkol" alt="The Metasyde" />
              </div>
            </div>
          </div>
          <div className="absolute -translate-x-1/2 bottom-4 sm:left-4 sm:translate-x-0 left-1/2 w-96">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  )
}