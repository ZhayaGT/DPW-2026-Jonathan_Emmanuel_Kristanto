# 📘 Dokumentasi SIMPUS-Mini — Jobsheet 7

Panduan singkat mengenai struktur dan fitur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 7.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-07/
├── index.php                 # Beranda + ringkasan statistik & tombol Reset Data
├── reset.php                 # Mengosongkan seluruh $_SESSION
├── includes/
│   ├── header.php            # Bagian atas HTML + navbar
│   └── footer.php            # Bagian bawah HTML + footer
├── assets/
│   ├── css/
│   │   └── style.css         # Stylesheet global + gaya flash message
│   └── js/
│       └── app.js            # Menu hamburger, hapus, filter, counter, validasi form
├── buku/
│   ├── list.php              # Tabel dirender dari session
│   ├── tambah.php            # Form tambah buku
│   └── proses_tambah.php     # Validasi server + simpan ke session
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php
├── docs/
│   ├── wireframe.md          # Rancangan fitur yang belum dikoding
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md            # Dokumentasi ini
└── README.md                 # Laporan pengerjaan jobsheet
```

## 🧭 Penjelasan Folder

- **`index.php`** — Halaman beranda dengan navigasi, ringkasan jumlah buku/anggota dari session, dan tombol Reset Data.
- **`reset.php`** — Mengosongkan seluruh session lalu mengembalikan pengguna ke Beranda.
- **`includes/header.php`** — Bagian atas HTML: `session_start()`, `<head>`, navbar, dan pembuka `<main>`. Path menu/CSS dihitung otomatis lewat `$base`.
- **`includes/footer.php`** — Penutup `</main>`, footer, dan pemuat `app.js`. Menyediakan kait `$extra_scripts` untuk skrip tambahan.
- **`assets/css/style.css`** — Stylesheet global, termasuk gaya `.flash`, `.flash-success`, dan `.flash-error`.
- **`assets/js/app.js`** — Interaktivitas umum: menu hamburger, konfirmasi hapus, filter tabel, counter baris, dan validasi form.
- **`buku/`** dan **`anggota/`** — Halaman pengelolaan data: daftar (render server-side), form tambah, dan pemroses form.
- **`docs/`** — Rancangan wireframe dan jawaban soal.
- **`Dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## ⚙️ Alur Data

1. Form di `buku/tambah.php` dikirim lewat `method="post"` ke `buku/proses_tambah.php`.
2. `proses_tambah.php` memvalidasi `$_POST`. Jika gagal, pengguna dikembalikan ke form dengan flash message berisi daftar error.
3. Jika valid, data ditambahkan ke `$_SESSION['buku']` lalu pengguna dialihkan ke `buku/list.php`.
4. `buku/list.php` membaca `$_SESSION['buku']` dan merender tabel, serta menampilkan flash message satu kali.

Alur yang sama berlaku untuk data anggota lewat `anggota/proses_tambah.php`.

## 🛡️ Validasi Server-Side

| Data | Aturan |
| :--- | :--- |
| Judul / Nama | Wajib diisi |
| Pengarang | Wajib diisi |
| Tahun | Angka antara 1900–2026 |
| Stok | Angka, tidak negatif |
| ISBN | Bila diisi, hanya angka dan tanda hubung |
| No. Anggota | Wajib diisi |
| No. HP | Bila diisi, hanya angka, tanda hubung, dan tanda plus |
| Email | Bila diisi, harus format email yang valid |

Validasi ini berjalan di server sehingga tetap berlaku walau JavaScript di browser dinonaktifkan.

## 🚀 Cara Menjalankan

Jalankan dari dalam folder `jobsheet-07/`:

```bash
php -S localhost:8000
```

Lalu buka `http://localhost:8000/index.php`.

## 📌 Catatan

Data yang disimpan di `$_SESSION` bersifat sementara: hilang saat sesi browser berakhir. Tombol Reset Data di Beranda dapat mengosongkannya tanpa perlu menutup browser. Mulai Jobsheet 8 penyimpanan dipindah ke PostgreSQL agar persisten.
