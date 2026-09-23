// Render tabel dari JSON, dikonfigurasi lewat data-sumber & data-kolom di <table>.
const DELAY_SIMULASI = 600;

function muatTabelData() {
    const table = document.getElementById("tabel-data");
    if (!table) return Promise.resolve();

    const sumber = table.dataset.sumber;
    const kolom = (table.dataset.kolom || "").split(",").filter(Boolean);
    const tbody = table.querySelector("tbody");
    const loading = document.getElementById("loading-indicator");
    const colspan = table.querySelectorAll("thead th").length;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    return (async function () {
        try {
            await new Promise((resolve) => setTimeout(resolve, DELAY_SIMULASI));

            const res = await fetch(sumber);
            if (!res.ok) {
                throw new Error("Gagal mengambil data (status " + res.status + ")");
            }
            const daftar = await res.json();

            daftar.forEach(function (item) {
                const tr = document.createElement("tr");
                const selData = kolom
                    .map(function (kunci) {
                        return "<td>" + item[kunci] + "</td>";
                    })
                    .join("");
                tr.innerHTML =
                    selData +
                    "<td>" +
                    "<button type=\"button\">Edit</button> " +
                    "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                    "</td>";
                tbody.appendChild(tr);
            });
        } catch (err) {
            tbody.innerHTML =
                "<tr><td colspan=\"" + colspan + "\">Gagal memuat data: " + err.message + "</td></tr>";
        } finally {
            if (loading) loading.style.display = "none";
        }
    })();
}

document.addEventListener("DOMContentLoaded", function () {
    muatTabelData();

    const btnMuatUlang = document.getElementById("btn-muat-ulang");
    if (btnMuatUlang) {
        btnMuatUlang.addEventListener("click", muatTabelData);
    }
});
