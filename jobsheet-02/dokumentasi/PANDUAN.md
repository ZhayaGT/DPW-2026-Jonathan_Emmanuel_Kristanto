# 📘 Dokumentasi SIMPUS-Mini

Panduan singkat mengenai struktur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini).

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-02/
├── index.html              # Beranda utama + ringkasan statistik
├── assets/
│   └── css/
│       └── style.css       # Stylesheet global (belum ditautkan)
├── buku/
│   ├── list.html           # Tabel daftar buku (statis)
│   └── tambah.html         # Form tambah buku
├── anggota/
│   ├── list.html           # Tabel daftar anggota (statis)
│   └── tambah.html         # Form tambah anggota
├── dokumentasi/
│   └── PANDUAN.md          # Dokumentasi ini
└── README.md               # Penjelasan jobsheet
```

## 🧭 Penjelasan Folder

- **`index.html`** — Halaman beranda dengan navigasi dan ringkasan jumlah buku, anggota, serta buku yang sedang dipinjam.
- **`assets/css/`** — Menyimpan berkas stylesheet (`style.css`). Folder ini dipersiapkan untuk tahap styling pada jobsheet berikutnya.
- **`buku/`** — Halaman terkait pengelolaan data buku (daftar & form tambah).
- **`anggota/`** — Halaman terkait pengelolaan data anggota (daftar & form tambah).
- **`dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## 🚀 Cara Menjalankan

Buka `index.html` langsung di browser (belum membutuhkan server).

## 📌 Catatan

- Halaman masih berupa struktur HTML statis; belum terhubung dengan CSS/JS maupun backend.
- Navigasi antar halaman sudah saling terhubung melalui tautan relatif (`../` untuk naik satu level folder).
