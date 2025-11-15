export default function Head() {
  const title =
    "Contact DeepakCars.in | Best Used Car Dealer in Bhubaneswar, Odisha";
  const description =
    "Contact DeepakCars.in for buying or selling used cars in Bhubaneswar, Odisha. Call us, visit our showroom, or send your enquiry for certified pre-owned cars.";
  const url = "https://oldcarportfolioweb.vercel.app/contact";

  const keywords =
    "contact deepakcars, contact used car dealer bhubaneswar, used car showroom odisha contact, deepakcars phone number, car dealer contact bhubaneswar, used cars bhubaneswar enquiry, pre owned cars odisha contact, deepak cars bhubaneswar showroom address, best used car showroom odisha";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="/Logo.png" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/Logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
