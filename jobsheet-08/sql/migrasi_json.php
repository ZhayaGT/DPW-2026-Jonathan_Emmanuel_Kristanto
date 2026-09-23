<?php
require __DIR__ . '/../includes/koneksi.php';

$sumber = __DIR__ . '/../../jobsheet-06/data/buku.json';
if (!is_file($sumber)) {
    die("Berkas sumber tidak ditemukan: " . $sumber);
}

$daftarBuku = json_decode(file_get_contents($sumber), true);
if (!is_array($daftarBuku)) {
    die("Isi berkas JSON tidak valid: " . $sumber);
}

$stmt = $pdo->prepare(
    "INSERT INTO buku (judul, pengarang, tahun, isbn, stok, kategori)
     VALUES (:judul, :pengarang, :tahun, :isbn, :stok, :kategori)"
);

$jumlah = 0;
foreach ($daftarBuku as $buku) {
    $stmt->execute([
        'judul' => $buku['judul'],
        'pengarang' => $buku['pengarang'],
        'tahun' => (int) $buku['tahun'],
        'isbn' => $buku['isbn'] ?? '',
        'stok' => (int) $buku['stok'],
        'kategori' => $buku['kategori'] ?? '',
    ]);
    $jumlah++;
}

echo "Migrasi selesai: {$jumlah} buku dimasukkan dari jobsheet-06/data/buku.json.";
