import { StructuredData } from "../components/structured-data";
import { cn } from "@/lib/shared-utils";
import dynamic from "next/dynamic";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"
import { LogoCloud } from "@/sections/logo-cloud";
import { Certifications as Certs } from "@/sections/certifications";
import { Bio } from "@/sections/bio";
import { Work } from "@/sections/work";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/constants/i18n.config";
import { logos } from "@/constants/logos";
import { Kanit } from "next/font/google";
import Balancer from "react-wrap-balancer";
import { MDXArticle } from "@/app/types/Article";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";
import { routes } from "@/lib/routes";

const kanit = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

export const metadata = {
  description: siteMetadata.description
}

const homeSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteMetadata.title,
  "description": "Enric J. 'Rico' Trillo Nchana is a fullstack developer from Croydon, London and founder of Metasyde. He continues to contributing to the future of Web3 Gaming.",
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
    "https://x.com/ricobuilds",
    "https://linkedin.com/in/enrictrillo",
    "https://youtube.com/@ricobuilds",
    "https://github.com/ricobuilds"
  ]
}

const DynamicNewsletter = dynamic(() => import("@/sections/newsletter"), {
  loading: () => <p>Loading...</p>,
})

export default async function Home({ params }: { params: { lang: Locale } }) {
  const tl = await getDictionary(params.lang);

  const profiles = [
    {
      label: "Twitter",
      url: "https://x.com/ricobuilds",
      logo: logos.twitter,
      styles: "fill-lazure-500 group-hover:fill-lazure-600"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/enrictrillo",
      logo: logos.linkedin,
      styles: "fill-celuria-500 group-hover:fill-celuria-600"
    },
    {
      label: "Youtube",
      url: "https://youtube.com/@ricobuilds",
      logo: logos.youtube,
      styles: "fill-scarlet-500 group-hover:fill-scarlet-600"
    },
    {
      label: "GitHub",
      url: "https://github.com/ricobuilds",
      logo: logos.github,
      styles: "group-hover:opacity-70"
    },
  ]

  const posts: MDXArticle[] = getAllPosts()

  // @ts-ignore
  if (posts.some(p => p.error)) {
    return
  }

  const POSTS_MAX = 5
  const slicedPostList = posts.slice(0, POSTS_MAX)
  return (
    <>
      {/* <StructuredData data={homeSchema} /> */}
      <main className="flex-1 w-full px-6">
        <div className={cn("max-w-[970px]", "mx-auto")}>
          <div className="flex flex-col gap-16 py-24 pb-10">

            <section id="hero">
              <div className="flex-1 w-full mx-auto space-y-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col max-w-[969px] text-center">
                    <h1 className={cn(kanit.className, "text-4xl md:text-[64px]")}>
                      <Balancer>{tl['home'].headline}</Balancer>
                    </h1>
                    <p className="mt-3 text-lg text-obsidian-500">
                      <Balancer>
                        {tl['home'].subheadline}
                      </Balancer>
                    </p>
                  </div>
                  <ul className="flex gap-6 mx-auto mt-6 w-fit">
                    {
                      profiles.map((i, idx) => (
                        <li key={idx} className="group">
                          <Link href={i.url} target="_blank" className="flex gap-2 group"><span className={`${i.styles} duration-150`}>{i.logo}</span></Link>
                        </li>
                      ))
                    }
                  </ul>
                  <Link href="/#work" className="px-4 py-2 mt-8 capitalize border border-charkol hover:cursor-pointer hover:border-amethyst-400 hover:bg-amethyst-500 hover:text-white">
                    {tl['home'].cta}
                  </Link>
                </div>
              </div>
            </section>
            <LogoCloud />
            {/* <Showcase/> */}
            <Bio />
            <Certs />
            <section id="writing" className="flex flex-col py-16">
              <h2 className={cn(kanit.className, "flex items-center mx-auto text-2xl font-medium px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
                Writing
              </h2>
              <p className="text-center text-obsidian-600">Check out my latest takes and tutorials</p>
              <ul className="grid w-full gap-8 mt-10 md:grid-cols-6">
                {slicedPostList.map((post, idx) => (
                  <li key={idx} className={`${idx < 2 ? 'md:col-span-3' : 'col-span-2'}`}>
                    <BlogCard post={post} lang={params.lang} />
                  </li>
                ))}
              </ul>
              <div className="flex mt-10">
                <Link href={`${params.lang}/${routes.blog}`} className="flex mx-auto">
                  <div className="flex items-center px-3 py-2 text-sm text-white rounded-full bg-charkol hover:bg-charkol/90">View All Posts</div>
                </Link>
              </div>
            </section >
            {/* <Skills/> */}
            <Work />
            <DynamicNewsletter />
          </div>
        </div>
      </main>
    </>
  );
}
