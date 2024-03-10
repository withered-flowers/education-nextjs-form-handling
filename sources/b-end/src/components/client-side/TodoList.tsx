"use client";

import type { Todo } from "@/types/jsonplaceholder.defs";
// import { useEffect, useState } from "react";

type Props = {
	todos: Todo[];
};

// ? Ingat ini Client Component
// ? Client Component tidak bisa async, namun bisa menggunakan Hooks (React).
// ? Dan juga bisa menerima props, dimana datanya dari Server Component (page.tsx)
const TodoList = ({ todos }: Props) => {
	// ! Karena datanya di-props dari server component (page.tsx),
	// ! Jadinya... tidak perlu useState dan useEffect sama sekali
	// ? Bisa Hooks? jadi Gunakan useState dhe !
	// const [todos, setTodos] = useState<Todo[]>([]);

	// ? Supaya bisa fetch (dari Server / API), kita gunakan useEffect
	// ! Ingat:
	// ! - Fetch ini akan terjadi di client,
	// !   	karena ada "loading" 1 detik akan terjadi "delay" / "data kosong"
	// !   	selama 1 detik di client, sebelum terjadi re-render !
	// ? Tidak diperlukan lagi, karena data sudah diprops dari Server Component
	// useEffect(() => {
	// 	const fetchTodos = async () => {
	// 		const response = await fetch("/api/jsonplaceholder");
	// 		const responseJson: Todo[] = await response.json();

	// 		setTodos(responseJson);
	// 	};

	// 	fetchTodos();
	// }, []);

	return (
		<section className="border border-black p-2">
			<p className="text-xl font-semibold">List - Client Component</p>

			{/* // ? Hanya untuk pembelajaran saja, jadi mari gunakan table */}
			<section className="p-4">
				<table className="mx-auto">
					<thead>
						<tr>
							<th>Id</th>
							<th>User Id</th>
							<th>Title</th>
							<th>Completed</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo) => (
							<tr key={todo.id}>
								<td className="p-2 text-center">{todo.id}</td>
								<td className="p-2 text-center">{todo.userId}</td>
								<td className="p-2 text-left">{todo.title}</td>
								<td className="p-2 text-center">
									{todo.completed ? "Yes" : "No"}
								</td>
								{!todo.completed && (
									<td className="p-2">
										<button
											type="button"
											className="py-1 px-2 bg-gray-100 hover:bg-gray-300 rounded transition-colors duration-300"
										>
											Set as Completed
										</button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</section>
	);
};

export default TodoList;
