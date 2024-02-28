"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect, useState } from "react"

export const StickyCard = ({ children }: { children: ReactNode }) => {
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
      animate={{ opacity: 1, y: "100%" }}
      // transition={{ duration: 0.3 }}
      style={{
        position: 'sticky',

        right: 265,
        // width: 200,
        zIndex: 1000,
      }}
      className="w-64 p-3 border rounded-lg shadow-lg -mr-9 h-36"
    >
      {children}
    </motion.div>
  );
}