const KOLOM_TABEL_REVIEW = 6;

function formatTanggal(iso) {
    if (!iso) return "-";
    const bagian = String(iso).split("-");
    if (bagian.length !== 3) return iso;
    return bagian[2] + "/" + bagian[1] + "/" + bagian[0];
}

function cariJudulGame(daftarGame, gameId) {
    const game = daftarGame.find(function (item) {
        return item.id === Number(gameId);
    });
    return game ? game.judul : "Game #" + gameId;
}

async function ambilDaftarGame() {
    let daftar = ambilLokal(KEY_GAMES);
    if (daftar) return daftar;

    const res = await fetch("../data/game.json");
    daftar = await res.json();
    simpanLokal(KEY_GAMES, daftar);
    return daftar;
}

function renderTabelReview(daftarReview, daftarGame) {
    const tbody = document.querySelector("#tabel-review tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    daftarReview.forEach(function (review) {
        const tr = document.createElement("tr");
        tr.dataset.id = review.id;

        tr.innerHTML =
            "<td>" + teksAman(cariJudulGame(daftarGame, review.gameId)) + "</td>" +
            "<td>" + teksAman(review.penulis) + "</td>" +
            "<td>" + bintang(review.rating) + "</td>" +
            "<td>" + teksAman(formatTanggal(review.tanggal)) + "</td>" +
            "<td>" + teksAman(review.komentar) + "</td>" +
            "<td>" +
            '<button type="button" class="btn-detail">Detail</button> ' +
            '<button type="button" class="btn-hapus">Hapus</button>' +
            "</td>";

        tbody.appendChild(tr);
    });
}

async function muatDaftarReview() {
    const tbody = document.querySelector("#tabel-review tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise(function (resolve) {
            setTimeout(resolve, 600);
        });

        const daftarGame = await ambilDaftarGame();

        const res = await fetch("../data/review.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const dariJson = await res.json();

        const tersimpan = ambilLokal(KEY_REVIEWS);
        const daftarReview = tersimpan || dariJson;

        if (!tersimpan) {
            simpanLokal(KEY_REVIEWS, daftarReview);
        }

        renderTabelReview(daftarReview, daftarGame);
    } catch (err) {
        tbody.innerHTML =
            '<tr><td colspan="' + KOLOM_TABEL_REVIEW + '">Gagal memuat data: ' +
            teksAman(err.message) + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
        updateCounter();
    }
}

function initModalDetailReview() {
    const modal = document.getElementById("modal-detail");
    const judul = document.getElementById("modal-judul");
    const body = document.getElementById("modal-body");
    const tutup = document.getElementById("modal-tutup");
    if (!modal || !body) return;

    document.addEventListener("click", async function (e) {
        const btn = e.target.closest(".btn-detail");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;

        const daftarReview = ambilLokal(KEY_REVIEWS) || [];
        const review = daftarReview.find(function (item) {
            return item.id === Number(row.dataset.id);
        });
        if (!review) return;

        const daftarGame = await ambilDaftarGame();

        if (judul) judul.textContent = "Review: " + cariJudulGame(daftarGame, review.gameId);

        body.innerHTML =
            "<dt>Game</dt><dd>" + teksAman(cariJudulGame(daftarGame, review.gameId)) + "</dd>" +
            "<dt>Penulis</dt><dd>" + teksAman(review.penulis) + "</dd>" +
            "<dt>Rating</dt><dd>" + bintang(review.rating) + "</dd>" +
            "<dt>Tanggal</dt><dd>" + teksAman(formatTanggal(review.tanggal)) + "</dd>" +
            "<dt>Komentar</dt><dd>" + teksAman(review.komentar) + "</dd>";

        modal.classList.add("modal-aktif");
    });

    if (tutup) {
        tutup.addEventListener("click", function () {
            modal.classList.remove("modal-aktif");
        });
    }

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("modal-aktif");
        }
    });
}

function initHapusReview() {
    document.addEventListener("gamevault:hapus", function (e) {
        const id = Number(e.detail.id);
        const daftar = ambilLokal(KEY_REVIEWS);
        if (!daftar) return;

        const sisa = daftar.filter(function (item) {
            return item.id !== id;
        });

        simpanLokal(KEY_REVIEWS, sisa);
    });
}

async function initIsiDropdownGame() {
    const select = document.getElementById("review-game");
    if (!select) return;

    try {
        const daftarGame = await ambilDaftarGame();

        daftarGame.forEach(function (game) {
            const opt = document.createElement("option");
            opt.value = game.id;
            opt.textContent = game.judul + " (" + game.platform + ")";
            select.appendChild(opt);
        });
    } catch (err) {
        console.error("Gagal mengisi dropdown game:", err);
    }
}

async function initSimpanReview() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (form.querySelector(".error")) return;

        let daftar = ambilLokal(KEY_REVIEWS);
        if (!daftar) {
            const res = await fetch("../data/review.json");
            daftar = await res.json();
        }

        const reviewBaru = {
            id: buatId(daftar),
            gameId: parseInt(form.gameId.value, 10),
            penulis: form.penulis.value.trim(),
            rating: parseFloat(form.rating.value),
            komentar: form.komentar.value.trim(),
            tanggal: new Date().toISOString().slice(0, 10)
        };

        daftar.push(reviewBaru);
        simpanLokal(KEY_REVIEWS, daftar);

        window.location.href = "list.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    muatDaftarReview();
    initModalDetailReview();
    initHapusReview();
    initIsiDropdownGame();
    initSimpanReview();
});