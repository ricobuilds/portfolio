import { StructuredData } from "../components/structured-data";
import { cn } from "@/lib/shared-utils";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"
import { LogoCloud } from "@/sections/logo-cloud";
import { Work } from "@/sections/work";
import Link from "next/link";
import { getTranslations } from "../dictionaries";
import { Locale } from "@/constants/i18n.config";
import Balancer from "react-wrap-balancer";
import { MDXArticle } from "@/app/types/Article";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";
import { routes } from "@/lib/routes";
import { BeehiivCustom } from "@/components/beehiiv-custom";
import { EdgeIcon } from "@/constants/icons";
import Image from "next/image";
import Marquee from "@/components/magicui/marquee";
import { baseWidth } from "@/constants/index";
import { clash } from "@/constants/fonts";
import { Button } from "@/components/ui/button";
import { Bot, CheckCircle, Cpu, Layers, Lightbulb, Send, Wrench, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skills } from "@/sections/skills";
import { StickyScroll } from "@/components/aceternity/scroll-reveal";

export const metadata = {
  description: siteMetadata.description
}

const homeSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Enric Jeremy Trillo Nchana",
  "alternateName": "Rico",
  "image": "https://enrictrillo.com/graduation.jpg",
  "description": "Enric J. 'Rico' Trillo Nchana is a Fullstack and AI agents developer from Croydon, London building Metasydea company focused on disruptive tech, and Kaiser, an internal team of AI multi-agents for personal brand and business efforts.",
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
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University of Northampton",
    "url": "https://www.northampton.ac.uk/"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Metasyde",
    "url": "https://metasyde.com",
    "foundingDate": "2022-03-28",
    "description": "A media & technology company operated remote from London, UK, focused on building disruptive tech and AI multi-agent systems"
  },
  "sameAs": [
    "https://x.com/ricobuilds",
    "https://twitter.com/ricobuilds",
    "https://linkedin.com/in/enrictrillo",
    "https://youtube.com/@ricobuilds",
    "https://github.com/ricobuilds",
    "https://medium.com/@enrictrillo",
    "https://find-and-update.company-information.service.gov.uk/company/14006690"
  ],
  "knowsAbout": [
    "Disruptive Technologies",
    "Multi-Agent Systems",
    "AI",
    "Fullstack Development",
    "NextJS",
    "React",
    "TypeScript",
    "Python",
    "System Design"
  ],
  "brand": {
    "@type": "Brand",
    "name": "ricobuilds"
  },
  "potentialAction": {
    "@type": "SubscribeAction",
    "target": "https://enrictrillo.com/subscribe"
  }
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const tl = await getTranslations(params.lang);

  const posts: MDXArticle[] = getAllPosts()

  // @ts-ignore
  if (posts.some(p => p.error)) {
    return
  }

  const POSTS_MAX = 5
  const slicedPostList = posts.slice(0, POSTS_MAX)

  const faqs = [
    {
      question: "What are disruptive technologies?",
      answer: "Disruptive technology is an umbrella term that refers to innovative solutions that bring massive change in how individuals, businesses and existing industries work. The technologies this term covers includes Artificial Intelligence, Robotics, Blockchain, Extended Reality and Internet of Things.",
      icon: <Cpu className="w-5 h-5 mr-2" />,
    },
    {
      question: "What exactly is a multi-agent system?",
      answer: "Multi-agent systems involve multiple AI systems working together to solve complex tasks autonomously. My current personal project, Kaiser, focuses on building a team of agents that automate my workflows and 100x my productivity.",
      icon: <Bot className="w-5 h-5 mr-2" />,
    },
    {
      question: "Why is MAS important for individuals/businesses?",
      answer: "Multi-agent systems are important to individuals and businesses alike because they help us delegate the repetitive grunt in our processes, while we the humans, focus on applying our creativity that makes us fulfilled with work.",
      icon: <Lightbulb className="w-5 h-5 mr-2" />,
    },
    {
      question: "What tools and technologies do you work with?",
      answer: "I'm proficient in modern full-stack technologies (React, Node.js, and NextJS), AI tools (LangChain, Pytorch, CrewAI) and software tools like MongoDB, PostgreSQL, TailwindCSS, Framer Motion and others.",
      icon: <Wrench className="w-5 h-5 mr-2" />,
    },
    {
      question: "How do you approach full-stack projects?",
      answer: "Whether it's a web app or AI system, I tackle all my projects with a systems-first approach, considering both front-end and back-end components (and beyond) to build seamless solutions that scale.",
      icon: <Layers className="w-5 h-5 mr-2" />,
    },
    {
      question: "How do you stay updated with the latest tech trends?",
      answer: "I'm committed to continuous learning. I regularly attend virtual tech conferences, participate in online courses, and experiment with new technologies in personal projects to stay at the forefront of the industry. I also have my team of minions–cough, AI Agents–scout the web for relevant trends and developments in my topics of interest.",
      icon: <Zap className="w-5 h-5 mr-2" />,
    },
  ]

  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="flex items-center justify-center w-full h-full text-white">
          <Image
            src="/linear.webp"
            width={300}
            height={300}
            className="object-cover w-full h-full"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
        </div>
      ),
    },
  ];

  return (
    <>
      <StructuredData data={homeSchema} />
      <main className="flex-1 w-full">
        <div className={cn("mx-auto")}>
          <div className="flex flex-col">
            <section id="hero" className="pt-20 bg-amethyst-200 bg-opacity-40">
              <div className="w-full max-w-[970px] mx-auto">
                <div className="absolute inset-0 -z-10"></div>
                <div className="absolute opacity-40 -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                  <div className="flex flex-col gap-6 px-6 sm:px-0 max-w-[525px]">
                    <div className="flex flex-col">
                      <h1 className={cn(clash.className, "text-4xl font-bold md:text-[56px]")}>
                        {tl['home']['hero'].headline}
                      </h1>
                      <p className="mt-3 text-lg text-obsidian-500">
                        {tl['home']['hero'].subheadline}.
                      </p>
                    </div>
                    <Link href="/#work" className="w-fit">
                      <button
                        className="px-4 py-2 text-sm border-2 capitalize w-fit bg-tingual-500 text-white border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                      >
                        {tl['home']['hero'].cta}
                      </button>
                    </Link>
                  </div>
                  <Image src="/images/hero__image.png" width={800} height={800} alt="" className="w-[400px] h-[400px]" />
                </div>
              </div>
            </section>
            <section id="marquee" className="z-10">
              <div className="h-16 border-black bg-amethyst-500 border-y-2"></div>
              <div className="flex items-center h-16 text-white -translate-y-10 -skew-y-3 bg-black border-black border-y-2">
                <Marquee
                  repeat={4}
                  pauseOnHover
                >
                  {tl['home']['hero'].marquee.map((i, idx) => (
                    <div key={idx} className="flex items-center">
                      <span>{i}</span>
                      <span className="ml-4 text-xl">✦</span>
                    </div>
                  ))}
                </Marquee>
              </div>
            </section>
            {/* <LogoCloud /> */}
            {/* <Showcase/> */}
            {/* <StickyScroll content={content} /> */}
            <section id="social-proof" className="hidden">
              <div className="px-6 py-8">
                <p className={cn(clash.className, "font-bold uppercase mx-auto text-center text-2xl lg:text-3xl")}>What People Say</p>
                <p>what others have said here</p>
              </div>
            </section>
            <section id="bio" className="left-0 flex flex-col px-4 py-16 mt-0 max-w-screen">
              <h2 className={cn(clash.className, "flex items-center font-bold text-center text-4xl px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                About Me
              </h2>
              <p className="text-center text-obsidian-500">Get to learn about the man behind the face</p>
              <div className="flex flex-col items-center lg:flex-row gap-16 w-full max-w-[970px] mx-auto mt-10">
                <div className="relative flex w-full max-w-lg aspect-auto">
                  <Image src="/images/graduation.jpg" width={600} height={0} alt={tl['home']['bio'].alt} />
                </div>
                <div
                  className={cn(
                    "p-4 bg-transparent border dark:border-obsidian-800 flex max-w-lg w-full mx-auto relative",
                  )}
                >
                  <EdgeIcon className="absolute w-6 h-6 text-black -top-3 -left-3" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -bottom-3 -left-3" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -top-3 -right-3" />
                  <EdgeIcon className="absolute w-6 h-6 text-black -bottom-3 -right-3" />

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
            <section id="tutorials" className="bg-citrine-200">
              <div className="px-6 py-8 border-t-2 border-black sm:py-24 sm:px-12 lg:max-w-none">
                <div className="grid gap-8 mx-auto max-w-screen-2xl lg:grid-cols-2 lg:gap-20">
                  <Image src="" alt="" />
                  <div className="max-w-lg px-0 m-auto sm:px-12 md:px-16 lg:px-0">
                    <h3 className={cn(clash.className, "font-bold text-2xl lg:text-5xl")}>
                      Tutorials
                    </h3>
                    <p className="mb-10 text-xl font-medium lg:text-3xl">Master new skills with hands-on interactive playgrouds.</p>
                    <p className="mb-12 text-lg lg:text-2xl">Level up from Zero to Expert as you practice with real-world examples, labs and more.</p>
                    <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-black border-2 border-black shrink-0 hover:bg-amethyst-500">
                      <span>Start Learning</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section id="courses" className="bg-sunstone-200">
              <div className="px-6 py-8 border-t-2 border-black sm:py-24 sm:px-12 lg:max-w-none">
                <div className="grid gap-8 mx-auto max-w-screen-2xl lg:grid-cols-2 lg:gap-20">
                  <Image src="" alt="" />
                  <div className="max-w-lg px-0 m-auto sm:px-12 md:px-16 lg:px-0">
                    <h3 className={cn(clash.className, "font-bold text-2xl lg:text-5xl")}>
                      Courses
                    </h3>
                    <p className="mb-10 text-xl font-medium lg:text-3xl">Structured courses for serious growth.</p>
                    <p className="mb-12 text-lg lg:text-2xl">Deep dives into disruptive tech and related topics you won't find elsewhere online.</p>
                    <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-black border-2 border-black shrink-0 hover:bg-amethyst-500">
                      <span>Start Building</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section id="glossary" className="bg-rosian-200">
              <div className="px-6 py-8 border-t-2 border-black sm:py-24 sm:px-12 lg:max-w-none">
                <div className="grid gap-8 mx-auto max-w-screen-2xl lg:grid-cols-2 lg:gap-20">
                  <Image src="" alt="" />
                  <div className="max-w-lg px-0 m-auto sm:px-12 md:px-16 lg:px-0">
                    <h3 className={cn(clash.className, "font-bold text-2xl lg:text-5xl mb-2")}>
                      Glossary
                    </h3>
                    <p className="mb-10 text-xl font-medium lg:text-3xl">Understand the terms that are shaping disruptive technology.</p>
                    <p className="mb-12 text-lg lg:text-2xl">Buzzwords broken down so good, it should be a crime to get lost in the tech jargon.</p>
                    <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-black border-2 border-black shrink-0 hover:bg-amethyst-500">
                      <span>Get Smarter Now</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section id="tools" className="bg-celuria-200">
              <div className="px-6 py-8 border-t-2 border-black sm:py-24 sm:px-12 lg:max-w-none">
                <div className="grid gap-8 mx-auto max-w-screen-2xl lg:grid-cols-2 lg:gap-20">
                  <Image src="" alt="" />
                  <div className="max-w-lg px-0 m-auto sm:px-12 md:px-16 lg:px-0">
                    <h3 className={cn(clash.className, "font-bold text-2xl lg:text-5xl")}>
                      Free Tools
                    </h3>
                    <p className="mb-10 text-xl font-medium lg:text-3xl">The 10x productivity boost you need, with our free-to-use AI tools.</p>
                    <p className="mb-12 text-lg lg:text-2xl">Web-based tools using AI to automate your grunt work, and more–no strings attached.</p>
                    <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-black border-2 border-black shrink-0 hover:bg-amethyst-500">
                      <span>Use Free Tools</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section id="cta" className="px-6 border-t-2 border-black bg-jade-200 selection:bg-tingual-300">
              <div className="flex flex-col lg:flex-row items-center justify-center self-stretch gap-4 lg:gap-12 mx-auto py-9 max-w-[1360px] w-full">
                <div className="flex items-center shrink-0">
                  <Image src={'/images/ricobuilds.png'} alt="Enric Trillo Logo" width={64} height={64} className="inline w-8 h-8 transition-all duration-300 rounded-full" />
                </div>
                <h3 className={cn(clash.className, "font-bold text-2xl lg:text-6xl")}>
                  Stack skills to thrive, in the age of AI
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-black border-2 border-black shrink-0 hover:bg-amethyst-500">
                  <span>Start Learning</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </section>
            <section id="writing" className="border-t-2 border-black bg-bayoux-200">
              <div className={cn("max-w-[1360px]", "flex flex-col py-16 mx-auto px-6")}>
                <h2 className={cn(clash.className, "flex items-center mx-auto text-4xl font-bold px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
                  Writing
                </h2>
                <p className="text-center text-obsidian-600">Check out my latest takes and tutorials</p>
                <ul className="grid w-full gap-8 mt-10 md:grid-cols-8">
                  {posts.slice(0, 10).map((post, idx) => (
                    <li key={idx} className={`${idx < 2 ? 'md:col-span-4' : 'col-span-2'}`}>
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
            <section id="faqs" className="border-t-2 border-black">
              <div className="flex flex-col px-6 py-16 max-w-[980px] w-full mx-auto">
                <h2 className={cn(clash.className, "flex items-center  text-center text-4xl font-bold px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                  Frequently Asked Questions
                </h2>
                <p className="text-center text-obsidian-600">Learn more about my technical side</p>
                <div className="mt-10">
                  {faqs.map((faq, idx) => {
                    return (
                      <Accordion key={idx} type="single" collapsible className="w-full max-w-3xl mx-auto">
                        <AccordionItem value={`item-${idx}`} className="mb-4 border-2 border-black ">
                          <AccordionTrigger className="flex items-center gap-4 justify-normal hover:bg-slate-100">
                            <span className="ml-4">{faq.icon}</span>
                            <h3 className="text-xl">{faq.question}</h3>
                          </AccordionTrigger>
                          <AccordionContent className="p-4 border-t-2 border-black bg-purpalite-100">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  })}
                </div>
                <p className="pt-8 text-center">Curious to learn more about my journey, values, and vision? Check out my personal FAQs <Link className="underline text-amethyst-500" href="/about#faqs">here</Link>.</p>
              </div>
            </section>

            {/* <Work /> */}
            <section id="shift-forward" className="w-full py-12 border-t-2 border-black bg-scarlet-200 md:py-24 lg:py-32">
              <div className="container px-6 mx-auto">
                <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
                  <div id="benefits" className="space-y-4 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] transform -rotate-1">
                    <h2 className="font-mono text-3xl font-bold tracking-tighter uppercase sm:text-4xl md:text-5xl">Shift Forward</h2>
                    <p className="font-sans text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Join our twice a week newsletter (Tue, Fri) and here's what you'll score:
                    </p>
                    <ul className="space-y-2">
                      {["Exclusive BTS content", "Early access to new courses", "Special offers and discounts", "Industry insights and trends"].map((benefit) => (
                        <li key={benefit} className="flex items-center space-x-2 font-bold">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span>{benefit.toUpperCase()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div id="cta" className="flex flex-col space-y-4 bg-pink-400 p-6 border-4 border-black shadow-[8px_8px_0_0_#000] transform rotate-1">
                    <div className="space-y-2">
                      <h3 className="font-mono text-2xl font-bold">SUBSCRIBE NOW!</h3>
                      <p className="font-sans text-gray-800">
                        Get the latest updates and developments delivered straight to your inbox. No spam, we promise!
                      </p>
                    </div>
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="YOUR EMAIL HERE"
                        className="w-full p-3 font-mono text-lg placeholder-gray-500 border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="w-full uppercase p-3 bg-blue-500 text-white font-bold text-lg border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                      >
                        Subscribe
                      </button>
                    </form>
                    <p className="font-sans text-xs text-gray-800">
                      By subscribing, you agree to our totally lit <span className="font-semibold underline underline-offset-2">Terms of Service</span> and <span className="font-semibold underline underline-offset-2">Privacy Policy</span>.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section id="shift-forward" className="relative hidden overflow-hidden border-t-2 border-black bg-amethyst-200">
              <div className="flex flex-col px-6 py-16">
                <h2 className={cn(clash.className, "flex items-center  text-center text-4xl font-bold px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
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
              </div>
            </section>
            <section id="pitch" className="px-6 border-t-2 border-black bg-gradient-to-r from-amethyst-500 to-celuria-600">
              <div className="flex flex-col lg:flex-row gap-6 justify-between py-16 max-w-[1360px] px-6 m-auto w-full">
                <div className="flex flex-col text-white">
                  <h2 className={cn(clash.className, "text-4xl font-semibold")}>{tl['home']['pitch'].headline}</h2>
                  <p>{tl['home']['pitch'].subheadline}.</p>
                </div>
                <div className="flex items-center ">
                  <Link href="#">
                    <Button className="flex items-center gap-2 rounded-none text-black bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200">
                      <Send className="w-4 h-4" />
                      {tl['home']['pitch'].cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div >
      </main >
    </>
  );
}
