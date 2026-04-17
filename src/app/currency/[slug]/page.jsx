import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";
import getDataPromise from "@/app/data/getData";
import CurrencyPage from "@/app/ui/modules/CurrencyPage";

export const dynamicParams = false;

// Tell Next which static paths to build
export async function generateStaticParams() {
	const data = await getDataPromise();
	const dataArr = Object.values(data);
	return dataArr.map((item) => ({ slug: item.currencyCodeSlug }));
}

async function Page({ params }) {
	try {
		const { slug } = await params;
		return (
			<>
				<Header/>
				<main className="main">
					<div className="row row--nomargin-top main__content">
                		<div className="row-container">
							<CurrencyPage slug={slug} />
						</div>
					</div>
					<div className="row main__about">
						<About/>
					</div>
				</main>
				<Footer/>
			</>
		)
	}
	catch(error) {
		console.error(error);
	}
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const data = await getDataPromise();
	const currencyObj = data[slug.toUpperCase()];

	if (!currencyObj) return { title: "Satoshi Power" };

	const title1 = currencyObj.noSubUnit || currencyObj.subUnitKilled ? currencyObj.demonym : `${currencyObj.subUnitName} /`
	const title2 = currencyObj.unitNameSingular
	const title = `${currencyObj.unitName} to Satoshi / Bitcoin`
	const description = `How many sats is one ${title1} ${title2}?`
	const url = `https://satoshi-power.com/currency/${slug}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: "website",
			siteName: "Satoshi Power",
		},
		alternates: {
			canonical: url
		}
	};
}

export default Page;
