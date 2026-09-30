<?php
$page_title = "Beranda";
include __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/koneksi.php';

$totalBuku = $pdo->query("SELECT COUNT(*) FROM buku")->fetchColumn();
$totalAnggota = $pdo->query("SELECT COUNT(*) FROM anggota")->fetchColumn();

// Latihan §6.4 no. 1 — Reset Data mengosongkan kedua tabel (destruktif),
// jadi tombolnya hanya ditampilkan untuk admin.
$bolehReset = $sudahLogin && ($_SESSION['role'] ?? '') === 'admin';

// Beranda perlu membaca flash message karena reset.php yang ditolak
// (bukan admin) mengalihkan pengguna ke halaman ini dengan pesan error.
$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
        <section>
            <h2>Selamat Datang di Sistem Perpustakaan Mini</h2>

            <?php if ($flash): ?>
                <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
            <?php endif; ?>

            <div class="table-responsive"><p>Aplikasi sederhana untuk mengelola data buku dan anggota perpustakaan.</p></div>
        </section>

        <section>
            <h2>Ringkasan</h2>
            <article>
                <h3>Total Buku</h3>
                <p><?php echo $totalBuku; ?></p>
            </article>
            <article>
                <h3>Total Anggota</h3>
                <p><?php echo $totalAnggota; ?></p>
            </article>
            <article>
                <h3>Sedang Dipinjam</h3>
                <p>0</p>
            </article>
            <article>
                <h3>Statistik</h3>
                <p><?php echo $totalBuku + $totalAnggota; ?></p>
            </article>

            <?php if ($bolehReset): ?>
            <form method="post" action="reset.php" onsubmit="return confirm('Kosongkan seluruh data buku dan anggota?');">
                <p>
                    <button type="submit">Reset Data</button>
                </p>
            </form>
            <?php endif; ?>
        </section>
<?php include __DIR__ . '/includes/footer.php'; ?>
