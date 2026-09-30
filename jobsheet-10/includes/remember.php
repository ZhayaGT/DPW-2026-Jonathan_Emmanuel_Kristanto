<?php
// Jobsheet 10, latihan opsional §6.4 no. 2 — "Ingat Saya".
//
// Memulihkan sesi login dari cookie berumur panjang, supaya pengguna tidak
// perlu login ulang setiap kali browser ditutup. Berkas ini di-require dari
// auth/login.php (agar pengunjung yang diarahkan ke halaman Login langsung
// dipulihkan sesinya) dan dari includes/header.php (agar halaman lain ikut
// memulihkan sesi sebelum navbar dirender).
//
// Catatan desain: koneksi database hanya dimuat KETIKA cookie benar-benar
// ada. Permintaan tanpa cookie tetap tidak menyentuh database di sini,
// sehingga sifat "guard auth.php tetap bekerja walau database mati"
// (dokumentasi jobsheet-10 §4.6) tidak hilang.

const INGAT_SAYA_COOKIE = 'ingat_saya';
const INGAT_SAYA_HARI = 30;

function ingatSayaSetCookie(string $nilai, int $kedaluwarsa): void
{
    setcookie(INGAT_SAYA_COOKIE, $nilai, [
        'expires' => $kedaluwarsa,
        'path' => '/',
        'httponly' => true,   // tidak bisa dibaca JavaScript halaman
        'samesite' => 'Lax',  // tidak ikut terkirim pada permintaan lintas situs
    ]);
}

// Membuat token baru untuk satu pengguna, menyimpan HASH-nya, lalu
// mengirim token aslinya ke browser.
//
// Yang disimpan di database adalah hash, bukan token aslinya — alasannya
// sama dengan alasan password di-hash: bila isi tabel users bocor,
// penyerang tidak langsung memegang token login yang masih hidup.
function ingatSayaAktifkan(PDO $pdo, int $idUser): void
{
    $token = bin2hex(random_bytes(32));

    $stmt = $pdo->prepare("UPDATE users SET remember_token = :token WHERE id = :id");
    $stmt->execute([
        'token' => hash('sha256', $token),
        'id' => $idUser,
    ]);

    ingatSayaSetCookie($idUser . ':' . $token, time() + INGAT_SAYA_HARI * 86400);
}

// Menghapus token di database sekaligus menghapus cookie di browser.
function ingatSayaMatikan(PDO $pdo, int $idUser): void
{
    $stmt = $pdo->prepare("UPDATE users SET remember_token = NULL WHERE id = :id");
    $stmt->execute(['id' => $idUser]);

    ingatSayaSetCookie('', time() - 3600);
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id']) && isset($_COOKIE[INGAT_SAYA_COOKIE])) {
    require_once __DIR__ . '/koneksi.php';

    $bagian = explode(':', (string) $_COOKIE[INGAT_SAYA_COOKIE], 2);
    $idUser = $bagian[0] ?? '';
    $token = $bagian[1] ?? '';

    $user = false;
    if (ctype_digit($idUser) && $token !== '') {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute(['id' => $idUser]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    if ($user && !empty($user['remember_token'])
        && hash_equals($user['remember_token'], hash('sha256', $token))) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['nama'] = $user['nama'];
        $_SESSION['role'] = $user['role'];

        // Token diputar setiap kali dipakai — membatasi masa berlaku token
        // yang mungkin sudah tersalin ke tempat lain.
        ingatSayaAktifkan($pdo, (int) $user['id']);
    } else {
        ingatSayaSetCookie('', time() - 3600);
    }
}
