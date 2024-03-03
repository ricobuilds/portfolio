import { Hero } from "../sections/hero";
import { Journal } from "../sections/journal";
// import { Newsletter } from "../sections/newsletter";
import { StructuredData } from "../components/structured-data";
import { Ventures } from "../sections/ventures";
import { Products } from "../sections/products"
import { Stack } from "../sections/stack";
import { Outro } from "../sections/outro";
import { cn } from "@/lib/shared-utils";
import dynamic from "next/dynamic";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"

const homeSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteMetadata.title,
  "description": "Enric J. 'Rico' Trillo Nchana is a fullstack developer from Croydon, London and founder of Metasyde. He continues to contributing to the future of AI Gaming.",
  "url": siteMetadata.siteUrl,
  "birthDate": "February 13, 1999",
  "jobTitle": "Fullstack Developer",
  "disambiguatingDescription": "Founder of Metasyde",
  "nationality": {
    "@type": "Country",
    "name": "Spain"
  },
  "birthPlace": {
    "@type": "Place",
    "name": "Alcorcón, Spain",
  },
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "Spanish"
    },
    {
      "@type": "Language",
      "name": "English"
    },
    {
      "@type": "Language",
      "name": "Portuguese"
    },
  ],
  "affiliation": {
    "@type": "Organization",
    "name": "Metasyde",
    "description": "Metasyde Ltd. is a technology company operated from London, UK. It is the AI studio driving the future of gaming with modern technologies.",
    "url": "https://metasyde.com",
    "foundingDate": "2022-03-28",
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "University of Northampton",
    "url": "https://www.northampton.ac.uk/"
  },
  "sameAs": [
    "https://twitter.com/ricobuilds",
    "https://linkedin.com/in/enrictrillo",
    "https://youtube.com/@ricobuilds",
    "https://github.com/ricobuilds"
  ]
}

const DynamicNewsletter = dynamic(() => import("../sections/newsletter"), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <>
      <StructuredData data={homeSchema} />
      <main className="w-full px-6">
        <div className={cn("max-w-[970px]", "mx-auto")}>
          <div className="flex flex-col gap-12 py-24 pb-10">
            <Hero />
            <Journal />
            <Ventures />
            <Products />
            <Stack />
            <DynamicNewsletter />
            <Outro />
          </div>
        </div>
      </main>
    </>
  );
}
