"use client";

import Link from "next/link";
import { MotionSection, MotionH1, MotionP, MotionDiv } from "./MotionElements";

export default function HeroSection() {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <MotionH1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          Timeless Classics. Modern Passion.
        </MotionH1>

        <MotionP
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-neutral-200"
        >
          Step into our world of iconic vintage automobiles — where every curve tells a story.
        </MotionP>

        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Link
            href="/cars"
            className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-white/10 transition"
          >
            View Cars
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full bg-vintageGold text-black font-medium"
          >
            About Us
          </Link>
        </MotionDiv>
      </div>

      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="vintage car"
          className="w-full h-full object-cover"
        />
      </div>
    </MotionSection>
  );
}
