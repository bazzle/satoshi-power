import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";
import { Grid } from "@/app/ui/modules/Grid";

export default function Home() {
	return (
		<>
			<Header/>
			<main>
				<Grid/>
				<About/>
			</main>
			<Footer/>
		</>
	);
}
