# 📘 Laporan Pengerjaan Jobsheet 8 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-08/
├── index.php                 # Ringkasan statistik dari SELECT COUNT(*)
├── reset.php                 # Mengosongkan tabel buku & anggota
├── includes/
│   ├── header.php            # Bagian atas HTML + navbar
│   ├── footer.php            # Bagian bawah HTML + footer
│   └── koneksi.php           # BARU — koneksi PDO driver pgsql
├── sql/
│   ├── 01_buku_anggota.sql   # BARU — skema tabel buku & anggota
│   ├── 02_tanggal_ditambahkan.sql  # Latihan opsional — kolom tanggal_ditambahkan
│   └── migrasi_json.php      # Latihan opsional — impor data dari jobsheet-06
├── assets/
│   ├── css/
│   │   └── style.css         # Tidak berubah dari Jobsheet 7
│   └── js/
│       └── app.js            # Tidak berubah dari Jobsheet 7
├── buku/
│   ├── list.php              # SELECT * FROM buku, + pencarian server-side
│   ├── tambah.php            # Tidak berubah dari Jobsheet 7
│   └── proses_tambah.php     # INSERT via prepared statement
├── anggota/
│   ├── list.php              # SELECT * FROM anggota
│   ├── tambah.php            # Tidak berubah dari Jobsheet 7
│   └── proses_tambah.php     # INSERT via prepared statement + penanganan UNIQUE
├── docs/
│   ├── wireframe.md          # Identik dengan jobsheet-07
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md            # Panduan proyek
└── README.md                 # Laporan ini
```

## 📝 Ringkasan Proyek

Proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 8 menutup satu masalah yang tersisa sejak Jobsheet 7: data yang tersimpan di `$_SESSION` hilang begitu sesi browser berakhir. Sumber data dipindah ke **database PostgreSQL** yang berjalan terpisah dari aplikasi PHP, sehingga data kini benar-benar persisten. Halaman daftar membaca data lewat `SELECT`, form menyimpannya lewat `INSERT` dengan **prepared statement**, dan kartu statistik di Beranda menghitung jumlah baris langsung dari database.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 8

Struktur folder `jobsheet-08/` disiapkan sebagai kelanjutan Jobsheet 7. Seluruh halaman, stylesheet, skrip, dan dokumen disalin dari Jobsheet 7, lalu diubah bertahap pada tahap-tahap berikutnya.

### 2. Konsep Dasar Database & SQL

Tahap pengenalan konsep: database relasional (tabel, kolom, baris), bahasa SQL (`CREATE TABLE`, `INSERT`, `SELECT`), serta PDO sebagai jembatan seragam antara PHP dan berbagai jenis database. Belum ada perubahan kode pada tahap ini.

### 3. Skema Database: 01_buku_anggota.sql

Berkas `sql/01_buku_anggota.sql` dibuat berisi perintah `CREATE TABLE` untuk tabel `buku` dan `anggota`. Skema ini memakai tipe data PostgreSQL (`SERIAL`, `VARCHAR`, `INTEGER`) dan batasan (`PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `DEFAULT`). Kolom `email` ditambahkan pada tabel `anggota` agar sesuai dengan form yang sudah ada sejak Jobsheet 7.

### 4. Persiapan Database Sebelum Menjalankan

Tahap penyiapan environment: memastikan PostgreSQL berjalan, mengaktifkan ekstensi `pdo_pgsql`, membuat database `simpus_mini`, lalu menjalankan skema. Belum ada perubahan kode pada tahap ini.

### 5. Koneksi PHP ke Database: koneksi.php

Berkas `includes/koneksi.php` dibuat untuk menghubungkan PHP ke PostgreSQL lewat `new PDO("pgsql:...")`. Koneksi dibungkus `try`/`catch` sehingga kegagalan menghasilkan pesan yang jelas, dan `PDO::ATTR_ERRMODE` diatur ke `ERRMODE_EXCEPTION` supaya kegagalan query tidak terlewat diam-diam. Halaman yang membutuhkannya memanggil berkas ini lewat `require`, bukan `include`.

### 6. Menyimpan Data: Prepared Statement & INSERT

`buku/proses_tambah.php` dan `anggota/proses_tambah.php` diubah: baris `$_SESSION['buku'][] = ...` diganti `INSERT ... RETURNING id` lewat prepared statement dengan placeholder `:nama`. Validasi server-side dari Jobsheet 7 dipertahankan, termasuk validasi ISBN, No. HP, dan email.

### 7. Membaca Data: SELECT

`buku/list.php` dan `anggota/list.php` mengambil data dengan `SELECT * FROM ... ORDER BY id DESC`, sehingga data terbaru muncul paling atas. `index.php` menghitung Total Buku/Anggota dengan `SELECT COUNT(*)` dan `fetchColumn()`. Karena hasil `fetchAll(PDO::FETCH_ASSOC)` strukturnya sama dengan `$_SESSION` sebelumnya, kode `foreach` yang menampilkan tabel tidak perlu diubah. `reset.php` disesuaikan menjadi `TRUNCATE TABLE buku, anggota` karena session bukan lagi tempat data.

### 8. Rangkuman & Latihan Lanjutan

Empat latihan opsional dari dokumentasi dikerjakan:

- **Penanganan error `UNIQUE`** — `anggota/proses_tambah.php` membungkus `execute()` dengan `try`/`catch (PDOException $e)`. Kode error `23505` (duplikat) ditangani dengan flash message "No. Anggota sudah dipakai, gunakan nomor lain." alih-alih halaman error mentah.
- **Kolom `tanggal_ditambahkan`** — berkas migrasi `sql/02_tanggal_ditambahkan.sql` menambahkan kolom `TIMESTAMP DEFAULT NOW()` pada tabel `buku`, dan kolom itu ditampilkan di `buku/list.php`.
- **Pencarian server-side** — `buku/list.php` menerima parameter `?q=` dan menjalankan `WHERE judul ILIKE :keyword` lewat prepared statement, melengkapi kolom pencarian yang sebelumnya hanya menyaring di sisi klien.
- **Migrasi data lama** — `sql/migrasi_json.php` membaca `jobsheet-06/data/buku.json` lalu memasukkan seluruh isinya ke tabel `buku` lewat satu prepared statement yang dijalankan berulang.

---

## 🔧 Penyesuaian dari Jobsheet Sebelumnya

- Kolom `email` ditambahkan pada tabel `anggota` karena form Jobsheet 7 sudah memilikinya.
- Kolom `kategori` pada tabel `buku` dipertahankan dan tetap dirender di halaman daftar.
- Kartu ringkasan di Beranda dipertahankan empat buah, kini dihitung dari database.
- Tombol **Reset Data** di Beranda diarahkan ulang: `reset.php` sekarang mengosongkan tabel `buku` dan `anggota` (`TRUNCATE ... RESTART IDENTITY`), bukan menghapus session.

## 🛠️ Catatan Environment (Arch Linux)

Jobsheet ini disiapkan untuk Laragon di Windows. Di mesin ini (Arch Linux) langkahnya setara:

```bash
sudo pacman -S php-pgsql          # menyediakan pdo_pgsql
# aktifkan extension=pdo_pgsql & extension=pgsql di /etc/php/php.ini
sudo -u postgres createdb simpus_mini
psql -d simpus_mini -f sql/01_buku_anggota.sql
```

Autentikasi PostgreSQL di mesin ini memakai `trust` untuk koneksi lokal, sehingga kredensial `postgres`/`postgres` di `koneksi.php` langsung berfungsi tanpa perlu mengatur password.

## 🚀 Cara Menjalankan

```bash
php -S localhost:8000
```

Buka `http://localhost:8000/index.php`. Untuk mengisi data contoh dari Jobsheet 6:

```bash
php sql/migrasi_json.php
```

## ✅ Kesimpulan

Jobsheet 8 memindahkan penyimpanan data SIMPUS-Mini dari `$_SESSION` ke PostgreSQL, sehingga data bertahan meskipun browser ditutup. Prepared statement menjadi fondasi keamanan query yang akan diperdalam di Jobsheet 11, sementara kolom `id` yang sudah ikut terambil akan dipakai untuk fitur Edit/Hapus mulai Jobsheet 9. Pola `fetchAll(PDO::FETCH_ASSOC)` yang strukturnya konsisten dengan array sebelumnya menunjukkan manfaat menjaga bentuk data tetap sama di seluruh lapisan aplikasi.
