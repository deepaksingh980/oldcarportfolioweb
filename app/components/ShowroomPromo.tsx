"use client";

import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

export default function ShowroomPromo() {
  return (
    <AnimatedSection>
      <section className="bg-neutral-900 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Explore our exclusive collection of restored vintage cars in person.
          Experience craftsmanship, legacy, and automotive excellence.
        </p>
        <video
          src="/videos/showroom.mp4"
          className="mx-auto rounded-2xl shadow-lg w-full max-w-4xl"
          autoPlay
          muted
          loop
        />
        <div className="mt-8">
          <Link
            href="/contact"
            className="bg-vintageGold text-black px-8 py-3 rounded-full font-medium hover:opacity-90"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </AnimatedSection>
  );
}
