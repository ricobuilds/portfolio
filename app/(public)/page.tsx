import { SocialMedia } from "../sections/social-media";
import { Hero } from "../sections/hero";
import { Journal } from "../sections/journal";
import { Newsletter } from "../sections/newsletter";
import type { Person, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";
import { StructuredData } from "../components/structured-data";

export default function Home() {

  const schema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.title,
    description: `Enric J. "Rico" Trillo Nchana is a fullstack developer from Croydon, London and founder of Astronomik. He continues to contributing to the future of AI Gaming.`,
    url: "https://enrictrillo.com",
    "sameAs": [
      "https://twitter.com/ricobuilds",
      "https://linkedin.com/in/enrictrillo",
      "https://youtube.com/@ricobuilds",
    ]
  }

  return (
    <>
      <StructuredData data={schema} />
      <main className="w-full px-4">
        <div className="flex flex-col max-w-[696px] min-h-screen gap-16 py-24 mx-auto">
          <Hero />
          <SocialMedia />
          <Journal />
          <Newsletter />
        </div>
      </main>
    </>
  );
}
