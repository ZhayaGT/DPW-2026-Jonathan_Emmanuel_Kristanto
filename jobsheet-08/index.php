<?php
$page_title = "Beranda";
include __DIR__ . '/includes/header.php';
require __DIR__ . '/includes/koneksi.php';

$totalBuku = $pdo->query("SELECT COUNT(*) FROM buku")->fetchColumn();
$totalAnggota = $pdo->query("SELECT COUNT(*) FROM anggota")->fetchColumn();
?>
        <section>
            <h2>Selamat Datang di Sistem Perpustakaan Mini</h2>
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

            <form method="post" action="reset.php" onsubmit="return confirm('Kosongkan seluruh data buku dan anggota?');">
                <p>
                    <button type="submit">Reset Data</button>
                </p>
            </form>
        </section>
<?php include __DIR__ . '/includes/footer.php'; ?>
