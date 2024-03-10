import type { Todo, TodoInput } from "@/types/jsonplaceholder.defs";

const todos: Todo[] = [
	{ id: 1, userId: 1, title: "Buy milk", completed: true },
	{ id: 2, userId: 1, title: "Buy eggs", completed: false },
	{ id: 3, userId: 2, title: "Buy bread", completed: true },
	{ id: 4, userId: 3, title: "Buy butter", completed: false },
	{ id: 5, userId: 3, title: "Buy cheese", completed: false },
];

export const fetchTodos = async () => {
	// ? Seharusnya seperti ini bila menggunakan fetch dari jsonplaceholder
	// const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	// const responseJson: Todo[] = await response.json();
	// return responseJson;

	// ? Mari kita emulasikan fetch dari jsonplaceholder
	const responseJson: Todo[] = todos;

	// ? Emulasi fetch dari jsonplaceholder yang lama (1 detik)
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return responseJson;
};

export const createTodo = async (newTodo: TodoInput) => {
	// ? Seharusnya seperti ini bila menggunakan fetch dari jsonplaceholder
	// const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify(newTodo),
	// });
	// const responseJson: Todo = await response.json();
	// return responseJson;

	// ? Mari kita emulasikan fetch dari jsonplaceholder
	const lastTodo = todos[todos.length - 1];
	const newId = lastTodo.id + 1;
	const todoUntukDimasukkanKeArrayTodos: Todo = {
		...newTodo,
		id: newId,
		completed: false,
	};
	todos.push(todoUntukDimasukkanKeArrayTodos);

	// ? Emulasi fetch dari jsonplaceholder yang lama (1 detik)
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return todoUntukDimasukkanKeArrayTodos;
};

// Fungsi tambahan untuk mengubah todo menjadi completed
export const setTodoAsCompleted = async (todoId: number) => {
	// ? Seharusnya seperti ini bila menggunakan fetch dari jsonplaceholder
	// const response = await fetch(
	// 	`https://jsonplaceholder.typicode.com/todos/${todoId}`,
	// 	{
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ completed: true }),
	// 	},
	// );
	// const responseJson: Todo = await response.json();
	// return responseJson;

	// ? Mari kita emulasikan fetch dari jsonplaceholder
	const todo = todos.find((todo) => todo.id === todoId);

	if (todo) {
		todo.completed = true;
	}

	// ? Emulasi fetch dari jsonplaceholder yang lama (1 detik)
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return todo;
};
