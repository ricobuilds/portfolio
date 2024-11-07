
import { getBBInfo, getBBIssues } from "@/lib/beehiiv"
import Image from "next/image"
import Link from "next/link"

export default async function Page() {
  const items = await getBBIssues()
  const info = await getBBInfo()

  return (
    <div className="max-w-[966px] mx-auto">
      <div className="flex flex-col items-center mt-8">
        <Image src={`${info.image?.url ?? ""}`} alt="BB Logo" className="rounded-lg" width={80} height={80} />
        <div className="text-center">
          <h1 className="text-4xl font-medium sm:text-6xl">{info.title}</h1>
          <p className=" sm:text-xl">{info.description}</p>
        </div>
        <div className="w-full max-w-md mt-4 rounded-lg">
          <iframe src="https://embeds.beehiiv.com/3c368bcd-bcd6-4c10-9330-43ca61994c35?slim=true" className="w-full" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: '0', borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {
          items.map((item, idx) => (
            <Link href={`/newsletter/${item.guid?.split("p/")[1]}`} key={idx} className="flex flex-col gap-2">
              <Image src={`${item.enclosure?.url ?? "https://media.beehiiv.com/cdn-cgi/image/format=auto,width=800,height=421,fit=scale-down,onerror=redirect/uploads/publication/thumbnail/028cc44d-1cfa-45e5-94e6-b2536e67a893/landscape_Break_Bytes__Base_Cover_.png"}`} width={1200} height={630} alt="" className="rounded-md" />
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-obsidian-400">{item.contentSnippet}</p>
            </Link>
          ))
        }
      </section>
    </div>
  )
}