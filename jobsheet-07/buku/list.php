<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../assets/css/style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SIMPUS-Mini | Daftar Buku</title>
</head>
<body>
    <header>
        <h1>SIMPUS-Mini</h1>
        <button type="button" id="nav-toggle-btn" class="nav-toggle-label" aria-label="Menu">&#9776;</button>
        <nav>
            <ul>
                <li><a href="../index.php">Beranda</a></li>
                <li><a href="list.php">Daftar Buku</a></li>
                <li><a href="tambah.php">Tambah Buku</a></li>
                <li><a href="../anggota/list.php">Daftar Anggota</a></li>
                <li><a href="../anggota/tambah.php">Tambah Anggota</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Daftar Buku</h2>
            <div class="search-box">
                <label for="search-input">Cari Judul Buku</label>
                <input type="text" id="search-input" placeholder="Ketik judul buku...">
                <button type="button" id="btn-muat-ulang">Muat Ulang</button>
            </div>
            <p id="loading-indicator" style="display:none;">Memuat data...</p>
            <div class="table-responsive">
                <table id="tabel-data" data-sumber="../data/buku.json" data-kolom="judul,pengarang,tahun,kategori,stok">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Pengarang</th>
                            <th>Tahun</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 SIMPUS-Mini &mdash; Jobsheet 7</p>
    </footer>

    <script src="../assets/js/app.js"></script>
    <script src="../assets/js/tabel.js"></script>
</body>
</html>