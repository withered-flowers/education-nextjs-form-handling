export type Todo = {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
};

export type TodoInput = Omit<Todo, "id" | "completed">;
