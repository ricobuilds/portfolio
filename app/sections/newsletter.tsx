import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export default function Newsletter() {
  return (
    <section id="newsletter" className="flex flex-col gap-10">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Newsletter
      </h2>
      {/* <h3 className="mt-6 text-2xl italic font-bold">The Metasyde</h3> */}
      <div className="">
        <p className="hidden mb-8">Get notified when I write something about top news & insights on AI Gaming and the Metaverse, or launch a new project right in your inbox.</p>
        <div className="w-full rounded-lg">
          <iframe src="https://embeds.beehiiv.com/b75aa27d-fe4f-4509-a4dc-82824921d067" className="w-full h-72" id="beehiiv-embed" data-test-id="beehiiv-embed" frameBorder="0" scrolling="yes" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
        </div>
        <div className="w-full text-center">
          <div className="pt-4">
            <span id="lipline" className="text-sm text-slate-400">Ps: I send emails every week, never spam or sell your data.</span>
          </div>
        </div>
      </div>
    </section>
  )
}