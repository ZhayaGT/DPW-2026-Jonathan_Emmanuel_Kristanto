# Jawaban Soal Jobsheet 4

## 1. Wireframe ASCII — "Registrasi Anggota Baru" (Konvensi Bab 2 §2.2)

Berikut wireframe halaman **Registrasi Anggota Baru** untuk aktor **Tamu** yang ingin menjadi anggota perpustakaan.

```
┌──────────────────────────────────────────────────────────────┐
│  SIMPUS-Mini           │  Beranda  │  Daftar Buku  │  Login │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           📋 FORMULIR REGISTRASI ANGGOTA BARU        │    │
│  │  ──────────────────────────────────────────────────  │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Nama          : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  No. Anggota   : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Alamat        : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  No. HP        : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Email         : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Password      : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │  Konfirmasi    : [______________________]    │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │           [  Simpan  ]          [  Batal  ]          │    │
│  │                                                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Sudah jadi anggota?  │  Login di sini                      │
├──────────────────────────────────────────────────────────────┤
│  &copy; 2026 SIMPUS-Mini                                     │
└──────────────────────────────────────────────────────────────┘
```

**Keterangan wireframe:**
- **Aktor utama**: Tamu (belum memiliki akun anggota)
- **Tujuan**: Mengisi formulir untuk mendaftarkan diri sebagai anggota perpustakaan
- **Field yang dibutuhkan**: Nama, No. Anggota, Alamat, No. HP, Email, Password, Konfirmasi Password
- **Tombol**: Simpan (mengirim data), Batal (mengosongkan form)
- **Link alternatif**: Sudah jadi anggota → login

---

## 2. User Flow Baru — "Petugas Mencari Anggota yang Tunggakannya Sudah Lewat Jatuh Tempo"

```
┌─────────────────┐
│   PETUGAS       │
│  (Login sebagai │
│   Petugas)      │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Buka Halaman   │
│  "Data Anggota" │
│  atau "Cari     │
│  Anggota"       │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Input Kriteria │
│  Pencarian:     │
│  • Nama         │
│  • No. Anggota  │
│  • Status       │
│    (Tunggakan)  │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Klik "Cari"    │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Sistem Menampilkan│
│  Hasil Pencarian │
│  ┌─────────────┐ │
│  │ Daftar anggota│
│  │ yang         │ │
│  │ tunggakan    │ │
│  │ melebihi     │ │
│  │ tanggal      │ │
│  │ jatuh tempo │ │
│  └─────────────┘ │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Petugas        │
│  Melihat        │
│  Detail Anggota │
│  (nama, no.     │
│   anggota,      │
│   jumlah        │
│   tunggakan,    │
│   tanggal       │
│   jatuh tempo)  │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Petugas        │
│  Mengambil      │
│  Tindakan:      │
│  • Cetak        │
│    laporan      │
│  • Kirim        │
│    notifikasi   │
│  • Blokir       │
│    akses        │
│    peminjaman   │
└───────┬─────────┘
        │
        ▼
┌─────────────────┐
│  Selesai        │
│  / Kembali ke   │
│  Beranda        │
└─────────────────┘
```

**Deskripsi Alur:**
1. Petugas login ke sistem dengan akun Petugas
2. Navigasi ke halaman data anggota atau halaman pencarian khusus
3. Input kriteria pencarian (nama, nomor anggota, filter status tunggakan)
4. Klik tombol "Cari" — sistem menampilkan daftar anggota yang tunggakannya sudah lewat jatuh tempo
5. Petugas melihat detail setiap anggota yang ditemukan
6. Petugas mengambil tindakan: mencetak laporan, mengirim notifikasi, atau memblokir akses peminjaman

---