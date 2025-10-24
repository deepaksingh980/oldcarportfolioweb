"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

// Properly typed motion header to avoid TypeScript issues
const MotionHeader = motion.header as React.FC<
  React.HTMLAttributes<HTMLElement> & { animate?: any }
>;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionHeader
      animate={{
        backdropFilter: scrolled ? "blur(6px)" : "blur(0px)",
      }}
      className={`fixed w-full z-40 top-0 transition-all bg-white/70 dark:bg-black/30 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          OldCar<span className="text-vintageGold">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/cars">Cars</Link>
          <Link href="/contact">Contact</Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="p-2 text-xl" aria-label="Open menu">
            ☰
          </button>
        </div>
      </div>
    </MotionHeader>
  );
}
