import type { WebPage, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";
import { homeSchema } from "./home";

const aboutSchema: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  mainEntity: {
    '@type': "AboutPage",
    name: `About Me ${siteMetadata.title}`,
    description: "From pixels to code, I’m a full-stack developer and content creator dropping daily insights on the future of AI gaming.",
    about: {
      "@type": "Person",
      "name": "Enric J Trillo Nchana",
      "url": "https://enrictrillo.com",
      // @ts-ignore
      description: homeSchema["description"],
      worksFor: {
        "@type": "Organization",
        "name": "Astronomik Labs",
        "url": "https://astronomik.co",
        "description": "A studio contritbuting to the future of gaming with A.I.",
        "foundingDate": "2022-03-28"
      }
    }
  }
}

export { aboutSchema }