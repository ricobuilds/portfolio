import { StructuredData } from "@/app/components/structured-data"
import { subscribeSchema } from "@/lib/web-schemas/subscribe"
import Image from "next/image"

export default function Subscribe() {
  const name = "Enric Trillo"
  return (
    <>
      <StructuredData data={subscribeSchema} />
      <main className="w-full">
        <div className="relative flex items-center h-screen p-4">
          <div className="flex w-full max-w-5xl mx-auto -mt-10 space-x-0 sm:space-x-8">
            <div className="">
              <div className="flex justify-center mb-8 sm:justify-start">
                <div className="relative w-24 h-24 overflow-hidden bg-white border rounded-full shadow-md">
                  <Image src={"/headshot.jpeg"} className="absolute inset-0 object-cover w-full h-full" height={200} width={200} alt="" />
                </div>
              </div>
              <div className="w-full mb-8">
                <h1 className="text-6xl font-semibold text-center sm:text-left">The Metasyde</h1>
                <p className="text-2xl text-center sm:text-left">Keep up with top news & insights on AI Gaming and the Metaverse, by Metasyde － mailed every Thursday.</p>
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
              <div className="relative hidden w-64 h-64 overflow-hidden sm:block">
                <Image src={"/headshot.jpeg"} fill className="inset-0" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute -translate-x-1/2 bottom-4 sm:left-4 sm:translate-x-0 left-1/2">
            <div id="copy" className="flex justify-center text-sm sm:justify-start">&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
          </div>
        </div>
      </main>
    </>
  )
}