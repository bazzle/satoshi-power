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
					<div className="row main__content">
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

export default Page;
