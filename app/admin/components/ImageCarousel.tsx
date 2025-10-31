import { useEffect, useState } from "react";

function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  // ✅ Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-48 mb-4">
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="w-full h-48 object-cover rounded-lg transition-all duration-500"
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
