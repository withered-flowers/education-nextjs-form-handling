import type { TodoInput } from "@/types/jsonplaceholder.defs";
import { createTodo, fetchTodos } from "@/utils/jsonplaceholder";

export const GET = async (): Promise<Response> => {
	const todos = await fetchTodos();

	// ? Bisa juga menggunakan NextResponse apabila menginginkan data type yang lebih spesifik
	// ? (Karena NextResponse masih merupakan turunan dari Response namun bisa menerima Generic Type)
	return Response.json(todos, {
		status: 200,
	});
};

// ? Bisa juga untuk Request menggunakan NextRequest
// ? (Karena NextRequest masih merupakan turunan dari Request namun memiliki fungsi yang lebih lengkap untuk NextJS)
export const POST = async (request: Request): Promise<Response> => {
	// ? Get data from request body, asumsikan dari form (FormData)
	// ! Data dari API biasanya adalah JSON (application/json)
	// ! tapi data dari client frontend biasana adalah FormData (application/x-www-form-urlencoded)
	const todoInput = await request.formData();

	// ? Konversi jadi Object (JSON)
	const objTodoInput: TodoInput = {
		userId: Number(todoInput.get("userId")),
		title: String(todoInput.get("title")),
	};

	const todos = await createTodo(objTodoInput);

	return Response.json(todos, {
		status: 201,
	});
};
