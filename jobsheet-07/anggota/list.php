<?php
$page_title = "Daftar Anggota";
include __DIR__ . '/../includes/header.php';
?>
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
<?php
$extra_scripts = [$base . 'assets/js/tabel.js'];
include __DIR__ . '/../includes/footer.php';
?>
