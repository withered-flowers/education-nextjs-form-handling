import {
	TodoForm as ServerTodoForm,
	TodoList as ServerTodoList,
} from "@/components/server-side";

const Page = () => {
	return (
		<section className="bg-blue-100 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
			<ServerTodoList />
			<ServerTodoForm />
		</section>
	);
};

export default Page;
