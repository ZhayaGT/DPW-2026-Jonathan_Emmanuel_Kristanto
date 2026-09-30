<?php
require_once __DIR__ . '/../includes/remember.php';
require_once __DIR__ . '/../includes/koneksi.php';

// Token "Ingat Saya" ikut dimatikan saat logout — kalau tidak, cookie yang
// masih tersimpan di browser akan langsung memulihkan sesi begitu halaman
// berikutnya dibuka, sehingga tombol Logout jadi tidak ada artinya.
if (isset($_SESSION['user_id']) && isset($_COOKIE[INGAT_SAYA_COOKIE])) {
    ingatSayaMatikan($pdo, (int) $_SESSION['user_id']);
}

session_destroy();
header('Location: login.php');
exit;
