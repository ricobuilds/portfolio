import { StructuredData } from "../components/structured-data";
import { cn } from "@/lib/shared-utils";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"
import { LogoCloud } from "@/sections/logo-cloud";
import { Work } from "@/sections/work";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
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
import { Award, BookOpen, Bot, Braces, Code2, Coffee, Cpu, ExternalLink, Layers, Send, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skills } from "@/sections/skills";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ExpType = "course" | "certification"

interface Experience {
  type: ExpType;
  provider: string;
  logo: string;
  title: string;
  date: string;
  skills: string[];
  description: string;
  link: string;
}

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

  const posts: MDXArticle[] = getAllPosts()

  // @ts-ignore
  if (posts.some(p => p.error)) {
    return
  }

  const POSTS_MAX = 5
  const slicedPostList = posts.slice(0, POSTS_MAX)

  const experiences: Experience[] = [
    {
      type: 'certification',
      provider: 'Google',
      logo: 'google',
      title: 'Fundamentals of Digital Marketing',
      date: 'February 2020',
      skills: ['SEO', 'PPC', 'Social Media Marketing'],
      description: 'Comprehensive overview of digital marketing strategies and tools.',
      link: 'https://media.licdn.com/dms/image/D4E2DAQGu2vrAPnYtbA/profile-treasury-document-images_1920/1/1716743622434?e=1726704000&v=beta&t=CP2L2NzOxII4S0CMTJBSbrisujMWclsv9U8-SGMRETg'
    },
    {
      type: 'certification',
      provider: 'Semrush',
      logo: 'semrush',
      title: 'Keyword Research with Semrush',
      date: 'October 2023',
      skills: ['Keyword Research', 'SEO', 'Content Strategy'],
      description: 'In-depth training on effective keyword research techniques.',
      link: 'https://media.licdn.com/dms/image/D4E2DAQG5qDBH-NBWHw/profile-treasury-document-images_1920/1/1725539600707?e=1726704000&v=beta&t=-b2DlbP_JvjGlTCCzKDYrd9SgIChZ1lhYyrAGIUR_JU'
    },
    {
      type: 'course',
      provider: 'DeepLearning.ai',
      logo: 'deeplearningai',
      title: 'Build LLM Apps with LangChain.js',
      date: 'July 2023',
      skills: ['LLM', 'JavaScript', 'AI Applications'],
      description: 'Hands-on course on building AI-powered applications using LangChain.js.',
      link: '#'
    },
  ]

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
      icon: <Code2 className="w-5 h-5 mr-2" />,
    },
    {
      question: "What tools and technologies do you work with?",
      answer: "I'm proficient in modern full-stack technologies (React, Node.js, and NextJS), AI tools (LangChain, Pytorch, CrewAI) and software tools like MongoDB, PostgreSQL, TailwindCSS, Framer Motion and others.",
      icon: <Code2 className="w-5 h-5 mr-2" />,
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

  return (
    <>
      {/* <StructuredData data={homeSchema} /> */}
      <main className="flex-1 w-full">
        <div className={cn("mt-20", "mx-auto")}>
          <div className="flex flex-col gap-16">

            <section id="hero">
              <div className="w-full max-w-[970px] mx-auto space-y-8">
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
                      <button className="px-4 py-2 mt-0 capitalize border w-fit border-charkol hover:cursor-pointer hover:border-amethyst-400 hover:bg-amethyst-500 hover:text-white">
                        {tl['home']['hero'].cta}
                      </button>
                    </Link>
                  </div>
                  <Image src="/images/hero__image.png" width={800} height={800} alt="" className="w-[400px] h-[400px]" />
                </div>
              </div>
              <section id="marquee" className="relative -z-10">
                <div className="h-16 border-black bg-amethyst-500 border-y-2"></div>
                <div className="flex items-center h-16 text-white -translate-y-10 -skew-y-3 bg-black border-black border-y-4">
                  <Marquee
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
            </section>
            {/* <LogoCloud /> */}
            {/* <Showcase/> */}

            <section id="bio" className="left-0 flex flex-col px-4 py-16 mt-0 max-w-screen">
              <h2 className={cn(clash.className, "flex items-center font-bold text-center text-4xl px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                About Me
              </h2>
              <p className="text-center text-obsidian-500">Get to learn about the man behind the face.</p>
              <div className="flex flex-col items-center lg:flex-row gap-16 w-full max-w-[970px] mx-auto mt-10">
                <div className="relative flex w-full max-w-lg aspect-auto">
                  <Image src="/images/graduation.jpg" width={600} height={0} alt={tl['home']['bio'].alt} />
                </div>
                <div
                  className={cn(
                    "p-4 bg-transparent border dark:border-obsidian-800 flex max-w-lg w-full mx-auto relative",
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
            <section id="cta" className="px-6 bg-jade-500 selection:bg-tingual-300">
              <div className="flex flex-col md:flex-row items-center justify-center self-stretch gap-4 lg:gap-12 mx-auto py-9 max-w-[1360px] w-full">
                <div className="flex items-center shrink-0">
                  <Image src={'/images/ricobuilds.png'} alt="Enric Trillo Logo" width={64} height={64} className="inline w-10 h-10 transition-all duration-300 rounded-full" />
                </div>
                <h2 className={cn(clash.className, "font-bold text-2xl lg:text-6xl w-fit")}>
                  Stack skills to thrive, in a world with AI
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-black shrink-0 hover:bg-black hover:text-white">
                  <span>Start Learning</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </section>
            <section id="experience">
              <div className="flex flex-col items-center px-6 py-16">
                <h2 className={cn(clash.className, "flex items-center text-4xl font-bold px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
                  Experience
                </h2>
                <p className="text-obsidian-500">I&apos;m certified by top technology companies</p>
                <div className="mt-10 w-full max-w-[1360px]">
                  <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {
                      experiences.map((exp, idx) => (
                        <Card key={idx} className="flex flex-col">
                          <CardHeader>
                            <div className="flex items-center space-x-4">
                              <Image src={"/images/certs/" + exp.logo + ".jpeg"} alt={`${exp.provider} logo`} width={300} height={300} className="w-10 h-10" />
                              <div>
                                <CardTitle>{exp.provider}</CardTitle>
                                <CardDescription>{exp.title}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <div className="flex items-center mb-2">
                              {exp.type === 'certification' ? (
                                <Badge variant="default" className="mr-2 bg-jade-500">
                                  <Award className="w-3 h-3 mr-1" />
                                  Certification
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="mr-2 bg-jade-500">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  Course
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground">Completed: {exp.date}</span>
                            </div>
                            <p className="mb-4 text-sm">{exp.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <Badge key={i} variant="outline">{skill}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full border-tingual-500" asChild>
                              <Link href={!exp.link.includes('licdn') && exp.link.includes('https') ? exp.link + "?ref=enrictrillo" : exp.link} target="_blank" rel="noopener noreferrer">
                                {exp.type === 'certification' ? 'View Certificate' : 'View Course'}
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </section>
            <section id="writing" className="bg-amethyst-200">
              <div className={cn(baseWidth, "flex flex-col py-16 mx-auto px-6")}>
                <h2 className={cn(clash.className, "flex items-center mx-auto text-4xl font-bold px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
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
            <section id="faqs">
              <div className="flex flex-col px-6 py-16 max-w-[980px] w-full mx-auto">
                <h2 className={cn(clash.className, "flex items-center  text-center text-4xl font-bold px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
                  Frequently Asked Questions
                </h2>
                {faqs.map((faq, idx) => {
                  return (
                    <Accordion key={idx} type="single" collapsible className="w-full max-w-3xl mx-auto">
                      <AccordionItem value={`item-${idx}`}>
                        <AccordionTrigger className="flex items-center gap-4 justify-normal">
                          <span>{faq.icon}</span>
                          <h3 className="text-xl">{faq.question}</h3>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
                <p className="pt-8 text-center">Curious to learn more about my journey, values, and vision? Check out my personal FAQs <Link className="underline text-amethyst-500" href="/about#faqs">here</Link>.</p>
              </div>
            </section>

            {/* <Work /> */}
            <section id="shift-forward">
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

            <section id="cta" className="flex flex-col px-6 mb-24">
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
        </div >
      </main >
    </>
  );
}
