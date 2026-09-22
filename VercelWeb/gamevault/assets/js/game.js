const KOLOM_TABEL_GAME = 6;

function teksAman(nilai) {
    return String(nilai)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function bintang(nilai) {
    let isi = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(nilai)) {
            isi += "★";
        } else {
            isi += '<span class="kosong">★</span>';
        }
    }
    return '<span class="bintang">' + isi + "</span> " + Number(nilai).toFixed(1);
}

function renderTabelGame(daftarGame) {
    const tbody = document.querySelector("#tabel-game tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    daftarGame.forEach(function (game) {
        const tr = document.createElement("tr");
        tr.dataset.id = game.id;
        tr.dataset.genre = game.genre;

        tr.innerHTML =
            "<td>" + teksAman(game.judul) + "</td>" +
            '<td><span class="badge">' + teksAman(game.genre) + "</span></td>" +
            "<td>" + teksAman(game.platform) + "</td>" +
            "<td>" + teksAman(game.tahun) + "</td>" +
            "<td>" + bintang(game.rating) + "</td>" +
            "<td>" +
            '<button type="button" class="btn-detail">Detail</button> ' +
            '<button type="button" class="btn-edit">Edit</button> ' +
            '<button type="button" class="btn-hapus">Hapus</button>' +
            "</td>";

        tbody.appendChild(tr);
    });
}

async function muatDaftarGame() {
    const tbody = document.querySelector("#tabel-game tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        await new Promise(function (resolve) {
            setTimeout(resolve, 600);
        });

        const res = await fetch("../data/game.json");
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const dariJson = await res.json();

        const tersimpan = ambilLokal(KEY_GAMES);
        const daftarGame = tersimpan || dariJson;

        if (!tersimpan) {
            simpanLokal(KEY_GAMES, daftarGame);
        }

        renderTabelGame(daftarGame);
    } catch (err) {
        tbody.innerHTML =
            '<tr><td colspan="' + KOLOM_TABEL_GAME + '">Gagal memuat data: ' +
            teksAman(err.message) + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
        updateCounter();
    }
}

function initModalDetailGame() {
    const modal = document.getElementById("modal-detail");
    const judul = document.getElementById("modal-judul");
    const body = document.getElementById("modal-body");
    const tutup = document.getElementById("modal-tutup");
    if (!modal || !body) return;

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-detail");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;

        const id = Number(row.dataset.id);
        const daftar = ambilLokal(KEY_GAMES) || [];
        const game = daftar.find(function (item) {
            return item.id === id;
        });
        if (!game) return;

        if (judul) judul.textContent = game.judul;

        body.innerHTML =
            "<dt>Genre</dt><dd>" + teksAman(game.genre) + "</dd>" +
            "<dt>Platform</dt><dd>" + teksAman(game.platform) + "</dd>" +
            "<dt>Tahun</dt><dd>" + teksAman(game.tahun) + "</dd>" +
            "<dt>Rating</dt><dd>" + bintang(game.rating) + "</dd>" +
            "<dt>Developer</dt><dd>" + teksAman(game.developer) + "</dd>" +
            "<dt>Deskripsi</dt><dd>" + teksAman(game.deskripsi) + "</dd>";

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

function initHapusGame() {
    document.addEventListener("gamevault:hapus", function (e) {
        const id = Number(e.detail.id);
        const daftar = ambilLokal(KEY_GAMES);
        if (!daftar) return;

        const sisa = daftar.filter(function (item) {
            return item.id !== id;
        });

        simpanLokal(KEY_GAMES, sisa);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    muatDaftarGame();
    initModalDetailGame();
    initHapusGame();
});
