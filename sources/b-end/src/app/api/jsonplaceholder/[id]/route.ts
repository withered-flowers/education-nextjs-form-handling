import { setTodoAsCompleted } from "@/utils/jsonplaceholder";

type Params = {
	id: string;
};

export const PATCH = async (
	_request: Request,
	{ params }: { params: Params },
): Promise<Response> => {
	const todo = await setTodoAsCompleted(Number(params.id));

	return Response.json(todo, {
		status: 200,
	});
};
