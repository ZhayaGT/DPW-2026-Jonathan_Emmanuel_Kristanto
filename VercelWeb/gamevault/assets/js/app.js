function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

/* ===== 2. Konfirmasi Hapus ===== */
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;

        const nama = row.cells[0].textContent.trim();
        const yakin = confirm('Yakin ingin menghapus "' + nama + '"?');
        if (!yakin) return;

        const id = row.dataset.id;
        row.remove();

        document.dispatchEvent(new CustomEvent("gamevault:hapus", {
            detail: { id: id }
        }));

        updateCounter();
    });
}

/* ===== 3. Counter Baris ===== */
function updateCounter() {
    const table = document.querySelector(".table-responsive table");
    if (!table) return;

    let info = document.getElementById("info-baris");
    if (!info) {
        info = document.createElement("p");
        info.id = "info-baris";
        info.className = "info-baris";
        table.closest(".table-responsive").insertAdjacentElement("beforebegin", info);
    }

    const rows = table.querySelectorAll("tbody tr");
    let tampil = 0;
    rows.forEach(function (row) {
        if (row.style.display !== "none") tampil++;
    });

    const satuan = table.id === "tabel-game" ? "game" : "review";
    info.textContent = "Menampilkan " + tampil + " dari " + rows.length + " " + satuan;
}

/* ===== 4. Filter Tabel Real-Time ===== */
function initTableFilter() {
    const input = document.getElementById("cari-game") || document.getElementById("cari-review");
    const genre = document.getElementById("filter-genre");
    const table = document.querySelector(".table-responsive table");
    if (!table) return;

    updateCounter();

    function jalankanFilter() {
        const keyword = input ? input.value.toLowerCase() : "";
        const pilihGenre = genre ? genre.value : "";

        table.querySelectorAll("tbody tr").forEach(function (row) {
            const judul = row.cells[0].textContent.toLowerCase();
            const rowGenre = row.dataset.genre || "";
            const cocokJudul = judul.includes(keyword);
            const cocokGenre = pilihGenre === "" || rowGenre === pilihGenre;
            row.style.display = cocokJudul && cocokGenre ? "" : "none";
        });

        updateCounter();
    }

    if (input) input.addEventListener("keyup", jalankanFilter);
    if (genre) genre.addEventListener("change", jalankanFilter);
}

/* ===== 5. Validasi Form ===== */
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

const aturanValidasi = [
    {
        selector: "[name='judul']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Judul game wajib diisi."
    },
    {
        selector: "[name='developer']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Developer wajib diisi."
    },
    {
        selector: "[name='genre']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Genre wajib dipilih."
    },
    {
        selector: "[name='platform']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Platform wajib dipilih."
    },
    {
        selector: "[name='tahun']",
        cek: function (nilai) {
            const angka = parseInt(nilai, 10);
            return !isNaN(angka) && angka >= 1990 && angka <= 2026;
        },
        pesan: "Tahun harus di antara 1990-2026."
    },
    {
        selector: "[name='rating']",
        cek: function (nilai) {
            const angka = parseFloat(nilai);
            return !isNaN(angka) && angka >= 1 && angka <= 5;
        },
        pesan: "Rating harus di antara 1 sampai 5."
    },
    {
        selector: "[name='penulis']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Nama penulis wajib diisi."
    },
    {
        selector: "[name='gameId']",
        cek: function (nilai) { return nilai !== ""; },
        pesan: "Pilih game yang direview."
    },
    {
        selector: "[name='komentar']",
        cek: function (nilai) { return nilai.trim().length >= 5; },
        pesan: "Komentar minimal 5 karakter."
    }
];

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        aturanValidasi.forEach(function (item) {
            const input = form.querySelector(item.selector);
            if (!input) return;

            if (item.cek(input.value)) {
                hapusError(input);
            } else {
                tampilkanError(input, item.pesan);
                valid = false;
            }
        });

        if (!valid) e.preventDefault();
    });
}

/* ===== Inisialisasi Terpusat ===== */
/* ===== 6. Ringkasan Beranda ===== */
async function initRingkasan() {
    const kotakGame = document.getElementById("total-game");
    if (!kotakGame) return;

    let daftarGame;
    let daftarReview;

    try {
        daftarGame = await ambilAwal(KEY_GAMES, "data/game.json");
        daftarReview = await ambilAwal(KEY_REVIEWS, "data/review.json");
    } catch (err) {
        // Biarkan angka statis di HTML kalau data belum bisa dibaca.
        console.error("Gagal memuat ringkasan:", err);
        return;
    }

    const genreUnik = [];
    daftarGame.forEach(function (game) {
        if (game.genre && genreUnik.indexOf(game.genre) === -1) {
            genreUnik.push(game.genre);
        }
    });

    let jumlahRating = 0;
    daftarGame.forEach(function (game) {
        jumlahRating += Number(game.rating) || 0;
    });
    const rataRata = daftarGame.length
        ? (jumlahRating / daftarGame.length).toFixed(1)
        : "0.0";

    kotakGame.textContent = daftarGame.length;
    document.getElementById("total-review").textContent = daftarReview.length;
    document.getElementById("total-genre").textContent = genreUnik.length;
    document.getElementById("rating-rata").textContent = rataRata;
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
    initRingkasan();
});