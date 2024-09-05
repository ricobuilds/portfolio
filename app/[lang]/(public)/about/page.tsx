import { baseWidth } from "@/constants/index"
import { routes } from "@/lib/routes"
import { generateMetadata } from "@/lib/seo"
import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import Link from "next/link"
import { BeehiivCustom } from "../../components/beehiiv-custom"
import { Locale } from "@/constants/i18n.config"
import { getDictionary } from "../../dictionaries"
import { clash } from "@/constants/fonts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Coffee } from "lucide-react"

export const metadata = generateMetadata({
  title: 'About',
  description: "Enric Trillo is a Fullstack & AI Agents developer based in London. Constantly learning and building with disruptive technologies, and at present, actively working on multi agent systems.",
  keywords: "full stack developer, enric trillo, disruptive technology, about me, tech enthusiast, multi agent systems"
})

export default async function About({ params }: { params: { lang: Locale } }) {
  const tl = await getDictionary(params.lang)

  const faqs = [
    {
      question: "When did you start your journey?",
      answer: "My journey started in 2014 as DJ, being 15 then. A year after, I finished my GCSEs and went to SFX Sixth Form College for a BTEC in IT – where I learned Photoshop and picked up Python. Since then, I've produced results no matter the discipline – from DJing to graphic design, plus many others. Now, I'm a dev focused on disruptive tech."
    },
    {
      question: "What other roles have you been in?",
      answer: "Despite my young age, I've been a DJ, Graphic Designer, UI/UX Designer, Motion Designer, Journalist, Library Assistant, Web Developer, Videographer and Video Editor, Hybrid SDR/BDR at European Gateway (a startup by a former Gartner executive), Fullstack Web3 Developer, and now I focus on building with disruptive technologies."
    },
    {
      question: "So, you're from Guinea Bissau/Guinea/Papua New Guinea?",
      answer: "I've gotten this question many times 😆. I'm from Equatorial Guinea, a tiny hispanic nation in the Gulf of Guinea that's often forgotten, and usually confused with the other Guineas. We speak Pichi (among other languages like Fa d'Ambô and Bube), which is similar (given our small differences) to Sierra Leone's Krio! Trivia: Annobon can fit 92.5x in London.",
    },
    {
      question: "What projects are you working on right now?",
      answer: "I'm working on upgrading the visual identity of my website so I can make room for the coming changes (keep a close eye!). I'm also working on K.A.I.S.E.R – my dream team of AI agents that handle the heavy lifting of my workflows so I get to work on what I do best, like learning new skills and my applying them."
    },
    {
      question: "",
      answer: ""
    },
  ]
  return (
    <>
      {/* <StructuredData data={aboutSchema} />
      <StructuredData data={aboutBreadcrumbSchema} /> */}
      <main className="w-full px-6">
        <div className={cn(baseWidth, "w-full mx-auto")}>
          <div className="relative flex flex-col items-center gap-6 pt-20">

            <div id="content" className="flex flex-col gap-8 max-w-[580px] mx-auto">
              <div className="flex flex-col items-center gap-4">
                <Image priority src={'/images/headshot.jpeg'} alt="Enric Trillo" width={600} height={600} className="inline w-24 h-24 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
                <h1 className="text-lg font-bold">About Enric Trillo</h1>
                <p className="text-slate-600">Fullstack & AI Agents Developer</p>
                <section id="intro" className="space-y-6">
                  <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Intro</h2>
                  <p>
                    Hey! I&apos;m Enric J Trillo Nchana, a Fullstack & AI Developer with expertise in disruptive technologies, multi-agent systems and innovative web solutions.
                  </p>
                  <p>
                    Born & raised in Madrid 🇪🇸, moved to London 🇬🇧 in my early teens, and from a tiny hispanic nation in Central Africa most often forget – Equatorial Guinea 🇬🇶.
                  </p>
                </section>
              </div>
              <section id="summary" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Professional Summary</h2>
                <p>I&apos;m the founder of Metasyde LTD., where we build scalable solutions leveraging disruptive technologies like AI and Web3.</p>
                <p>Currently developing Kaiser, my personal multi-agent system designed to 100x my productivity and workflows through automation and delegation.</p>
                <p>My goal is to create software and educational resources that empower individuals and businesses to adapt and thrive in this world driven by AI.</p>
              </section>
              <section id="story" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Story</h2>
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
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Mission</h2>
                <p>McKinsey reported in 2020 that they estimate close 400 million people globally to be displaced by emerging technologies by 2030.</p>
                <p>The landscape is shifting fast, and my mission is to help people and businesses navigate this transformation. Whether through learning resources or software products, my goal is to assist others to thrive in the age of AI.</p>
              </section>
              <section id="what-i-do" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>What I Do</h2>
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
              <section id="certification">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Awards & Recognition</h2>
                <ul className="mb-0 ml-8 list-disc">
                  <li>
                    <strong>Featured in Medium&apos;s The Startup</strong>: For <Link className="underline text-amethyst-500" href="https://medium.com/swlh/an-image-classifier-with-keras-2f0e9b868a36">my article on AI</Link> and my academic journey.
                  </li>
                  <li>
                    <strong>University of Northampton</strong>: Achieved an A* grade in AI during my final year.
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
              <section id="testimonials">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Testimonials</h2>
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
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Skill Stacking & Future Vision</h2>
                <p>As the world of AI and disruptive tech continues to evolve, I’m committed to lifelong learning, constantly experimenting with emerging tools and concepts. My vision is to be at the forefront of this shift, assembling teams of AI agents and building products that push the boundaries of what’s possible in tech.</p>
              </section>
              <section id="collaborations" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Collaboration & Contact</h2>
                <p>
                  I&apos;m open to collaborations and new opportunities – if you have (or are aware of) opportunities for me including consulting, guest writing, tutoring, interviews, ventures, joint collaboration for content (or other), and even SaaS ideas, feel free to reach out.
                </p>
                <ul className="mb-6 ml-4">
                  <li className="before:content-['→'] before:mr-2">
                    <strong>Email:</strong> <Link href={routes.email} className="underline text-amethyst-500 underline-offset-2">hola@enrictrillo.com</Link>
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>Twitter:</strong> <Link href={routes.twitter} className="underline text-amethyst-500 underline-offset-2">@ricobuilds</Link>
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>LinkedIn:</strong> <Link href={routes.linkedin} className="underline text-amethyst-500 underline-offset-2">linkedin.com/in/enrictrillo</Link>
                  </li>
                  <li className="before:content-['→'] before:mr-2">
                    <strong>YouTube:</strong> <Link href={routes.youtube} className="underline text-amethyst-500 underline-offset-2">Enric Trillo @ricobuilds</Link>
                  </li>
                </ul>
              </section>
              <section id="faqs" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Frequently Asked Questions</h2>
                {faqs.filter(faq => faq.question.length > 0).map((faq: any, idx: number) => {
                  return (
                    <Accordion key={idx} type="single" collapsible className="w-full max-w-3xl mx-auto">
                      <AccordionItem value={`item-${idx}`}>
                        <AccordionTrigger className="flex items-center gap-4 justify-normal">
                          <span>{faq.icon}</span>
                          <h3 className="text-lg">{faq.question}</h3>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
                <p className="pt-8">Interested in my technical expertise and approach to disruptive tech? Explore my technical FAQs <Link className="underline text-amethyst-500" href="/#faqs">here</Link>.</p>
              </section>
              <section id="cta" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Shift Forward</h2>
                <p>I created Shift Forward to share what I learn about emerging tech, what I'm building, and spark a new generation of Shifters who thrive in hard times.</p>
                <p className="mb-6">Join <strong>Shift Forward</strong> for weekly actionable insights on disruptive tech like Web3 and Robotics, and updates of what we're building at Metasyde.</p>
                <div className="flex items-center gap-2">
                  <BeehiivCustom tl={tl['home']['newsletter']} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}