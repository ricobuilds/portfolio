import { StructuredData } from "../components/structured-data";
import { cn } from "@/lib/shared-utils";
import { siteMetadata } from "@/lib/site.metadata";
import type { Person, WithContext } from "schema-dts"
import { LogoCloud } from "@/sections/logo-cloud";
import { Work } from "@/sections/work";
import Link from "next/link";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/constants/i18n.config";
import { Kanit } from "next/font/google";
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
import { Bot, Braces, Code2, Coffee, ExternalLink, Layers, Send, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skills } from "@/sections/skills";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ICCard {
  company: string
  title: string
  image: string
  date: string
  url?: string
}

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

const CertificationCard = ({ company, title, image, url }: ICCard) => {
  return (
    <Link href={url ? url + "?ref=enrictrillo" : "#"} target={url?.includes("https://") ? "_blank" : ""}>
      <li className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring ring-opacity-5 ring-obsidian-300">
        <div className="flex flex-col flex-1 p-8">
          <Image className="flex-shrink-0 w-12 h-12 mx-auto rounded-full" src={"/images/certs/" + image + ".jpeg"} alt={image + "_logo"} width={300} height={300} />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{company}</h3>
          <dl className="flex flex-col justify-between flex-grow mt-1">
            <dt className="sr-only">Certification</dt>
            <dd className="text-sm text-gray-500">{title}</dd>
          </dl>
        </div>
      </li>
    </Link>
  )
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

  const certs: ICCard[] = [
    {
      company: "Google",
      title: "Fundamentals of Digital Marketing",
      image: "google",
      date: "February 2022",
      url: "https://skillshop.exceedlms.com/student/collection/654330-digital-marketing?sid=0339c211-017a-43b7-9485-6c24e997a4aa&sid_i=1"
    },
    {
      company: "Semrush",
      title: "Keyword Research with Semrush",
      image: "semrush",
      date: "",
      url: ""
    },
    {
      image: "deeplearningai",
      company: "DeepLearning.ai",
      title: "Build LLM Apps with LangChain.js",
      date: "",
      url: "",
    },
  ]

  const certifications = [
    {
      provider: 'Google',
      logo: '/placeholder.svg?height=40&width=40',
      course: 'Fundamentals of Digital Marketing',
      date: 'September 2023',
      skills: ['SEO', 'PPC', 'Social Media Marketing'],
      description: 'Comprehensive overview of digital marketing strategies and tools.',
      link: 'https://example.com/certification1'
    },
    {
      provider: 'Semrush',
      logo: '/placeholder.svg?height=40&width=40',
      course: 'Keyword Research with Semrush',
      date: 'August 2023',
      skills: ['Keyword Research', 'SEO', 'Content Strategy'],
      description: 'In-depth training on effective keyword research techniques.',
      link: 'https://example.com/certification2'
    },
    {
      provider: 'DeepLearning.ai',
      logo: '/placeholder.svg?height=40&width=40',
      course: 'Build LLM Apps with LangChain.js',
      date: 'July 2023',
      skills: ['LLM', 'JavaScript', 'AI Applications'],
      description: 'Hands-on course on building AI-powered applications using LangChain.js.',
      link: 'https://example.com/certification3'
    },
  ]

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in full-stack web development using React, Node.js, and Python. For AI and machine learning projects, I work with TensorFlow, PyTorch, and various NLP libraries.",
      icon: <Code2 className="w-5 h-5 mr-2" />,
    },
    {
      question: "Can you explain your experience with AI agents?",
      answer: "I have extensive experience developing AI agents using reinforcement learning techniques. This includes creating chatbots, recommendation systems, and autonomous decision-making agents for various applications.",
      icon: <Bot className="w-5 h-5 mr-2" />,
    },
    {
      question: "How do you approach full-stack projects?",
      answer: "I approach full-stack projects with a holistic view, considering both front-end user experience and back-end efficiency. I typically use React for the front-end, Node.js or Django for the back-end, and ensure seamless integration between all layers of the application.",
      icon: <Layers className="w-5 h-5 mr-2" />,
    },
    {
      question: "What's your experience with cloud platforms?",
      answer: "I'm well-versed in deploying and managing applications on major cloud platforms like AWS, Google Cloud, and Azure. I have experience with serverless architectures, containerization using Docker, and orchestration with Kubernetes.",
      icon: <Braces className="w-5 h-5 mr-2" />,
    },
    {
      question: "How do you stay updated with the latest tech trends?",
      answer: "I'm committed to continuous learning. I regularly attend tech conferences, participate in online courses, contribute to open-source projects, and experiment with new technologies in personal projects to stay at the forefront of the industry.",
      icon: <Zap className="w-5 h-5 mr-2" />,
    },
    {
      question: "What's your approach to project management and collaboration?",
      answer: "I use Agile methodologies for project management, with a preference for Scrum. For collaboration, I'm proficient with Git for version control, Jira for task tracking, and Slack for team communication. I believe in clear, frequent communication and documentation to ensure project success.",
      icon: <Coffee className="w-5 h-5 mr-2" />,
    },
    {
      question: "What opportunities are you open to?",
      answer: "I'm open to the following opportunities...",
      icon: <Coffee className="w-5 h-5 mr-2" />,
    },
    {
      question: "So, you're from Guinea Bissau/Guinea/Papua New Guinea?",
      answer: "I've gotten this question many times 😆. I'm from Equatorial Guinea, a tiny hispanic nation in the Gulf of Guinea that's often forgotten, and usually confused with the other Guineas. We speak Pichi (among other languages like Fa d'Ambô and Bube), which is similar (given our small differences) to Sierra Leone's Krio! Trivia: Annobon can fit 92.5x in London.",
      icon: <Coffee className="w-5 h-5 mr-2" />,
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
            <section id="certifications">
              <div className="flex flex-col items-center px-6 py-16">
                <h2 className={cn(clash.className, "flex items-center text-4xl font-bold px-4 py-1 mb-3 text-white uppercase w-fit bg-amethyst-500")}>
                  Experience
                </h2>
                <p className="text-obsidian-500">I&apos;m certified by top technology companies</p>
                <div className="mt-10">
                  <ul role="list" className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {
                      certifications.map((cert, idx) => (
                        <Card key={idx} className="flex flex-col">
                          <CardHeader>
                            <div className="flex items-center space-x-4">
                              <img src={cert.logo} alt={`${cert.provider} logo`} className="w-10 h-10" />
                              <div>
                                <CardTitle>{cert.provider}</CardTitle>
                                <CardDescription>{cert.course}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="mb-2 text-sm text-muted-foreground">Completed: {cert.date}</p>
                            <p className="mb-4 text-sm">{cert.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full" asChild>
                              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                View Certificate
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    }
                    {
                      certs.map(({ company, title, image, date, url }, idx) => (
                        <CertificationCard key={idx} company={company} title={title} image={image} url={url} date={date} />
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
            <section id="faq">
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
