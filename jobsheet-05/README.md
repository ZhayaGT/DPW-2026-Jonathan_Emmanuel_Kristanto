# 📘 Laporan Pengerjaan Jobsheet 5 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-05/
├── index.html              # Beranda utama dengan navigasi & ringkasan statistik
├── assets/
│   ├── css/
│   │   └── style.css       # Ditambah gaya untuk error & search-box
│   └── js/
│       └── app.js          # BARU — seluruh interaktivitas jobsheet ini
├── buku/
│   ├── list.html           # Ditambah kolom pencarian + class btn-hapus
│   └── tambah.html         # Ditambah id="form-tambah" untuk validasi
├── anggota/
│   ├── list.html           # Tabel daftar anggota + kolom pencarian
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

Proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) pada Jobsheet 5 berfokus pada penambahan **interaktivitas JavaScript** ke atas struktur HTML dan CSS yang sudah dibangun sejak Jobsheet 1–4. Seluruh logika dipusatkan pada satu berkas baru, `assets/js/app.js`, yang menangani menu hamburger, konfirmasi hapus baris tabel, filter tabel real-time, serta validasi form. Halaman HTML dan stylesheet lama disesuaikan (id, class, dan gaya pendukung) agar dapat dikendalikan oleh JavaScript.

---

## 📜 Histori Pengerjaan

### 1. Membuat Struktur Jobsheet 5

Struktur folder `jobsheet-05/` disiapkan sebagai kelanjutan jobsheet sebelumnya. Halaman HTML, stylesheet, dan dokumen disalin dari Jobsheet 4, lalu ditambahkan folder baru `assets/js/` beserta berkas `app.js` sebagai tempat seluruh interaktivitas. Pada tahap ini `app.js` masih kosong dan belum ditautkan ke halaman.

### 2. Apa yang Berubah di File HTML?

Beberapa penanda ditambahkan ke HTML agar elemen mudah dipilih oleh JavaScript:

- **Menu hamburger**: checkbox hack (`<input type="checkbox" id="nav-toggle">` + `<label for="nav-toggle">`) diganti menjadi `<button type="button" id="nav-toggle-btn" class="nav-toggle-label" aria-label="Menu">&#9776;</button>`.
- **Kolom pencarian**: halaman `buku/list.html` dan `anggota/list.html` ditambah `<div class="search-box">` berisi `<input id="search-input">`.
- **Tombol hapus**: setiap tombol Hapus diberi class `btn-hapus` agar bisa dipilih dengan `querySelectorAll`.
- **Form tambah**: form diberi penanda `id="form-tambah"` (pada `anggota/tambah.html`) dan `class="form-tambah"` (pada `buku/tambah.html`) sebagai target validasi.

### 3. CSS Pendukung Fitur JavaScript

File `style.css` disesuaikan agar mendukung fitur baru:

- Aturan `.nav-toggle { display: none; }` dihapus karena checkbox hack sudah tidak dipakai.
- `.nav-toggle-label` ditambah `background: none` dan `border: none` supaya tombol hamburger tampil rapi.
- Blok media query yang sebelumnya dikomentari (`960px`, `480px`, dan `1400px`) diaktifkan kembali.
- Ditambahkan `header nav.nav-open { display: block; }` sebagai kelas yang di-toggle oleh JavaScript.
- Ditambahkan gaya `.error` untuk pesan validasi dan `.search-box` untuk kolom pencarian.

### 4. JS: Menu Hamburger

Fungsi `initNavToggle()` dibuat di `app.js`. Fungsi ini mengambil tombol `#nav-toggle-btn` dan elemen `header nav`, lalu pada event `click` menjalankan `nav.classList.toggle("nav-open")`. Berkas `app.js` dipindahkan dari lokasi awal yang keliru (`assets/css/js/app.js`) ke lokasi yang benar, yaitu `assets/js/app.js`.

### 5. JS: Konfirmasi Hapus

Fungsi `initHapusConfirm()` menambahkan listener `click` ke setiap tombol `.btn-hapus`. Saat diklik, baris terdekat dicari dengan `btn.closest("tr")`, judul diambil dari sel pertama (`querySelector("td")`), lalu ditampilkan dialog `confirm()`. Jika pengguna menyetujui, baris dihapus dengan `row.remove()`.

### 6. JS: Filter Tabel Real-Time

Fungsi `initTableFilter()` memasang listener `keyup` pada input `#search-input`. Setiap kali pengguna mengetik, seluruh baris `tbody tr` dibandingkan dengan kata kunci, dan baris yang tidak cocok disembunyikan dengan `row.style.display = "none"`. Filter berjalan secara real-time tanpa memuat ulang halaman.

### 7. JS: Validasi Form

Validasi form ditambahkan melalui tiga bagian:

- `tampilkanError(input, pesan)` — menyisipkan `<span class="error">` berisi pesan tepat setelah field.
- `hapusError(input)` — menghapus pesan error yang sudah ada.
- `initValidasiForm()` — menangani event `submit` dan mencegah pengiriman (`e.preventDefault()`) bila ada field yang tidak valid. Field yang divalidasi: judul/nama wajib diisi, pengarang wajib diisi, tahun terbit 1900–2026, dan stok tidak negatif.

### 8. Rangkuman & Latihan Lanjutan

Tahap akhir berisi penyempurnaan dan latihan lanjutan:

- **Inisialisasi terpusat** — pemanggilan `initNavToggle()`, `initHapusConfirm()`, `initTableFilter()`, dan `initValidasiForm()` dipindahkan ke satu listener `DOMContentLoaded`, sehingga blok `<script>` inline di setiap halaman dihapus.
- **Perbaikan path script** — halaman di dalam folder `buku/` dan `anggota/` memakai `../assets/js/app.js` (sebelumnya keliru `assets/js/app.js`).
- **Animasi menu** — pada layar mobile `header nav` memakai `max-height: 0`, `overflow: hidden`, dan `transition: max-height 0.35s ease`, sedangkan `.nav-open` menaikkan `max-height` sehingga menu terbuka/tertutup dengan efek geser halus.
- **Filter satu kolom** — pencarian dibatasi hanya pada kolom Judul dengan `row.querySelector("td")`, bukan seluruh teks baris.
- **Counter baris** — fungsi `updateCounter()` menampilkan teks "Menampilkan X dari Y buku/anggota" di atas tabel dan diperbarui setiap kali filter atau hapus dijalankan.
- **Refactor validasi** — aturan validasi disimpan dalam array `aturanValidasi` (berisi `selector`, `cek`, dan `pesan`) lalu dijalankan dengan `forEach`, menggantikan blok `if` terpisah per field.
- **Validasi ISBN** — field ISBN yang tidak wajib diisi (sesuai jobsheet-01 §4.4) kini divalidasi agar hanya menerima angka dan tanda hubung melalui pola `/^[0-9-]+$/`.
- **Perbaikan label pencarian anggota** — teks "Cari Judul Buku" pada halaman anggota diperbaiki menjadi "Cari Anggota".

---

## ✅ Kesimpulan

Jobsheet 5 berhasil menambahkan lapisan **interaktivitas JavaScript** pada proyek SIMPUS-Mini. Empat fitur utama — menu hamburger, konfirmasi hapus, filter tabel real-time, dan validasi form — diimplementasikan dalam satu berkas `app.js` yang diinisialisasi terpusat lewat `DOMContentLoaded`. Penyempurnaan akhir berupa animasi CSS, counter baris, refactor validasi berbasis array, dan validasi ISBN menunjukkan penerapan konsep manipulasi DOM, event handling, serta pemisahan tanggung jawab antara struktur (HTML), tampilan (CSS), dan perilaku (JavaScript).
