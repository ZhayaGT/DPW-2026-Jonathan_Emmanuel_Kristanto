// app.js — interaktivitas bersama semua halaman GameVault

function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
});
