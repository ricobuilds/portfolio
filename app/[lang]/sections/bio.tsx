import { cn } from "@/lib/shared-utils"
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const Bio = () => {

  const card__TextOne = "I was born & raised in Madrid, based in London since my early teens, and I'm from a small Hispanic nation in Central Africa few can mark on the map – Equatorial Guinea."
  const card__TextTwo = "I have 7+ years experience, currently focused on building with disruptive tech and actively assembling multi agent systems."
  const card__TextThree = "I've put the reps in with the tools I use to solve problems – NextJS and React with Typescript, SQL and NoSQL, Python, and many more. I dedicate a good chunk daily to learning new skills."
  const card__TextFour = "When I'm not coding, you can find me sharing insights online, exploring new ideas to push the boundaries of what's possible, or travelling since I'm heavy on learning languages and cultures."


  return (
    <section id="bio" className="left-0 flex flex-col px-4 mt-0 max-w-screen">
      <div
        className={cn(
          "p-4 bg-transparent border flex max-w-lg w-full mx-auto relative",
        )}
      >
        <Icon className="absolute w-6 h-6 text-black -top-3 -left-3 dark:text-white" />
        <Icon className="absolute w-6 h-6 text-black -bottom-3 -left-3 dark:text-white" />
        <Icon className="absolute w-6 h-6 text-black -top-3 -right-3 dark:text-white" />
        <Icon className="absolute w-6 h-6 text-black -bottom-3 -right-3 dark:text-white" />

        <div className="relative z-10 flex flex-col w-full h-full">
          <div className="h-fit w-fit">
            <Image src={'/images/headshot.jpeg'} alt="Enric Trillo" width={64} height={64} className="z-20 inline w-16 h-16 transition-all duration-300 rounded-3xl ring-2 ring-slate-200/80 hover:ring-4" />
            <div className="flex flex-col gap-4 mt-6">
              <h2 className={"font-bold text-xl"}>Hey, I&apos;m Enric👋</h2>
              <p>{card__TextOne}</p>
              <p>{card__TextTwo}</p>
              <p>{card__TextThree}</p>
              <p>{card__TextFour}</p>
            </div>
            <Link href={routes.about}>
              <button className="px-4 py-2 mt-4 text-white bg-charkol">Read my story</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}