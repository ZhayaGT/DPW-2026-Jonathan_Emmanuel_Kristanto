# 📘 Laporan Pengerjaan Jobsheet 9 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-09/
├── index.php                 # Ringkasan statistik dari SELECT COUNT(*)
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
│   │   └── style.css         # + gaya btn-edit, form-hapus, pagination, search form
│   └── js/
│       └── app.js            # initHapusConfirm (submit), initEditConfirm (BARU)
├── buku/
│   ├── list.php              # Read + pagination + pencarian server-side + tombol Hapus jadi form
│   ├── tambah.php            # Form tambah buku
│   ├── proses_tambah.php     # INSERT via prepared statement
│   ├── edit.php              # BARU — form edit terisi data lama
│   ├── proses_edit.php       # BARU — UPDATE ... WHERE id = :id
│   └── hapus.php             # BARU — DELETE, hanya menerima POST
├── anggota/                  # Struktur sama persis dengan buku/
│   ├── list.php, tambah.php, proses_tambah.php
│   └── edit.php, proses_edit.php, hapus.php
├── docs/
│   ├── wireframe.md          # Identik dengan jobsheet-08
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md            # Panduan proyek
└── README.md                 # Laporan ini
```

## 📝 Ringkasan Proyek

Jobsheet 8 sudah menyelesaikan **Create** dan **Read** di atas PostgreSQL. Jobsheet 9 melengkapi dua huruf terakhir **CRUD**: **Update** lewat `edit.php` + `proses_edit.php`, dan **Delete** lewat `hapus.php` yang sengaja hanya menerima `POST`. Selain itu halaman daftar ditingkatkan: **pagination** (`LIMIT`/`OFFSET`, 5 baris per halaman) dan **pencarian sisi server** (`ILIKE`) menggantikan pencarian yang sebelumnya hanya menyaring baris di sisi klien. Kolom `id` yang sejak Jobsheet 8 hanya "ikut ter-fetch" kini benar-benar dipakai untuk menunjuk satu baris spesifik.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 9

Struktur folder `jobsheet-09/` disiapkan sebagai kelanjutan Jobsheet 8. Seluruh halaman, stylesheet, skrip, skema SQL, `docs/wireframe.md`, `docs/jawaban.md`, dan infografis disalin dari Jobsheet 8, lalu diubah bertahap pada tahap-tahap berikutnya.

### 2. Konsep Dasar CRUD

Tahap pengenalan konsep: peta lengkap Create/Read/Update/Delete, perbedaan pola form **kosong** (`tambah.php`) dengan form **terisi** (`edit.php`), alasan `UPDATE`/`DELETE` selalu butuh `id`, serta alasan Delete mendapat pengaman ekstra karena bersifat destruktif. Belum ada perubahan kode pada tahap ini.

### 3. Mengubah Data: edit.php & proses_edit.php

Berkas `buku/edit.php` dan `anggota/edit.php` dibuat: `id` diambil dari `$_GET['id']`, data lama dibaca lewat `SELECT * FROM ... WHERE id = :id` dengan `fetch(PDO::FETCH_ASSOC)` (tunggal), lalu mengisi form lewat atribut `value="..."` dan `selected` pada `<select>`. `id` dibawa ke pemroses lewat `<input type="hidden">`.

`buku/proses_edit.php` dan `anggota/proses_edit.php` menjalankan `UPDATE ... SET ... WHERE id = :id`. Validasi server-side disamakan dengan `proses_tambah.php`; bila gagal, pengguna dikembalikan ke `edit.php?id=...` (bukan form kosong). Untuk anggota, validasi no. HP/email dan penanganan error `23505` (no. anggota duplikat) dari Jobsheet 8 ikut dipertahankan. Di kedua `list.php`, tombol Edit yang dulu `<button>` polos diganti tautan `<a href="edit.php?id=...">`.

### 4. Menghapus Data: hapus.php

Berkas `buku/hapus.php` dan `anggota/hapus.php` dibuat dengan dua pengaman: menolak semua metode selain `POST` (`$_SERVER['REQUEST_METHOD'] !== 'POST'` → redirect ke `list.php` tanpa menyentuh database), dan hanya menjalankan `DELETE FROM ... WHERE id = :id` bila `id` benar-benar ada. Di `list.php`, tombol Hapus kini dibungkus `<form class="form-hapus" method="post" action="hapus.php">` berisi `<input type="hidden" name="id">`, sehingga penghapusan tidak bisa terpicu lewat tautan biasa atau crawler.

### 5. JS: Konfirmasi Hapus via Event submit

`initHapusConfirm()` di `app.js` diubah dari event delegation pada `click` menjadi event delegation pada `submit`. Karena form kini benar-benar mengirim request ke server, konfirmasi harus terjadi **sebelum** pengiriman: logikanya dibalik — `e.preventDefault()` dipanggil saat pengguna menekan Cancel (`!yakin`), sedangkan saat OK form lanjut submit seperti biasa. Aksi `row.remove()` dihapus karena baris kini benar-benar dihapus di database.

### 6. Pagination & Pencarian Sisi Server

`buku/list.php` dan `anggota/list.php` dirombak: `$perPage = 5`, `$page` diambil dari `?page=` dengan pengaman `max(1, ...)`, `$offset = ($page - 1) * $perPage`, lalu query memakai `LIMIT :limit OFFSET :offset` yang diikat dengan `bindValue(..., PDO::PARAM_INT)`. Jumlah baris dihitung lewat `SELECT COUNT(*)` — ikut memakai `WHERE`/`ILIKE` yang sama saat pencarian aktif — dan `$totalPages` dihitung `ceil()` dengan pengaman `max(1, ...)`. Navigasi halaman dirender dengan `for` dan menyorot halaman aktif lewat class `active`, sambil membawa `q` (`urlencode`) bila pencarian aktif. Kolom pencarian diubah menjadi `<form method="get">` yang men-submit ke server.

### 7. CSS Pendukung Fitur Baru

`assets/css/style.css` ditambah gaya untuk fitur baru: `td a.btn-edit` (menyamarkan tautan Edit agar terlihat seperti tombol, `display: inline-block` supaya padding vertikal bekerja), `td form.form-hapus { display: inline; }` (form tidak lagi memenuhi satu baris, sehingga Edit dan Hapus tetap sejajar), `.pagination` (Flexbox + sorotan `active`), serta `.search-box form { display: flex; align-items: flex-end; }` dan `.search-box button` agar input pencarian sejajar dengan tombol "Cari".

### 8. Rangkuman & Latihan Lanjutan

Dua latihan opsional dari dokumentasi dikerjakan:

- **Konfirmasi ekstra sebelum Update** (latihan 1) — `app.js` mendapat `initEditConfirm()` yang memakai pola event `submit` yang sama: form edit diberi class `form-edit`, dan submit dibatalkan bila pengguna menekan Cancel. Berbeda dari Delete, Update tidak destruktif, jadi pesannya cukup menegaskan bahwa perubahan akan disimpan.
- **Pencarian di kolom lain** (latihan 3) — klausa `WHERE` diperluas dengan `OR`: `judul ILIKE :kw OR pengarang ILIKE :kw` pada buku, dan `nama ILIKE :kw OR no_anggota ILIKE :kw` pada anggota. Label dan placeholder kolom pencarian disesuaikan supaya tidak menyesatkan.

Latihan 2 (`$perPage` diubah jadi 10) tidak dikerjakan karena bertentangan dengan spesifikasi "5 baris per halaman" di bab 5, dan latihan 4 (menerapkan pola CRUD ke entitas baru) belum relevan karena proyek ini belum punya entitas lain.

---

## 🔧 Penyesuaian dari Jobsheet Sebelumnya

- Proyek Jobsheet 9 dibangun dari **kode Jobsheet 8 sendiri**, sehingga kolom `kategori` & `tanggal_ditambahkan` (buku), kolom `email` (anggota), penanganan error `UNIQUE`, tema warna, serta kartu Statistik + tombol Reset Data di Beranda tetap ada — bukan dari versi contoh di repositori jobsheet.
- Karena `list.php` kini memakai pagination dan `SELECT COUNT(*)`, kolom `kategori` dan `tanggal_ditambahkan` tetap ikut ditampilkan (tidak dikurangi seperti pada contoh jobsheet).
- Pencarian `?q=` yang sudah ada sejak Jobsheet 8 dipertahankan dan ditingkatkan: dulu mencari lintas seluruh tabel, sekarang mencari **dalam lingkup halaman** (server-side + pagination) dan mencakup lebih dari satu kolom.
- Nilai `q` tetap ditampilkan lewat `htmlspecialchars($keyword)` seperti di Jobsheet 8. Dokumentasi jobsheet menyebut nilai ini sengaja belum di-escape sampai audit Jobsheet 11; perbaikan yang sudah ada dipertahankan agar tidak menurunkan keamanan.
- Label footer di `includes/footer.php` diperbarui dari "Jobsheet 8" menjadi "Jobsheet 9", mengikuti kebiasaan yang sama seperti saat Jobsheet 8 menggantikan label "Jobsheet 7". Komentar asal-usul di dalam berkas `sql/` sengaja dibiarkan menyebut Jobsheet 8 karena itu catatan sejarah kapan skema dibuat.

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

Buka `http://localhost:8000/index.php`, lalu uji siklus lengkap: **tambah → tampil → ubah (Edit) → tampil berubah → hapus → hilang dari list**. Tambahkan lebih dari 5 buku agar navigasi pagination muncul, dan coba ketik kata kunci lalu klik "Cari" untuk mencoba pencarian lintas halaman.

## ✅ Verifikasi

Seluruh alur diuji pada server `php -S` dengan data uji sementara (dibuat lalu dihapus kembali setelah pengujian):

| Yang diuji | Hasil |
| :--- | :--- |
| Tambah buku/anggota | 302 ke `list.php`, baris masuk database, flash sukses tampil |
| `edit.php` | Form terisi data lama (termasuk `<option ... selected>` dan kolom email) |
| Update buku/anggota | Baris berubah di database, flash "berhasil diperbarui" |
| Validasi saat update | 302 kembali ke `edit.php?id=...`, flash error tampil, database tidak berubah |
| No. anggota duplikat saat update | Error `23505` ditangkap → flash "No. Anggota sudah dipakai" |
| `hapus.php` via GET | 302 ke `list.php`, tidak ada baris yang terhapus |
| `hapus.php` via POST | Baris terhapus, flash sukses tampil |
| `hapus.php` POST tanpa `id` | 302 ke `list.php` tanpa error |
| `edit.php` tanpa `id` / `id` tidak ada | 302 ke `list.php` |
| Pagination | 10 baris → 2 halaman berisi 5 baris berbeda; `page=0`, `page=-5`, `page=abc` dipaksa ke halaman 1 |
| Pencarian server-side | Total halaman mengikuti jumlah hasil pencarian; `q` tanpa hasil menampilkan pesan "Tidak ada data ... yang cocok" |
| Pencarian multi-kolom | Cocok lewat `pengarang` (buku) dan `no_anggota` (anggota) |

## ✅ Kesimpulan

Jobsheet 9 melengkapi CRUD: data kini bisa diubah dan dihapus langsung dari aplikasi, bukan hanya ditambah dan ditampilkan. Dua kebiasaan penting ikut tertanam: `UPDATE`/`DELETE` selalu disertai klausa `WHERE id = :id`, dan operasi destruktif hanya boleh lewat `POST` yang dikonfirmasi sebelum dikirim. Pagination dan pencarian sisi server menyiapkan aplikasi menghadapi jumlah data yang bertambah, karena keduanya membatasi dan menyaring data di database, bukan di tampilan.
