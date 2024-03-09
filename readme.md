# Education NextJS Form Handling dengan Server Actions

## Table of Content

- [Education NextJS Form Handling dengan Server Actions](#education-nextjs-form-handling-dengan-server-actions)
  - [Table of Content](#table-of-content)
  - [Disclaimer](#disclaimer)
  - [Introduction](#introduction)
  - [Langkah Pembelajaran](#langkah-pembelajaran)
    - [Langkah 1 - Server Component - Add Todo](#langkah-1---server-component---add-todo)
    - [Langkah 2 - Server Component - Update Todo](#langkah-2---server-component---update-todo)
    - [Langkah 3 - Client Component - Add Todo](#langkah-3---client-component---add-todo)
    - [Langkah 4 - Client Component - Update Todo](#langkah-4---client-component---update-todo)

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

### Langkah 2 - Server Component - Update Todo

### Langkah 3 - Client Component - Add Todo

### Langkah 4 - Client Component - Update Todo