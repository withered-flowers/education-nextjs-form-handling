import {
	TodoForm as ServerTodoForm,
	TodoList as ServerTodoList,
} from "@/components/server-side";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Belajar Form Handling - Server Component",
};

const Page = () => {
	return (
		<section className="bg-blue-100 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
			{/* ServerTodoList dan ServerTodoForm masing masing adalah Server Component */}
			<ServerTodoList />
			<ServerTodoForm />
		</section>
	);
};

export default Page;
