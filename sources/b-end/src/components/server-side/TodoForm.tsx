// ? Import fungsi yang sudah dibuat dengan "use server"
import { formAddTodoServerActions } from "@/actions";

const TodoForm = () => {
	return (
		<section className="border border-black p-2">
			<p className="text-xl font-semibold">Form - Server Component</p>

			<section className="p-4">
				<p className="text-center p-4 font-semibold">Form Add Todo</p>
				{/* 
					// ? Di sini kita akan menggunakan Server Action  
					// ? Caranya adalah dengan menggunakan "action" pada form 
					// ? Dan action ini akan mengarah pada fungsi
					// ? Yang sudah dibuat dengan meggunakan "use server"
				*/}
				<form
					action={formAddTodoServerActions}
					className="flex flex-col gap-4 mx-auto w-fit"
				>
					{/* 
						// ? Jangan lupa pada standard HTML, 
						// ? Untuk bisa mendapatkan data dari input
						// ? Kita harus memberikan "name" pada input
					*/}
					<div className="flex flex-col">
						<label htmlFor="title">Todo Title</label>
						{/* // ? Berikan name pada input */}
						<input
							id="title"
							name="title"
							className="py-2 px-4 rounded"
							type="text"
							placeholder="e.g. Buy soda"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="userId">Todo User Id</label>
						{/* // ? Berikan name pada input */}
						<input
							id="userId"
							name="userId"
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
