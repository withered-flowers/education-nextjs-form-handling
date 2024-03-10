// ? Import server actions
import { formCompleteTodoServerActions } from "@/actions";
import { fetchTodos } from "@/utils/jsonplaceholder";

// ? Ingat:
// ? - Server Component, bisa async karena dijalankan di server (React Server Component)
const TodoList = async () => {
	// ? Karena Server Component, maka kita bisa "secara langsung" memanggil function fetch
	// ? (tanpa menggunakan api)
	// ? Karena server component = logic berjalan di server, client terima jadi render html-nya.
	const todos = await fetchTodos();

	return (
		<section className="border border-black p-2">
			<p className="text-xl font-semibold">List - Server Component</p>

			{/* ? Hanya untuk pembelajaran saja, jadi mari gunakan table */}
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
						{todos.map((todo) => {
							// ? Karena di sini kita harus memodifikasi kode
							// ? Maka kita akan menggunakan { } dan harus menggunakan return
							// ? daripada langsung mengembalikan component

							// ? Di sini kita akan mengikat variabel yang dibutuhkan
							// ? untuk formCompleteTodoServerActions (todo.id)

							// ? Kita bisa menggunakan bind untuk mengikat variabel:
							// ? Parameter pertama adalah this, karena kita tidak memerlukan this
							// ? > Maka kita gunakan null
							// ? Parameter kedua (dan sisanya) adalah todo.id (dan argumen lainnya)
							// ? > Maka kita gunakan todo.id

							// ? Kenapa begini?
							// ? Supaya bisa tetap langsung digunakan dalam "Server Action"
							const formCompleteTodoServerActionsWithId =
								formCompleteTodoServerActions.bind(null, todo.id);

							return (
								<tr key={todo.id}>
									<td className="p-2 text-center">{todo.id}</td>
									<td className="p-2 text-center">{todo.userId}</td>
									<td className="p-2 text-left">{todo.title}</td>
									<td className="p-2 text-center">
										{todo.completed ? "Yes" : "No"}
									</td>
									{!todo.completed && (
										<td className="p-2">
											{/* // ? Karena ini merupakan Server Component, */}
											{/* // ? Maka kita hanya bisa menggunakan Form  */}
											{/* // ? (tidak ada event handler) */}
											<form action={formCompleteTodoServerActionsWithId}>
												{/* // ? Jangan lupa button ini diganti typenya menjadi submit */}
												<button
													type="submit"
													className="py-1 px-2 bg-gray-100 hover:bg-gray-300 rounded transition-colors duration-300"
												>
													Set as Completed
												</button>
											</form>
										</td>
									)}
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</section>
	);
};

export default TodoList;
