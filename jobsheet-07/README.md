# 📘 Laporan Pengerjaan Jobsheet 7 — SIMPUS-Mini

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
│   ├── header.php            # Bagian atas HTML + navbar (dipakai ulang)
│   └── footer.php            # Bagian bawah HTML + footer (dipakai ulang)
├── assets/
│   ├── css/
│   │   └── style.css         # Ditambah gaya .flash, .flash-success, .flash-error
│   └── js/
│       └── app.js            # Tidak berubah dari Jobsheet 6
├── buku/
│   ├── list.php              # Tabel dirender dari $_SESSION['buku']
│   ├── tambah.php            # Form method="post" ke proses_tambah.php
│   └── proses_tambah.php     # Validasi server + simpan ke session
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php
├── docs/
│   ├── wireframe.md          # Identik dengan jobsheet-06
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md            # Panduan proyek
└── README.md                 # Laporan ini
```

## 📝 Ringkasan Proyek

Proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 7 berpindah dari aplikasi yang sepenuhnya berjalan di browser menjadi aplikasi dengan server di baliknya. Semua halaman `.html` diubah menjadi `.php`, bagian navbar dan footer yang sebelumnya diulang di setiap halaman dipindah ke `includes/`, dan data buku/anggota kini diproses serta disimpan di server lewat `$_SESSION`. Tabel daftar tidak lagi dirender JavaScript dari berkas JSON, melainkan dirender langsung oleh PHP sebelum halaman dikirim ke browser.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 7

Struktur folder `jobsheet-07/` disiapkan sebagai kelanjutan Jobsheet 6. Seluruh halaman, stylesheet, skrip, data, dan dokumen disalin dari Jobsheet 6, lalu mulai diubah pada tahap-tahap berikutnya.

### 2. Konsep Dasar PHP

Semua halaman diubah dari `.html` menjadi `.php` dan seluruh tautan navigasi disesuaikan. Pada tahap ini belum ada logika PHP yang ditambahkan — perubahan ini membuat halaman melewati PHP interpreter terlebih dahulu sebelum dikirim ke browser.

### 3. includes/header.php & includes/footer.php

Dua berkas baru dibuat untuk menghapus duplikasi navbar dan footer yang sejak Jobsheet 1 ditulis ulang di setiap halaman:

- `includes/header.php` — memanggil `session_start()`, menyusun bagian atas HTML, dan menutup dengan tag `<main>` yang belum ditutup.
- `includes/footer.php` — menutup `</main>`, menampilkan footer, dan memuat `assets/js/app.js`.

Kedua berkas dihubungkan lewat `include`. Path CSS/JS/menu dihitung otomatis lewat variabel `$base` berdasarkan kedalaman folder halaman yang sedang dibuka, sehingga proyek tetap benar diakses dari root server maupun dari subfolder. `footer.php` juga menyediakan kait `$extra_scripts` untuk memuat skrip tambahan per halaman.

### 4. Session & Alur Data

`$_SESSION` dipakai sebagai penyimpanan sementara antar halaman. Halaman Beranda mulai menghitung ringkasan (Total Buku, Total Anggota, Statistik) langsung dari isi session, bukan lagi angka tetap.

### 5. Memproses Form: proses_tambah.php

Form Tambah Buku dan Tambah Anggota kini benar-benar mengirim data lewat `method="post"` ke `proses_tambah.php` masing-masing. Berkas `proses_tambah.php` memvalidasi `$_POST` di server (judul/nama wajib, pengarang wajib, rentang tahun 1900–2026, stok tidak negatif), menyimpan data ke `$_SESSION`, lalu mengalihkan browser ke halaman daftar. Bila validasi gagal, pengguna dikembalikan ke form dengan pesan error.

### 6. Menampilkan Data: list.php & Flash Message

`buku/list.php` dan `anggota/list.php` merender tabel dari `$_SESSION` memakai `foreach`, menggantikan pendekatan fetch/JSON dari Jobsheet 6. Pesan sukses/gagal ditampilkan lewat flash message yang langsung dihapus setelah dibaca, sehingga hanya muncul sekali. Berkas `assets/js/tabel.js` dan folder `data/` dari Jobsheet 6 dihapus karena tidak lagi dibutuhkan.

### 7. CSS: Gaya Flash Message

Blok `.flash`, `.flash-success`, dan `.flash-error` ditambahkan ke `style.css` untuk membedakan pesan sukses (hijau) dan pesan gagal (merah).

### 8. Rangkuman & Latihan Lanjutan

Tahap akhir berisi latihan opsional dari dokumentasi:

- **Validasi ISBN** — `buku/proses_tambah.php` memeriksa ISBN yang tidak kosong agar hanya berisi angka dan tanda hubung memakai `preg_match()`.
- **Validasi tambahan anggota** — `anggota/proses_tambah.php` memvalidasi No. HP (angka, tanda hubung, tanda plus) dan format email memakai `filter_var(..., FILTER_VALIDATE_EMAIL)`.
- **Halaman debug** — `debug_session.php` dibuat sementara untuk menampilkan isi `$_SESSION` mentah lewat `print_r`, dipakai saat pengujian, lalu dihapus.
- **Tombol Reset Data** — `reset.php` mengosongkan seluruh session (`session_destroy()`) dan mengembalikan pengguna ke Beranda. Tombolnya ditambahkan di halaman Beranda dengan konfirmasi sebelum dijalankan.

---

## 🔧 Penyesuaian dari Jobsheet Sebelumnya

- Field **Email** pada form Tambah Anggota ikut disimpan ke `$_SESSION['anggota']` dan divalidasi di server.
- Kolom **Kategori** pada tabel Daftar Buku ikut dirender dari session.
- Kolom **Tanggal Bergabung** pada tabel Daftar Anggota dihapus karena tidak pernah diisi oleh form.
- Kartu ringkasan di Beranda dipertahankan empat buah, dengan nilai dihitung dari session.

## 🚀 Cara Menjalankan

Jalankan dari dalam folder `jobsheet-07/`:

```bash
php -S localhost:8000
```

Lalu buka `http://localhost:8000/index.php`. Proyek juga tetap benar diakses lewat Laragon meski berada di subfolder, karena path di `includes/` dihitung relatif otomatis.

## ✅ Kesimpulan

Jobsheet 7 memindahkan proses pengolahan data SIMPUS-Mini dari browser ke server. Validasi yang sebelumnya hanya ada di HTML dan JavaScript kini punya lapisan server yang tidak bisa dilewati pengguna, sementara `include` menghapus duplikasi navbar/footer dan `$_SESSION` menjembatani data antar halaman. Penyimpanan session bersifat sementara — data akan hilang saat sesi berakhir — sehingga mulai Jobsheet 8 data dipindah ke PostgreSQL.
