<?php
require __DIR__ . '/../includes/auth.php';

// Jobsheet 10, latihan opsional §6.4 no. 1 — kontrol akses berbasis role.
// Menghapus bersifat destruktif, jadi hanya role 'admin' yang boleh;
// petugas biasa hanya melihat dan menambah data.
if (($_SESSION['role'] ?? '') !== 'admin') {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => 'Hanya admin yang boleh menghapus data.'];
    header('Location: list.php');
    exit;
}

require __DIR__ . '/../includes/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: list.php');
    exit;
}

$id = $_POST['id'] ?? null;
if ($id) {
    $stmt = $pdo->prepare("DELETE FROM buku WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Buku berhasil dihapus.'];
}

header('Location: list.php');
exit;
