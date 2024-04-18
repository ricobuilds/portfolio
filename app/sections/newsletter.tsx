import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Balancer from "react-wrap-balancer"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export default function Newsletter() {
  const type = "FREE"
  const resource = "market report"
  const solution = "get exclusive insights on Web3 Gaming"
  return (
    <section id="newsletter" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
        Metasyde Newsletter
      </h2>
      <div className="w-full max-w-2xl mx-auto">
        <h3 className={cn("flex items-center mx-auto mb-3 text-lg font-medium text-center w-fit")}>
          <Balancer>Get notified when I push out top alpha on AI, Web3 Gaming & Metaverse, or launch a new Metasyde project right in your inbox.</Balancer>
        </h3>
        <p className="mx-auto mb-8 text-center"></p>
        <div className="flex justify-center pb-1">
          <span id="browline" className="invisible hidden text-sm text-slate-400">{`Subscribe and get a ${type.length > 0 ? type : "FREE"} ${resource.length > 0 ? resource : " [resource]"} to ${solution.length > 0 ? solution : "[solution]"}.`}</span>
        </div>
        <div className="flex justify-center w-full">
          <iframe src="https://embeds.beehiiv.com/b75aa27d-fe4f-4509-a4dc-82824921d067?slim=true" className="w-[448px] h-[80px] mx-auto" id="beehiiv-embed" data-test-id="beehiiv-embed" frameBorder="0" scrolling="yes" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
        </div>
        <div className="w-full text-center">
          <div className="pt-4">
            <span id="lipline" className="text-xs text-slate-400">Ps: I send emails every week, never spam or sell your data.</span>
          </div>
        </div>
      </div>
    </section>
  )
}