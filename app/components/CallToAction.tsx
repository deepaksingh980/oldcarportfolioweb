"use client";

import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

export default function CallToAction() {
  return (
    <AnimatedSection>
      <section className="bg-gradient-to-r from-vintageGold to-yellow-400 py-16 text-center text-black">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Own a Piece of History?
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          Connect with our experts to find your dream vintage car or start
          your restoration project today.
        </p>
        <Link
          href="/contact"
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800"
        >
          Contact Us
        </Link>
      </section>
    </AnimatedSection>
  );
}
