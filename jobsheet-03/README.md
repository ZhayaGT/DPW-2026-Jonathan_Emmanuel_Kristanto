# 📘 Laporan Pengerjaan Jobsheet 3 — SIMPUS-Mini

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
jobsheet-03/
├── index.html              # Beranda utama dengan navigasi & ringkasan statistik
├── assets/
│   └── css/
│       └── style.css       # Stylesheet global (responsive design)
├── buku/
│   ├── list.html           # Tabel daftar buku
│   └── tambah.html         # Form tambah buku
├── anggota/
│   ├── list.html           # Tabel daftar anggota
│   └── tambah.html         # Form tambah anggota
├── dokumentasi/
│   └── PANDUAN.md          # Panduan proyek
└── README.md               # Laporan ini
```

## 📝 Ringkasan Proyek

Proyek **SIMPUS-Mini** (Sistem Perpustakaan Mini) merupakan implementasi dari materi Jobsheet 3 mata pelajaran Desain dan Pengembangan Web (DPW). Aplikasi ini dibangun sebagai sistem manajemen data perpustakaan sederhana yang terdiri dari halaman beranda, daftar buku, form tambah buku, daftar anggota, dan form tambah anggota. Keseluruhan proyek dikembangkan menggunakan HTML5 dan CSS3 dengan pendekatan **mobile-first** dan **responsive design**.

---

## 📜 Histori Pengerjaan

### 1. Konsep Dasar CSS & Responsive Design

Pada fase awal, kami membangun fondasi dengan konsep **CSS Grid** dan **Box-sizing**. File `style.css` dibuat dengan aturan `* { box-sizing: border-box; margin: 0; padding: 0; }` untuk memastikan konsistensi layout di semua elemen. Konsep **mobile-first** diterapkan sejak awal, di mana gaya dasar ditulis untuk layar kecil terlebih dahulu, kemudian ditingkatkan menggunakan media query untuk ukuran layar yang lebih besar.

### 2. Perubahan pada File HTML

File `index.html`, `anggota/list.html`, `anggota/tambah.html`, `buku/list.html`, dan `buku/tambah.html` diperbarui dengan struktur **semantic HTML5**. Penambahan elemen `header`, `nav`, `main`, `section`, `article`, dan `footer` memberikan makna semantik pada halaman. Navigasi dibuat dengan menu link ke setiap halaman, serta ditambahkan **checkbox hack** untuk mengaktifkan menu hamburger pada perangkat mobile.

### 3. Reset & Gaya Dasar Body

File `style.css` diberi reset global pada semua elemen (`*`) dengan `margin: 0` dan `padding: 0`. Gaya dasar `body` ditetapkan dengan font keluarga **Poppins**, `line-height: 1.6`, warna teks `#f300e3`, dan `background-color: #9bbcff`. Aturan ini menjadi fondasi visual seluruh proyek dan memastikan konsistensi tipografi di semua halaman.

### 4. Header & Navbar dengan Flexbox

Header dan navigasi dibuat menggunakan **Flexbox**. `header` menggunakan `display: flex`, `align-items: center`, dan `justify-content: space-between` untuk mendistribusikan judul situs di kiri dan menu navigasi di kanan. Daftar navigasi (`nav ul`) menggunakan `display: flex` dengan `gap: 1.25rem` untuk jarak antar item menu. Warna background header ditetapkan ke `#8E7CD8` (ungu) untuk memberikan kesan profesional.

### 5. Layout Main & Section (CSS Grid)

Konten utama (`main`) dibatasi lebar dengan `max-width: 1000px` dan `margin: 2rem auto` untuk sentrisasi. Setiap `section` diberi styling dengan `background-color: #fff`, `padding: 1.5rem`, `border-radius: 0.5rem`, dan `box-shadow` untuk efek kartu. Bagian kedua (`section:nth-of-type(2)`) menggunakan **CSS Grid** dengan `grid-template-columns: repeat(4, 1fr)` untuk menampilkan 4 kartu statistik berdampingan.

### 6. Kartu Statistik dengan CSS Grid

Bagian ringkasan pada halaman beranda ditampilkan sebagai 4 kartu statistik menggunakan CSS Grid. Setiap `article` di dalam section kedua berisi judul (misalnya "Total Buku", "Total Anggota", "Sedang Dipinjam", "Statistik") dan nilai numerik. Kartu diberi `background-color: #eef4fa`, `border-radius: 8px`, dan `text-align: center` untuk tampilan yang bersih. Nilai numerik ditampilkan dengan ukuran font `1.8rem` dan warna `#8E7CD8`.

### 7. Styling Tabel

Tabel pada halaman daftar buku dan daftar anggota diberi styling profesional. `thead` menggunakan `background-color: #8E7CD8` dengan teks putih, sedangkan `tbody tr:nth-child(even)` diberi `background-color: #f7f9fb` untuk efek **zebra striping**. Efek `hover` pada baris tabel mengubah background ke `#eef4fa`. Tombol aksi (Edit, Detail, Hapus) diberi warna berbeda: kuning (`#f0ad4e`) untuk edit dan merah (`#d9534f`) untuk hapus.

### 8. Styling Form

Form pada halaman tambah buku dan tambah anggota diberi styling yang konsisten. Setiap `label` ditampilkan sebagai block dengan `font-weight: 600` dan `margin-bottom: 0.35rem`. Input, select, dan textarea menggunakan `width: 100%; max-width: 400px`, `padding: 0.55rem`, dan `border: 1px solid #cdd4da`. Tombol submit diberi warna merah muda (`#f03c69`) yang berubah menjadi biru tua (`#164869`) saat hover.

### 9. Footer

Footer pada setiap halaman diberi styling dengan `text-align: center`, `padding: 1.25rem`, dan warna teks abu-abu (`#7a8794`). Footer berisi hak cipta dan informasi versi proyek.

### 10. Latihan Tambahan

Pada fase ini dilakukan penyesuaian visual melalui latihan tambahan: **mengubah skema warna** pada body dan elemen dasar, **menambahkan kolom keempat** pada tabel (misalnya kolom untuk detail), dan **membuat tombol ketiga** dengan warna berbeda. Perubahan ini meningkatkan variasi dan kelengkapan fitur antarmuka.

### 11. Table-Responsive & Menu Hamburger

Fitur **table-responsive** diterapkan dengan kelas `.table-responsive` yang menggunakan `overflow-x: auto` agar tabel bisa digulir secara horizontal pada layar kecil. **Menu hamburger** diimplementasikan menggunakan **Checkbox Hack** — checkbox tersembunyi (`#nav-toggle`) dikombinasikan dengan label (`nav-toggle-label`) dan aturan CSS `.nav-toggle:checked ~ nav { display: block; }`. Pada layar mobile, navigasi disembunyikan secara default dan hanya muncul ketika hamburger icon diklik.

### 12. Media Query & Breakpoint

Pendekatan **mobile-first** diterapkan secara penuh pada file `style.css`. Breakpoint yang digunakan:
- **≥ 481px**: Navigasi ditampilkan sebagai baris horizontal (hamburger hilang)
- **≥ 961px**: Grid kartu statistik berubah menjadi 2 kolom
- **≥ 1400px**: Lebar maksimum main diperluas hingga 2000px

Semua media query menggunakan `min-width` untuk memastikan gaya dasar (mobile) tetap berlaku dan ditimpa hanya saat ukuran layar memenuhi syarat.

### 13. Rangkuman & Latihan Lanjutan

Fase terakhir mencakup **pengumpulan dan ringkasan** seluruh fitur yang telah dibangun. Hasil akhir meliputi: 5 halaman HTML (beranda, daftar buku, tambah buku, daftar anggota, tambah anggota), 1 file CSS dengan lebih dari 320 baris kode, serta fitur lengkap seperti navigasi responsif, tabel responsif, form validasi, dan grid layout. Proyek ini mendemonstrasikan penguasaan konsep CSS modern termasuk Flexbox, Grid, Responsive Design, dan Mobile-First Approach.

---

## ✅ Kesimpulan

Proyek SIMPUS-Mini berhasil diimplementasikan sebagai aplikasi manajemen perpustakaan berbasis web yang **responsif** dan **mobile-first**. Seluruh proses pengerjaan dilakukan secara bertahap mulai dari fondasi CSS dasar, struktur HTML semantik, styling dengan Flexbox dan Grid, hingga fitur responsif lengkap dengan media query dan hamburger menu. Proyek ini mencerminkan pemahaman komprehensif terhadap konsep desain web modern.
