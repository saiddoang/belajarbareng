export interface StarterDay {
  day: number;
  title: string;
  moment: string;
  slugs: string[];
  note: string;
}

/**
 * A sample week. The interval and the number of activities are suggestions for
 * the caregiver's planning — not a therapy dose, and not a requirement.
 */
export const starterWeek: StarterDay[] = [
  {
    day: 1,
    title: "Mengikuti minat anak",
    moment: "Saat anak memilih mainan sendiri",
    slugs: ["ikuti-minat-anak", "komentar-singkat"],
    note: "Tanpa target kata. Habiskan 5–10 menit benar-benar mengikuti apa yang anak lakukan.",
  },
  {
    day: 2,
    title: "Menunggu dan memberi ruang",
    moment: "Saat bermain balok atau menyusun benda",
    slugs: ["tunggu-beri-ruang", "bergantian-dorong-mobil"],
    note: "Hitung dalam hati sampai 5 sebelum mengisi jeda. Jeda adalah bagian dari latihan.",
  },
  {
    day: 3,
    title: "Buku dan menunjuk",
    moment: "Sebelum tidur",
    slugs: ["tunjuk-gambar-di-buku", "tatap-tunjuk-bersama"],
    note: "Ikuti halaman yang disukai anak, bukan urutan buku.",
  },
  {
    day: 4,
    title: "Pilihan di rutinitas",
    moment: "Makan atau mandi",
    slugs: ["memberi-dua-pilihan", "nama-makanan-saat-makan"],
    note: "Dua pilihan saja, dan tunggu. Jika anak menunjuk, terima jawaban itu.",
  },
  {
    day: 5,
    title: "Menamai dan mencoba kata",
    moment: "Membereskan mainan",
    slugs: ["ayo-bereskan-mainan", "tambah-satu-kata"],
    note: "Ulangi kata anak dengan bentuk yang lebih lengkap tanpa menyuruh mengulang.",
  },
  {
    day: 6,
    title: "Bermain peran singkat",
    moment: "Setelah mandi atau sore hari",
    slugs: ["main-peran-dapur", "suara-hewan"],
    note: "Biarkan anak memimpin cerita. Anda menjadi pemain pendukung.",
  },
  {
    day: 7,
    title: "Mengingat kembali",
    moment: "Waktu tenang bersama",
    slugs: ["cerita-dari-foto", "dua-kata-fungsional"],
    note: "Tidak perlu latihan baru. Lihat catatan pekan ini dan pilih satu hal yang ingin diulang.",
  },
];
