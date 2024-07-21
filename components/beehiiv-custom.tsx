import React from "react"
import { createSubscriber } from "../lib/actions"
import { AtSign } from "lucide-react"

export const BeehiivCustom = () => {
  return (
    <div className="relative w-full group">
      <form action={createSubscriber}>
        <AtSign className="absolute w-5 h-5 -translate-y-1/2 text-slate-400 group-focus-within:text-amethyst-500 left-5 top-1/2" />
        <button type="submit" className="absolute px-2 py-1 text-center text-white -translate-y-1/2 rounded-full right-2 top-1/2 bg-amethyst-500">Subscribe</button>
        <input type="email" name="email" id="email" className="w-full px-4 py-2 pl-12 transition-colors duration-500 ease-in-out border rounded-full pr-28 border-slate-400 outline-amethyst-500" placeholder="Enter your email" />
      </form>
    </div>
  )
}