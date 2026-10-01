# 📘 Laporan Pengerjaan Jobsheet 10 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-10/
├── index.php                 # Beranda (publik) + ringkasan + tombol Reset (admin)
├── reset.php                 # TRUNCATE tabel buku & anggota — wajib login + role admin
├── Dockerfile                # BARU — image PHP+Apache untuk hosting Render
├── docker/
│   └── start.sh              # BARU — Apache mengikuti port dari Render ($PORT)
├── .dockerignore             # BARU — berkas yang tidak ikut ke image
├── includes/
│   ├── header.php            # Navbar dinamis + status login; memulihkan sesi "Ingat Saya"
│   ├── footer.php            # Bagian bawah HTML + footer
│   ├── koneksi.php           # Koneksi PDO driver pgsql (kredensial dari env var)
│   ├── auth.php              # BARU — guard clause: wajib login
│   └── remember.php          # BARU — latihan §6.4 no. 2, pemulihan sesi dari cookie
├── auth/                     # BARU — seluruh folder
│   ├── register.php          # Form registrasi petugas
│   ├── proses_register.php   # Validasi + password_hash() + cek username duplikat
│   ├── login.php             # Form login + checkbox "Ingat saya"
│   ├── proses_login.php      # password_verify() + pembatas percobaan gagal
│   └── logout.php            # session_destroy() + hapus token "Ingat Saya"
├── sql/
│   ├── 01_buku_anggota.sql   # Skema tabel buku & anggota
│   ├── 02_tanggal_ditambahkan.sql  # Kolom tambahan pada tabel buku
│   ├── 03_users.sql          # BARU — tabel users (nama, username, password, role)
│   ├── 04_remember_token.sql # BARU — latihan §6.4 no. 2, kolom remember_token
│   └── migrasi_json.php      # Impor data dari jobsheet-06
├── assets/
│   ├── css/style.css         # + gaya .auth-status
│   └── js/app.js             # Tidak berubah dari Jobsheet 9
├── buku/
│   ├── list.php              # Read + pagination + pencarian (publik); tombol Hapus khusus admin
│   ├── tambah.php, proses_tambah.php
│   ├── edit.php, proses_edit.php
│   └── hapus.php             # + wajib role admin
├── anggota/                  # Struktur sama; SELURUH halaman wajib login
│   ├── list.php, tambah.php, proses_tambah.php
│   ├── edit.php, proses_edit.php
│   └── hapus.php             # + wajib role admin
├── docs/
│   ├── wireframe.md          # Identik dengan jobsheet-09
│   └── jawaban.md            # Jawaban soal jobsheet
├── Infografis.png            # Infografis proyek
├── Dokumentasi/
│   ├── PANDUAN.md            # Panduan proyek
│   └── DEPLOY.md             # BARU — panduan Supabase + hosting Render
└── README.md                 # Laporan ini

render.yaml                   # BARU (di root repo) — Blueprint Render untuk jobsheet-10
```

## 📝 Ringkasan Proyek

Jobsheet 9 menyelesaikan CRUD, tetapi **siapa pun** bisa menambah, mengubah, dan menghapus data. Jobsheet 10 menutup celah itu dengan **autentikasi** (siapa penggunanya) dan **otorisasi** (boleh melakukan apa). Tabel `users` dibuat, password disimpan sebagai **hash** (bukan teks asli), dan sebuah *guard clause* (`includes/auth.php`) menjaga halaman-halaman yang tidak boleh diakses tamu. Navbar kini menyesuaikan diri: tamu hanya melihat katalog, petugas yang sudah login melihat menu pengelolaan beserta namanya dan tautan Logout. Pembagian aktor **Tamu vs Petugas** yang sudah dirancang di wireframe Jobsheet 4 akhirnya benar-benar berjalan.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 10

Struktur folder `jobsheet-10/` disiapkan sebagai kelanjutan Jobsheet 9. Seluruh halaman, stylesheet, skrip, skema SQL, `docs/`, dan infografis disalin dari Jobsheet 9, lalu diubah bertahap pada tahap-tahap berikutnya.

### 2. Konsep Dasar Autentikasi & Otorisasi

Tahap pengenalan konsep: perbedaan **autentikasi** ("kamu siapa?") dengan **otorisasi** ("kamu boleh apa?"), alasan password tidak boleh disimpan sebagai teks asli, cara kerja *hashing* satu arah (`password_hash()` / `password_verify()`), kenapa kolom `password` bertipe `VARCHAR(255)`, dan bagaimana `$_SESSION` dipakai untuk mengingat identitas pengguna antar halaman. Belum ada perubahan kode pada tahap ini.

### 3. Tabel users & Registrasi

Berkas `sql/03_users.sql` dibuat berisi tabel `users` (`id`, `nama`, `username` UNIQUE, `password`, `role` dengan `DEFAULT 'petugas'`). Nomor berkas digeser menjadi `03` karena nomor `02` sudah dipakai `02_tanggal_ditambahkan.sql` sejak Jobsheet 8.

`auth/register.php` menampilkan form registrasi (dengan `type="password"` dan `minlength="6"`), dan `auth/proses_register.php` memvalidasi masukan di server (`strlen($password) < 6`), memeriksa username duplikat lebih dulu supaya pesan errornya ramah, lalu menyimpan pengguna baru dengan `password_hash($password, PASSWORD_DEFAULT)`. Role ditulis langsung sebagai `'petugas'` di klausa `VALUES` — bukan dari input pengguna — supaya tidak ada yang bisa mendaftarkan diri sebagai `admin` lewat form publik.

`includes/header.php` mulai memakai pola `if (session_status() === PHP_SESSION_NONE) { session_start(); }` agar tidak bentrok ketika beberapa berkas memanggil `session_start()` pada satu permintaan yang sama.

### 4. Login & Logout

`auth/login.php` menampilkan form login (dan langsung mengalihkan ke Beranda bila pengguna sudah login). `auth/proses_login.php` mencari pengguna dengan `SELECT * FROM users WHERE username = :username`, lalu memverifikasi dengan `password_verify()`. Bila cocok, identitas disimpan ke `$_SESSION` (`user_id`, `nama`, `role`) dan pengguna dialihkan ke Beranda; bila tidak, muncul flash message **"Username atau password salah."** yang sengaja tidak membedakan mana yang salah, supaya tidak membocorkan username mana yang valid.

`auth/logout.php` mengakhiri sesi dengan `session_destroy()` lalu kembali ke halaman Login.

### 5. Guard Halaman: includes/auth.php

Berkas `includes/auth.php` dibuat sebagai penjaga gerbang: bila `$_SESSION['user_id']` belum ada, pengunjung langsung dialihkan ke halaman Login. Berkas ini di-`require` sebagai **baris paling pertama** di setiap halaman terkunci — sebelum `header.php` mencetak HTML apa pun — karena `header('Location: ...')` gagal bila sudah ada output terkirim.

Halaman yang dikunci: `buku/tambah.php`, `buku/edit.php`, `buku/proses_tambah.php`, `buku/proses_edit.php`, `buku/hapus.php`, **seluruh** halaman `anggota/*`, dan `reset.php`. Halaman yang tetap publik: `index.php` dan `buku/list.php` (katalog boleh dilihat tamu, sesuai wireframe Jobsheet 4).

**Dua penyesuaian dari contoh jobsheet:**

- **Path redirect dihitung otomatis.** Contoh jobsheet menulis `header('Location: ../auth/login.php')`, yang hanya benar untuk halaman satu folder di dalam root (`buku/`, `anggota/`). Karena `reset.php` berada **di root** dan ikut dikunci, path itu salah untuk berkas tersebut (terbukti memicu HTTP 500 saat diuji). `auth.php` kini menghitung kedalaman folder halaman yang sedang dibuka — teknik yang sama dengan `$base` di `includes/header.php` — sehingga benar untuk `buku/`, `anggota/`, maupun root.
- **`reset.php` juga dikunci.** Berkas ini mengosongkan kedua tabel sekaligus (`TRUNCATE`) sehingga bersifat destruktif, tetapi tidak ada di daftar halaman terkunci pada contoh jobsheet.

### 6. Navbar Dinamis & CSS Pendukung

`includes/header.php` menghitung `$sudahLogin = isset($_SESSION['user_id'])` satu kali, lalu memakainya untuk dua hal: menu **Tambah Buku / Daftar Anggota / Tambah Anggota** hanya muncul saat sudah login, dan pojok kanan header menampilkan nama petugas + tautan **Logout**, atau tautan **Login** bila belum. Tombol **Reset Data** di Beranda ikut disembunyikan untuk tamu karena `reset.php` kini terkunci.

Gaya `.auth-status` ditambahkan ke `style.css`. Warnanya disesuaikan dengan tema proyek ini (`#323232` mengikuti `header nav a`) — contoh jobsheet memakai `color: #fff` karena mengasumsikan header biru, sedangkan header proyek ini ungu dengan teks gelap, sehingga teks putih akan sulit terbaca. Nama petugas juga dibungkus `htmlspecialchars()` agar aman ditampilkan.

Label footer diperbarui dari "Jobsheet 9" menjadi "Jobsheet 10".

### 7. Rangkuman & Latihan Lanjutan

**Keempat** latihan opsional dari dokumentasi dikerjakan:

1. **Kontrol akses berbasis `role`** — `buku/hapus.php`, `anggota/hapus.php`, dan `reset.php` (ketiganya destruktif) kini menolak siapa pun yang `role`-nya bukan `admin`, dengan flash message "Hanya admin yang boleh menghapus data." Tombol Hapus di kedua halaman daftar dan tombol Reset Data di Beranda hanya dirender untuk admin — pola yang sama dengan navbar dinamis: **UI menyembunyikan, guard yang memblokir**. Role `admin` diberikan lewat SQL (tidak ada jalur pendaftaran publik untuknya).
2. **"Ingat Saya" (Remember Me)** — `includes/remember.php` menyimpan token acak 32 byte sebagai cookie `HttpOnly` + `SameSite=Lax` berumur 30 hari, sementara **hash** token (SHA-256) yang disimpan di database, bukan token aslinya — alasan yang sama dengan alasan password di-hash. Sesi dipulihkan saat cookie masih valid, dan token **diputar** setiap kali dipakai. Modul ini di-`require` dari `header.php` dan `login.php` supaya pemulihan terjadi **sebelum** status login dihitung. Koneksi database hanya dimuat ketika cookie benar-benar ada, agar sifat "guard tetap bekerja walau database mati" tidak hilang.
3. **Pembatas percobaan login gagal** — `proses_login.php` menghitung kegagalan di `$_SESSION` (sesuai petunjuk latihan). Setelah 5 kegagalan, login dikunci 60 detik; selama terkunci, permintaan ditolak **sebelum** menyentuh database. Sisa percobaan ditampilkan agar pengguna tahu.
4. **Uji guard saat database mati** — dibuktikan dengan menjalankan proyek pada salinan sementara yang diarahkan ke port database yang tidak ada: halaman terkunci tetap mengembalikan HTTP 302 ke halaman Login, sementara `index.php` menampilkan pesan kegagalan koneksi. Ini menunjukkan guard berjalan **sebelum** kode yang membutuhkan database. (Mematikan layanan PostgreSQL sungguhan memerlukan `sudo`, jadi pengujian dilakukan dengan cara setara.)

### 8. Persiapan Hosting: Supabase + Render

Tahap memindahkan aplikasi dari `php -S localhost:8000` ke hosting gratis, dengan database PostgreSQL Supabase. Panduan langkah demi langkah ada di **`Dokumentasi/DEPLOY.md`**; yang berubah di dalam kode hanya dua berkas ditambah tiga berkas baru.

**`includes/koneksi.php` — kredensial pindah ke environment variable.** Sebelumnya host, nama database, dan password ditulis langsung di berkas. Itu tidak bisa dibawa ke hosting karena dua alasan: repo ini publik, dan image Docker memuat setiap berkas yang di-`COPY`, sehingga password yang tertulis di kode akan ikut ter-push ke GitHub dan tersimpan di dalam image. Sekarang nilainya dibaca dari `DATABASE_URL` (string koneksi penuh dari Supabase), atau dari `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASS`, dengan nilai lokal sebagai cadangan — jadi `php -S localhost:8000` tetap jalan tanpa konfigurasi apa pun. Setelan SSL (`sslmode`) juga ikut dibaca: PostgreSQL lokal di mesin ini berjalan tanpa SSL sedangkan Supabase mewajibkannya, sehingga satu DSN dengan `sslmode=prefer` benar untuk keduanya (`DB_SSLMODE=require` tersedia bila ingin memaksa).

**`Dockerfile` + `docker/start.sh` — Render tidak punya runtime PHP.** Render hanya menyediakan runtime native untuk Node, Python, Ruby, Go, Rust, dan Elixir; PHP harus lewat Docker. Dockerfile memakai image resmi `php:8.4-apache-bookworm` dan menambahkan satu ekstensi yang dibutuhkan proyek, `pdo_pgsql` (driver `pgsql` bawaan tidak dipakai karena koneksi lewat PDO). `docker/start.sh` menggeser port Apache dari 80 ke nilai `$PORT` yang diberikan Render, karena Render meneruskan trafik ke port tersebut, bukan ke port 80.

**`render.yaml` (root repo) — Blueprint.** Repo ini berisi sepuluh folder jobsheet, jadi Dockerfile dan konteks build ditunjuk eksplisit (`dockerfilePath` dan `dockerContext` ke `./jobsheet-10`) dan `buildFilter` membatasi redeploy hanya ketika berkas di bawah `jobsheet-10/` berubah. Variabel `DATABASE_URL` diberi tanda `sync: false` supaya nilainya **tidak** disimpan di repo melainkan diminta lewat dashboard Render.

Pemilihan layanan: Render dipilih karena satu-satunya hosting gratis yang memenuhi dua syarat sekaligus — menjalankan PHP **dan** boleh membuka koneksi keluar ke PostgreSQL port 5432. InfinityFree/Byet/TinkerHost hanya mengizinkan koneksi keluar ke port 3306 (MySQL), sedangkan Vercel, Netlify, dan GitHub Pages tidak menjalankan PHP sama sekali.

---

## 🔧 Penyesuaian dari Jobsheet Sebelumnya

- Proyek dibangun dari **kode Jobsheet 9 sendiri**, sehingga kolom `kategori` & `tanggal_ditambahkan` (buku), kolom `email` (anggota), penanganan error `UNIQUE`, pagination, pencarian multi-kolom, tema warna, serta kartu Statistik tetap ada.
- `sql/02_users.sql` pada dokumentasi dinomori `03_users.sql` di proyek ini agar tidak bertabrakan dengan `02_tanggal_ditambahkan.sql`.
- `reset.php` tidak ada di contoh jobsheet; berkas ini milik proyek sendiri sehingga ikut dikunci dan dibatasi ke role `admin`.
- Nilai `q` pencarian tetap memakai `htmlspecialchars()`, dan nama petugas di navbar juga dibungkus `htmlspecialchars()`.
- Beranda kini menampilkan flash message — sebelumnya tidak, padahal `reset.php` yang ditolak mengalihkan pengguna ke halaman ini dengan pesan error.

## 🛠️ Catatan Environment (Arch Linux)

```bash
sudo pacman -S php php-pgsql postgresql
sudo systemctl enable --now postgresql
# aktifkan extension=pdo_pgsql & extension=pgsql di /etc/php/php.ini
sudo -u postgres createdb simpus_mini
psql -d simpus_mini -f sql/01_buku_anggota.sql
psql -d simpus_mini -f sql/02_tanggal_ditambahkan.sql
psql -d simpus_mini -f sql/03_users.sql
psql -d simpus_mini -f sql/04_remember_token.sql
```

Autentikasi PostgreSQL di mesin ini memakai `trust` untuk koneksi lokal, sehingga nilai cadangan `postgres`/`postgres` di `koneksi.php` langsung berfungsi tanpa mengatur password.

## 🚀 Cara Menjalankan

```bash
php -S localhost:8000
```

Buka `http://localhost:8000/index.php`. Karena tabel `users` masih kosong, langkah pertama adalah membuka **Login → "Daftar di sini"** untuk membuat akun petugas, lalu login. Untuk mencoba kontrol akses admin, ubah role akun lewat `psql`:

```sql
UPDATE users SET role = 'admin' WHERE username = 'username_anda';
```

Untuk mengisi data contoh buku dari Jobsheet 6: `php sql/migrasi_json.php`.

Untuk menjalankan versi yang memakai database Supabase (tanpa mengubah kode):

```bash
DATABASE_URL='postgresql://postgres.<ref>:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres' \
  php -S localhost:8000
```

## ☁️ Hosting (Supabase + Render)

Aplikasi sudah disiapkan untuk di-hosting gratis di Render dengan database Supabase. Berkas yang dipakai: `Dockerfile`, `docker/start.sh`, `.dockerignore`, dan `render.yaml` di root repo. Langkah lengkapnya (membuat project Supabase, menjalankan skema, mengambil connection string, sampai deploy dan verifikasi) ada di **[`Dokumentasi/DEPLOY.md`](Dokumentasi/DEPLOY.md)**.

Kesiapan image Docker diuji otomatis di GitHub Actions setiap kali berkas di dalam `jobsheet-10/` berubah — lihat `.github/workflows/docker-smoke.yml`. Alur yang dijalankan: bangun image → jalankan container dengan `PORT=10000` → pastikan beranda membaca database → registrasi, login, tambah buku → cek barisnya benar-benar masuk PostgreSQL.

## ✅ Verifikasi

Seluruh alur diuji pada server `php -S` dengan akun & data uji sementara (dibuat lalu dihapus kembali setelah pengujian):

| Yang diuji | Hasil |
| :--- | :--- |
| Halaman terkunci tanpa login | 302 ke `auth/login.php` (7 halaman diuji) |
| Halaman publik tanpa login | 200 (`index.php`, `buku/list.php`, `auth/login.php`, `auth/register.php`) |
| Navbar tanpa login | Menu terkunci & tombol Reset tidak dirender; tautan Login muncul |
| Registrasi | Baris masuk database; kolom `password` berisi hash 60 karakter, **bukan** password asli |
| Registrasi username duplikat | Flash "Username sudah digunakan." |
| Registrasi password < 6 karakter | Flash "Password minimal 6 karakter." |
| Login benar | 302 ke Beranda; navbar menampilkan nama + Logout; halaman terkunci jadi 200 |
| Login salah 5× | Sisa percobaan berkurang 4→1, kegagalan ke-5 mengunci 60 detik |
| Percobaan saat terkunci | Ditolak sebelum menyentuh database ("Coba lagi dalam 60 detik") |
| Login setelah kunci habis | Berhasil |
| Petugas: tombol Hapus | Tidak dirender; tautan Edit tetap ada |
| Petugas: POST `hapus.php` langsung | Ditolak + flash "Hanya admin yang boleh menghapus data."; baris tetap ada |
| Petugas: `reset.php` | Ditolak + flash "Hanya admin yang boleh mengosongkan data."; data utuh |
| Admin: tombol Hapus & Reset | Dirender; hapus & reset berhasil |
| "Ingat Saya" | Cookie `HttpOnly` berisi `id:token`; database menyimpan hash SHA-256 (token asli tidak tersimpan) |
| "Ingat Saya" tanpa sesi | Sesi dipulihkan pada permintaan pertama (navbar + halaman terkunci); token diputar (hash berubah) |
| Logout | `remember_token` jadi NULL; sesi tidak pulih; halaman terkunci kembali 302 |
| Database tidak terjangkau | Halaman terkunci tetap 302 ke Login; `index.php` menampilkan pesan gagal koneksi |
| Konfigurasi database via `DATABASE_URL` | `index.php`, daftar buku, registrasi, login, tambah buku, dan logout berjalan sama seperti sebelumnya (diuji dengan `php -S` + env var) |
| Konfigurasi database via env terpisah | `DB_HOST`/`DB_NAME`/`DB_USER`/`DB_PASS` menghasilkan koneksi yang sama |
| `DATABASE_URL` salah bentuk | Pesan "DATABASE_URL tidak bisa dibaca…", bukan error PHP |
| Host lokal vs host lain | `127.0.0.1` → `sslmode=prefer` (koneksi berhasil ke PostgreSQL lokal tanpa SSL); host non-lokal → `sslmode=require` (ditolak oleh server tanpa SSL, dan `DB_SSLMODE` bisa menimpanya) |
| Database tidak terjangkau (versi hosting) | Pengunjung melihat pesan umum "Koneksi database gagal…"; rincian (host, nama pengguna) hanya masuk log server |
| Perintah `sed` di `docker/start.sh` | Diuji pada `ports.conf` dan `000-default.conf` asli dari paket Apache Debian bookworm: `Listen 80` → `Listen 10000`, `<VirtualHost *:80>` → `<VirtualHost *:10000>`, aman dijalankan dua kali |
| `render.yaml` | Nol error terhadap skema resmi Render (`https://render.com/schema/render.yaml.json`); validator yang sama menolak contoh sengaja-rusak (kontrol negatif) |
| Build & jalankan image Docker | Diverifikasi di GitHub Actions (runner Linux, sama seperti lingkungan build Render) — `.github/workflows/docker-smoke.yml`: image berhasil dibangun, container melayani port `10000` (`siap setelah 2 percobaan`), beranda dirender dari database, registrasi/login/tambah buku berhasil, dan barisnya benar-benar ada di PostgreSQL. Mesin pengembang tidak dipakai karena daemon Docker di sini hanya bisa diakses root. |

## ✅ Kesimpulan

Jobsheet 10 menambahkan lapisan keamanan yang sebelumnya tidak ada: aplikasi kini tahu **siapa** yang sedang mengakses dan **boleh** melakukan apa. Tiga kebiasaan penting ikut tertanam: password tidak pernah disimpan apa adanya, `header('Location: ...')` menuntut urutan `require` yang benar, dan menyembunyikan tombol di tampilan bukan pengganti otorisasi — keduanya harus ada bersamaan. Yang masih menjadi tugas mandiri adalah memperluas aturan role (misalnya admin vs petugas untuk tiap halaman), dan pengamanan yang lebih ketat seperti token CSRF yang baru dibahas di Jobsheet 11.
