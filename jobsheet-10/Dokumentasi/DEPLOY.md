# 🌐 Panduan Deploy — Supabase + Render

Dokumen ini menjelaskan cara memindahkan SIMPUS-Mini (Jobsheet 10) dari
`php -S localhost:8000` + PostgreSQL lokal ke **hosting gratis**, dengan
database **PostgreSQL Supabase**.

```
Browser
   │  HTTPS
   ▼
Render (Web Service, Docker, plan free)
   │  pdo_pgsql, port 5432, SSL
   ▼
Supabase (PostgreSQL terkelola)
```

Dua bagian besar:

| Bagian | Yang dilakukan | Perkiraan waktu |
| :--- | :--- | :--- |
| [A. Supabase](#a-supabase) | Membuat project + menjalankan skema | 10 menit |
| [B. Render](#b-render) | Menghubungkan repo + deploy | 10 menit |

> **Penting — repo ini publik.** Password database hanya boleh masuk lewat
> *environment variable* di dashboard Render, **tidak pernah** ditulis di
> `includes/koneksi.php` atau berkas lain yang di-commit. Kode di repo ini
> sudah memakai pola itu (lihat [Bagian C](#c-cara-kerja-konfigurasi-database)).

---

## A. Supabase

### A1. Membuat project

1. Daftar/masuk ke <https://supabase.com/dashboard>.
2. **New project** → isi:
   - **Name**: `simpus-mini`
   - **Database Password**: klik **Generate a password**, lalu **simpan
     password ini** (akan dipakai di langkah A3). Password ini bukan password
     akun Supabase-mu.
   - **Region**: pilih yang terdekat, mis. **Southeast Asia (Singapore)** —
     samakan dengan region Render di langkah B agar latensi kecil.
3. Tunggu sampai project selesai dibuat (± 2 menit).

### A2. Menjalankan skema tabel

Buka **SQL Editor** di sidebar kiri, lalu jalankan **satu per satu** isi berkas
dari folder `sql/` (urutannya penting karena berkas 02 dan 04 mengubah tabel
yang dibuat 01 dan 03):

| Urutan | Berkas | Isi |
| :--- | :--- | :--- |
| 1 | `sql/01_buku_anggota.sql` | tabel `buku` & `anggota` |
| 2 | `sql/02_tanggal_ditambahkan.sql` | kolom `tanggal_ditambahkan` |
| 3 | `sql/03_users.sql` | tabel `users` |
| 4 | `sql/04_remember_token.sql` | kolom `remember_token` |

Caranya: buka berkasnya di editor, salin seluruh isinya, tempel ke SQL Editor,
klik **Run**. Ulangi untuk berkas berikutnya.

Verifikasi: buka **Table Editor** — harus ada tiga tabel: `anggota`, `buku`,
`users`.

### A3. Mengambil connection string

1. Klik tombol **Connect** di bagian atas dashboard project.
2. Pilih tab **Session pooler** (bukan *Direct connection*, bukan
   *Transaction pooler*).
3. Salin string yang muncul. Bentuknya:

   ```
   postgresql://postgres.abcdefghijklm:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
   ```

4. Ganti `[YOUR-PASSWORD]` dengan password dari langkah A1.

**Kenapa Session pooler?**

| Mode | Host / port | Alasan |
| :--- | :--- | :--- |
| Direct connection | `db.<ref>.supabase.co:5432` | IPv6-only di plan Free → sering gagal dari jaringan IPv4 |
| **Session pooler** ✅ | `aws-0-<region>.pooler.supabase.com:5432` | IPv4, dan **mendukung prepared statement** |
| Transaction pooler ❌ | `...pooler.supabase.com:6543` | **Tidak** mendukung prepared statement — semua query proyek ini memakai placeholder (`:judul`, `:username`, dst.) |

Bila password mengandung karakter seperti `@`, `#`, `?`, `&`, atau spasi,
**percent-encode** dulu (mis. `@` → `%40`). Tanpa itu, `parse_url()` akan
salah membaca string koneksinya.

### A4. (Opsional) Mengisi data contoh

Data buku dari Jobsheet 6 bisa dimasukkan dengan menjalankan
`sql/migrasi_json.php` dari mesin lokal, tetapi arahkan dulu koneksinya ke
Supabase:

```bash
cd jobsheet-10
DATABASE_URL='postgresql://postgres.abcdefghijklm:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres' \
  php sql/migrasi_json.php
```

---

## B. Render

Render dipakai karena satu-satunya hosting gratis yang memenuhi dua syarat
proyek ini sekaligus: **menjalankan PHP** dan **boleh membuka koneksi keluar
ke PostgreSQL port 5432**. Hosting gratis lain gagal di salah satunya
(InfinityFree hanya mengizinkan koneksi keluar ke port 3306/MySQL; Vercel,
Netlify, dan GitHub Pages tidak menjalankan PHP sama sekali).

> Render tidak menyediakan runtime PHP native, jadi aplikasi dibungkus Docker:
> `jobsheet-10/Dockerfile` + `jobsheet-10/docker/start.sh`.
> Free instance **tidak memerlukan kartu kredit**; bila kuota bulanan
> terlewati tanpa metode pembayaran, Render menonaktifkan layanan sampai
> periode berikutnya (tidak menagih).

### B1. Deploy lewat Blueprint (cara utama)

1. Masuk ke <https://dashboard.render.com> dan hubungkan akun GitHub.
2. Klik **New → Blueprint**.
3. Pilih repo `ZhayaGT/DPW-2026-Jonathan_Emmanuel_Kristanto` → **Connect**.
4. Render membaca `render.yaml` di root repo dan menampilkan satu service
   bernama **simpus-mini** (Docker, plan Free, region Singapore).
5. Render meminta nilai **`DATABASE_URL`** (variabel bertanda `sync: false`
   sengaja tidak disimpan di repo). Tempel string koneksi dari langkah A3.
6. Klik **Apply** / **Create**. Build pertama memakan waktu beberapa menit
   (unduh image `php:8.4-apache-bookworm` + kompilasi ekstensi `pdo_pgsql`).
7. Setelah status **Live**, buka `https://simpus-mini.onrender.com`.

Kalau `DATABASE_URL` belum siap saat langkah 5, isi nilai apa saja dulu —
nilainya bisa diubah kapan saja lewat **simpus-mini → Environment → Edit →
Save Changes** (Render otomatis redeploy).

### B2. Deploy manual (bila Blueprint tidak dipakai)

**New → Web Service** → pilih repo → isi:

| Kolom | Nilai |
| :--- | :--- |
| Name | `simpus-mini` |
| Language | **Docker** |
| Branch | `master` |
| Region | Singapore (samakan dengan Supabase) |
| Root Directory | *kosongkan* |
| Dockerfile Path | `jobsheet-10/Dockerfile` |
| Instance Type | **Free** |
| Health Check Path | `/index.php` |

Root Directory sengaja dikosongkan dan Dockerfile Path ditulis lengkap dari
root repo, supaya tidak ada keraguan apakah Render membacanya relatif
terhadap root repo atau terhadap Root Directory. Isi `render.yaml` memakai
susunan yang sama (`dockerfilePath: ./jobsheet-10/Dockerfile`).

Lalu di tab **Environment**, tambahkan:

| Key | Value |
| :--- | :--- |
| `DATABASE_URL` | string koneksi Supabase dari langkah A3 |

### B3. Verifikasi deploy

1. Buka `https://simpus-mini.onrender.com` — Beranda muncul dengan angka
   **Total Buku** dan **Total Anggota** (bukan pesan *"Koneksi database gagal"*).
   Angka yang tampil membuktikan PHP di Render benar-benar membaca data dari
   Supabase.
2. **Login → "Daftar di sini"** → buat akun petugas → login.
3. Tambah 1 buku, lalu buka **Table Editor → tabel `buku`** di dashboard
   Supabase. Baris baru harus muncul di sana — inilah bukti dua layanan sudah
   terhubung, bukan sekadar aplikasi jalan.
4. Cek juga **Logs** di Render bila ada yang tidak sesuai.

---

## C. Cara kerja konfigurasi database

`includes/koneksi.php` membaca kredensial dari environment variable, dengan
nilai lokal sebagai cadangan supaya `php -S localhost:8000` tetap jalan tanpa
konfigurasi tambahan:

| Urutan prioritas | Sumber | Dipakai di |
| :--- | :--- | :--- |
| 1 | `DATABASE_URL` (string koneksi penuh) | Render |
| 2 | `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` | fleksibel |
| 3 | nilai default (`localhost`, `simpus_mini`, `postgres`/`postgres`) | mesin lokal |

Setelan SSL: `DB_SSLMODE` (default `prefer`). Nilai `prefer` memakai SSL bila
server mendukung dan jatuh ke koneksi biasa bila tidak — PostgreSQL lokal
umumnya tanpa SSL, Supabase mewajibkan SSL, dan satu setelan ini benar untuk
keduanya. Tambahkan `DB_SSLMODE=require` bila ingin memaksa SSL.

### Mengubah variabel di Render

**simpus-mini → Environment → Edit** → ubah/tambah baris → **Save Changes**
(Render otomatis redeploy). Untuk menghapus, kosongkan nilainya.

### Menjalankan versi Render di mesin lokal (opsional)

```bash
cd jobsheet-10
DATABASE_URL='postgresql://...supabase.com:5432/postgres' php -S localhost:8000
```

Cara ini berguna untuk memastikan string koneksi sudah benar **sebelum**
deploy: kalau lokal bisa, sisa masalahnya hanya di sisi Render.

---

## D. Keterbatasan layanan gratis (bukan bug)

| Gejala | Sebab | Yang bisa dilakukan |
| :--- | :--- | :--- |
| Buka pertama lambat (± 1 menit) | Free web service Render **tidur setelah 15 menit idle** dan bangun saat ada request | Wajar untuk tugas; sebutkan di laporan |
| Petugas tiba-tiba ter-logout | Filesystem Render **ephemeral** — berkas sesi PHP di `/tmp` hilang saat instance di-restart/redeploy | Login ulang; untuk demo, lakukan saat aplikasi baru dipakai |
| Situs menampilkan *"Koneksi database gagal"* setelah lama tidak dipakai | Project Supabase plan Free **dijeda otomatis bila tidak ada aktivitas 7 hari** | Buka dashboard Supabase → **Restore project** |
| Data hilang setelah redeploy | Sama seperti di atas: hanya `/tmp` yang hilang, data di Supabase aman | — |

## E. Troubleshooting

| Pesan error | Artinya | Solusi |
| :--- | :--- | :--- |
| `tenant or user not found` | Username pooler salah | Username harus `postgres.<project-ref>` (perhatikan titik), bukan `postgres` |
| `password authentication failed` | Password salah atau karakter khusus tidak di-encode | Periksa password A1; percent-encode `@ # ? &` dan spasi |
| `connection refused` / `timeout` | Memakai host/port yang salah | Pakai **Session pooler** port `5432`, bukan `6543` atau host `db.<ref>.supabase.co` |
| `server does not support SSL, but SSL was required` | `DB_SSLMODE=require` dipakai ke PostgreSQL lokal tanpa SSL | Hapus env var itu untuk pemakaian lokal |
| Deploy Render gagal di tahap build | Dockerfile/ekstensi gagal dibangun | Baca **Logs**; pastikan `dockerfilePath` = `./jobsheet-10/Dockerfile` dan `dockerContext` = `./jobsheet-10` |
| Halaman putih / 500 setelah deploy | Error PHP | Cek **Logs** di Render |

## F. Keamanan

- Repo ini **publik**. Jangan pernah menulis password database, anon key, atau
  service key Supabase ke dalam berkas yang di-commit.
- Bila sebuah password pernah ter-commit, **ganti password** di dashboard
  Supabase (Project Settings → Database → Reset database password) — menghapus
  commit tidak cukup, karena password tetap ada di riwayat Git.
- `anon key` Supabase **tidak dipakai** di proyek ini. Aplikasi ini berbicara
  langsung ke PostgreSQL sebagai role `postgres`, sehingga tidak ada kunci
  apa pun yang boleh ditaruh di sisi browser.
- Row Level Security (RLS) Supabase juga tidak relevan di sini: RLS mengatur
  akses lewat Data API (REST), sedangkan proyek ini memakai koneksi PDO
  langsung.

## G. Ringkasan perintah

```bash
# 1. Uji string koneksi Supabase dari mesin lokal
cd jobsheet-10
DATABASE_URL='postgresql://postgres.<ref>:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres' \
  php -S localhost:8000

# 2. Uji image Docker secara lokal (butuh Docker)
docker build -t simpus-mini .
docker run --rm -p 10000:10000 \
  -e DATABASE_URL='postgresql://...' \
  simpus-mini
# buka http://localhost:10000

# 3. Setelah kode berubah, deploy ulang
git add . && git commit -m "..." && git push
# Render akan otomatis redeploy (autoDeployTrigger: commit)
```
