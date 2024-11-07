"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion, useTransform, useScroll } from "framer-motion"

export function StickyCard({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll()
  
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  return (
    <motion.div
      className="sticky inset-0 z-50 top-2"
      // style={{ y: progress }}
    >
      {children}
      </motion.div>
  )
}

export const StickyCardd = ({ children }: { children: ReactNode }) => {
  const [isSticky, setIsSticky] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.3 }}
      style={{
        position: 'sticky',

        right: 265,
        // width: 200,
        zIndex: 1000,
      }}
      className="w-64 p-3 border rounded-lg shadow-lg h-36"
    >
      {children}
    </motion.div>
  );
}