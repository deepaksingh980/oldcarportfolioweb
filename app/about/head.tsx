export default function Head() {
    const title =
        "About DeepakCars.in | Best Used Car Dealer in Bhubaneswar, Odisha";
    const description =
        "Learn about DeepakCars.in – Bhubaneswar’s trusted used car dealer offering certified pre-owned cars, transparent pricing, and full paperwork assistance across Odisha.";
    const url = "https://oldcarportfolioweb.vercel.app/about";

    const keywords =
        "about deepakcars, used car dealer bhubaneswar, second hand car showroom odisha, trusted car dealer odisha, best used cars bhubaneswar, deepak pre owned cars, car showroom bhubaneswar, used cars odisha, pre owned cars bhubaneswar, deepakcars about, company information deepakcars";

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
