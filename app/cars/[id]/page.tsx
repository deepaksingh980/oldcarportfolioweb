import { cars } from '../../data/carsData';
import { notFound } from 'next/navigation';
import EnquiryForm from '../../components/EnquiryForm';
import AnimatedSection from '../../components/AnimatedSection';

export async function generateStaticParams() {
  return cars.map(c => ({ id: c.id }));
}

export default function CarDetails({ params }: { params: { id: string } }) {
  const car = cars.find(c => c.id === params.id);
  if (!car) return notFound();

  return (
    <AnimatedSection>
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img src={car.images[0]} alt={car.name} className="w-full h-80 object-cover rounded-2xl" />
            <div className="mt-4 flex gap-2">
              {car.images.map((img, i)=> (
                <img key={i} src={img} alt={`${car.name} ${i}`} className="w-20 h-14 object-cover rounded-md" />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">{car.manufacturer} • {car.year}</p>
            <p className="mt-4">{car.description}</p>

            <div className="mt-6 space-y-2">
              <div><strong>Engine:</strong> {car.specs.engine}</div>
              <div><strong>Transmission:</strong> {car.specs.transmission}</div>
              <div><strong>Original Price:</strong> {car.price}</div>
            </div>

            <div className="mt-6"><EnquiryForm carName={car.name} /></div>
          </div>
        </div>

        <div className="mt-8">
          <a href="/cars" className="underline">Back to Cars</a>
        </div>
      </section>
    </AnimatedSection>
  );
}