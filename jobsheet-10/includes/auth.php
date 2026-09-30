<?php
// Guard clause: di-include di baris paling atas setiap halaman yang
// membutuhkan login (sebelum header.php mengeluarkan output apa pun),
// agar header('Location: ...') masih bisa dipanggil.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    // Path ke halaman login dihitung dari kedalaman folder halaman yang
    // sedang dibuka — bukan ditulis tetap '../auth/login.php'. Alasannya:
    // berkas ini juga dipakai halaman di root proyek (reset.php), yang
    // kedalamannya berbeda dari buku/ dan anggota/. Teknik perhitungannya
    // sama dengan $base di includes/header.php.
    $__jobsheetRoot = dirname(__DIR__);
    $__scriptDir = dirname($_SERVER['SCRIPT_FILENAME']);
    $__rel = ltrim(str_replace('\\', '/', substr($__scriptDir, strlen($__jobsheetRoot))), '/');
    $__naik = $__rel === '' ? '' : str_repeat('../', substr_count($__rel, '/') + 1);

    header('Location: ' . $__naik . 'auth/login.php');
    exit;
}
