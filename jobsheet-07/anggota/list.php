<!DOCTYPE html>
<html lang="id">
<head>
    <link rel="stylesheet" href="../assets/css/style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SIMPUS-Mini | Daftar Anggota</title>
</head>
<body>
    <header>
        <h1>SIMPUS-Mini</h1>
        <button type="button" id="nav-toggle-btn" class="nav-toggle-label" aria-label="Menu">&#9776;</button>
        
        <nav>
           <ul>
                <li><a href="../index.php">Beranda</a></li>
                <li><a href="../buku/list.php">Daftar Buku</a></li>
                <li><a href="../buku/tambah.php">Tambah Buku</a></li>
                <li><a href="list.php">Daftar Anggota</a></li>
                <li><a href="tambah.php">Tambah Anggota</a></li>
            </ul>
        </nav>
    </header> 

    <main>
        <section>
            <h2>Daftar Anggota</h2>
            <div class="search-box">
                <label for="search-input">Cari Anggota</label>
                <input type="text" id="search-input" placeholder="Ketik nomor anggota...">
            </div>
            <p id="loading-indicator" style="display:none;">Memuat data...</p>
            <div class="table-responsive">
                <table id="tabel-data" data-sumber="../data/anggota.json" data-kolom="no_anggota,nama,alamat,no_hp">
                    <thead>
                        <tr>
                            <th>No. Anggota</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>No. HP</th>
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