import Header from "@/app/ui/modules/Header";
import Footer from "@/app/ui/modules/Footer";
import About from "@/app/ui/modules/About";

export default function Home() {
	return (
		<>
			<Header/>
			<main>
				<p>Main here</p>
				<About/>
			</main>
			<Footer/>
		</>
	);
}
