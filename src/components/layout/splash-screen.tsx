"use client";

import { motion } from 'framer-motion';

export function SplashScreen() {
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  const textVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i = 1) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.25 + 0.5, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-pink-950/50 dark:via-purple-950/50 dark:to-blue-950/50"
    >
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="rounded-3xl p-6 shadow-2xl backdrop-blur-md bg-white/70"
      >
        <svg width="96" height="96" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#EC4899" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#g)" />
          <path d="M14 30L24 18L34 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <motion.h1
        custom={1}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500"
      >
        LegalAI
      </motion.h1>

      <motion.p
        custom={2}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-2 text-base text-slate-700 dark:text-slate-300"
      >
        Smarter Access to Court Records
      </motion.p>
    </motion.div>
  );
}
