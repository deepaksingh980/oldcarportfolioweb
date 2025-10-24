"use client";

import AnimatedSection from "./AnimatedSection";
import { MotionImg } from "./MotionElements";

export default function Gallery() {
  const images = ["gallery1.jpg", "gallery2.jpg", "gallery3.jpg", "gallery4.jpg"];
  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Gallery Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <MotionImg
              key={i}
              src={`/images/${img}`}
              alt={`Vintage car ${i + 1}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl shadow-md object-cover w-full h-56"
            />
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
