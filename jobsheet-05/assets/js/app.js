function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td").textContent : "data ini";
            if (row && confirm('Yakin ingin menghapus "' + nama + '"?')) {
                row.remove();
                updateCounter();
            }
        });
    });
}

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

    const satuan = document.title.includes("Buku") ? "buku" : "anggota";
    info.textContent = "Menampilkan " + tampil + " dari " + rows.length + " " + satuan;
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    updateCounter();

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        table.querySelectorAll("tbody tr").forEach(function (row) {
            const judul = row.querySelector("td").textContent.toLowerCase();
            row.style.display = judul.includes(keyword) ? "" : "none";
        });
        updateCounter();
    });
}

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
        selector: "[name='judul'], [name='nama']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Field ini wajib diisi."
    },
    {
        selector: "[name='pengarang']",
        cek: function (nilai) { return nilai.trim() !== ""; },
        pesan: "Pengarang wajib diisi."
    },
    {
        selector: "[name='tahun']",
        cek: function (nilai) {
            const angka = parseInt(nilai, 10);
            return !isNaN(angka) && angka >= 1900 && angka <= 2026;
        },
        pesan: "Tahun harus di antara 1900-2026."
    },
    {
        selector: "[name='stok']",
        cek: function (nilai) {
            const angka = parseInt(nilai, 10);
            return !isNaN(angka) && angka >= 0;
        },
        pesan: "Stok tidak boleh negatif."
    },
    {
        selector: "[name='isbn']",
        cek: function (nilai) {
            return nilai.trim() === "" || /^[0-9-]+$/.test(nilai.trim());
        },
        pesan: "ISBN hanya boleh berisi angka dan tanda hubung."
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

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
