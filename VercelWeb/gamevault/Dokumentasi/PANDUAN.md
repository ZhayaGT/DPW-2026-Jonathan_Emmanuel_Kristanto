# 📘 Dokumentasi GameVault

Panduan teknis proyek **GameVault** — aplikasi koleksi dan review game pribadi.

## 👤 Identitas Mahasiswa

| Keterangan | Detail |
| :--- | :--- |
| **Nama** | Jonathan Emmanuel Kristanto |
| **Kelas** | 2F/TI |
| **Absen** | 20 |

## 📂 Struktur Proyek

```
gamevault/
├── index.html              # Beranda + ringkasan statistik dinamis
├── assets/
│   ├── css/
│   │   └── style.css       # Tema gelap ungu, mobile-first, responsive
│   └── js/
│       ├── app.js          # Perilaku bersama semua halaman
│       ├── data.js         # Lapisan penyimpanan localStorage + helper tampilan
│       ├── game.js         # Logika halaman game
│       └── review.js       # Logika halaman review
├── data/
│   ├── game.json           # Data awal 10 game
│   └── review.json         # Data awal 5 review
├── game/
│   ├── list.html           # Tabel daftar game
│   └── tambah.html         # Form tambah & edit game
├── review/
│   ├── list.html           # Tabel daftar review
│   └── tambah.html         # Form tambah review
├── docs/
│   ├── wireframe.md        # Rancangan fitur lanjutan
│   └── jawaban.md          # Jawaban soal jobsheet
├── Infografis.png          # Infografis proyek
├── Dokumentasi/
│   └── PANDUAN.md          # Dokumentasi ini
└── README.md               # Laporan pengerjaan
```

## 🧭 Penjelasan Folder

- **`index.html`** — Halaman beranda dengan hero dan empat kartu ringkasan (total game, total review, jumlah genre, rata-rata rating) yang dihitung langsung dari data.
- **`assets/css/`** — Stylesheet tunggal berisi variabel warna, gaya komponen, dan media query.
- **`assets/js/`** — Empat berkas JavaScript dengan pembagian tugas yang jelas (lihat tabel di bawah).
- **`data/`** — Data awal dalam format JSON. Dibaca sekali oleh `fetch()`, lalu disalin ke `localStorage`.
- **`game/`** — Halaman pengelolaan data game.
- **`review/`** — Halaman pengelolaan data review.
- **`docs/`** — Rancangan fitur lanjutan dan jawaban soal.
- **`Dokumentasi/`** — Dokumentasi teknis proyek.

## 🗄️ Sumber Data

| Sumber | Isi | Kapan dipakai |
| :--- | :--- | :--- |
| `data/game.json` | 10 game: `id`, `judul`, `genre`, `platform`, `tahun`, `rating`, `developer`, `deskripsi` | Saat pertama kali dibuka |
| `data/review.json` | 5 review: `id`, `gameId`, `penulis`, `rating`, `komentar`, `tanggal` | Saat pertama kali dibuka |
| `localStorage` kunci `gamevault.games` | Salinan data game | Setelah data awal dibaca, dan setiap kali ada perubahan |
| `localStorage` kunci `gamevault.reviews` | Salinan data review | Setelah data awal dibaca, dan setiap kali ada perubahan |

`gameId` pada review mengacu pada `id` pada data game, sehingga kolom "Game" dapat menampilkan judul.

## ⚡ Fungsi JavaScript

### `assets/js/data.js` — penyimpanan dan helper

| Fungsi | Kegunaan |
| :--- | :--- |
| `ambilLokal(key)` | Membaca dan mengubah JSON dari localStorage; mengembalikan `null` bila belum ada. |
| `simpanLokal(key, data)` | Menulis data ke localStorage. |
| `buatId(daftar)` | Menghasilkan id baru dari nilai id terbesar. |
| `ambilAwal(key, url)` | Mengambil dari localStorage; bila kosong, membaca JSON lalu menyimpannya. |
| `teksAman(nilai)` | Mengubah `&`, `<`, `>` menjadi entitas HTML sebelum disisipkan dengan `innerHTML`. |
| `bintang(nilai)` | Menghasilkan markup bintang rating 1–5 beserta nilai angkanya. |

### `assets/js/app.js` — perilaku bersama

| Fungsi | Kegunaan |
| :--- | :--- |
| `initNavToggle()` | Membuka/menutup menu hamburger dengan men-toggle kelas `nav-open`. |
| `initHapusConfirm()` | Menampilkan konfirmasi, menghapus baris tabel, lalu memancarkan `CustomEvent` `gamevault:hapus`. |
| `updateCounter()` | Menampilkan "Menampilkan X dari Y game/review" di atas tabel. |
| `initTableFilter()` | Menyaring baris tabel secara real-time berdasarkan pencarian judul dan filter genre. |
| `tampilkanError(input, pesan)` | Menyisipkan `<span class="error">` setelah field. |
| `hapusError(input)` | Menghapus pesan error yang sudah ada. |
| `initValidasiForm()` | Menjalankan seluruh aturan pada array `aturanValidasi` saat form dikirim. |
| `initRingkasan()` | Menghitung total game, review, genre unik, dan rata-rata rating untuk beranda. |

### `assets/js/game.js` — halaman game

| Fungsi | Kegunaan |
| :--- | :--- |
| `renderTabelGame(daftarGame)` | Membangun baris tabel game (badge genre, bintang rating, tiga tombol aksi). |
| `muatDaftarGame()` | Mengambil data secara asinkron, menyalinnya ke localStorage, lalu merender tabel. |
| `initModalDetailGame()` | Membuka modal detail berisi informasi lengkap game. |
| `initHapusGame()` | Menghapus game dari localStorage saat event `gamevault:hapus` diterima. |
| `initSimpanGame()` | Menyimpan game baru, atau memperbarui game lama bila URL memuat `?id=`. |
| `initEditGame()` | Mengarahkan ke `tambah.html?id=...` saat tombol Edit diklik. |

### `assets/js/review.js` — halaman review

| Fungsi | Kegunaan |
| :--- | :--- |
| `formatTanggal(iso)` | Mengubah `2026-01-12` menjadi `12/01/2026`. |
| `cariJudulGame(daftarGame, gameId)` | Mencari judul game dari id, dengan cadangan "Game #id". |
| `ambilDaftarGame()` | Mengambil data game untuk keperluan tampilan dan dropdown. |
| `renderTabelReview(daftarReview, daftarGame)` | Membangun baris tabel review dengan judul game pada kolom pertama. |
| `muatDaftarReview()` | Mengambil data review secara asinkron lalu merender tabel. |
| `initModalDetailReview()` | Membuka modal detail review. |
| `initHapusReview()` | Menghapus review dari localStorage. |
| `initIsiDropdownGame()` | Mengisi dropdown pilihan game pada form tambah review. |
| `initSimpanReview()` | Menyimpan review baru dengan tanggal hari ini. |

## 🎨 Kelas CSS Penting

| Kelas | Kegunaan |
| :--- | :--- |
| `.nav-toggle-label` | Tombol hamburger; disembunyikan pada layar ≥ 481px. |
| `header nav.nav-open` | Kondisi menu terbuka pada mobile. |
| `.hero` | Bagian pembuka beranda dengan efek cahaya ungu. |
| `.ringkasan` | Grid empat kartu statistik. |
| `.kontrol` | Baris pencarian, filter, dan tombol tambah. |
| `.table-responsive` | Pembungkus tabel dengan gulir horizontal. |
| `.badge` | Label genre berbentuk pil. |
| `.bintang` / `.bintang .kosong` | Bintang rating terisi dan kosong. |
| `.btn-utama` / `.btn-detail` / `.btn-edit` / `.btn-hapus` / `.btn-tutup` | Varian tombol. |
| `.info-baris` | Teks counter jumlah baris. |
| `.modal` / `.modal-aktif` | Modal tersembunyi dan kondisinya saat terbuka. |
| `.form-grup` | Pembungkus label dan field pada form. |
| `.error` | Pesan kesalahan validasi. |

## 🚀 Cara Menjalankan

Halaman **wajib** dibuka melalui server lokal, karena `fetch()` tidak diizinkan membaca berkas JSON melalui protokol `file://`.

```bash
cd gamevault
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000/` di browser.

## 🧪 Cara Menguji

| Skenario | Langkah | Hasil yang diharapkan |
| :--- | :--- | :--- |
| Validasi form | Buka Tambah Game, klik Simpan tanpa mengisi | Enam pesan error muncul, halaman tidak berpindah |
| Rentang tahun | Isi tahun `1800` | Muncul "Tahun harus di antara 1990-2026." |
| Rentang rating | Isi rating `9` | Muncul "Rating harus di antara 1 sampai 5." |
| Simpan data | Isi form dengan lengkap lalu Simpan | Kembali ke daftar, baris baru muncul, counter bertambah |
| Persistensi | Muat ulang halaman | Data hasil tambahan masih ada |
| Pencarian | Ketik sebagian judul | Hanya baris yang cocok yang tampil |
| Filter genre | Pilih salah satu genre | Hanya game bergenre tersebut yang tampil |
| Modal detail | Klik Detail pada sebuah baris | Modal muncul; Tutup dan klik area luar menutupnya |
| Hapus | Klik Hapus lalu setujui konfirmasi | Baris hilang, counter turun, tetap hilang setelah muat ulang |
| Mode edit | Klik Edit pada sebuah baris | Form terisi data lama, judul halaman menjadi "Edit Game" |
| Ringkasan | Tambah atau hapus data, lalu buka beranda | Angka kartu ringkasan ikut berubah |
| Responsif | Perkecil jendela sampai di bawah 481px | Tombol hamburger muncul dan berfungsi; tabel dapat digulir |

## ♻️ Mengembalikan Data ke Kondisi Awal

Buka Developer Tools (F12), pilih tab Console, lalu jalankan:

```js
localStorage.clear();
```

Muat ulang halaman, dan data akan kembali dibaca dari berkas JSON.
