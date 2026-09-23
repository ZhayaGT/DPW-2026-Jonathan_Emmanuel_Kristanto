# 📘 Dokumentasi SIMPUS-Mini — Jobsheet 6

Panduan singkat mengenai struktur dan fitur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 6.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-06/
├── index.html              # Beranda utama + ringkasan statistik
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet global + gaya tabel, pencarian, & tombol muat ulang
│   └── js/
│       ├── app.js          # Menu hamburger, hapus, filter, counter, validasi form
│       └── tabel.js        # Fetch JSON + render tabel (fungsi generik)
├── data/
│   ├── buku.json           # Sumber data buku
│   └── anggota.json        # Sumber data anggota
├── buku/
│   ├── list.html           # Tabel dirender dari JSON + tombol Muat Ulang
│   └── tambah.html         # Form tambah buku + validasi
├── anggota/
│   ├── list.html           # Tabel dirender dari JSON
│   └── tambah.html         # Form tambah anggota + validasi
├── docs/
│   ├── wireframe.md        # Rancangan fitur yang belum dikoding
│   └── jawaban.md          # Jawaban soal jobsheet
├── Infografis.png          # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md          # Dokumentasi ini
└── README.md               # Laporan pengerjaan jobsheet
```

## 🧭 Penjelasan Folder

- **`index.html`** — Halaman beranda dengan navigasi dan ringkasan jumlah buku, anggota, serta buku yang sedang dipinjam.
- **`assets/css/`** — Menyimpan berkas stylesheet (`style.css`), termasuk gaya `.search-box`, `.error`, `.info-baris`, dan animasi menu `nav-open`.
- **`assets/js/app.js`** — Menangani interaktivitas umum: menu hamburger, konfirmasi hapus, filter tabel, counter baris, dan validasi form.
- **`assets/js/tabel.js`** — Mengambil data JSON dan merender baris tabel. Konfigurasi dibaca dari `data-sumber` dan `data-kolom` pada `<table id="tabel-data">`.
- **`data/`** — Berkas JSON yang menjadi sumber data tabel, menggantikan penulisan baris manual di HTML.
- **`buku/`** — Halaman terkait pengelolaan data buku (daftar dengan pencarian & form tambah dengan validasi).
- **`anggota/`** — Halaman terkait pengelolaan data anggota (daftar dengan pencarian & form tambah dengan validasi).
- **`Dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## ⚡ Fitur JavaScript

Seluruh fungsi dipanggil otomatis saat `DOMContentLoaded`.

| Fungsi | Berkas | Kegunaan |
| :--- | :--- | :--- |
| `initNavToggle()` | `app.js` | Membuka/menutup menu hamburger dengan men-toggle class `nav-open` pada `header nav`. |
| `initHapusConfirm()` | `app.js` | Menampilkan konfirmasi lalu menghapus baris tabel saat tombol `.btn-hapus` diklik (event delegation). |
| `initTableFilter()` | `app.js` | Menyaring baris tabel secara real-time dari input `#search-input`. |
| `updateCounter()` | `app.js` | Menampilkan "Menampilkan X dari Y buku/anggota" di atas tabel. |
| `initValidasiForm()` | `app.js` | Memvalidasi form `#form-tambah` (wajib isi, rentang tahun, stok, dan format ISBN). |
| `muatTabelData()` | `tabel.js` | Mengambil JSON lalu merender baris tabel; dipakai juga oleh tombol `#btn-muat-ulang`. |

## 🚀 Cara Menjalankan

Jalankan lewat server lokal karena `fetch()` tidak dapat membaca berkas lewat `file://`:

```bash
php -S localhost:8000
```

Lalu buka `http://localhost:8000/index.html`.
