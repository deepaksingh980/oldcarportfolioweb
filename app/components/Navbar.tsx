"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { MotionDiv } from "../components/MotionElements";
const MotionHeader = motion.header as React.FC<
  React.HTMLAttributes<HTMLElement> & { animate?: any }
>;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
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

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-xl"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </MotionHeader>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MotionDiv
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 flex justify-end md:hidden"
          >
            {/* Drawer Panel */}
            <div className="bg-white dark:bg-neutral-900 w-64 h-full shadow-lg flex flex-col p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Menu</h2>
                <button
                  className="p-2"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/cars" onClick={() => setMobileMenuOpen(false)}>
                  Cars
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </nav>

              {/* Theme Toggle at Bottom */}
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
