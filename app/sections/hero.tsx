import { cn } from "@/lib/shared-utils"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { Kanit } from "next/font/google"
import { routes } from "@/lib/routes"

const heroFont = Kanit({
  subsets: ['latin'],
  weight: "800",
  display: 'swap',
})

export const logos = {
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Twitter</title><g ><path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path></g></svg>,
  github: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Github</title><g ><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></g></svg>,
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>LinkedIn</title><g ><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path></g></svg>,
  youtube: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>YouTube</title><g ><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path></g></svg>,
  link: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 1 1 0 10h-2" /><line x1="8" x2="16" y1="12" y2="12" /></svg>,
  mail: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>,
  copy: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>
}

export const Hero = () => {
  const profiles = [
    {
      label: "Twitter",
      url: "https://twitter.com/ricobuilds",
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


  return (
    <section id="hero">
      <div className="w-full mx-auto space-y-8 h-[calc(100vh-300px)]">
        <div className="flex flex-col items-center flex-1 gap-4">
          <Image src={'/headshot.jpeg'} alt="Enric Trillo" width={64} height={64} className="inline w-16 h-16 transition-all duration-300 rounded-full ring-2 ring-slate-200/80 hover:ring-4" />
          <div className="flex flex-col max-w-[725px] text-center">
            <p className="text-obsidian-400">Fullstack (AI) Developer</p>
            <h1 className={cn(heroFont.className, "text-4xl md:text-7xl")}><Balancer>Building the future of immersive experiences</Balancer></h1>
            <p className="mt-3 text-obsidian-500">
              <Balancer>
                Hey👋 I&apos;m a fullstack developer with 7 years experience developing frontend interfaces,
                on a mission to build the future of gaming with AI & emerging technologies @ <b className="text-charkol">Metasyde</b>.
              </Balancer>
            </p>
          </div>
          <Link href={routes.subscribe} className="flex md:hidden">
            <div className="px-2 py-2 text-white rounded-lg bg-charkol">Subscribe to Metasyde newsletter</div>
          </Link>
          <ul className="flex gap-6 mx-auto mt-6 w-fit">
            {
              profiles.map((i, idx) => (
                <li key={idx} className="group">
                  <Link href={i.url} target="_blank" className="flex gap-2 group"><span className={`${i.styles} duration-150`}>{i.logo}</span></Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}