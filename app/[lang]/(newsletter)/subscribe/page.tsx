import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import { Kanit } from "next/font/google"
import { routes } from "@/lib/routes"
import Link from "next/link"
import { generateMetadata } from "@/lib/seo"
import { BeehiivCustom } from "../../components/beehiiv-custom"
import { Locale } from "@/constants/i18n.config"
import { getTranslations } from "../../dictionaries"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

export const metadata = generateMetadata({
  title: "Shift Forward: Disruptive Tech Analysis",
  description: "Get expert insights on the hottest in disruptive technologies, Metasyde products and behind-the-scenes. Subscribe now to thrive in an AI-driven world."
})

export default async function Subscribe({ params }: { params: { lang: Locale } }) {
  const name = "Metasyde Ltd"

  const tl = await getTranslations(params.lang)

  return (
    <>
      {/* <StructuredData data={subscribeSchema} /> */}
      <main className="w-full">
        <div className="relative flex items-center h-screen p-4">
          <div className="flex flex-col gap-6 mx-auto">
            <div className="flex w-full max-w-5xl -mt-10 space-x-0 sm:space-x-8">
              <div id="content">
                <div className="flex justify-center mb-8 sm:justify-start">
                  <div className="relative w-24 h-24 overflow-hidden bg-white border rounded-full shadow-md">
                    <Image priority src={"/images/headshot.jpeg"} className="absolute inset-0 object-cover w-full h-full" height={200} width={200} alt="headshot of Enric Trillo, Founder of Metasyde" />
                  </div>
                </div>
                <div className="w-full max-w-2xl mb-8">
                  <h1 className={cn(heroFont.className, "text-6xl font-semibold text-center sm:text-left")}>Shift Forward Newsletter</h1>
                  <p className="text-2xl text-center sm:text-left">Actionable insights on disruptive tech you need to thrive in the age of AI － relaunching soon.</p>
                </div>
                <div className="w-full mb-10">
                  <div className="w-full rounded-lg sm:max-w-md">
                    <BeehiivCustom tl={tl['home']['newsletter']} />
                  </div>
                </div>
                <div className="w-full">
                  <div className="pt-4">
                    <span id="lipline" className="flex justify-center text-slate-400 sm:justify-start">I never spam or sell your data. Unsubscribe anytime.</span>
                  </div>
                </div>
              </div>
              <div id="art" className="flex items-center">
                <div className="relative hidden w-64 h-64 overflow-hidden shadow-lg pointer-events-none sm:block">
                  <Image priority src={"/images/sf-logo.png"} fill className="inset-0 scale-x-100 border-2 rounded border-charkol" alt="Shift Forward Newsletter" />
                </div>
              </div>
            </div>
            <Link href={routes.home} className="flex justify-center sm:justify-start">
              <button className="relative flex items-center justify-center h-12 px-6 font-medium rounded-md sm:justify-start bg-obsidian-100 group"><span>Back to homepage</span><div className="ml-1 transition-all duration-200 -rotate-45 group-hover:rotate-0"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></button>
            </Link>
          </div>
          <div className="absolute -translate-x-1/2 bottom-4 sm:left-4 sm:translate-x-0 left-1/2 w-96">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Owned by <span className="text-charkol">{name}</span>. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  )
}