-- Jobsheet 10: tabel users (Petugas) untuk autentikasi
-- Jalankan: psql -d simpus_mini -f sql/03_users.sql
--
-- Catatan penomoran: dokumentasi jobsheet menamai berkas ini 02_users.sql,
-- tetapi di proyek ini nomor 02 sudah dipakai 02_tanggal_ditambahkan.sql
-- (latihan opsional Jobsheet 8), jadi diberi nomor 03 agar tidak ada dua
-- berkas berawalan sama.

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'petugas'
);
