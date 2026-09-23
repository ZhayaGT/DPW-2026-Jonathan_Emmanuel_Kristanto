# 📘 Laporan Pengerjaan Jobsheet 6 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-06/
├── index.html              # Beranda utama dengan navigasi & ringkasan statistik
├── assets/
│   ├── css/
│   │   └── style.css       # Gaya tabel, pencarian, validasi, dan tombol muat ulang
│   └── js/
│       ├── app.js          # Menu hamburger, hapus, filter, counter, validasi form
│       └── tabel.js        # BARU — fetch JSON + render tabel (fungsi generik)
├── data/
│   ├── buku.json           # Sumber data buku (10 objek, termasuk kategori)
│   └── anggota.json        # Sumber data anggota (4 objek)
├── buku/
│   ├── list.html           # Tabel dirender dari JSON + tombol Muat Ulang
│   └── tambah.html         # Form tambah buku + validasi
├── anggota/
│   ├── list.html           # Tabel dirender dari JSON
│   └── tambah.html         # Form tambah anggota + validasi
├── docs/
│   ├── wireframe.md        # Identik dengan jobsheet-04
│   └── jawaban.md          # Jawaban soal jobsheet
├── Infografis.png          # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md          # Panduan proyek
└── README.md               # Laporan ini
```

## 📝 Ringkasan Proyek

Proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 6 melanjutkan front-end dari Jobsheet 5 dengan memindahkan sumber data tabel keluar dari HTML. Halaman `buku/list.html` dan `anggota/list.html` tidak lagi menulis baris tabel secara manual: `<tbody>` dibiarkan kosong lalu diisi oleh JavaScript melalui `fetch` + `async/await` dari berkas JSON di folder `data/`. Pola ini adalah pengganti sementara untuk API/server sungguhan yang baru tersedia mulai Jobsheet 8.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 6

Struktur folder `jobsheet-06/` disiapkan sebagai kelanjutan Jobsheet 5. Halaman HTML, stylesheet, dan dokumen disalin dari Jobsheet 5, lalu ditambahkan folder baru `data/` untuk menampung sumber data JSON.

### 2. Apa yang Berubah di File HTML?

Halaman daftar disesuaikan agar siap diisi JavaScript:

- `<tbody>` pada `buku/list.html` dan `anggota/list.html` dikosongkan.
- Ditambahkan elemen `<p id="loading-indicator">` yang tampil selama data diambil.
- `<script>` untuk berkas render tabel ditambahkan setelah `app.js`.

### 3. Data JSON: buku.json & anggota.json

Dua berkas JSON dibuat sebagai sumber data: `data/buku.json` berisi 10 objek buku dan `data/anggota.json` berisi 4 objek anggota. Struktur kuncinya mengikuti kolom tabel yang sudah ada (judul, pengarang, tahun, stok, dan no_anggota, nama, alamat, no_hp).

### 4. JS: Mengambil & Menampilkan Daftar Buku

Fungsi `muatDaftarBuku()` dibuat untuk mengambil `data/buku.json` lewat `fetch`, memeriksa `res.ok`, mem-parse JSON, lalu membuat baris tabel satu per satu. Loading indicator ditampilkan sebelum pengambilan data dan disembunyikan di blok `finally`.

### 5. JS: Mengambil & Menampilkan Daftar Anggota

Pola yang sama diterapkan untuk data anggota lewat `muatDaftarAnggota()`. Kedua fungsi menangani kegagalan dengan `try/catch` dan menampilkan pesan error di dalam tabel bila pengambilan data gagal.

### 6. JS: Event Delegation pada Tombol Hapus

Karena baris tabel sekarang dibuat setelah halaman selesai dimuat, listener tombol Hapus tidak lagi bisa dipasang per tombol. `initHapusConfirm()` diubah memakai **event delegation**: satu listener dipasang di `document`, lalu `e.target.closest(".btn-hapus")` menyaring klik yang relevan.

### 7. Menjalankan Lewat Server Lokal (CORS)

`fetch()` ke berkas lokal diblokir bila halaman dibuka lewat `file://`. Karena itu proyek dijalankan lewat server lokal (`php -S localhost:8000` atau Live Server).

### 8. Rangkuman & Latihan Lanjutan

Tahap akhir berisi penyempurnaan dan latihan opsional:

- **Refactor fungsi generik** — `buku.js` dan `anggota.js` digabung menjadi satu berkas `tabel.js` berisi `muatTabelData()`. Sumber data dan daftar kolom dibaca dari atribut `data-sumber` dan `data-kolom` pada `<table id="tabel-data">`, sehingga satu fungsi dapat melayani kedua halaman.
- **Tombol Muat Ulang** — tombol `#btn-muat-ulang` ditambahkan di halaman Daftar Buku untuk memanggil ulang `muatTabelData()`. Fungsi ini mengosongkan `<tbody>` terlebih dahulu, jadi aman dipanggil berkali-kali.
- **Kolom Kategori** — `data/buku.json` ditambah kunci `kategori`, lalu `<th>Kategori</th>` dan urutan kolom pada `data-kolom` disesuaikan.
- **Uji event delegation** — `console.log(e.target)` sempat ditambahkan di awal `initHapusConfirm` untuk mengamati event klik di seluruh halaman, lalu dihapus kembali setelah pengujian.
- **Uji delay** — nilai `DELAY_SIMULASI` dinaikkan sementara dari 600 menjadi 3000 ms untuk mengamati loading indicator pada koneksi lambat, lalu dikembalikan ke 600.

---

## ✅ Kesimpulan

Jobsheet 6 memindahkan sumber data tabel SIMPUS-Mini dari HTML statis ke berkas JSON yang diambil secara asinkron lewat `fetch`. Rendering tabel, loading indicator, dan penanganan error ditangani di sisi klien, sementara event delegation memastikan tombol pada baris dinamis tetap berfungsi. Refactor menjadi fungsi generik menunjukkan bahwa pola fetch-render dapat dipakai ulang untuk berbagai bentuk data tanpa menggandakan kode.
