import { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import FeaturedCars from "./components/FeaturedCars";
import ShowroomPromo from "./components/ShowroomPromo";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import CallToAction from "./components/CallToAction";

export const metadata: Metadata = {
  title: "Old Car Portfolio - Timeless Classics",
  description:
    "Showcasing vintage and classic cars — restoration stories, details, and enquiries.",
};

export default function Home() {
  return (
    <div className="bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100">
      <HeroSection />
      <FeaturedCars />
      <ShowroomPromo />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </div>
  );
}
