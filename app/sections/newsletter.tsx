import React from 'react'
import { cn } from "@/lib/shared-utils"
import { Kanit } from "next/font/google"
import Balancer from "react-wrap-balancer"
import {BeehiivCustom} from "@/components/beehiiv-custom"

const kanit = Kanit({
  weight: "800",
  subsets: ['latin']
})

export default function Newsletter() {

  return (
    <section id="newsletter" className="flex flex-col py-16">
      <h2 className={cn(kanit.className, "flex items-center  text-center text-2xl font-medium px-4 py-1 mb-3 mx-auto text-white uppercase w-fit bg-amethyst-500")}>
        Shift Forward Newsletter
      </h2>
      <div className="w-full max-w-3xl mx-auto">
        <h3 className={cn("flex items-center mx-auto mb-3 text-lg font-medium text-center w-fit")}>
          <Balancer>Get notified when I push out top alpha on disruptive technologies, or launch a new Metasyde project right in your inbox.</Balancer>
        </h3>
        <div className="flex max-w-lg mx-auto mt-4">
          <BeehiivCustom />
        </div>
        <div className="w-full mt-3 text-center">
          <div className="pb-4">
            <span id="lipline" className="text-xs text-slate-400">Ps: I send emails every week, never spam or sell your data.</span>
          </div>
        </div>
      </div>
    </section>
  )
}