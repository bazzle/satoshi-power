import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";

// Only allow the slugs we prebuild (required for static export)
export const dynamicParams = false;

// Your manual list of slugs (unitNameSlug)
const slugs = [
	'czech-koruna',
	'thai-baht',
	'new-taiwan-dollar',
	'turkish-lira',
	'british-pound',
	'swiss-franc',
	'russian-ruble',
	'euro',
	'indian-rupee',
	'united-states-dollar',
	'icelandic-króna',
	'singapore-dollar',
	'canadian-dollar',
	'australian-dollar',
	'japanese-yen',
	'new-zealand-dollar',
	'hungarian-forint',
	'polish-złoty',
	'romanian-leu',
	'brazilian-real',
	'danish-krone',
	'chinese-renminbi-yuan',
	'hong-kong-dollar',
	'swedish-krona',
	'chilean-peso',
	'south-korean-won',
	'argentine-peso',
	'nigerian-naira',
];

// Tell Next which static paths to build
export async function generateStaticParams() {
	return slugs.map((slug) => ({ slug }));
}

async function Page({ params }) {
	try {
		const {slug} = await params;
		console.log(params);
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