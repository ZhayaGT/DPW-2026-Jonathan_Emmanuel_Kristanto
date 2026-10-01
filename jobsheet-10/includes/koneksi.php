<?php
// Kredensial database dibaca dari environment variable supaya kode yang sama
// dipakai di dua lingkungan tanpa diubah:
//
//   - Lokal  : PostgreSQL di mesin sendiri (nilai default di bawah).
//   - Hosting: PostgreSQL Supabase, diisi lewat env var di dashboard Render
//              (panduan: Dokumentasi/DEPLOY.md).
//
// Alasannya bukan sekadar kerapian: repo ini publik dan image Docker memuat
// seluruh berkas yang di-COPY, jadi password yang ditulis di kode akan ikut
// ter-push ke GitHub.
//
// Dua cara mengisi (pilih salah satu):
//   1. DATABASE_URL — string koneksi penuh dari Supabase, mis.
//      postgresql://postgres.abcdefghijklm:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
//   2. Terpisah — DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS.
//
// Catatan Supabase: pakai host "Session pooler" (port 5432), bukan
// "Transaction pooler" (port 6543). Transaction pooler tidak mendukung
// prepared statement, sedangkan seluruh query proyek ini memakai placeholder
// (mis. :judul) lewat PDO.
//
// Nama variabel sengaja diberi awalan "db" ($dbHost, $dbUser, ...) supaya
// tidak bertabrakan dengan variabel bernama umum ($user, $host) di halaman
// lain — berkas ini di-include ke dalam lingkup halaman.

$dbHost = 'localhost';
$dbPort = '5432';
$dbName = 'simpus_mini';
$dbUser = 'postgres';
$dbPass = 'postgres';
$dbSslmode = null;

// String koneksi URL lebih praktis karena bisa disalin apa adanya dari
// dashboard Supabase (tombol Connect).
$dbUrl = getenv('DATABASE_URL');
if ($dbUrl !== false && $dbUrl !== '') {
    $dbBagian = parse_url($dbUrl);
    if ($dbBagian === false || empty($dbBagian['host'])) {
        die('DATABASE_URL tidak bisa dibaca. Format yang benar: '
            . 'postgresql://user:password@host:port/database');
    }

    $dbHost = $dbBagian['host'];
    $dbPort = isset($dbBagian['port']) ? (string) $dbBagian['port'] : '5432';
    $dbUser = isset($dbBagian['user']) ? rawurldecode($dbBagian['user']) : 'postgres';
    $dbPass = isset($dbBagian['pass']) ? rawurldecode($dbBagian['pass']) : '';
    $dbName = !empty($dbBagian['path']) ? ltrim($dbBagian['path'], '/') : 'postgres';

    // Supabase menambahkan ?sslmode=... pada string koneksinya.
    parse_str($dbBagian['query'] ?? '', $dbQuery);
    if (!empty($dbQuery['sslmode'])) {
        $dbSslmode = $dbQuery['sslmode'];
    }
}

// Env var terpisah menimpa nilai di atas bila diisi.
$dbHost = getenv('DB_HOST') ?: $dbHost;
$dbPort = getenv('DB_PORT') ?: $dbPort;
$dbName = getenv('DB_NAME') ?: $dbName;
$dbUser = getenv('DB_USER') ?: $dbUser;
$dbPass = getenv('DB_PASS') ?: $dbPass;

// PostgreSQL lokal berjalan tanpa SSL, sedangkan database terkelola seperti
// Supabase mewajibkan SSL. Aturannya dibuat menurut host, bukan satu nilai
// untuk semua: host lokal memakai 'prefer' (SSL dipakai bila tersedia), host
// lain memakai 'require' supaya koneksi tidak pernah diam-diam turun ke teks
// biasa. DB_SSLMODE bisa dipakai untuk menimpanya.
$dbSslmode = getenv('DB_SSLMODE') ?: $dbSslmode;
if (!$dbSslmode) {
    $dbLokal = in_array($dbHost, ['localhost', '127.0.0.1', '::1'], true);
    $dbSslmode = $dbLokal ? 'prefer' : 'require';
}

try {
    $pdo = new PDO(
        "pgsql:host=$dbHost;port=$dbPort;dbname=$dbName;sslmode=$dbSslmode",
        $dbUser,
        $dbPass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Rincian error hanya masuk log server (di Render: tab Logs), tidak
    // ditampilkan ke pengunjung — pesan PDO memuat host dan nama pengguna
    // database, dan sejak aplikasi ini punya alamat publik, rincian itu
    // tidak perlu diketahui siapa pun yang membuka halaman.
    error_log('Koneksi database gagal: ' . $e->getMessage());
    die('Koneksi database gagal. Periksa konfigurasi database pada server.');
}
