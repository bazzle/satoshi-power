import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";
import { Grid } from "@/app/ui/modules/Grid";

export default function Home() {
	return (
		<>
			<Header/>
			<main className="main">
				<div className="row main__about">
					<div className="row-container">
						<About/>
					</div>
				</div>
				<div className="row row--lightest main__content">
                	<div className="row-container--wider">
						<Grid/>
					</div>
				</div>
			</main>
			<Footer/>
		</>
	);
}
