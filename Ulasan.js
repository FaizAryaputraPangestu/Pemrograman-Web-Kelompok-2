const form = document.getElementById('form-ulasan');
const bagianForm = document.getElementById('bagian-form');
const bagianHasil = document.getElementById('bagian-hasil');
const inputUlasan = document.getElementById('ulasan');

function isi(id, teks) {
    document.getElementById(id).textContent = teks;
}

inputUlasan.addEventListener('input', () => {
    const terlaluPendek = inputUlasan.value.trim().length < 10;
    inputUlasan.setCustomValidity(terlaluPendek ? 'Ulasan minimal 10 karakter.' : '');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nama = data.get('nama').trim();
    const rating = Number(data.get('rating'));
    const saran = data.get('saran').trim();

    isi('hasil-sapaan', nama);
    isi('hasil-nama', nama);
    isi('hasil-menu', data.get('menu'));
    isi('hasil-rating', '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating) + '  (' + rating + ' dari 5)');
    isi('hasil-ulasan', data.get('ulasan').trim());
    isi('hasil-saran', saran || '-');

    bagianForm.hidden = true;
    bagianHasil.hidden = false;
    window.scrollTo({ top: 0 });
});

document.getElementById('ulas-lagi').addEventListener('click', () => {
    form.reset();
    inputUlasan.setCustomValidity('');
    bagianHasil.hidden = true;
    bagianForm.hidden = false;
    window.scrollTo({ top: 0 });
});