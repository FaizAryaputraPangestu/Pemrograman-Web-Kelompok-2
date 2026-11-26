const form = document.getElementById('form-pemesanan');
const bagianForm = document.getElementById('bagian-form');
const bagianHasil = document.getElementById('bagian-hasil');
const pilihMenu = document.getElementById('menu');
const inputAlamat = document.getElementById('alamat');

function isi(id, teks) {
    document.getElementById(id).textContent = teks;
}

function aturAlamat() {
    const diantar = form.elements['metode'].value === 'Diantar';
    inputAlamat.disabled = !diantar;
    inputAlamat.required = diantar;
    inputAlamat.placeholder = diantar ? 'Isi alamat lengkap pengantaran' : 'Tidak perlu diisi untuk ambil sendiri';
    if (!diantar) inputAlamat.value = '';
}

form.querySelectorAll('input[name="metode"]').forEach((radio) => {
    radio.addEventListener('change', aturAlamat);
});

function pilihMenuDariUrl() {
    const menu = new URLSearchParams(window.location.search).get('menu');
    const ada = Array.from(pilihMenu.options).some((o) => o.value === menu);
    if (menu && ada) pilihMenu.value = menu;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nama = data.get('nama').trim();
    const metode = data.get('metode');
    const alamat = (data.get('alamat') || '').trim(); 
    const catatan = data.get('catatan').trim();

    isi('hasil-sapaan', nama);
    isi('hasil-nama', nama);
    isi('hasil-hp', data.get('hp'));
    isi('hasil-menu', data.get('menu'));
    isi('hasil-jumlah', data.get('jumlah'));
    isi('hasil-metode', metode);
    isi('hasil-alamat', metode === 'Diantar' ? (alamat || '-') : '-');
    isi('hasil-catatan', catatan || '-');

    bagianForm.hidden = true;
    bagianHasil.hidden = false;
    window.scrollTo({ top: 0 });
});

document.getElementById('pesan-lagi').addEventListener('click', () => {
    form.reset();
    aturAlamat();
    bagianHasil.hidden = true;
    bagianForm.hidden = false;
    window.scrollTo({ top: 0 });
});

aturAlamat();
pilihMenuDariUrl();