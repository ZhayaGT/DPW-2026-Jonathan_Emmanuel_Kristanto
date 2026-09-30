<?php
require_once __DIR__ . '/../includes/remember.php';
require __DIR__ . '/../includes/koneksi.php';

// Jobsheet 10, latihan opsional §6.4 no. 3 — pembatas percobaan login gagal.
// Penghitungnya disimpan di $_SESSION (sesuai petunjuk latihan), sehingga
// hanya bertahan selama sesi browser berjalan.
const LOGIN_MAKS_GAGAL = 5;
const LOGIN_DURASI_KUNCI = 60;

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

// Kunci sementara: kalau masih dalam masa hukuman, permintaan ditolak
// SEBELUM menyentuh database sama sekali.
$kunciSampai = $_SESSION['login_kunci_sampai'] ?? 0;
if (time() < $kunciSampai) {
    $sisa = $kunciSampai - time();
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => "Terlalu banyak percobaan gagal. Coba lagi dalam {$sisa} detik.",
    ];
    header('Location: login.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Login berhasil: bersihkan penghitung percobaan gagal.
    unset($_SESSION['login_gagal'], $_SESSION['login_kunci_sampai']);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama'] = $user['nama'];
    $_SESSION['role'] = $user['role'];

    // Latihan §6.4 no. 2 — "Ingat Saya".
    if (!empty($_POST['ingat_saya'])) {
        ingatSayaAktifkan($pdo, (int) $user['id']);
    } else {
        // Login tanpa mencentang: pastikan token lama tidak tertinggal.
        ingatSayaMatikan($pdo, (int) $user['id']);
    }

    header('Location: ../index.php');
    exit;
}

// Login gagal: tambah penghitung, kunci bila sudah melewati batas.
$_SESSION['login_gagal'] = ($_SESSION['login_gagal'] ?? 0) + 1;

if ($_SESSION['login_gagal'] >= LOGIN_MAKS_GAGAL) {
    $_SESSION['login_gagal'] = 0;
    $_SESSION['login_kunci_sampai'] = time() + LOGIN_DURASI_KUNCI;
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => 'Terlalu banyak percobaan gagal. Login dikunci selama '
            . LOGIN_DURASI_KUNCI . ' detik.',
    ];
} else {
    $sisa = LOGIN_MAKS_GAGAL - $_SESSION['login_gagal'];
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => "Username atau password salah. Sisa percobaan sebelum dikunci: {$sisa}.",
    ];
}

header('Location: login.php');
exit;
