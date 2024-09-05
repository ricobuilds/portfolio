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

export const metadata = generateMetadata({
  title: 'About',
  description: "Enric Trillo is a Fullstack & AI Agents developer based in London. Constantly learning and building with disruptive technologies, and at present, actively working on multi agent systems.",
  keywords: "full stack developer, enric trillo, disruptive technology, about me, tech enthusiast, multi agent systems"
})

export default async function About({ params }: { params: { lang: Locale } }) {
  const tl = await getDictionary(params.lang)

  const faqs = [
    {
      question: "",
      answer: ""
    },
    {
      question: "",
      answer: ""
    },
    {
      question: "",
      answer: ""
    },
    {
      question: "",
      answer: ""
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

            <div id="content" className="flex flex-col gap-8 max-w-[560px] mx-auto">
              <div className="flex flex-col items-center gap-4">
                <Image src={'/images/headshot.jpeg'} alt="Enric Trillo" width={600} height={600} className="inline w-24 h-24 mx-auto transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
                <h1 className="text-lg font-bold">About Enric Trillo</h1>
                <p className="text-slate-600">Fullstack & AI Agents Developer</p>
                <section id="intro" className="space-y-6">
                  <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Intro</h2>
                  <p>
                    Hey! I&apos;m Enric J Trillo Nchana, a fullstack developer with a passion AI and multi-agent systems. As a previous digital developer and hybrid tech sales rep, I now focus on disruptive technologies and multi agent systems.
                  </p>
                  <p>
                    I was born and raised in southern Madrid 🇪🇸, I&apos;ve been living in London 🇬🇧 since my early teens, and I&apos;m from a small hispanic nation in Central Africa few can mark on the map – Equatorial Guinea 🇬🇶.
                  </p>
                </section>
              </div>
              <section id="story" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Story</h2>
                <p>
                  In 2014, at just 15, I started DJing–a craft that taught me the importance of rhythm, timing, and creativity. A year later, I dove into graphic design and coding at <Link target="_blank" className="font-bold underline text-amethyst-500" href="https://www.sfx.ac.uk/">St. Francis Xavier College</Link>, creating cover art for my mixes and writing my first line of Python code at 16. These early experiences laid the foundation for my journey in tech.
                </p>
                <div className="object-contain w-full overflow-hidden">
                  <Image priority src="/images/graduation.jpg" width={600} height={600} alt="Enric Trillo, graduation photo" />
                </div>
                <p>
                  During my years at the <Link target="_blank" className="font-bold underline text-amethyst-500" href="https://www.northampton.ac.uk/">University of Northampton</Link> (2017-2020), I didn&apos;t just stick to one thing. I explored everything from journalism to UI/UX design, motion graphics, video editing, and even bartending. But it was in my third year that I discovered my true passion: Artificial Intelligence. This revelation led to an A* grade and the publication of a featured Medium article with The Startup, where I shared my process and insights on AI.
                </p>
                <p>I graduated in 2020–during a time where the world was brought to a stop by the global pandemic. Picture being a 21-year-old fresh out of university with a computing degree, burning passion for emerging technologies and an ambitious spirit, but finding yourself stuck with a flimsy job market and a whooping <strong>5-figures in student debt</strong>. <i>That</i> was my intro into the real world.</p>
                <p>Instead of letting that define me, I flipped the script. I hopped on mastering hot, in-demand skills, which led me to secure a £5000/mo Fullstack Web3 Developer contract role at the age of 23. That opportunity was the catalyst for what will become <Link className="font-bold underline text-amethyst-500" href="https://metasyde.com?ref=enrictrillo">Metasyde</Link>, my company dedicated to building profitable and innovative solutions with disruptive technologies.</p>
              </section>
              <section id="mission" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Mission</h2>
                <p>The landscape has changed, and it's still changing. For instance, McKinsey reported they estimate 400 million people globally to be displaced by emerging technologies by 2030. While this may sound scary, I believe the technological disruption will bring about a fresh set of opportunities.</p>
                <p>So, I'm set on building online learning resources, like courses and tutorials, to help people thrive in a world with AI. To add more, I look to develop software solutions that can be of help to the businesses of tomorrow.</p>
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
              <section id="collaborations" className="space-y-6">
                <h2 className={cn(clash.className, "font-bold text-lg uppercase w-fit px-4 py-1 mb-3 bg-amethyst-500 text-white")}>Collaborations</h2>
                <p>
                  I&apos;m open to collaborations and new opportunities. Whether you&apos;re interested in working on a project together, need some insights on multi AI agent systems, or just want to chat about disruptive tech, feel free to reach out.
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
                {faqs.map((faq: any, idx: number) => {
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