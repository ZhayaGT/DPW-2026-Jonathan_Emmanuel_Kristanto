# DPW 2026 — Jonathan Emmanuel Kristanto

Kumpulan pengerjaan Jobsheet Desain & Pemrograman Web (SIMPUS-Mini) beserta
dokumentasinya.

| Jobsheet | Isi |
| :--- | :--- |
| 01–06 | HTML, CSS, JavaScript (data di JSON/`localStorage`) |
| 07–09 | PHP: sesi, form, PostgreSQL (PDO) |
| 10 | Autentikasi & otorisasi + persiapan hosting |
| 11–13 | Keamanan web, modul peminjaman, deployment |

## Menjalankan SIMPUS-Mini (Jobsheet 10)

```bash
cd jobsheet-10
php -S localhost:8000   # buka http://localhost:8000/index.php
```

Panduan lengkap: [`jobsheet-10/README.md`](jobsheet-10/README.md) ·
[`jobsheet-10/Dokumentasi/PANDUAN.md`](jobsheet-10/Dokumentasi/PANDUAN.md).

## Hosting (Supabase + Render)

Aplikasi disiapkan untuk di-hosting gratis: web di **Render** (Docker),
database PostgreSQL di **Supabase**. Langkah lengkap ada di
[`jobsheet-10/Dokumentasi/DEPLOY.md`](jobsheet-10/Dokumentasi/DEPLOY.md).

Tombol di bawah membuat ulang web service dari `render.yaml` (akan meminta
nilai `DATABASE_URL` dari Supabase):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ZhayaGT/DPW-2026-Jonathan_Emmanuel_Kristanto)
