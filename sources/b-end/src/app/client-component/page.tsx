import {
	TodoForm as ClientTodoForm,
	TodoList as ClientTodoList,
} from "@/components/client-side";

// ? Karena di sini "masih" Server Component, kita bisa menggunakan "fetch" langsung
import { fetchTodos } from "@/utils/jsonplaceholder";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Belajar Form Handling - Client Component",
};

// ? Karena ini Server Component, kita bisa menggunakan async component
const Page = async () => {
	const todos = await fetchTodos();

	return (
		<section className="bg-teal-100 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
			{/* // ? ClientTodoList dan ClientTodoForm masing masing adalah Client Component */}
			{/* // ? Kita bisa passing data hasil fetch */}
			{/* // ? dari Server Component ke Client Component via attributes >< props */}
			<ClientTodoList todos={todos} />
			<ClientTodoForm />
		</section>
	);
};

export default Page;
