// ? Untuk bisa menggunakan server actions (Fungsi yang berjalan di server saja),
// ? File yang ada di sini harus menggunakan directive "use server"
"use server";

import { createTodo } from "@/utils/jsonplaceholder";
import { revalidatePath } from "next/cache";

// ? Rules untuk membuat server actions:
// ? - Wajib berupa async function
// ? - Bisa menerima sebuah parameter berupa FormData (optional)
export const formAddTodoServerActions = async (formData: FormData) => {
	let finalResult = false;

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
		// ? Kita akan minta untuk flagging cache "stale" (basi) untuk path "/"
		// ? Sehingga akan melakukan re-fetching ulang

		// ! useEffect tidak akan tertrigger ulang !
		revalidatePath("/", "layout");

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

	// Bila semua sudah selesai, kita bisa melakukan return
	return finalResult;
};
