const KOLOM_TABEL_GAME = 6;

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

async function initSimpanGame() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    const idEdit = new URLSearchParams(window.location.search).get("id");
    let daftar = ambilLokal(KEY_GAMES);

    if (!daftar) {
        const res = await fetch("../data/game.json");
        daftar = await res.json();
    }

    if (idEdit) {
        const game = daftar.find(function (item) {
            return item.id === Number(idEdit);
        });

        if (game) {
            form.judul.value = game.judul;
            form.developer.value = game.developer;
            form.genre.value = game.genre;
            form.platform.value = game.platform;
            form.tahun.value = game.tahun;
            form.rating.value = game.rating;
            form.deskripsi.value = game.deskripsi;

            const h2 = document.getElementById("judul-halaman");
            if (h2) h2.textContent = "Edit Game";
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (form.querySelector(".error")) return;

        const dataBaru = {
            judul: form.judul.value.trim(),
            developer: form.developer.value.trim(),
            genre: form.genre.value,
            platform: form.platform.value,
            tahun: parseInt(form.tahun.value, 10),
            rating: parseFloat(form.rating.value),
            deskripsi: form.deskripsi.value.trim()
        };

        if (idEdit) {
            const posisi = daftar.findIndex(function (item) {
                return item.id === Number(idEdit);
            });
            if (posisi !== -1) {
                daftar[posisi] = Object.assign({ id: Number(idEdit) }, dataBaru);
            }
        } else {
            daftar.push(Object.assign({ id: buatId(daftar) }, dataBaru));
        }

        simpanLokal(KEY_GAMES, daftar);
        window.location.href = "list.html";
    });
}

function initEditGame() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-edit");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;

        window.location.href = "tambah.html?id=" + row.dataset.id;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    muatDaftarGame();
    initModalDetailGame();
    initHapusGame();
    initSimpanGame();
    initEditGame();
});
