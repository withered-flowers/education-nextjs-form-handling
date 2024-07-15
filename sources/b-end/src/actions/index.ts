// ? Untuk bisa menggunakan server actions (Fungsi yang berjalan di server saja),
// ? File yang ada di sini harus menggunakan directive "use server"
"use server";

import {
	createTodo,
	fetchTodos,
	setTodoAsCompleted,
} from "@/utils/jsonplaceholder";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// ? Rules untuk membuat server actions:
// ? - Wajib berupa async function
// ? - Bisa menerima sebuah parameter berupa FormData (optional)
export const formAddTodoServerActions = async (formData: FormData) => {
	let finalResult = false;
	console.log("This is triggered");

	try {
		// ? Ambil data dari FormData Submission (berdasarkan input name)
		const title = formData.get("title");
		const userId = formData.get("userId");

		// TODO: Bisa juga ditambahkan validasi input disini
		// ? Bisa dengan menggunakan Zod ataupun menggunakan Joi atau Yup
		// ? Bisa juga dengan manual validation

		// ? Ingat bahwa fungsi ini akan berjalan di server
		// ? Sehingga kita juga bisa menggunakan fungsi fungsi yang berjalan di server saja
		// ? e.g. redirect, atau mengakses database

		// ? Ceritanya di sini kita hanya mau menambahkan todo saja
		// ? Kemudian akan melakukan "refresh / refetch" data
		await createTodo({
			// ? Bisa juga menggunakan title as string, userId as number
			title: String(title),
			userId: Number(userId),
		});

		// ? Jangan lupa karena fetch-nya akan terkena cache
		// ? Kita akan minta untuk flagging cache "stale" (basi) untuk path "/" (layout)
		// ? Sehingga akan melakukan re-fetching ulang

		// ! useEffect tidak akan tertrigger ulang !
		revalidatePath("/", "layout");

		const todos = await fetchTodos();
		console.log(todos);
		console.log("Cookies: ", cookies().toString());

		// ? Kita juga bisa melakukan return
		// ! Yang penting adalah data harus bersifat Serializable
		// ! (https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)

		// ? Misalnya dalam kode ini kita memiliki asumsi:
		// ? Boolean true apabila berhasil,
		// ? Boolean false apabila gagal
		finalResult = true;
	} catch (err) {
		// ? Bila gagal, kita bisa melakukan return false
		finalResult = false;
	}

	// ? Bila semua sudah selesai, kita bisa melakukan return
	// ? Selain mengembalikan hanya satu nilai, kita juga bisa mengembalikan object
	// ? (Jika diperlukan, yang penting adalah data harus bersifat Serializable)
	console.log("Final result is", finalResult);
	return finalResult;
};

// ? Server Actions selain hanya bisa menerima FormData,
// ? juga bisa menerima inputan tambahan, via parameter sebelum FormData
// ? Sehingga cara menerimanya, adalah dengan:
// ? - Parameter pertama, kedua, ketiga, dst adalah data tambahan (args)
// ? - Parameter terakhir adalah FormData
// ? - const fn = async (...args, formData: FormData) => Promise<Serializable>

// ! Perhatikan cara menambahkan inputan tambahan pada Server Action-nya yah !
// ! (Bisa dilihat pada /src/components/server-side/TodoList.tsx)
export const formCompleteTodoServerActions = async (
	todoId: number,
	_formData: FormData,
) => {
	let finalResult = false;

	try {
		// ? Ceritanya di sini kita hanya mau meng-set todo yang terpilih jadi complete
		// ? Kemudian akan melakukan "refresh / refetch" data
		await setTodoAsCompleted(todoId);

		// ? Jangan lupa karena fetch-nya akan terkena cache
		// ? Kita akan minta untuk flagging cache "stale" (basi) untuk path "/" (layout)
		// ? Sehingga akan melakukan re-fetching ulang

		// ! useEffect tidak akan tertrigger ulang !
		revalidatePath("/", "layout");

		// ? Asumsi:
		// ? Boolean true apabila berhasil,
		// ? Boolean false apabila gagal
		finalResult = true;
	} catch (err) {
		finalResult = false;
	}

	// ? Bila semua sudah selesai, kita bisa melakukan return
	// ? Selain mengembalikan hanya satu nilai, kita juga bisa mengembalikan object
	// ? (Jika diperlukan, yang penting adalah data harus bersifat Serializable)
	return finalResult;
};
