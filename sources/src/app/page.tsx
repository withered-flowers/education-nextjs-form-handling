export const Home = () => {
	return (
		<main className="mx-auto w-full lg:w-1/2 p-4 border border-black flex flex-col gap-2">
			<p className="font-semibold">NextJS - Form Handling</p>
			<p>
				Pada pembelajaran ini kita akan belajar tentang bagaimana caranya untuk
				menghandle form dengan menggunakan Server Action, baik pada Server
				Component maupun pada Client Component yang ada pada NextJS
			</p>
			<p>
				Silahkan pilih pada tautan di atas, untuk melihat bagaimana cara Server
				Component dan Client Component bekerja sama dengan Server Actions
			</p>
			<p>
				Untuk codingan full dari aplikasi ini dapat dilihat pada tautan{" "}
				<a
					className="text-emerald-500 hover:text-emerald-800/80 underline transition-colors duration-300"
					href="https://github.com/withered-flowers/education-nextjs-form-handling"
				>
					Github (Klik di sini)
				</a>
			</p>
		</main>
	);
};

export default Home;
