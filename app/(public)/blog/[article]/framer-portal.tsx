"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export function FramerPortal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      id="framer-portal"
      className="max-w-[970px] relative"
      initial={{ opacity: 0, y: 10}}
      animate={{ opacity: 1 ,y: 0}}
      transition={{ duration: 0.300 }}
    >
      {children}
    </motion.div>
  )
}