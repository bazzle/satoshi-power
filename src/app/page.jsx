import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";
import { Grid } from "@/app/ui/modules/Grid";

export default function Home() {
	return (
		<>
			<Header location="homepage" />
			<main className="main">
				<div className="row row--nomargin-top main__content">
                	<div className="row-container row-container--wider">
						<Grid/>
					</div>
				</div>
				<div className="row row--nomargin-bottom main__about">
					<div className="row-container">
						<About/>
					</div>
				</div>
			</main>
			<Footer/>
		</>
	);
}
