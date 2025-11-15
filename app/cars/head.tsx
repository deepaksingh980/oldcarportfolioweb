export default function Head() {
    const title =
        "Used Cars in Bhubaneswar | Buy Second-Hand Cars in Odisha | DeepakCars.in";
    const description =
        "Find the best used cars in Bhubaneswar, Odisha at DeepakCars.in. Browse certified second-hand cars with full inspection, low prices, EMI options, and same-day delivery.";
    const url = "https://oldcarportfolioweb.vercel.app/cars";

    const keywords =
        "used cars bhubaneswar, second hand cars bhubaneswar, pre owned cars bhubaneswar, used cars odisha, second hand cars odisha, certified used cars bhubaneswar, car dealer bhubaneswar, deepakcars, best used car showroom odisha, buy used cars bhubaneswar, budget cars bhubaneswar, low price cars odisha, old cars bhubaneswar, used suv bhubaneswar, used hatchback bhubaneswar, used sedan bhubaneswar";

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
