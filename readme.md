# Education NextJS Form Handling dengan Server Actions

## Table of Content

- [Education NextJS Form Handling dengan Server Actions](#education-nextjs-form-handling-dengan-server-actions)
  - [Table of Content](#table-of-content)
  - [Requirement](#requirement)
  - [Disclaimer](#disclaimer)
  - [Introduction](#introduction)
  - [Langkah Pembelajaran](#langkah-pembelajaran)
    - [Langkah 1 - Server Component - Add Todo](#langkah-1---server-component---add-todo)
    - [Langkah 2 - Server Component - Update Todo](#langkah-2---server-component---update-todo)
    - [Langkah 3 - Client Component - Add Todo](#langkah-3---client-component---add-todo)
    - [Langkah 4 - Client Component - Update Todo](#langkah-4---client-component---update-todo)

## Requirement

Sebelum mempelajari materi ini, sebaiknya Anda sudah:
- Pernah menggunakan `nodejs`
- Sudah menginstall `nodejs` dan mengerti menggunakan perintah `npm`
- Sudah pernah menggunakan `NextJS`, setidaknya sampai menjalankan lewat `npm run dev`

## Disclaimer

- Pada pembelajaran ini, kode awal ada pada `sources/a-start` dan kode yang sudah jadi ada pada `sources/b-end`.
- Pada pembelajaran ini Router yang digunakan adalah `app`, bukan `pages`
- Pembelajaran ini akan terfokus pada `Server Actions`, sehingga apabila ada yang protes *__kan bisa pakai logic React pada umumnya untuk menyelesaikan ini__*, maka di luar konteks yang ada, karena pembelajaran ini untuk `Eksplorasi NextJS`.
- `Server Actions` yang digunakan dalam pembelajaran ini adalah yang fungsinya terpisah dari Componentnya (tidak di dalam 1 file dengan Componentnya), untuk alasan *kode yang lebih enak dilihat*.

## Introduction

Pada pembelajaran ini kita akan belajar tentang bagaimana caranya untuk menghandle form dengan menggunakan `Server Actions`, baik pada `Server Component` maupun pada `Client Component` yang ada pada NextJS.

`Server Actions` merupakan *asynchronous function* yang akan dijalankan **di server**, yang pada NextJS ini, digunakan untuk meng-handle form submission dan mutasi data, dan dapat berjalan pada `Server Component` maupun `Client Component`.

Jadi, yuk, tanpa lama lama lagi, mari kita demo dan sekaligus mempelajari Server Actions ini !

## Langkah Pembelajaran

Pada demo yang ada di pembelajaran ini kita akan mencoba untuk mempelajari bagaimana caranya menerapkan `Server Actions` ini baik pada `Server Component` maupun pada `Client Component`, untuk menambahkan Data dan meng-update Data.

### Langkah 1 - Server Component - Add Todo

Pada langkah ini kita akan mencoba untuk mengimplementasikan Add Todo pada Server Component (`src/app/server-component`)

Adapun langkah-langkahnya adalah sebagai berikut:

1. Membuat sebuah file baru dengan nama `index.ts` pada folder `src/actions` (`src/actions/index.ts`)
   
2. Menuliskan kode sebagai berikut pada file `index.ts`:
   
    ```ts
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
    ```

    Pada langkah ini kita berhasil menambahkan sebuah fungsi dengan nama `formAddTodoServerActions` yang akan dipanggil oleh Component Form yang kita miliki (`ServerTodoForm` pada file `server-component/page.tsx`)

3. Membuka file `src/app/server-component/page.tsx` untuk menganalisis kode yang sudah ada.

    Ternyata pada file ini hanyalah berupa "cangkang" saja, yang terdiri dari 2 buah Component:
      - `TodoList` yang diberi alias `ServerTodoList`
      - `TodoForm` yang diberi alias `ServerTodoForm`

    Untuk bisa mengimplementasikan button submit `Add Todo`, yang merupakan bagian dari `TodoForm`, berarti kita harus membuka file `TodoForm` yang ada. 

4. Membuka file `TodoForm.tsx` (`src/components/server-side/TodoForm.tsx`) dan memodifikasi filenya menjadi sebagai berikut:
   
    ```tsx
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
    ```

    Pada kode di atas sebenarnya kita hanya melakukan:
    - Import server actions (fungsi `formAddTodoServerActions`)
    - Memberikan property `name` pada input
    - Memberikan property `action` pada form

5. Selanjutnya mari coba jalankan aplikasi, dan bukalah tautan `Server Component`, kemudian coba untuk masukkan data pada form yang ada, dan tekan tombol `Add Todo`, dan tunggu beberapa saat, dan *voila* !
   
    Data sudah berhasil ditambahkan !

    Yak, akhirnya sudah selesai menggunakan Server Actions pada Component Form yang hanya membutuhkan Form Data saja, *cukup mudah bukan?*

    Walaupun sebenarnya ada sedikit yang aneh:
    - Form setelah selesai diisi tidak bisa di-reset
    - Hasil kembalian dari Server Action (boolean), kita tidak apa apakan.
  
    Hal ini terjadi karena kita menggunakan `Server Component` untuk `Form`, sehingga memang __tidak interaktif__ (tanpa state, tanpa event handler)
  
    > Nanti akan kita coba lihat lagi pada `Client Component - Add Todo` yah !

### Langkah 2 - Server Component - Update Todo

Pada langkah ini kita akan mencoba untuk mengimplementasikan `Update Todo`, yang mana masih berupa button `Set as Completed`.

Harapannya setelah langkah ini selesai, pada saat `Set as Completed` ditekan, maka Todo yang terpilih akan di-update status `completed` nya menjadi `true`, dan buttonnya akan menghilang.

Namun sayangnya, button yang ada pada `TodoList` ini adalah merupakan `Server Component`, dan `Server Component` tidak bisa memiliki *event handler*.

Waduh... 🤔 *Gimana donk* cara menyelesaikannya yah 🤔 ?
- Lagi-lagi solusinya adalah melalui... `Server Actions`

Mari kita coba menyelesaikan masalah ini yah dengan solusi yang ada !

Adapun langkah untuk mengerjakannya adalah sebagai berikut:

1. Membuka file `src/action/index.ts` dan modifikasi kode menjadi sebagai berikut:

    ```ts
    // ? Untuk bisa menggunakan server actions (Fungsi yang berjalan di server saja),
    // ? File yang ada di sini harus menggunakan directive "use server"
    "use server";

    import { createTodo, setTodoAsCompleted } from "@/utils/jsonplaceholder";
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
        // ? Kita akan minta untuk flagging cache "stale" (basi) untuk path "/" (layout)
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

      // ? Bila semua sudah selesai, kita bisa melakukan return
      // ? Selain mengembalikan hanya satu nilai, kita juga bisa mengembalikan object
      // ? (Jika diperlukan, yang penting adalah data harus bersifat Serializable)
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
    ```

    Pada langkah ini kita menambahkan sebuah `Server Actions` function dengan nama `formCompleteTodoServerActions`

2. Selanjutnya kita akan menambahkan logic untuk menggunakan `Server Actions` ini pada component yang membutuhkan, yaitu pada `server-side` - `TodoList`.

    Membuka file `src/components/server-side/TodoList.tsx` dan modifikasi file menjadi sebagai berikut:

    ```tsx
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
    ```

    Pada langkah ini kita: 
    - Mengimport `Server Action`, kemudian 
    - Mengubah `map` yang awalnya langsung mengembalikan Component, 
    - Menambahkan logic untuk bind `Server Action` dengan argument yang dibutuhkan `todo.id`,
    - Mengubah button type button menjadi form dengan button type submit
    - Menyisipkan action pada form

3. Menjalankan kode ini, dan coba untuk meng-set salah satu Todo yang ada menjadi `completed`, apakah berhasil?

    Hint:
    - Kalau kode ini diikuti dengan baik, seharusnya berjalan dengan baik *sih* 😊

Sampai pada tahapan ini, artinya kita sudah berhasil untuk menambahkan logic untuk melakukan Mutasi pada data yang ada, dengan `Server Component` loh !

> *__Cukup menantang, dan cukup berbeda dari React kan?__*

Tapi dari sini kita masih kurang sesuatu *nih*, yaitu apa yang dikenal dengan **interaktifitas**:
- Bagaimana kalau ternyata prosesnya lama, sehingga kita butuh untuk menampilkan sesuatu yang sifatnya menunggu? (Progress bar, atau loading ?)
- Hal ini tentunya tidak dapat dilakukan karena kita menggunakan `Server Component` kan?
- Kalau ini menjadi `Client Component`, kira kira apa yang akan terjadi yah? 🧐

### Langkah 3 - Client Component - Add Todo

Pada langkah ini kita akan mencoba untuk mereplikasi apa yang dibuat sebelumnya, hanya saja dengan menggunakan `Client Component`, dan kita akan lihat, apakah ada yang berbeda?

Mari kita lihat apa yang sudah dibuat pada `Client Component` terlebih dahulu:
- Pada file `src/app/client-component/page.tsx`: 
  - `page.tsx` ini, merupakan `Server Component`, dan memanggil fungsi `fetchTodos` 
  - Terlihat ada 2 Component yang terpanggil, yaitu `ClientTodoList` dan `ClientTodoForm`, dan pada `ClientTodoList` diberikan props berupa hasil dari `fetchTodos`
- Pada file `ClientTodoList` (`src/components/client-side/TodoList.tsx`):
  - Terlihat ada *directive* `"use client"` yang menandakan `Client Component`
  - Component ini menerima *props* dengan nama `todos` yang kemudian akan diproses membentuk tampilan data dalam bentuk tabel.
- Pada file `ClientTodoForm` (`src/components/client-side/TodoForm.tsx`):
  - Terlihat ada *directive* `"use client"` yang menandakan `Client Component`
  - Tidak ada perbedaan sama sekali dengan `Server Component` yang sudah dibuat sebelumnya (`src/components/server-side/TodoForm.tsx`)

Nah setelah melihat ini, mari kita mulai langkah mengimplementasikan penambahan data pada form yang sudah dibuat. Adapun langkah-langkahnya adalah sebagai berikut:

1. Membuka file `src/actions/index.ts`, meng-copy function `formAddTodoServerActions` dan mem-paste function tersebut dan menggantinya dengan nama `formAddTodoServerActionsFromClient`.
    
    Hasil akhir kode pada `src/actions/index.ts` akan menjadi sebagai berikut:

    ```ts
    // ? Untuk bisa menggunakan server actions (Fungsi yang berjalan di server saja),
    // ? File yang ada di sini harus menggunakan directive "use server"
    "use server";

    import { createTodo, setTodoAsCompleted } from "@/utils/jsonplaceholder";
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
        // ? Kita akan minta untuk flagging cache "stale" (basi) untuk path "/" (layout)
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

      // ? Bila semua sudah selesai, kita bisa melakukan return
      // ? Selain mengembalikan hanya satu nilai, kita juga bisa mengembalikan object
      // ? (Jika diperlukan, yang penting adalah data harus bersifat Serializable)
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

    export const formAddTodoServerActionsFromClient = async (
      formData: FormData,
    ) => {
      let finalResult = false;

      try {
        const title = formData.get("title");
        const userId = formData.get("userId");

        await createTodo({
          title: String(title),
          userId: Number(userId),
        });

        revalidatePath("/", "layout");

        finalResult = true;
      } catch (err) {
        finalResult = false;
      }

      return finalResult;
    };
    ```

### Langkah 4 - Client Component - Update Todo