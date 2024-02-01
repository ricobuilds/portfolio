import type { Person, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";

const homeSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteMetadata.title,
  description: `Enric J. "Rico" Trillo Nchana is a fullstack developer from Croydon, London and founder of Astronomik. He continues to contributing to the future of AI Gaming.`,
  url: "https://enrictrillo.com",
  birthDate: "February 13, 1999",
  birthPlace: "Alcorcón",
  alumniOf: 'University of Northampton',
  "sameAs": [
    "https://twitter.com/ricobuilds",
    "https://linkedin.com/in/enrictrillo",
    "https://youtube.com/@ricobuilds",
  ]
}

export { homeSchema }