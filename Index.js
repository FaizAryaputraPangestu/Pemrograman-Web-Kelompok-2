const tahun = document.getElementById('tahun');
if (tahun) {
    tahun.textContent = new Date().getFullYear();
}

const keAtas = document.getElementById('ke-atas');
if (keAtas) {
    const cekScroll = () => {
        keAtas.classList.toggle('tampil', window.scrollY > 300);
    };

    window.addEventListener('scroll', cekScroll);
    keAtas.addEventListener('click', () => window.scrollTo({ top: 0 }));
    cekScroll();
}