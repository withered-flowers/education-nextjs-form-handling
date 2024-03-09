import type { Metadata } from "next";
import Link from "next/link";
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
			<body className="font-mono">
				<main>
					<section className="flex gap-4 justify-center items-center p-4">
						<Link
							className="text-emerald-500 hover:text-emerald-800/80 underline transition-colors duration-300"
							href="/"
						>
							Home
						</Link>
						<Link
							className="text-emerald-500 hover:text-emerald-800/80 underline transition-colors duration-300"
							href="/server-side"
						>
							Server Side
						</Link>
						<Link
							className="text-emerald-500 hover:text-emerald-800/80 underline transition-colors duration-300"
							href="/client-side"
						>
							Client Side
						</Link>
					</section>

					{children}
				</main>
			</body>
		</html>
	);
}
