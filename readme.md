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
    ```

2. 

### Langkah 3 - Client Component - Add Todo

### Langkah 4 - Client Component - Update Todo