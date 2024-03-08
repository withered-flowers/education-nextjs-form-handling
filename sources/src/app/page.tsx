import {
	TodoForm as ClientTodoForm,
	TodoList as ClientTodoList,
} from "./components/client-side";
import {
	TodoForm as ServerTodoForm,
	TodoList as ServerTodoList,
} from "./components/server-side";

export const Home = () => {
	return (
		<main>
			<section className="bg-blue-100 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
				<ServerTodoList />
				<ServerTodoForm />
			</section>

			<section className="bg-teal-100 p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
				<ClientTodoList />
				<ClientTodoForm />
			</section>
		</main>
	);
};

export default Home;
