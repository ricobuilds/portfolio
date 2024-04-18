import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Image from "next/image"

interface ICCard {
  company: string
  title: string
  image: string
}

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

const certs: ICCard[] = [
  {
    company: "Google",
    title: "Fundamentals of Digital Marketing",
    image: "google"
  },
  {
    company: "Semrush",
    title: "Keyword Research with Semrush",
    image: "semrush"
  },
  {
    company: "DeepLearning.ai",
    title: "Build LLM Apps with LangChain.js",
    image: "deeplearningai"
  },
]

const CertificationCard = ({ company, title, image }: ICCard) => {
  return (
    <li className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring ring-opacity-5 ring-obsidian-300">
      <div className="flex flex-col flex-1 p-8">
        <Image className="flex-shrink-0 w-12 h-12 mx-auto rounded-full" src={"/certs/"+image+".jpeg"} alt={image+"_logo"} width={300} height={300} />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{company ?? "Company Name"}</h3>
        <dl className="flex flex-col justify-between flex-grow mt-1">
          <dt className="sr-only">Certification</dt>
          <dd className="text-sm text-gray-500">{title ?? "Certification Title"}</dd>
        </dl>
      </div>
    </li>
  )
}

export const Certifications = () => {
  return (
    <section id="certifications" className="flex flex-col items-center py-16">
      <h2 className={cn(kanit.className, "flex items-center text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
        Certifications
      </h2>
      <p className="text-obsidian-500">I&apos;m certified by top technology companies.</p>
      <div className="mt-10">
        <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            certs.map(({ company, title, image }, idx) => (
              <CertificationCard key={idx} company={company} title={title} image={image} />
            ))
          }
        </ul>
      </div>
    </section>
  )
}