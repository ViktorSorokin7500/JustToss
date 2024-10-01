import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared";

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Just Toss",
		default: "Головна | Just Toss",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<main className="min-h-screen">
					<Header />
					<div className="h-[1px] w-full bg-gray-300" />
					{children}
				</main>
			</body>
		</html>
	);
}
