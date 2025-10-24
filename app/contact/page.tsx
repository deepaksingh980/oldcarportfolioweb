import AnimatedSection from '../components/AnimatedSection';
import EnquiryForm from  '../components/EnquiryForm'
export const metadata = {
  title: 'Contact - Old Car Portfolio',
  description: 'Contact us for enquiries about vintage cars and restoration services.'
};

export default function Contact() {
  return (
    <AnimatedSection>
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p className="mt-2">Questions? Enquiries? Use the form below and we will get back to you.</p>
        <div className="mt-6"><EnquiryForm /></div>
      </section>
    </AnimatedSection>
  );
}