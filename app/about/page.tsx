import AnimatedSection from '../components/AnimatedSection';

export const metadata = {
  title: 'About - Old Car Portfolio',
  description: 'About our classic car collection and restoration process.'
};

export default function About() {
  return (
    <AnimatedSection>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">About Our Collection</h1>
        <p className="mt-4">We are passionate collectors and restorers of vintage automobiles. Our collection focuses on preserving automotive history while showcasing detailed restorations and original-preserved pieces.</p>
      </section>
    </AnimatedSection>
  );
}