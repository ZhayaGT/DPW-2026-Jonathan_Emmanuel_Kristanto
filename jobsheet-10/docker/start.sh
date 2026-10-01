#!/usr/bin/env bash
# Menjalankan Apache pada port yang diberikan Render.
#
# Apache pada image resmi PHP mendengarkan port 80 (tertulis di
# /etc/apache2/ports.conf dan pada blok <VirtualHost *:80> di
# sites-available/000-default.conf). Render memberi nomor port lewat
# environment variable PORT, jadi kedua berkas itu disesuaikan lebih dulu.
set -euo pipefail

PORT="${PORT:-10000}"

sed -ri "s/^Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf
sed -ri "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" \
    /etc/apache2/sites-available/000-default.conf

echo "SIMPUS-Mini: Apache mendengarkan port ${PORT}"
exec apache2-foreground
