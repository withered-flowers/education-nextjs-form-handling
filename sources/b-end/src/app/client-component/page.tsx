import {
	TodoForm as ClientTodoForm,
	TodoList as ClientTodoList,
} from "@/components/client-side";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Belajar Form Handling - Client Component",
};

const Page = () => {
	return (
		<section className="bg-teal-100 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
			{/* ClientTodoList dan ClientTodoForm masing masing adalah Client Component */}
			<ClientTodoList />
			<ClientTodoForm />
		</section>
	);
};

export default Page;
