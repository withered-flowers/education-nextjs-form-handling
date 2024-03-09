"use client";

const TodoForm = () => {
	return (
		<section className="border border-black p-2">
			<p className="text-xl font-semibold">Form - Client Component</p>

			<section className="p-4">
				<p className="text-center p-4 font-semibold">Form Add Todo</p>
				<form className="flex flex-col gap-4 mx-auto w-fit">
					<div className="flex flex-col">
						<label htmlFor="title">Todo Title</label>
						<input
							id="title"
							className="py-2 px-4 rounded"
							type="text"
							placeholder="e.g. Buy soda"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="userId">Todo User Id</label>
						<input
							id="userId"
							className="py-2 px-4 rounded"
							type="number"
							placeholder="e.g. 1"
						/>
					</div>

					<button
						className="py-2 px-4 rounded bg-gray-100 hover:bg-gray-300 transition-colors duration-300"
						type="submit"
					>
						Add Todo
					</button>
				</form>
			</section>
		</section>
	);
};

export default TodoForm;
