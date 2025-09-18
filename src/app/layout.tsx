import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
	title: "Satoshi Power",
	description: "Sats will eat the world",
};

export default function RootLayout({ children } : Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
