# 📘 Dokumentasi SIMPUS-Mini — Jobsheet 8

Panduan singkat mengenai struktur dan fitur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 8.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-08/
├── index.php                 # Ringkasan statistik dari database
├── reset.php                 # Mengosongkan tabel buku & anggota
├── includes/
│   ├── header.php            # Bagian atas HTML + navbar
│   ├── footer.php            # Bagian bawah HTML + footer
│   └── koneksi.php           # Koneksi PDO driver pgsql
├── sql/
│   ├── 01_buku_anggota.sql   # Skema tabel buku & anggota
│   ├── 02_tanggal_ditambahkan.sql  # Kolom tambahan pada tabel buku
│   └── migrasi_json.php      # Impor data dari jobsheet-06
├── assets/
│   ├── css/
│   │   └── style.css         # Stylesheet global + gaya flash message
│   └── js/
│       └── app.js            # Menu hamburger, hapus, filter, counter, validasi form
├── buku/
│   ├── list.php              # Tabel dari database + pencarian server-side
│   ├── tambah.php            # Form tambah buku
│   └── proses_tambah.php     # INSERT via prepared statement
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php     # INSERT + penanganan error UNIQUE
├── docs/
│   ├── wireframe.md          # Rancangan fitur yang belum dikoding
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md            # Dokumentasi ini
└── README.md                 # Laporan pengerjaan jobsheet
```

## 🧭 Penjelasan Folder

- **`index.php`** — Halaman beranda dengan navigasi, ringkasan jumlah buku/anggota dari database, dan tombol Reset Data.
- **`reset.php`** — Mengosongkan tabel `buku` dan `anggota` lewat `TRUNCATE ... RESTART IDENTITY`, lalu kembali ke Beranda.
- **`includes/koneksi.php`** — Koneksi PDO ke PostgreSQL. Dipanggil dengan `require` oleh halaman yang butuh akses database.
- **`includes/header.php`** / **`footer.php`** — Bagian atas dan bawah HTML yang dipakai bersama semua halaman. Path menu/CSS/JS dihitung otomatis lewat `$base`.
- **`sql/`** — Berkas skema database dan skrip migrasi data.
- **`assets/js/app.js`** — Interaktivitas umum: menu hamburger, konfirmasi hapus, filter tabel, counter baris, dan validasi form.
- **`buku/`** dan **`anggota/`** — Halaman pengelolaan data: daftar (dari database), form tambah, dan pemroses form.
- **`docs/`** — Rancangan wireframe dan jawaban soal.
- **`Dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## 🗄️ Skema Database

Database `simpus_mini` berisi dua tabel:

| Tabel | Kolom |
| :--- | :--- |
| `buku` | `id`, `judul`, `pengarang`, `tahun`, `isbn`, `stok`, `kategori`, `tanggal_ditambahkan` |
| `anggota` | `id`, `nama`, `no_anggota`, `alamat`, `no_hp`, `email` |

Batasan yang dipakai: `PRIMARY KEY` pada `id`, `NOT NULL` pada kolom wajib, `DEFAULT 0` pada `stok`, dan `UNIQUE` pada `no_anggota`.

## ⚙️ Alur Data

1. Form di `buku/tambah.php` dikirim lewat `method="post"` ke `buku/proses_tambah.php`.
2. `proses_tambah.php` memvalidasi `$_POST`. Jika gagal, pengguna dikembalikan ke form dengan flash message.
3. Jika valid, data dimasukkan ke database lewat prepared statement (`INSERT ... RETURNING id`), lalu pengguna dialihkan ke `buku/list.php`.
4. `buku/list.php` menjalankan `SELECT * FROM buku ORDER BY id DESC` dan merender tabelnya.

Alur yang sama berlaku untuk data anggota. Khusus anggota, kegagalan `UNIQUE` pada `no_anggota` ditangkap dan ditampilkan sebagai flash message.

## 🛡️ Validasi Server-Side

| Data | Aturan |
| :--- | :--- |
| Judul / Nama | Wajib diisi |
| Pengarang | Wajib diisi |
| Tahun | Angka antara 1900–2026 |
| Stok | Angka, tidak negatif |
| ISBN | Bila diisi, hanya angka dan tanda hubung |
| No. Anggota | Wajib diisi, harus unik |
| No. HP | Bila diisi, hanya angka, tanda hubung, dan tanda plus |
| Email | Bila diisi, harus format email yang valid |

Seluruh nilai yang masuk ke query dikirim lewat placeholder (`:nama`), bukan digabung ke dalam string SQL.

## 🚀 Cara Menjalankan

Persiapan database (sekali saja):

```bash
sudo -u postgres createdb simpus_mini
psql -d simpus_mini -f sql/01_buku_anggota.sql
psql -d simpus_mini -f sql/02_tanggal_ditambahkan.sql
```

Jalankan aplikasi:

```bash
php -S localhost:8000
```

Lalu buka `http://localhost:8000/index.php`.

## 📌 Catatan

- Berbeda dari Jobsheet 7, data sekarang **persisten**: menutup browser tidak menghapusnya.
- Tombol **Reset Data** di Beranda mengosongkan kedua tabel bila ingin mulai dari nol.
- `sql/migrasi_json.php` mengisi tabel `buku` dari `jobsheet-06/data/buku.json`. Menjalankannya dua kali akan menggandakan data — kosongkan dulu lewat tombol Reset Data bila perlu.
- Kolom `id` sudah terambil dari `SELECT *` meski belum tampil, dan akan dipakai untuk fitur Edit/Hapus mulai Jobsheet 9.
