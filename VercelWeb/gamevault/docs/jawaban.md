# Jawaban Soal Jobsheet 6 — GameVault

Sub-CPMK: Menerapkan komunikasi asinkron (AJAX/fetch, JSON).

Studi kasus SIMPUS-Mini direkreasi menjadi **GameVault** dengan entitas **Game** dan **Review**. Seluruh langkah praktikum diterapkan pada dua entitas tersebut.

---

## 1. Membuat Berkas Data JSON

**Langkah praktikum:** buat `data/buku.json` berisi array 10 objek.

**Penerapan:** dibuat dua berkas data.

### `data/game.json` — 10 objek

```json
[
    { "id": 1, "judul": "Genshin Impact", "genre": "RPG", "platform": "PC", "tahun": 2020, "rating": 4.5, "developer": "HoYoverse", "deskripsi": "Open-world action RPG dengan sistem elemental." },
    { "id": 2, "judul": "Valorant", "genre": "FPS", "platform": "PC", "tahun": 2020, "rating": 4.0, "developer": "Riot Games", "deskripsi": "Tactical shooter 5v5 dengan agent berabilitas unik." }
]
```

Ringkasan: 10 objek dengan field `id`, `judul`, `genre`, `platform`, `tahun`, `rating`, `developer`, `deskripsi`.

### `data/review.json` — 5 objek

```json
[
    { "id": 1, "gameId": 4, "penulis": "Zhaya", "rating": 5, "komentar": "Bosnya susah tapi puas saat akhirnya menang.", "tanggal": "2026-01-12" }
]
```

Field `gameId` mengacu pada `id` di `data/game.json` sehingga review terhubung ke game.

---

## 2. Mengosongkan `<tbody>` dan Render Dinamis via `fetch`

**Langkah praktikum:** kosongkan `<tbody>`, isi baris tabel secara dinamis via `fetch(...)` → `.json()` → render dengan loop dan `createElement`/`innerHTML`.

**Penerapan:** pada `game/list.html` dan `review/list.html`, elemen `<tbody>` sengaja dikosongkan:

```html
<table id="tabel-game">
    <thead>
        <tr>
            <th>Judul</th>
            <th>Genre</th>
            <th>Platform</th>
            <th>Tahun</th>
            <th>Rating</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

Baris diisi oleh `muatDaftarGame()` di `assets/js/game.js`:

```js
const res = await fetch("../data/game.json");
if (!res.ok) {
    throw new Error("Gagal mengambil data (status " + res.status + ")");
}
const dariJson = await res.json();
```

Setiap baris dibangun dengan `createElement` dan `appendChild`, bukan `innerHTML` tunggal, agar data atribut (`data-id`, `data-genre`) dapat dipasang dengan aman:

```js
daftarGame.forEach(function (game) {
    const tr = document.createElement("tr");
    tr.dataset.id = game.id;
    tr.dataset.genre = game.genre;

    tr.innerHTML =
        "<td>" + teksAman(game.judul) + "</td>" +
        '<td><span class="badge">' + teksAman(game.genre) + "</span></td>" +
        // ...
    tbody.appendChild(tr);
});
```

**Bukti tidak ada hardcode di HTML:** tidak satu pun judul game tertulis di berkas HTML. Menghapus atau menambah entri pada berkas JSON langsung mengubah isi tabel.

---

## 3. Loading Indicator

**Langkah praktikum:** tambahkan loading indicator yang tampil selama proses fetch, gunakan `setTimeout` untuk simulasi delay jaringan.

**Penerapan:** elemen penanda ditambahkan di atas tabel pada `game/list.html` dan `review/list.html`:

```html
<p id="loading-indicator" style="display:none;">Memuat data...</p>
```

Indikator dinyalakan sebelum fetch, diberi jeda simulasi 600 ms, lalu dimatikan di blok `finally`:

```js
if (loading) loading.style.display = "block";
tbody.innerHTML = "";

try {
    await new Promise(function (resolve) {
        setTimeout(resolve, 600);
    });

    // fetch dan render
} finally {
    if (loading) loading.style.display = "none";
    updateCounter();
}
```

Blok `finally` dipakai agar indikator tetap dimatikan baik fetch berhasil maupun gagal.

---

## 4. Penanganan Error

**Langkah praktikum:** tangani error dengan `catch`, tampilkan pesan "Gagal memuat data" bila fetch gagal, uji dengan salah ketik nama berkas.

**Penerapan:** selain `catch`, status respons juga diperiksa secara eksplisit:

```js
const res = await fetch("../data/game.json");
if (!res.ok) {
    throw new Error("Gagal mengambil data (status " + res.status + ")");
}
```

Pesan kesalahan ditampilkan dalam satu baris tabel dengan `colspan` agar struktur tabel tetap utuh:

```js
} catch (err) {
    tbody.innerHTML =
        '<tr><td colspan="' + KOLOM_TABEL_GAME + '">Gagal memuat data: ' +
        teksAman(err.message) + "</td></tr>";
}
```

**Cara menguji:** ubah sementara `"../data/game.json"` menjadi `"../data/game-salah.json"`, muat ulang halaman, dan tabel akan menampilkan pesan kesalahan berisi status 404.

---

## 5. Pola `async/await`

**Langkah praktikum:** terapkan pola `async/await` sebagai alternatif `.then()` pada salah satu fungsi.

**Penerapan:** seluruh fungsi pengambilan data memakai `async/await`, bukan `.then()`. Empat fungsi utama:

| Fungsi | Berkas |
| :--- | :--- |
| `muatDaftarGame()` | `assets/js/game.js` |
| `initSimpanGame()` | `assets/js/game.js` |
| `muatDaftarReview()` | `assets/js/review.js` |
| `initIsiDropdownGame()` | `assets/js/review.js` |

Contoh pada `assets/js/review.js`:

```js
async function ambilDaftarGame() {
    let daftar = ambilLokal(KEY_GAMES);
    if (daftar) return daftar;

    const res = await fetch("../data/game.json");
    daftar = await res.json();
    simpanLokal(KEY_GAMES, daftar);
    return daftar;
}
```

---

## 6. Tugas Mandiri — Entitas Kedua

**Tugas mandiri:** buat `data/anggota.json` dan terapkan pola fetch yang sama pada halaman Daftar Anggota.

**Penerapan:** tugas mandiri dikerjakan untuk entitas **Review**.

- `data/review.json` berisi 5 objek review dengan relasi `gameId` ke data game.
- `assets/js/review.js` menerapkan pola yang sama: `renderTabelReview()`, `muatDaftarReview()` dengan `async/await`, loading indicator, dan `try/catch/finally`.
- Ditambahkan `cariJudulGame()` agar kolom "Game" menampilkan **judul** hasil relasi, bukan angka `gameId`:

```js
function cariJudulGame(daftarGame, gameId) {
    const game = daftarGame.find(function (item) {
        return item.id === Number(gameId);
    });
    return game ? game.judul : "Game #" + gameId;
}
```

- Ditambahkan `formatTanggal()` agar tanggal ISO `2026-01-12` tampil sebagai `12/01/2026`.

---

## 7. Pengembangan Lanjutan (di luar langkah wajib)

Pola fetch dari Jobsheet 6 dipakai ulang sebagai fondasi penyimpanan data:

1. **`localStorage`** — hasil fetch disalin ke `localStorage` melalui `simpanLokal()`, sehingga penambahan dan penghapusan data tetap ada setelah halaman dimuat ulang. Fungsi `ambilAwal(key, url)` membaca dari `localStorage` lebih dulu, dan hanya membaca JSON bila penyimpanan masih kosong.
2. **Event delegation** — `initHapusConfirm()` di `app.js` memakai satu listener di `document` karena tombol Hapus berada pada baris yang dibuat setelah halaman selesai dimuat.
3. **Modal detail** — menampilkan informasi lengkap game atau review.
4. **Mode edit** — `game/tambah.html` membaca parameter `?id=` untuk mengisi form dengan data lama dan memperbarui entri, bukan menambah baru.
5. **Ringkasan dinamis** — `initRingkasan()` menghitung total game, total review, jumlah genre unik, dan rata-rata rating langsung dari data.
6. **`teksAman()`** — mengubah `&`, `<`, `>` menjadi entitas HTML sebelum data pengguna disisipkan dengan `innerHTML`.

---

## 8. Cara Menjalankan dan Kriteria Penilaian

**Cara menjalankan:** `fetch()` diblokir kebijakan CORS bila halaman dibuka melalui `file://`. Jalankan server lokal:

```bash
cd gamevault
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000/`.

**Pemenuhan kriteria penilaian:**

| Kriteria | Status | Bukti |
| :--- | :--- | :--- |
| Data tampil dari JSON tanpa hardcode di HTML | Terpenuhi | `<tbody>` kosong; 10 game dan 5 review dirender oleh `game.js` dan `review.js` |
| Penanganan loading ada | Terpenuhi | `#loading-indicator` pada dua halaman daftar, dimatikan di blok `finally` |
| Penanganan error ada | Terpenuhi | `try/catch` + pemeriksaan `res.ok`, pesan tampil dalam baris `colspan` |
| `async/await` minimal di satu tempat | Terpenuhi | Dipakai di seluruh fungsi pengambilan data (`muatDaftarGame`, `muatDaftarReview`, `ambilAwal`, dan lainnya) |
| Tugas mandiri entitas kedua | Terpenuhi | `data/review.json` + `assets/js/review.js` dengan relasi ke data game |

**Hasil pengujian:** seluruh skenario berhasil — data tampil dari JSON, indikator loading muncul lalu hilang, pesan kesalahan tampil saat nama berkas salah, dan tidak ada error pada console browser.
