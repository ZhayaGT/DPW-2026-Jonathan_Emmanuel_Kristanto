# 📄 Jobsheet 1 — HTML5 Semantic Skeleton

## 👤 Identitas Mahasiswa

| Keterangan  | Detail |
| :---        | :--- |
| **Nama**    | Jonathan Emmanuel Kristanto |
| **Kelas**   | 2F/TI |
| **Absen**   | 20 |

---

## 🎯 Informasi Jobsheet

**Sub-CPMK:** Menyusun struktur halaman web dengan HTML5 semantic.

### 📂 Isi Tahap Ini
- [`index.html`](./index.html) — Menampilkan halaman beranda utama beserta ringkasan statistik.
- [`buku/list.html`](./buku/list.html) — Menampilkan struktur tabel untuk daftar buku secara statis.
- [`buku/tambah.html`](./buku/tambah.html) — Menyediakan form input untuk menambahkan data buku baru.
- [`anggota/list.html`](./anggota/list.html) — Menampilkan struktur tabel untuk daftar anggota secara statis.
- [`anggota/tambah.html`](./anggota/tambah.html) — Menyediakan form input untuk mendaftarkan anggota baru.

### 🚀 Cara Menjalankan
Buka `index.html` langsung di browser (belum butuh server).

### 📌 Catatan
> Belum ada CSS/JS — fokus murni pada struktur semantic (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) dan penamaan atribut `name`/`id` yang akan dipakai kembali di jobsheet berikutnya.

---

## 📝 6.5 Latihan Reflektif

Sebagai latihan mandiri, coba bandingkan sendiri form ini dengan form buku dan jawab pertanyaan berikut untuk menguji pemahaman:

**1. Kenapa field "Alamat" dan "No. HP" tidak diberi `required`, sedangkan "Nama" dan "No. Anggota" diberi?**
> Karena alamat dan No. HP bersifat opsional untuk pendataan.

**2. Apa yang akan terjadi (di browser) kalau kamu klik tombol "Simpan" tanpa mengisi field "Nama"? Coba buka filenya di browser dan praktikkan.**
> Akan muncul error atau peringatan *"Please fill out this field"* dari browser.

**3. Form ini juga belum punya atribut `action` pada tag `<form>`-nya — apa dampaknya saat tombol "Simpan" ditekan?**
> Tidak akan terjadi apa-apa (hanya memuat ulang halaman ke URL saat ini tanpa mengirim data kemanapun).