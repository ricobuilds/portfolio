import { StructuredData } from "../components/structured-data";
import { cn } from "@/lib/shared-utils";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"
import { LogoCloud } from "@/sections/logo-cloud";
import { Certifications as Certs } from "@/sections/certifications";
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
import { BeehiivCustom } from "@/components/beehiiv-custom";
import { EdgeIcon } from "@/constants/icons";
import Image from "next/image";
import AdvancedMarquee from "@/components/marquee";
import { baseWidth } from "@/constants/index";
import { clash } from "@/constants/fonts";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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
      <main className="flex-1 w-full">
        <div className={cn("", "mx-auto")}>
          <div className="flex flex-col gap-16 pt-24">

            <section id="hero">
              <div className="w-full max-w-[970px] mx-auto space-y-8">
                <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                  <div className="flex flex-col gap-6 max-w-[525px]">
                    <div className="flex flex-col">
                      <h1 className={cn(kanit.className, "text-4xl md:text-[64px]")}>
                        {tl['home']['hero'].headline}
                      </h1>
                      <p className="mt-3 text-lg text-obsidian-500">
                        {tl['home']['hero'].subheadline}
                      </p>
                    </div>
                    <ul className="hidden gap-6 w-fit">
                      {
                        profiles.map((i, idx) => (
                          <li key={idx} className="group">
                            <Link href={i.url} target="_blank" className="flex gap-2 group"><span className={`${i.styles} duration-150`}>{i.logo}</span></Link>
                          </li>
                        ))
                      }
                    </ul>
                    <Link href="/#work" className="w-fit">
                      <button className="px-4 py-2 mt-0 capitalize border w-fit border-charkol hover:cursor-pointer hover:border-amethyst-400 hover:bg-amethyst-500 hover:text-white">
                        {tl['home']['hero'].cta}
                      </button>
                    </Link>
                  </div>
                  <Image src="/images/hero__image.png" width={800} height={800} alt="" className="w-[420px] h-[420px] bg-gradient-to-b rounded-t-full from-amethyst-500 aspect-square to-amethyst-500" />
                </div>
              </div>
              <section id="marquee" className="relative">
                <div className="h-16 border-black bg-amethyst-500 border-y-2"></div>
                <div className="flex items-center h-16 text-white -translate-y-10 -skew-y-3 bg-black border-black border-y-4">
                  <AdvancedMarquee
                    play={true}
                    autoFill
                    pauseOnHover={true}
                    speed={50}
                    separator={<span className="mx-4 text-xl">✦</span>}
                  >
                    {tl['home']['hero'].marquee.map((i, idx) => (
                      <span key={idx} className="mx-4">{i}</span>
                    ))}
                  </AdvancedMarquee>
                </div>
              </section>
            </section>
            {/* <LogoCloud /> */}
            {/* <Showcase/> */}

            <section id="bio" className="left-0 flex flex-col px-4 py-16 mt-0 max-w-screen">
              <h2 className={cn(kanit.className, "flex items-center  text-center text-2xl font-medium px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                About Me
              </h2>
              <p className="text-center text-obsidian-500">Get to learn about the man behind the face.</p>
              <div className="flex flex-col items-center lg:flex-row gap-16 w-full max-w-[970px] mx-auto mt-10">
                <div className="relative flex w-full max-w-lg aspect-auto">
                  <Image src="/images/graduation.jpg" width={600} height={0} alt={tl['home']['bio'].alt} />
                </div>
                <div
                  className={cn(
                    "p-4 bg-transparent border flex max-w-lg w-full mx-auto relative",
                  )}
                >
                  <EdgeIcon className="absolute w-6 h-6 text-black -top-3 -left-3 dark:text-white" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -bottom-3 -left-3 dark:text-white" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -top-3 -right-3 dark:text-white" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -bottom-3 -right-3 dark:text-white" />

                  <div className="relative z-10 flex flex-col w-full h-full">
                    <div className="">
                    </div>
                    <div className="h-fit w-fit">
                      <div className="flex flex-col gap-4 mt-6">
                        <h2 className={"font-bold text-xl"}>{tl['home']['bio'].greeting}</h2>
                        <p>{tl['home']['bio'].intro}.</p>
                        <p>{tl['home']['bio'].background}.</p>
                        <p>{tl['home']['bio'].context}.</p>
                        <p>{tl['home']['bio'].beyondTech}.</p>
                      </div>
                      <Link href={routes.about}>
                        <button className="px-4 py-2 mt-4 text-white bg-charkol">{tl['home']['bio'].cta}</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Certs />
            <section id="writing">
              <div className={cn(baseWidth, "flex flex-col py-16 mx-auto")}>
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
              </div>
            </section >
            {/* <Skills/> */}
            {/* <section id="faq" className="flex flex-col py-16"></section> */}

            {/* <Work /> */}
            <section id="shift-forward" className="flex flex-col py-16">
              <h2 className={cn(kanit.className, "flex items-center  text-center text-2xl font-medium px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                Shift Forward Newsletter
              </h2>
              <div className="w-full max-w-3xl mx-auto">
                <h3 className={cn("flex items-center mx-auto mb-3 text-lg font-medium text-center w-fit")}>
                  <Balancer>{tl['home']['newsletter'].subheadline}</Balancer>
                </h3>
                <div className="flex max-w-lg mx-auto mt-4">
                  <BeehiivCustom tl={tl['home']['newsletter']} />
                </div>
                <div className="w-full mt-3 text-center">
                  <div className="pb-4">
                    <span id="lipline" className="text-xs text-slate-400">{tl['home']['newsletter'].note}</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="cta" className="flex flex-col px-6">
              <div className="flex flex-col lg:flex-row gap-6 justify-between p-28 py-16 bg-amethyst-500 max-w-[1360px] mx-auto w-full">
                <div className="flex flex-col text-white">
                  <h2 className={cn(clash.className, "text-4xl font-semibold")}>Have an interesting idea for me?</h2>
                  <p>Get in touch if you have a project idea, feedback, or want me to guest write on your publication.</p>
                </div>
                <div className="flex items-center ">
                  <Link href="#">
                    <Button className="flex items-center gap-2 text-black bg-white">
                      <Send className="w-4 h-4" />
                      Let's Talk
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
