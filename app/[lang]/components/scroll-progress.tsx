"use client"

import { motion, useTransform, useScroll } from "framer-motion"


export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  return (
    <motion.div
      className="fixed inset-0 z-50 h-1.5 bg-amethyst-500"
      style={{ width: progress }}
    />
  )
}