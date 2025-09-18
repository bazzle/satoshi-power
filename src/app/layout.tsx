import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.scss";

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

export const metadata: Metadata = {
	title: "Satoshi Power",
	description: "Sats will eat the world",
};

export default function RootLayout({ children } : Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={`${bebasNeue.variable} ${dmSans.variable}`}>
				{children}
			</body>
		</html>
	);
}
