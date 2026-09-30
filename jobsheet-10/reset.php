<?php
require __DIR__ . '/includes/auth.php';

// Jobsheet 10, latihan opsional §6.4 no. 1 — Reset Data mengosongkan kedua
// tabel sekaligus (TRUNCATE), jadi diperlakukan sama seperti operasi hapus
// lain: hanya role 'admin' yang boleh menjalankannya.
if (($_SESSION['role'] ?? '') !== 'admin') {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => 'Hanya admin yang boleh mengosongkan data.'];
    header('Location: index.php');
    exit;
}

require __DIR__ . '/includes/koneksi.php';

$pdo->exec("TRUNCATE TABLE buku, anggota RESTART IDENTITY");

header('Location: index.php');
exit;
