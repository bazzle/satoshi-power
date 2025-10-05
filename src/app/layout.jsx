import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.scss";
import { SnapshotsProvider } from "./data/SnapshotsContext";

const bebasNeue = Bebas_Neue({
	subsets: ["latin"],
	display: "swap",
	weight: "400",
	variable: "--font-bebas-neue",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	style: ["normal", "italic"],
	variable: "--font-dm-sans",
	weight: ["300", "400", "700", "800"],
});

export const metadata = {
	title: "Satoshi Power",
	description: "Sats will eat the world",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${bebasNeue.variable} ${dmSans.variable}`}>
				<SnapshotsProvider>
					{children}
				</SnapshotsProvider>
			</body>
		</html>
	);
}
