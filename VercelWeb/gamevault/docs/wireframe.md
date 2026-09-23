# Wireframe & User Flow — GameVault

Sub-CPMK: Merancang UI/UX aplikasi (proyek).

Halaman yang sudah ada (Beranda, Daftar/Tambah Game, Daftar/Tambah Review — Jobsheet 1-6) belum mencakup fitur Login, Dashboard Pemilik, dan pencatatan progres bermain. Dokumen ini merancang wireframe untuk halaman-halaman tersebut sebelum diimplementasikan pada jobsheet berikutnya.

## Aktor

- **Pengunjung** — hanya dapat melihat katalog game dan membaca review tanpa login.
- **Pemilik** — login untuk mengakses seluruh fitur tambah, edit, hapus, dan mencatat progres bermain.

## User Flow — Menandai Game Sedang Dimainkan

```
[Pemilik Login] -> [Dashboard] -> [Pilih menu "Mulai Mainkan"]
        -> [Pilih Game (belum selesai)]
        -> [Simpan] -> [Status game menjadi "Dimainkan"] -> [Kembali ke Dashboard]
```

## User Flow — Menandai Game Selesai

```
[Dashboard] -> [Menu "Selesai Dimainkan"] -> [Cari entri aktif (judul game)]
        -> [Isi tanggal selesai + jam bermain]
        -> [Tandai "Selesai"] -> [Status game menjadi "Tamat"]
        -> [Tawaran menulis review] -> [Kembali ke Dashboard]
```

## Wireframe: Halaman Login

```
+--------------------------------------+
|              GameVault               |
|--------------------------------------|
|                                      |
|          [ Login Pemilik ]           |
|                                      |
|   Username : [______________]        |
|   Password : [______________]        |
|                                      |
|          [   Masuk   ]               |
|                                      |
|   Belum punya akun? Daftar di sini   |
+--------------------------------------+
```

## Wireframe: Dashboard Pemilik

```
+---------------------------------------------------------+
| GameVault    Beranda | Game | Review | Progres | (Logout) |
|-----------------------------------------------------------|
|  [Total Game]   [Total Review]   [Sedang Dimainkan]       |
|                                                           |
|  Aksi Cepat:                                              |
|  [ + Game Baru ]   [ + Review Baru ]   [ + Mulai Mainkan ]|
|                                                           |
|  Aktivitas Terbaru                                        |
|  ----------------------------------------------------     |
|  Game | Status | Tgl Mulai | Jam Bermain                  |
+---------------------------------------------------------+
```

## Wireframe: Form Mulai Mainkan

```
+--------------------------------------+
|  Mulai Mainkan Game                  |
|--------------------------------------|
|  Game    : [ dropdown, status belum ]|
|  Platform: [ dropdown platform ]     |
|  Tanggal : [ auto: hari ini ]        |
|                                      |
|          [  Simpan  ]                |
+--------------------------------------+
```

## Wireframe: Form Selesai Dimainkan

```
+--------------------------------------+
|  Selesai Dimainkan                   |
|--------------------------------------|
|  Cari entri aktif:                   |
|  [ judul game ____________________ ] |
|                                      |
|  Jam Bermain : [______] jam          |
|  Tanggal     : [ auto: hari ini ]    |
|                                      |
|  Game | Mulai | Jam | [Tandai Selesai]|
+--------------------------------------+
```

## Wireframe: Riwayat Review per Game

```
+--------------------------------------+
|  Riwayat Review — Elden Ring         |
|--------------------------------------|
|  Penulis  | Rating | Tanggal         |
|  Zhaya    | 5.0    | 12/01/2026      |
|  Bagas    | 4.0    | 18/02/2026      |
+--------------------------------------+
```

## Konsistensi dengan Desain yang Sudah Berjalan

- Warna aksen ungu (`--accent #8B5CF6`), tipografi Poppins, dan gaya tabel serta kartu mengikuti `assets/css/style.css` yang sudah dibangun sejak Jobsheet 2-3.
- Navbar akan ditambah menu **Progres** dan indikator status login (nama pemilik / tombol Logout) pada tahap implementasi.
- Kelas CSS yang sudah tersedia dan dapat dipakai ulang: `.kontrol`, `.table-responsive`, `.badge`, `.bintang`, `.modal`, `.form-grup`, `.btn-utama`, `.btn-tutup`.
- Edge case yang perlu ditangani saat implementasi:
  - Game yang sudah berstatus "Tamat" tidak boleh dipilih lagi pada form Mulai Mainkan.
  - Review hanya boleh dibuat untuk game yang sudah ada, dan `gameId` wajib valid.
  - Pengunjung yang belum login tidak boleh melihat tombol Edit dan Hapus.
