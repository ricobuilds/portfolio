import type { Organization, WebPage, WithContext } from "schema-dts"
import { siteMetadata } from "@/lib/site.metadata";
import { homeSchema } from "./home";

// const aboutSchema: WithContext<WebPage> = {
//   '@context': 'https://schema.org',
//   '@type': 'AboutPage',
//   mainEntity: {
//     '@type': "AboutPage",
//     name: `About Me ${siteMetadata.title}`,
//     description: "From pixels to code, I’m a full-stack developer and content creator dropping daily insights on the future of AI gaming.",
//     about: {
//       "@type": "Person",
//       "name": "Enric J Trillo Nchana",
//       "url": "https://enrictrillo.com",
//       // @ts-ignore
//       description: homeSchema["description"],
//       worksFor: {
//         "@type": "Organization",
//         "name": "Astronomik Labs",
//         "url": "https://astronomik.co",
//         "description": "A studio contritbuting to the future of gaming with A.I.",
//         "foundingDate": "2022-03-28"
//       }
//     }
//   }
// }

export const aboutSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteMetadata.title,
  "url": siteMetadata.siteUrl + "/about",
  "description": "Description of your organization and what it does.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Street Name",
    "addressLocality": "City",
    "postalCode": "12345",
    "addressCountry": "Country"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-234-567-8910",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://youtube.com/@ricobuilds",
    "https://twitter.com/ricobuilds",
    "https://linkedin.com/in/enrictrillo"
  ],
  "logo": "https://yourwebsite.com/logo.png"
}