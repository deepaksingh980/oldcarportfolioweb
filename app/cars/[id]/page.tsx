import { notFound } from "next/navigation";
import EnquiryForm from "../../components/EnquiryForm";
import AnimatedSection from "../../components/AnimatedSection";
import CarImages from "../../components/CarImages";

// ========== Status Badge Colors ==========
const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Coming Soon": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Sold: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

// ✅ Server-side data fetching
async function getCar(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/all-cars`, {
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) throw new Error("Failed to fetch cars");

  const cars = await res.json();
  const car = cars.find((c: any) => c._id === id);

  if (!car) return null;
  return car;
}

export default async function CarDetails({ params }: { params: { id: string } }) {
  const car = await getCar(params.id);
  if (!car) return notFound();

  const statusStyle = statusColors[car.status] || statusColors.Default;

  return (
    <AnimatedSection>
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        {/* ========== MAIN GRID ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: IMAGES */}
          <div>
            <CarImages car={car} />
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle}`}>
                {car.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-4">
              {car.brand} • {car.year} • {car.ownerType}
            </p>

            {/* PRICES */}
            <div className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-xl mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Discounted Price</p>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  ₹{car.discountedPrice?.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 line-through">
                  ₹{car.actualPrice?.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Actual Price</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {car.description}
            </p>

            {/* SPECS */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {Object.entries(car.specs || {} as Record<string, string | number>).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-gray-50 dark:bg-neutral-800">
                  <strong className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </strong>
                  <p className="text-gray-600 dark:text-gray-300">
                    {String(value)}
                  </p>
                </div>
              ))}
            </div>


            {/* Enquiry Form */}
            <div className="mt-10 border-t border-gray-200 dark:border-neutral-700 pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Interested in this car?
              </h2>
              <EnquiryForm carName={car.name} />
            </div>
          </div>
        </div>

        {/* ========== EXTRA INFO SECTION ========== */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-neutral-900 p-5 rounded-xl">
              <h3 className="font-medium text-lg mb-2">Performance</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Torque: {car.specs?.torque}</li>
                <li>Drive Type: {car.specs?.driveType}</li>
                <li>Top Speed: {car.specs?.topSpeed}</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-neutral-900 p-5 rounded-xl">
              <h3 className="font-medium text-lg mb-2">Ownership</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Owner Type: {car.ownerType}</li>
                <li>Year: {car.year}</li>
                <li>Category: {car.category}</li>
                <li>
                  Status:{" "}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle}`}>
                    {car.status}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 flex justify-center">
          <a
            href="/cars"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span className="relative">
              <span className="after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[1.5px] after:bg-current after:transition-all group-hover:after:w-full">
                Back to All Cars
              </span>
            </span>
          </a>
        </div>
      </section>
    </AnimatedSection>
  );
}
