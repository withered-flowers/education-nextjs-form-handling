import {
	TodoForm as ClientTodoForm,
	TodoList as ClientTodoList,
} from "@/components/client-side";

const Page = () => {
	return (
		<section className="bg-teal-100 p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
			<ClientTodoList />
			<ClientTodoForm />
		</section>
	);
};

export default Page;
