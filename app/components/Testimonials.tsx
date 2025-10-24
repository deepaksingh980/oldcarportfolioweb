"use client";

import { MotionDiv } from "./MotionElements";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    name: "Rajesh Mehta",
    text: "Absolutely loved the detailing and authenticity of every car!",
    image: "/images/user1.jpg",
  },
  {
    name: "Anita Sharma",
    text: "They helped me find a rare 1965 Mustang and handled the restoration beautifully.",
    image: "/images/user2.jpg",
  },
  {
    name: "Arjun Verma",
    text: "Their team knows vintage cars inside out — truly exceptional!",
    image: "/images/user3.jpg",
  },
];

export default function Testimonials() {
  return (
    <AnimatedSection>
      <section className="bg-neutral-100 dark:bg-neutral-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((review, index) => (
              <MotionDiv
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-vintageGold"
                  />
                  <p className="italic text-neutral-600 dark:text-neutral-300 mb-4">
                    “{review.text}”
                  </p>
                  <p className="font-semibold text-vintageGold">
                    — {review.name}
                  </p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
