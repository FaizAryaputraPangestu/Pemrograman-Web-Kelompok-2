const dataKuliner = [
    { nama: "Ayam Taliwang", jenis: "Makanan Berat", rasa: ["Pedas", "Gurih"], deskripsi: "Ayam kampung bakar dengan sambal pedas khas Lombok yang gurih dan harum.", halaman: "Ayam_Taliwang.html" },
    { nama: "Jaje Tujak", jenis: "Camilan", rasa: ["Manis"], deskripsi: "Jajanan tradisional dari tepung beras, gula aren, dan kelapa.", halaman: "Jaje_Tujak.html" },
    { nama: "Tuak Manis", jenis: "Minuman", rasa: ["Manis"], deskripsi: "Nira aren segar yang manis alami, paling nikmat diminum dingin.", halaman: "Tuak_manis.html" }
];

function ambilData() {
    const params = new URLSearchParams(window.location.search);
    return {
        nama: (params.get("nama") || "").trim(),
        jenis: params.get("jenis") || "",
        rasa: params.get("rasa") || "",
        catatan: (params.get("catatan") || "").trim()
    };
}

function buatElemen(tag, teks, kelas) {
    const el = document.createElement(tag);
    if (teks !== undefined) el.textContent = teks;
    if (kelas) el.className = kelas;
    return el;
}

function tampilkanRingkasan(data) {
    const wadah = document.getElementById("ringkasan");
    wadah.appendChild(buatElemen("p", "Terima kasih, " + data.nama + "! Berikut data yang Anda isi:"));

    const dl = buatElemen("dl", undefined, "summary");
    const baris = [
        ["Nama", data.nama],
        ["Jenis Kuliner", data.jenis],
        ["Rasa Favorit", data.rasa],
        ["Catatan", data.catatan === "" ? "-" : data.catatan]
    ];
    baris.forEach(([label, isi]) => {
        dl.appendChild(buatElemen("dt", label));
        dl.appendChild(buatElemen("dd", isi));
    });
    wadah.appendChild(dl);
}

function hitungRekomendasi(data) {
    const kandidat = dataKuliner.filter(k => k.jenis === data.jenis);
    const cocok = kandidat.filter(k => k.rasa.includes(data.rasa));
    return { cocok, kandidat };
}

function tampilkanRekomendasi(data) {
    const { cocok, kandidat } = hitungRekomendasi(data);
    const info = document.getElementById("info");
    const daftar = document.getElementById("daftar-rekomendasi");

    let hasil = cocok;
    if (cocok.length === 0) {
        hasil = kandidat;
        info.appendChild(buatElemen("p",
            "Belum ada menu dengan rasa " + data.rasa.toLowerCase() + " untuk jenis ini, " +
            "jadi berikut menu yang tersedia di kategori " + data.jenis + ".", "notice"));
    }

    if (hasil.length === 0) {
        info.appendChild(buatElemen("p", "Maaf, belum ada kuliner yang cocok. Coba ubah pilihan Anda."));
        return;
    }

    hasil.forEach(k => {
        const kartu = buatElemen("article", undefined, "result-card");
        kartu.appendChild(buatElemen("h3", k.nama));
        kartu.appendChild(buatElemen("p", k.deskripsi));
        kartu.appendChild(buatElemen("span", k.rasa.join(" / "), "tag"));

        if (k.halaman) {
            const tautan = buatElemen("a", "Lihat detail \u2192");
            tautan.href = k.halaman;
            kartu.appendChild(tautan);
        }
        daftar.appendChild(kartu);
    });
}

function init() {
    const tahun = document.getElementById("tahun");
    if (tahun) tahun.textContent = new Date().getFullYear();

    const data = ambilData();

    if (data.nama === "" || data.jenis === "" || data.rasa === "") {
        document.getElementById("judul-hasil").textContent = "Belum Ada Data";
        document.getElementById("ringkasan").appendChild(
            buatElemen("p", "Silakan isi formulir rekomendasi terlebih dahulu.")
        );
        document.getElementById("bagian-rekomendasi").style.display = "none";
        return;
    }

    tampilkanRingkasan(data);
    tampilkanRekomendasi(data);
}

init();