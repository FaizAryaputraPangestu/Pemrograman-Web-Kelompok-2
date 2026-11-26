const tombolFilter = document.querySelectorAll('.filter-btn');
const kartu = document.querySelectorAll('.kartu-kuliner');
const pesanKosong = document.getElementById('kosong');

tombolFilter.forEach((tombol) => {
    tombol.addEventListener('click', () => {
        const kategori = tombol.dataset.kategori;

        tombolFilter.forEach((t) => {
            const aktif = t === tombol;
            t.classList.toggle('active', aktif);
            t.setAttribute('aria-pressed', aktif);
        });

        let jumlah = 0;
        kartu.forEach((k) => {
            const tampil = kategori === 'semua' || k.dataset.kategori === kategori;
            k.hidden = !tampil;
            if (tampil) jumlah++;
        });

        pesanKosong.hidden = jumlah !== 0;
    });
});