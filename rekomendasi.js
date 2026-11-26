const tahun = document.getElementById("tahun");
if (tahun) tahun.textContent = new Date().getFullYear();

const form = document.getElementById("form-rekomendasi");
const inputNama = document.getElementById("nama");
const inputRasa = document.getElementById("rasa");
const errorNama = document.getElementById("error-nama");
const errorRasa = document.getElementById("error-rasa");

function tampilkanError(input, pesanEl, pesan) {
    pesanEl.textContent = pesan;
    input.classList.add("input-error");
}

function hapusError(input, pesanEl) {
    pesanEl.textContent = "";
    input.classList.remove("input-error");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const jenis = form.elements["jenis"].value;
    const rasa = inputRasa.value;
    const catatan = document.getElementById("catatan").value.trim();

    let valid = true;

    if (nama === "") {
        tampilkanError(inputNama, errorNama, "Nama wajib diisi.");
        valid = false;
    } else {
        hapusError(inputNama, errorNama);
    }

    if (rasa === "") {
        tampilkanError(inputRasa, errorRasa, "Silakan pilih rasa favorit.");
        valid = false;
    } else {
        hapusError(inputRasa, errorRasa);
    }

    if (!valid) return;

    const params = new URLSearchParams({ nama, jenis, rasa, catatan });
    window.location.href = "hasil.html?" + params.toString();
});

inputNama.addEventListener("input", () => hapusError(inputNama, errorNama));
inputRasa.addEventListener("change", () => hapusError(inputRasa, errorRasa));