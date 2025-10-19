import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";
import getDataPromise from "@/app/data/getData";



export const dynamicParams = false;

// Tell Next which static paths to build
export async function generateStaticParams() {
	const data = await getDataPromise();
	const dataArr = Object.values(data);
	return dataArr.map((item) => ({ slug: item.displayNameSlug }));
}

function Page({ params }) {
	try {
		const { slug } = params;

		return (
			<>
				<Header/>
				<main className="main">
					<div className="main__about">
						<About/>
					</div>
					<p>{slug}</p>
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
