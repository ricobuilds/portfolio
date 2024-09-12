import { baseWidth } from "@/constants/index"
import { generateMetadata } from "@/lib/seo"
import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import Link from "next/link"
import { BeehiivCustom } from "@/components/beehiiv-custom"
import { Spacer } from "@/components/spacer"
import { Locale } from "@/constants/i18n.config"
import { getTranslations } from "../../dictionaries"
import { clash } from "@/constants/fonts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Award, BookOpen, Bot, CalendarClock, Drama, ExternalLink, Eye, Globe } from "lucide-react"

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

export const metadata = generateMetadata({
  title: 'About',
  description: "Enric Trillo is a Fullstack & AI Agents developer based in London. Constantly learning and building with disruptive technologies, and at present, actively working on multi agent systems.",
  keywords: "full stack developer, enric trillo, disruptive technology, about me, tech enthusiast, multi agent systems"
})

export default async function About({ params }: { params: { lang: Locale } }) {
  const tl = await getTranslations(params.lang)

  const skills = [
    {
      category: "Fullstack Development",
      skills: "React, Next.js, Node.js, etc.",
      experience: "Developed frontend and fullstack web apps for 7+ years. Built GPT2Markdown to 1118+ users at one point."
    },
    {
      category: "AI/Deep Learning",
      skills: "Python, Keras, Pytorch, etc.",
      experience: "Took the AI module at University of Northampton, my work got featured on The Startup publication on Medium."
    },
    {
      category: "Multi-Agent Systems",
      skills: "LangChain, OpenAI, Ollama, CrewAI etc.",
      experience: "Currently building my Kaiser multi-agent system."
    },
    {
      category: "Web3/Blockchain",
      skills: "Polygon, Solidity",
      experience: "Worked as a Fullstack Web3 Developer (Contract) on Polygon GameFi at CWJ Capital."
    },
    {
      category: "Content Creation",
      skills: "Ideation, News Curation, Branding etc.",
      experience: "Executing my multi-platform content strategy to build my online presence."
    }
  ]

  const faqs = [
    {
      icon: <CalendarClock className="w-5 h-5 mr-2" />,
      question: "When did you start your journey?",
      answer: "My journey started in 2014 as DJ, being 15 then. A year after, I finished my GCSEs and went to SFX Sixth Form College for a BTEC in IT – where I learned Photoshop and picked up Python. Since then, I've produced results no matter the discipline – from DJing to graphic design, plus many others. Now, I'm a dev focused on disruptive tech."
    },
    {
      icon: <Drama className="w-5 h-5 mr-2" />,
      question: "What other roles have you been in?",
      answer: "I've worked across DJing, graphic design, UI/UX design, motion design, journalism, library assisting, web development, videography and editing, bartending, tech sales at European Gateway (a startup by a former Gartner executive), and fullstack Web3 development – these experiences have given me an unique creative perspective."
    },
    {
      icon: <Globe className="w-5 h-5 mr-2" />,
      question: "So, you're from Guinea Bissau/Guinea etc?",
      answer: "Actually, I'm from Equatorial Guinea, a tiny hispanic nation in the Gulf of Guinea that's often forgotten, and usually confused with the other Guineas. We speak Pichi (among other languages like Fa d'Ambô and Bube), which is almost identical (given our small differences) to Sierra Leone's Krio! Did you know that Annobon can fit 92.5x in London?",
    },
    {
      icon: <Bot className="w-5 h-5 mr-2" />,
      question: "What projects are you working on right now?",
      answer: "I'm working on upgrading the visual identity of my website so I can make room for the coming changes (keep a close eye!). I'm also working on K.A.I.S.E.R – my dream team of AI agents that handle the heavy lifting of my workflows so I get to work on what I do best, like learning new skills and my applying them."
    },
    {
      icon: <Eye className="w-5 h-5 mr-2" />,
      question: "Where do you see yourself in 5 years?",
      answer: "Building industry-leading AI products, a thriving global community having launched my own educational resources, and a successful business around disruptive tech, like AI  and multi-agent systems, that enables me to live my dreams and work my philanthropic ideas."
    },
  ]
  return (
    <>
      {/* <StructuredData data={aboutSchema} />
      <StructuredData data={aboutBreadcrumbSchema} /> */}
      <main className="w-full px-6">
        <div className={cn(baseWidth, "w-full mx-auto")}>
          <div className="relative flex flex-col items-center gap-6 pt-20">
            <div id="content" className="flex relative flex-col gap-8 max-w-[580px] mx-auto">
              <div className="flex flex-col items-center w-full gap-4">
                <Image priority src={'/images/headshot.jpeg'} alt="Enric Trillo" width={600} height={600} className="inline w-24 h-24 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
                <h1 className="text-lg font-bold">About Enric Trillo</h1>
                <p className="text-slate-600">Fullstack & AI Agents Developer</p>
                <section id="intro" className="space-y-6">
                  <h2 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 text-center lg:text-left mb-3 shadow-[8px_8px_0_0_#000] bg-amethyst-500 text-white")}>Intro</h2>
                  <p>
                    Hey! I&apos;m Enric J Trillo Nchana, a Fullstack & AI Developer with expertise in disruptive technologies, multi-agent systems and innovative web solutions.
                  </p>
                  <p>
                    Born & raised in Madrid 🇪🇸, moved to London 🇬🇧 in my early teens, and from a tiny hispanic nation in Central Africa most often forget – Equatorial Guinea 🇬🇶.
                  </p>
                </section>
              </div>
              <section id="summary" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Professional Summary</h3>
                <p>I&apos;m the founder of Metasyde LTD., where we build scalable solutions leveraging disruptive technologies like AI and Web3.</p>
                <p>Currently developing Kaiser, my personal multi-agent system designed to 100x my productivity and workflows through automation and delegation.</p>
                <p>My goal is to create software and educational resources that empower individuals and businesses to adapt and thrive in this world driven by AI.</p>
              </section>
              <section id="story" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Story</h3>
                <p>
                  In 2015, I finished my GCSEs and went to <Link target="_blank" className="font-bold underline text-amethyst-500" href="https://www.sfx.ac.uk/">St. Francis Xavier College</Link>, where I began my tech journey by experimenting with graphic design and coding with Python, setting the foundation for my future in fullstack and AI development.
                </p>
                <div className="object-contain w-full overflow-hidden">
                  <Image src="/images/graduation.jpg" className="w-full" width={600} height={600} alt="Enric Trillo, graduation photo" />
                </div>
                <p>
                  During my years at the <Link target="_blank" className="font-bold underline text-amethyst-500" href="https://www.northampton.ac.uk/">University of Northampton</Link> (2017-2020), I didn&apos;t just stick to one thing. I explored everything from journalism to UI/UX design, motion graphics, video editing, and even bartending. But it was in my third year that I discovered my true passion: Artificial Intelligence. This revelation led to an A* grade and the publication of a featured Medium article with The Startup, where I shared my process and insights on AI.
                </p>
                <p>I graduated in 2020–during a time where the world was brought to a stop by the global pandemic. Picture being a 21-year-old fresh out of university with a computing degree, burning passion for emerging technologies and an ambitious spirit, but finding yourself stuck with a flimsy job market and a whooping <strong>5-figures in student debt</strong>. <i>That</i> was my intro into the real world.</p>
                <p>Instead of letting that define me, I flipped the script. I hopped on mastering hot, in-demand skills, which led me to secure a £5000/mo Fullstack Web3 Developer contract role at the age of 23. That opportunity was the catalyst for what will become <Link className="font-bold underline text-amethyst-500" href="https://metasyde.com?ref=enrictrillo">Metasyde</Link>, my company dedicated to building profitable and innovative solutions with disruptive technologies.</p>
              </section>
              <section id="mission" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Mission</h3>
                <p>In 2017, McKinsey <Link target="_blank" className="font-bold underline text-amethyst-500" href="https://www.mckinsey.com/featured-insights/future-of-work/jobs-lost-jobs-gained-what-the-future-of-work-will-mean-for-jobs-skills-and-wages">reported</Link> they estimat something between 400-800 million people globally to be displaced by emerging technologies by 2030.</p>
                <p>The landscape is shifting fast, and my mission is to help people and businesses navigate this transformation. Whether through learning resources or software products, my goal is to assist others to thrive in the age of AI.</p>
              </section>
              <section id="what-i-do" className="hidden space-y-6">
                <h2 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>What I Do</h2>
                <p>I run the <i>Shift Forward Newsletter</i>. This is where I share weekly actionable insights to help others thrive in this AI-driven world. My online presence spans across various platforms, including:</p>
                <ul className="mb-0 ml-4">
                  <li className="before:content-['→'] before:mr-2">
                    <strong>Twitter</strong>: Sharing thoughts on the latest in tech and AI.
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>LinkedIn</strong>: Professional updates and industry discussions.
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>YouTube</strong>: Video content on disruptive technologies and tutorials.
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>Blog</strong>: Deep dives into tech topics like AR/VR, AI and multi agent systems, blockchain, gaming, haptics, the metaverse, robotics, and more.
                  </li>
                </ul>
              </section>
              <section id="expertise" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Expertise</h3>
                <div className="w-full overflow-x-auto ">
                  <div className="min-w-full overflow-hidden border rounded-lg">
                    <Table className="w-full table-auto">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/4 sm:w-[200px]">Category</TableHead>
                          <TableHead className="w-1/4 sm:w-[200px]">Skills</TableHead>
                          <TableHead className="w-1/2 sm:w-auto">Experience</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {skills.map((skill, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{skill.category}</TableCell>
                            <TableCell>{skill.skills}</TableCell>
                            <TableCell>{skill.experience}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </section>
              <section id="experience">
                <div className="flex flex-col py-16">
                  <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full shadow-[8px_8px_0_0_#000] lg:w-fit px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Experience</h3>
                  <p>This is a list of courses and certifications I've completed, that are relevant to the skills I apply in personal/professional projects, and topics I discuss online.</p>
                  <div className="mt-10 w-full max-w-[1360px]">
                    <ul role="list" className="grid w-full grid-cols-1 gap-6">
                      {
                        experiences.map((exp, idx) => (
                          <Card key={idx} className="flex flex-col transition border-2 border-black hover:shadow-[8px_8px_0px_rgba(0,0,0,0)] hover:shadow-[#6583E0]">
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
              <section id="recognition">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit shadow-[8px_8px_0_0_#000] px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Awards & Recognition</h3>
                <ul className="mb-0 ml-8 list-disc">
                  <li>
                    <strong>The Startup</strong>: Got featured by The Startup publication on Medium for <Link className="underline text-amethyst-500" href="https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36">documenting my work on AI</Link> and my academic journey.
                  </li>
                  <li>
                    <strong>University of Northampton</strong>: Achieved an A* grade in the AI module of my final year, and a Second Upper Class (2:1) classification overall.
                  </li>
                  <li>
                    <strong>Certifications:</strong>
                    <ul className="mb-0 ml-4">
                      <li className="before:content-['→'] before:mr-2">
                        <strong>Fundamentals of Digital Marketing</strong>, Google – <Link target="_blank" href={"https://skillshop.exceedlms.com/student/collection/654330-digital-marketing?sid=0339c211-017a-43b7-9485-6c24e997a4aa&sid_i=1" + "?ref=enrictrillo"} className="underline text-amethyst-500 underline-offset-2">course</Link>
                      </li>
                      <li className="before:content-['→'] before:mr-2">
                        <strong>Keyword Research with Semrush</strong>, Semrush – <Link target="_blank" href={"https://www.semrush.com/academy/courses/keyword-research-with-semrush-step-by-step-guide/" + "?ref=enrictrillo"} className="underline text-amethyst-500 underline-offset-2">course</Link>
                      </li>
                      <li className="before:content-['→'] before:mr-2">
                        <strong>Build LLM Apps with LangChain.js</strong>, DeepLearning.AI – <Link target="_blank" href={"https://www.deeplearning.ai/short-courses/build-llm-apps-with-langchain-js/" + "?ref=enrictrillo"} className="underline text-amethyst-500 underline-offset-2">course</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>
              <section id="leadership">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit shadow-[8px_8px_0_0_#000] px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Thought Leadership</h3>
                <p>I'm active on these platforms sharing knowledge and what I learn:</p>
                <ul className="ml-8 space-y-3 list-disc mb-b">
                  <li>Blog – my blog features deep dives, practical guides, and case studies on disruptive tech, designed for both beginners and advanced devs.</li>
                  <li>Shift Forward – my weekly newsletter where I explore actionable strategies to leverage AI, multi-agent systems, and disruptive tech, curated for developers and tech futurists aiming to thrive in the AI-driven era.</li>
                  <li>Social Media – On Twitter/X, I break down the latest trends in disruptive technologies, while LinkedIn serves as my platform for professional insights and industry commentary.</li>
                  <li>YouTube – On YouTube, I post technical videos around disruptive technologies and programming, behind-the-scenes updates and more.</li>
                </ul>

              </section>
              <section id="testimonials">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full shadow-[8px_8px_0_0_#000] lg:w-fit px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Testimonials</h3>
                <div className="grid grid-cols-1 gap-3">
                  <blockquote className="relative max-w-2xl p-6 mx-auto bg-white border rounded-lg">
                    <div title="Testimonial" className="mb-4 italic text-gray-600">
                      "Your app is bomb! Thank you as it helps tremendously with my workflow..."
                    </div>
                    <div title="Testimonial Author" className="font-bold text-gray-800">
                      – Jordan (YouTube comment)
                    </div>
                  </blockquote>
                  <blockquote className="relative max-w-2xl p-6 mx-auto bg-white border rounded-lg">
                    <div title="Testimonial" className="mb-4 italic text-gray-600">
                      "Very cool, a medicine to my paranoia that chatgpt will one day have an absurd paywall and all of my conversations would get lost"
                    </div>
                    <div title="Testimonial Author" className="font-bold text-gray-800">
                      – Amitay Gilboa (Product Hunt comment)
                    </div>
                  </blockquote>
                </div>
              </section>
              <section id="upskilling" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Skill Stacking & Future Vision</h3>
                <p>As the world of AI and disruptive tech continues to evolve, I’m committed to lifelong learning, constantly experimenting with emerging tools and concepts. My vision is to be at the forefront of this shift, assembling teams of AI agents and building products that push the boundaries of what’s possible in tech.</p>
              </section>
              <section id="collaborations" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Collaboration & Contact</h3>
                <p>
                  I&apos;m open to collaborations and new opportunities. Feel free to reach out if you have (or are aware of) opportunities for me, including:
                </p>
                <ul className="mb-6 ml-8 list-disc">
                  <li>
                    <strong>Consulting on AI/Agent Systems </strong>for product development or workflows.
                  </li>
                  <li>
                    <strong>Collaborating on tech-based content</strong> (guest writing, podcast appearances, panel discussions)
                  </li>
                  <li>
                    <strong>Partnerships for building AI-powered tools</strong> for businesses or SaaS projects.
                  </li>
                  <li>
                    <strong>Joint-ventures in emerging tech</strong> (Web3, AR/VR, robotics, etc.)
                  </li>
                  <li>
                    <strong>Contract opportunities </strong> where I can use my frontend, fullstack and AI skills to develop solutions.
                  </li>
                </ul>
              </section>
              <section id="cta" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold shadow-[8px_8px_0_0_#000] text-2xl uppercase w-full lg:w-fit px-4 py-1 text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Shift Forward</h3>
                <p>I created Shift Forward to share what I learn about emerging tech, what I'm building, and spark a new generation of Shifters who thrive in hard times.</p>
                <p className="mb-6">Join <strong>Shift Forward</strong> for weekly actionable insights on disruptive tech like Web3 and Robotics, and updates of what we're building at Metasyde.</p>
                <div className="flex items-center gap-2">
                  <BeehiivCustom tl={tl['home']['newsletter']} />
                </div>
              </section>
              <section id="faqs" className="space-y-6">
                <h3 className={cn(clash.className, "font-bold text-2xl uppercase w-full lg:w-fit px-4 py-1 shadow-[8px_8px_0_0_#000] text-center lg:text-left mb-3 bg-amethyst-500 text-white")}>Frequently Asked Questions</h3>
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
                <p className="pt-8">Interested in my technical expertise and approach to disruptive tech? Explore my technical FAQs <Link className="underline text-amethyst-500" href="/#faqs">here</Link>.</p>
              </section>
            </div>
          </div>
          <Spacer className="h-24" />
        </div>
      </main>
    </>
  )
}