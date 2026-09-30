-- Jobsheet 10, latihan opsional §6.4 no. 2 ("Ingat Saya"):
-- kolom penyimpanan hash token cookie berumur panjang.
-- Jalankan: psql -d simpus_mini -f sql/04_remember_token.sql

ALTER TABLE users ADD COLUMN IF NOT EXISTS remember_token VARCHAR(255);
