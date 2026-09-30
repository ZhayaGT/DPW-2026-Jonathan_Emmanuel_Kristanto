-- Jobsheet 8, latihan opsional: kolom tanggal_ditambahkan pada tabel buku
-- Untuk database yang sudah dibuat dengan 01_buku_anggota.sql, jalankan:
--   psql -d simpus_mini -f sql/02_tanggal_ditambahkan.sql

ALTER TABLE buku ADD COLUMN IF NOT EXISTS tanggal_ditambahkan TIMESTAMP DEFAULT NOW();
