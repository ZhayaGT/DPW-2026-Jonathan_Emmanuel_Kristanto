<?php
require __DIR__ . '/includes/koneksi.php';

$pdo->exec("TRUNCATE TABLE buku, anggota RESTART IDENTITY");

header('Location: index.php');
exit;
