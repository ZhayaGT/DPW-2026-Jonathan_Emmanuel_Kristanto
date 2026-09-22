const KEY_GAMES = "gamevault.games";
const KEY_REVIEWS = "gamevault.reviews";

function ambilLokal(key) {
    try {
        const teks = localStorage.getItem(key);
        return teks ? JSON.parse(teks) : null;
    } catch (err) {
        console.error("Gagal membaca localStorage:", err);
        return null;
    }
}

function simpanLokal(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Gagal menyimpan ke localStorage:", err);
    }
}

function buatId(daftar) {
    if (daftar.length === 0) return 1;
    return Math.max.apply(null, daftar.map(function (item) {
        return item.id;
    })) + 1;
}
