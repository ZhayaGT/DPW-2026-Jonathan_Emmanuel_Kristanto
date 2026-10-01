# Image untuk hosting di Render.
#
# Render tidak menyediakan runtime PHP native (hanya Node, Python, Ruby, Go,
# Rust, dan Elixir), jadi aplikasi ini dibungkus Docker. Dasarnya image resmi
# PHP + Apache, ditambah satu ekstensi yang dipakai proyek.
#
# Uji lokal (opsional, butuh Docker):
#   docker build -t simpus-mini .
#   docker run --rm -e PORT=8080 -e DATABASE_URL='postgresql://...' -p 8080:8080 simpus-mini
#   # buka http://localhost:8080
#
# Basis dipatok ke bookworm (bukan tag mengambang) supaya tata letak berkas
# konfigurasi Apache yang disesuaikan docker/start.sh tidak berubah diam-diam.
FROM php:8.4-apache-bookworm

# includes/koneksi.php memakai PDO dengan driver pgsql, jadi yang perlu
# dipasang hanya ekstensi pdo_pgsql. libpq-dev dibutuhkan saat kompilasi
# ekstensi, bukan saat aplikasi berjalan.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html
COPY . /var/www/html/

# Render meneruskan trafik ke port pada environment variable PORT (default
# 10000), sedangkan Apache pada image ini mendengarkan port 80.
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 10000
CMD ["/usr/local/bin/start.sh"]
