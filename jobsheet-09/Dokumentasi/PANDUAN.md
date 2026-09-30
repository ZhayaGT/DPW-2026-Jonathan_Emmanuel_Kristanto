# 📘 Dokumentasi SIMPUS-Mini — Jobsheet 9

Panduan singkat mengenai struktur dan fitur proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 9.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-09/
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
│   │   └── style.css         # Stylesheet global + gaya tombol Edit, form Hapus, pagination
│   └── js/
│       └── app.js            # Hamburger, konfirmasi Hapus (submit), konfirmasi Update, filter, validasi
├── buku/
│   ├── list.php              # Read + pagination + pencarian server-side
│   ├── tambah.php            # Form tambah buku
│   ├── proses_tambah.php     # INSERT via prepared statement
│   ├── edit.php              # Form edit terisi data lama
│   ├── proses_edit.php       # UPDATE ... WHERE id = :id
│   └── hapus.php             # DELETE, hanya menerima POST
├── anggota/
│   ├── list.php
│   ├── tambah.php
│   ├── proses_tambah.php     # INSERT + penanganan error UNIQUE
│   ├── edit.php
│   ├── proses_edit.php       # UPDATE + penanganan error UNIQUE
│   └── hapus.php
├── docs/
│   ├── wireframe.md          # Rancangan fitur
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
- **`assets/js/app.js`** — Interaktivitas umum: menu hamburger, konfirmasi Hapus lewat event `submit`, konfirmasi Update, filter tabel sisi klien, counter baris, dan validasi form.
- **`buku/`** dan **`anggota/`** — Halaman pengelolaan data dengan pola 4 file: `list.php` (Read + pagination), `tambah.php` + `proses_tambah.php` (Create), `edit.php` + `proses_edit.php` (Update), `hapus.php` (Delete).
- **`docs/`** — Rancangan wireframe dan jawaban soal.
- **`Dokumentasi/`** — Berkas dokumentasi tambahan proyek.

## 🗄️ Skema Database

Database `simpus_mini` berisi dua tabel:

| Tabel | Kolom |
| :--- | :--- |
| `buku` | `id`, `judul`, `pengarang`, `tahun`, `isbn`, `stok`, `kategori`, `tanggal_ditambahkan` |
| `anggota` | `id`, `nama`, `no_anggota`, `alamat`, `no_hp`, `email` |

Batasan yang dipakai: `PRIMARY KEY` pada `id`, `NOT NULL` pada kolom wajib, `DEFAULT 0` pada `stok`, dan `UNIQUE` pada `no_anggota`. Kolom `id` kini dipakai sungguhan — sebagai penunjuk baris pada tautan Edit (`?id=`) dan pada field tersembunyi form Edit/Hapus.

## 🔄 Alur CRUD

| Operasi | Alur |
| :--- | :--- |
| **Create** | `tambah.php` → `proses_tambah.php` (validasi → `INSERT ... RETURNING id`) → `list.php` |
| **Read** | `list.php` → `SELECT ... ORDER BY id DESC LIMIT :limit OFFSET :offset` (+ `COUNT(*)` & `ILIKE` bila mencari) → tabel + navigasi halaman |
| **Update** | `list.php` → `edit.php?id=...` (`SELECT ... WHERE id = :id`, form terisi) → `proses_edit.php` (validasi → `UPDATE ... WHERE id = :id`) → `list.php` |
| **Delete** | `list.php` → `<form class="form-hapus" method="post" action="hapus.php">` → `hapus.php` (`DELETE ... WHERE id = :id`) → `list.php` |

Setiap langkah pemrosesan diakhiri **flash message** di `$_SESSION` (`success`/`error`) yang ditampilkan sekali di halaman berikutnya. Bila validasi gagal saat Update, pengguna dikembalikan ke `edit.php?id=...` — bukan ke form kosong — sehingga isian tidak hilang tanpa jejak.

## 🔍 Pagination & Pencarian

- **Pagination** — `$perPage = 5`, `$page = max(1, (int) ($_GET['page'] ?? 1))`, `$offset = ($page - 1) * $perPage`. Nilai `LIMIT`/`OFFSET` diikat dengan `bindValue(..., PDO::PARAM_INT)` karena PostgreSQL ketat soal tipe di klausa ini. `ORDER BY id DESC` menjaga urutan potongan data tetap konsisten antar halaman.
- **Pencarian sisi server** — form `method="get"` mengirim `?q=`, diproses dengan `WHERE ... ILIKE :kw` (case-insensitive, wildcard `%kata%`). Jumlah halaman dihitung dari `COUNT(*)` dengan `WHERE` yang sama, sehingga navigasi mengikuti jumlah **hasil pencarian**, bukan jumlah seluruh baris. Kata kunci dibawa ke halaman berikutnya lewat `urlencode`.
- **Dua peran kolom cari** — filter instan sisi klien (`initTableFilter`) tetap bekerja untuk baris yang sedang tampil, sedangkan tombol "Cari" melakukan pencarian penuh lintas halaman.
- **Kolom yang dicari** — buku: `judul` atau `pengarang`; anggota: `nama` atau `no_anggota`.

## 🛡️ Validasi Server-Side

| Data | Aturan |
| :--- | :--- |
| Judul / Nama | Wajib diisi |
| Pengarang | Wajib diisi |
| Tahun | Angka antara 1900–2026 |
| Stok | Angka, tidak negatif |
| ISBN | Bila diisi, hanya angka dan tanda hubung |
| No. Anggota | Wajib diisi, harus unik (Create & Update) |
| No. HP | Bila diisi, hanya angka, tanda hubung, dan tanda plus |
| Email | Bila diisi, harus format email yang valid |

Seluruh nilai yang masuk ke query dikirim lewat placeholder (`:nama`), bukan digabung ke dalam string SQL.

## 🔐 GET vs POST

- `GET` dipakai untuk operasi **aman/dibaca**: menampilkan halaman, pagination (`list.php?page=2`), pencarian (`list.php?q=...`), dan membuka form edit (`edit.php?id=...`).
- `POST` dipakai untuk operasi yang **mengubah data**: Create, Update, dan Delete.
- `hapus.php` **menolak** permintaan non-`POST` (`$_SERVER['REQUEST_METHOD']`) dan langsung mengalihkan ke `list.php` tanpa menyentuh database — mencegah penghapusan terpicu oleh crawler, pratinjau tautan di aplikasi chat, atau tombol back browser.
- `UPDATE`/`DELETE` **selalu** disertai `WHERE id = :id`. Tanpa klausa itu, satu perintah bisa mengubah atau menghapus seluruh isi tabel.
- Konfirmasi Hapus dan Update dilakukan di event `submit` (bukan `click`) sehingga bisa dibatalkan dengan `preventDefault()` **sebelum** request terkirim ke server.

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

Lalu buka `http://localhost:8000/index.php` dan uji siklus lengkap: tambah → tampil → ubah → tampil berubah → hapus → hilang dari list.

## 📌 Catatan

- Data tetap **persisten** di PostgreSQL; menutup browser tidak menghapusnya.
- Tombol **Reset Data** di Beranda mengosongkan kedua tabel bila ingin mulai dari nol.
- `sql/migrasi_json.php` mengisi tabel `buku` dari `jobsheet-06/data/buku.json`. Menjalankannya dua kali akan menggandakan data.
- Nilai `q` ditampilkan kembali ke input lewat `htmlspecialchars()`; audit keamanan menyeluruh (XSS, CSRF) direncanakan pada Jobsheet 11.
