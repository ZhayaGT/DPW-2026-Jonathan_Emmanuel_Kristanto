# 📘 Laporan Pengerjaan Jobsheet 6 — GameVault

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
gamevault/
├── index.html                  # Beranda + ringkasan statistik (dihitung dari data)
├── assets/
│   ├── css/
│   │   └── style.css           # Tema gelap ungu, mobile-first, responsive
│   └── js/
│       ├── app.js              # Interaktivitas bersama semua halaman
│       ├── data.js             # Lapisan penyimpanan localStorage
│       ├── game.js             # Logika halaman game
│       └── review.js           # Logika halaman review
├── data/
│   ├── game.json               # Data awal 10 game
│   └── review.json             # Data awal 5 review
├── game/
│   ├── list.html               # Tabel daftar game
│   └── tambah.html             # Form tambah & edit game
├── review/
│   ├── list.html               # Tabel daftar review
│   └── tambah.html             # Form tambah review
├── docs/
│   ├── wireframe.md            # Rancangan fitur lanjutan
│   └── jawaban.md              # Jawaban soal jobsheet
├── Infografis.png              # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md              # Dokumentasi teknis proyek
└── README.md                   # Laporan ini
```

## 📝 Ringkasan Proyek

**GameVault** adalah aplikasi web untuk mencatat koleksi game pribadi beserta reviewnya. Proyek ini merupakan rekreasi dari studi kasus SIMPUS-Mini (sistem perpustakaan mini) dengan tema dan desain sendiri, dikerjakan mengikuti materi Jobsheet 6 mata pelajaran Desain dan Pengembangan Web.

Aplikasi terdiri dari dua entitas yang saling terhubung: **game** dan **review**. Setiap review mengacu pada satu game melalui `gameId`, sehingga kolom "Game" pada tabel review menampilkan judul game, bukan sekadar angka.

Fokus Jobsheet 6 adalah **interaktivitas JavaScript**: mengambil data secara asinkron dengan `fetch()`, memanipulasi DOM, menangani event, memvalidasi form, dan menyimpan data di browser dengan `localStorage`. Struktur HTML dan stylesheet dari jobsheet sebelumnya tetap dipakai sebagai fondasi.

---

## 📜 Histori Pengerjaan

### 1. Perencanaan Tema dan Palet Warna

Proyek dimulai dengan menentukan tema. SIMPUS-Mini yang bertema perpustakaan diganti menjadi GameVault yang bertema koleksi game. Palet warna diambil dari sebuah gambar referensi bertema gelap dengan aksen ungu, lalu diterjemahkan menjadi variabel CSS di dalam `:root`:

| Variabel | Nilai | Kegunaan |
| :--- | :--- | :--- |
| `--bg` | `#0B0B0F` | Latar belakang halaman |
| `--surface` | `#15151C` | Panel dan kartu |
| `--surface-2` | `#1E1E27` | Input, header tabel, kartu statistik |
| `--border` | `#2A2A36` | Garis tepi |
| `--accent` | `#8B5CF6` | Ungu utama, tombol, aksen |
| `--accent-soft` | `#A78BFA` | Ungu terang untuk hover dan teks judul |
| `--text` | `#ECECF1` | Teks utama |
| `--muted` | `#9A9AA8` | Teks sekunder |
| `--danger` / `--warn` / `--ok` | `#EF4444` / `#F59E0B` / `#22C55E` | Tombol hapus, edit, status |

### 2. Struktur Folder

Struktur folder mengikuti pola Jobsheet 6: halaman dikelompokkan per entitas (`game/` dan `review/`), aset dipisah ke `assets/css/` dan `assets/js/`, serta data awal disimpan di `data/` sebagai berkas JSON. Halaman diletakkan di dalam subfolder sehingga semua path relatif naik satu tingkat (`../assets/...`).

### 3. HTML Semantik dan Struktur Halaman

Setiap halaman dibangun dengan elemen semantik HTML5: `header` untuk kepala halaman, `nav` untuk menu, `main` untuk konten utama, `section` untuk blok konten, `article` untuk kartu statistik, dan `footer` untuk kaki halaman. Lima halaman dibuat: beranda, daftar game, tambah game, daftar review, dan tambah review.

### 4. CSS: Fondasi dan Variabel

File `style.css` dimulai dengan reset global `* { box-sizing: border-box; margin: 0; padding: 0; }` untuk menyeragamkan perhitungan ukuran di semua elemen. Variabel warna diletakkan di `:root` agar penggantian tema cukup dilakukan di satu tempat. Gaya dasar `body` memakai font Poppins dengan latar `--bg` dan warna teks `--text`.

### 5. Header, Navbar, dan Menu Hamburger

Header memakai Flexbox (`display: flex`, `justify-content: space-between`) agar judul situs berada di kiri dan navigasi di kanan. Pada versi Jobsheet 6, menu hamburger tidak lagi memakai *checkbox hack* melainkan tombol `<button id="nav-toggle-btn">` yang dikendalikan JavaScript. Animasi buka-tutup dibuat dengan `max-height: 0`, `overflow: hidden`, dan `transition: max-height 0.35s ease`, sedangkan kelas `.nav-open` menaikkan `max-height` sehingga menu muncul dengan efek geser halus.

### 6. Layout, Hero, dan Kartu Ringkasan

Konten utama dibatasi `max-width: 1100px` dengan `margin: 2rem auto` agar terpusat. Setiap `section` diberi gaya kartu: latar `--surface`, garis tepi, dan `border-radius: 12px`. Bagian hero memakai `radial-gradient` untuk menghasilkan efek cahaya ungu dari atas. Empat kartu ringkasan disusun dengan **CSS Grid**: satu kolom pada mobile, dua kolom mulai 481px, dan empat kolom mulai 961px.

### 7. Data Awal dalam Bentuk JSON

Data dipisahkan dari HTML dan disimpan di `data/game.json` (10 game dengan field `id`, `judul`, `genre`, `platform`, `tahun`, `rating`, `developer`, `deskripsi`) dan `data/review.json` (5 review dengan field `id`, `gameId`, `penulis`, `rating`, `komentar`, `tanggal`). Field `gameId` menjadi penghubung antara review dan game.

### 8. JS: Lapisan Penyimpanan localStorage

File `data.js` dibuat sebagai lapisan penyimpanan yang dipakai bersama semua halaman. Isinya:

- `KEY_GAMES` dan `KEY_REVIEWS` — nama kunci penyimpanan.
- `ambilLokal(key)` — membaca dan mengubah JSON dari localStorage, mengembalikan `null` bila belum ada.
- `simpanLokal(key, data)` — menulis data ke localStorage.
- `buatId(daftar)` — menghasilkan id baru dari nilai id terbesar.
- `ambilAwal(key, url)` — mengambil dari localStorage; bila kosong, membaca berkas JSON lalu menyimpannya.
- `teksAman(nilai)` — mengubah karakter `&`, `<`, `>` menjadi entitas HTML.
- `bintang(nilai)` — menghasilkan markup bintang rating 1–5.

Fungsi `teksAman()` penting karena data pengguna disisipkan ke dalam tabel melalui `innerHTML`. Tanpa fungsi ini, karakter `<` atau `>` pada judul game dapat merusak struktur halaman.

### 9. JS: Menu Hamburger dan Konfirmasi Hapus

File `app.js` menampung interaktivitas yang dipakai semua halaman:

- `initNavToggle()` — menambahkan/menghapus kelas `nav-open` pada `header nav` saat tombol hamburger diklik.
- `initHapusConfirm()` — memakai **event delegation** dengan satu listener di `document`. Saat tombol `.btn-hapus` diklik, baris terdekat dicari dengan `closest("tr")`, judul diambil dari sel pertama, lalu dialog `confirm()` ditampilkan. Bila disetujui, baris dihapus dan sebuah `CustomEvent` `gamevault:hapus` dipancarkan agar halaman terkait dapat menghapus data yang sama dari localStorage.

Event delegation dipakai karena baris tabel baru dibuat setelah data selesai diambil, sehingga listener tidak dapat dipasang per tombol.

### 10. JS: Filter Tabel Real-Time dan Counter Baris

`initTableFilter()` memasang listener `keyup` pada kolom pencarian dan `change` pada filter genre. Setiap kali nilai berubah, seluruh baris tabel dibandingkan dengan kata kunci (kolom pertama) dan genre (`data-genre`); baris yang tidak cocok disembunyikan dengan `row.style.display = "none"`.

`updateCounter()` menampilkan teks "Menampilkan X dari Y game/review" di atas tabel dan diperbarui setiap kali filter atau hapus dijalankan.

### 11. JS: Validasi Form Berbasis Array Aturan

Validasi form disusun dengan pendekatan data-driven. Aturan disimpan dalam array `aturanValidasi`, masing-masing berisi `selector`, fungsi `cek`, dan `pesan`. Fungsi `initValidasiForm()` menjalankan seluruh aturan dengan `forEach`, sehingga penambahan aturan baru cukup dilakukan dengan menambah satu objek.

Dua fungsi pendukung: `tampilkanError(input, pesan)` menyisipkan `<span class="error">` tepat setelah field, dan `hapusError(input)` menghapusnya. Aturan yang berlaku meliputi field wajib isi, rentang tahun 1990–2026, rating 1–5, dan panjang komentar minimal 5 karakter.

Karena `e.preventDefault()` pada satu listener tidak menghentikan listener lain, handler penyimpanan di `game.js` dan `review.js` memeriksa sendiri keberadaan elemen `.error` sebelum menyimpan data.

### 12. JS: Pengambilan Data Asinkron dan Render Tabel

`muatDaftarGame()` dan `muatDaftarReview()` dibuat sebagai fungsi `async` dengan pola `try/catch/finally`:

1. Menampilkan indikator `#loading-indicator`.
2. Memberi jeda singkat dengan `setTimeout` agar indikator terlihat.
3. Mengambil data dengan `await fetch(...)` dan memeriksa `res.ok`.
4. Memakai data dari localStorage bila sudah ada, atau menyalin dari JSON bila belum.
5. Merender baris tabel dengan `createElement` dan `appendChild`.
6. Menyembunyikan indikator dan memperbarui counter di blok `finally`.
7. Bila gagal, menampilkan pesan kesalahan pada satu baris dengan `colspan`.

### 13. JS: Modal Detail

Setiap baris memiliki tombol **Detail** yang membuka modal berisi informasi lengkap. Modal memakai `position: fixed` dengan `inset: 0` sebagai lapisan penutup, disembunyikan dengan `display: none`, dan dimunculkan dengan menambahkan kelas `.modal-aktif`. Modal dapat ditutup melalui tombol Tutup maupun dengan mengklik area luar.

### 14. JS: Tambah dan Edit Data

Halaman `game/tambah.html` melayani dua mode sekaligus. Bila URL memiliki parameter `?id=`, form berubah menjadi mode edit: judul halaman diganti, field diisi data lama, dan proses simpan melakukan pembaruan (`findIndex` lalu mengganti objek) alih-alih penambahan. Tombol **Edit** pada tabel mengarahkan pengguna ke alamat tersebut.

Halaman review memiliki form tambah dengan dropdown game yang diisi otomatis dari data game, sedangkan tanggal review diisi otomatis dengan tanggal hari ini.

### 15. Ringkasan Statistik Dinamis

Kartu ringkasan pada beranda awalnya berisi angka statis yang tidak sesuai data. Fungsi `initRingkasan()` ditambahkan di `app.js` untuk menghitung jumlah game, jumlah review, jumlah genre unik, dan rata-rata rating langsung dari data, lalu menuliskannya ke elemen `#total-game`, `#total-review`, `#total-genre`, dan `#rating-rata`.

### 16. Responsive Design dan Media Query

Pendekatan **mobile-first** diterapkan penuh. Gaya dasar ditulis untuk layar kecil, lalu ditingkatkan dengan media query `min-width`:

- **≥ 481px** — navigasi kembali horizontal dan tombol hamburger disembunyikan; grid ringkasan menjadi dua kolom.
- **≥ 961px** — grid ringkasan menjadi empat kolom.
- **≥ 1400px** — lebar maksimum `main` diperluas menjadi 1400px.

Tabel dibungkus `.table-responsive` dengan `overflow-x: auto` agar dapat digulir horizontal pada layar sempit.

### 17. Pengujian

Pengujian dilakukan dengan menjalankan server lokal `python3 -m http.server` karena `fetch()` tidak dapat membaca berkas JSON melalui protokol `file://`. Pengujian mencakup validasi form, penyimpanan data, filter, modal, hapus, mode edit, dan menu hamburger. Seluruh skenario pengujian berhasil.

---

## ✅ Kesimpulan

GameVault berhasil dibangun sebagai aplikasi pengelolaan koleksi game dan review yang interaktif. Materi Jobsheet 6 diterapkan melalui pengambilan data asinkron dengan `fetch()`, manipulasi DOM, event delegation, validasi form berbasis array aturan, serta penyimpanan data di `localStorage` sehingga data tetap ada setelah halaman dimuat ulang.

Pemisahan tanggung jawab dijaga dengan jelas: HTML untuk struktur, CSS untuk tampilan, `app.js` untuk perilaku bersama, `data.js` untuk penyimpanan, dan `game.js`/`review.js` untuk logika masing-masing halaman. Struktur ini membuat penambahan fitur baru cukup dilakukan pada berkas yang relevan tanpa mengubah bagian lain.
