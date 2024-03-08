import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Belajar Form Handling",
	description: "Dibuat oleh withered-flowers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="font-mono">{children}</body>
		</html>
	);
}
