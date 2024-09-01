import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

interface ICCard {
  company: string
  title: string
  image: string
  date: string
  url?: string
}

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

const certs: ICCard[] = [
  {
    company: "Google",
    title: "Fundamentals of Digital Marketing",
    image: "google",
    date: "February 2022",
    url: "https://skillshop.exceedlms.com/student/collection/654330-digital-marketing?sid=0339c211-017a-43b7-9485-6c24e997a4aa&sid_i=1"
  },
  {
    company: "Semrush",
    title: "Keyword Research with Semrush",
    image: "semrush",
    date: "",
    url: ""
  },
  {
    image: "deeplearningai",
    company: "DeepLearning.ai",
    title: "Build LLM Apps with LangChain.js",
    date: "",
    url: "",
  },
]

const CertificationCard = ({ company, title, image, url }: ICCard) => {
  return (
  <Link href={url ? url+"?ref=enrictrillo" : "#"} target={url?.includes("https://") ? "_blank" : ""}>
      <li className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring ring-opacity-5 ring-obsidian-300">
        <div className="flex flex-col flex-1 p-8">
          <Image className="flex-shrink-0 w-12 h-12 mx-auto rounded-full" src={"/images/certs/" + image + ".jpeg"} alt={image + "_logo"} width={300} height={300} />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{company}</h3>
          <dl className="flex flex-col justify-between flex-grow mt-1">
            <dt className="sr-only">Certification</dt>
            <dd className="text-sm text-gray-500">{title}</dd>
          </dl>
        </div>
      </li>
    </Link>
  )
}

export const Certifications = () => {
  return (
    <section id="certifications" className="flex flex-col items-center py-16">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Experience
      </h2>
      <p className="text-obsidian-500">I&apos;m certified by top technology companies</p>
      <div className="mt-10">
        <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {
            certs.map(({ company, title, image, date,  url }, idx) => (
              <CertificationCard key={idx} company={company} title={title} image={image} url={url} date={date} />
            ))
          }
        </ul>
      </div>
    </section>
  )
}