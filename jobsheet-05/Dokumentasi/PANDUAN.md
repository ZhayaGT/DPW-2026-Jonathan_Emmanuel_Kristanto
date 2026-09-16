# 📘 Dokumentasi SIMPUS-Mini — Jobsheet 5

Panduan singkat mengenai struktur dan fitur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 5.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-05/
├── index.html              # Beranda utama + ringkasan statistik
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet global + gaya error, search-box, & animasi menu
│   └── js/
│       └── app.js          # Seluruh interaktivitas JavaScript
├── buku/
│   ├── list.html           # Tabel daftar buku + kolom pencarian
│   └── tambah.html         # Form tambah buku + validasi
├── anggota/
│   ├── list.html           # Tabel daftar anggota + kolom pencarian
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
- **`assets/js/`** — Menyimpan berkas `app.js` yang menangani seluruh interaktivitas: menu hamburger, konfirmasi hapus, filter tabel, counter baris, dan validasi form.
- **`buku/`** — Halaman terkait pengelolaan data buku (daftar dengan pencarian & form tambah dengan validasi).
- **`anggota/`** — Halaman terkait pengelolaan data anggota (daftar dengan pencarian & form tambah dengan validasi).
- **`Dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## ⚡ Fitur JavaScript

Seluruh fungsi di `app.js` dipanggil otomatis saat `DOMContentLoaded`.

| Fungsi | Kegunaan |
| :--- | :--- |
| `initNavToggle()` | Membuka/menutup menu hamburger dengan men-toggle class `nav-open` pada `header nav`. |
| `initHapusConfirm()` | Menampilkan konfirmasi lalu menghapus baris tabel saat tombol `.btn-hapus` diklik. |
| `initTableFilter()` | Menyaring baris tabel secara real-time berdasarkan kolom Judul dari input `#search-input`. |
| `updateCounter()` | Menampilkan "Menampilkan X dari Y buku/anggota" di atas tabel. |
| `initValidasiForm()` | Memvalidasi form `#form-tambah` (wajib isi, rentang tahun, stok, dan format ISBN). |

## 🚀 Cara Menjalankan

Buka `index.html` langsung di browser (belum membutuhkan server).
