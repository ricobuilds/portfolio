import Image from "next/image"

export default function Subscribe() {
  const name = "Enric Trillo"
  return (
    <main className="w-full">
      <div className="relative flex items-center h-screen p-4">
        <div className="flex w-full max-w-5xl mx-auto -mt-10 space-x-0 sm:space-x-8">
          <div className="">
            <div className="mb-8">
              <div className="relative w-24 h-24 overflow-hidden bg-white border rounded-full shadow-md">
                <Image src={"/headshot.jpeg"} className="absolute inset-0 object-cover w-full h-full" height={200} width={200} alt="" />
              </div>
            </div>
            <div className="w-full mb-8">
              <h1 className="text-6xl font-semibold">Boundless</h1>
              <p className="text-2xl">Sharing insights on modern gaming every Someday. To help you build companies, make art, and find your life&apos;s work.</p>
            </div>
            <div className="w-full mb-10">
              <div className="w-full max-w-md rounded-lg">
                <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
              </div>
            </div>
            <div className="w-full">
              <div className="pt-4">
                <span className="text-slate-400">I&apos;ll send emails every x time. No spam.</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative hidden w-64 h-64 overflow-hidden sm:block">
              <Image src={"/headshot.jpeg"} fill className="inset-0" alt="" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div id="copy" className="text-sm">&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
        </div>
      </div>
    </main>
  )
}