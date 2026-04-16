import currenciesRef from "@/app/data/currenciesReference.json";

export const dynamic = "force-static";

const BASE_URL = "https://satoshi-power.com";
const excluded = ["ghs"];

export default function sitemap() {
	const currencyEntries = Object.keys(currenciesRef)
		.filter((code) => !excluded.includes(code))
		.map((code) => ({
			url: `${BASE_URL}/currency/${code}`,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		}));

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		...currencyEntries,
	];
}
