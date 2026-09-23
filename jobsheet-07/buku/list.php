<?php
$page_title = "Daftar Buku";
include __DIR__ . '/../includes/header.php';
?>
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
<?php
$extra_scripts = [$base . 'assets/js/tabel.js'];
include __DIR__ . '/../includes/footer.php';
?>
