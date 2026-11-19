export interface ProgramLevel {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  name: string;
  focus: string;
  whoFor: string;
  exampleGoals: string[];
  activitySlugs: string[];
  caution?: string;
}

/**
 * Functional levels. They are earned by observed communication, never by age:
 * a four-year-old with pre-verbal skills starts at L0 safely.
 */
export const programLevels: ProgramLevel[] = [
  {
    level: 0,
    name: "L0 — Koneksi & perhatian bersama",
    focus: "Kebersamaan, menunggu, responsif, gestur, dan kesempatan berkomunikasi.",
    whoFor:
      "Anak yang belum banyak memakai kata atau belum lama menikmati bermain bersama. Titik masuk paling aman untuk hampir semua anak.",
    exampleGoals: [
      "Anak menoleh dan melihat wajah orang tua saat namanya dipanggil dalam permainan.",
      "Anak menunjuk atau mengulurkan tangan untuk menunjukkan benda yang diminati.",
    ],
    activitySlugs: [
      "ikuti-minat-anak",
      "tunggu-beri-ruang",
      "tatap-tunjuk-bersama",
      "bergantian-dorong-mobil",
    ],
  },
  {
    level: 1,
    name: "L1 — Pemahaman kata & permintaan sederhana",
    focus: "Kata familiar, menunjuk, gestur, memberi pilihan, dan meminta bantuan.",
    whoFor:
      "Anak sudah menikmati kebersamaan dan mulai merespons kata-kata sehari-hari, tetapi belum banyak kata yang dipakai sendiri.",
    exampleGoals: [
      "Anak mengambil benda yang disebut namanya di antara dua pilihan.",
      "Anak memakai gestur atau kata untuk meminta bantuan saat bermain.",
    ],
    activitySlugs: [
      "tunjuk-gambar-di-buku",
      "memberi-dua-pilihan",
      "minta-bantuan-saat-bermain",
      "tunjuk-atau-pilih",
      "cari-benda-favorit",
    ],
  },
  {
    level: 2,
    name: "L2 — Kosakata & percobaan dua kata",
    focus: "Menambah kata bermakna, memilih, menamai, dan mencoba gabungan dua kata.",
    whoFor:
      "Anak sudah punya beberapa kata fungsional dan mulai mau meniru atau menamai benda yang disukai.",
    exampleGoals: [
      "Anak memakai dua kata untuk meminta, misalnya “mau bola”.",
      "Anak menamai tiga benda baru yang sering dipakai di rumah.",
    ],
    activitySlugs: [
      "tambah-satu-kata",
      "dua-kata-fungsional",
      "cocokkan-benda-dan-gambar",
      "permainan-buka-tutup",
      "nama-makanan-saat-makan",
    ],
  },
  {
    level: 3,
    name: "L3 — Kata kerja, frasa, dan instruksi",
    focus: "Kata kerja, deskripsi sederhana, frasa kata kerja–benda, instruksi kontekstual.",
    whoFor:
      "Anak sudah menggabungkan dua kata dan mulai bisa mengikuti instruksi dua langkah dalam rutinitas.",
    exampleGoals: [
      "Anak menyebut kata kerja saat melihat gambar kegiatan.",
      "Anak mengikuti instruksi dua langkah tanpa gestur besar.",
    ],
    activitySlugs: [
      "kata-kerja-lompat-duduk",
      "pasangan-kata-kerja-benda",
      "instruksi-kontekstual",
      "siapa-apa-di-mana",
      "buku-bergambar-tanya",
    ],
  },
  {
    level: 4,
    name: "L4 — Giliran bicara & cerita",
    focus: "Percakapan dua arah, pertanyaan, urutan kejadian, cerita dari pengalaman.",
    whoFor:
      "Anak sudah bicara dengan kalimat pendek dan bisa menjaga topik sebentar.",
    exampleGoals: [
      "Anak menjawab pertanyaan “apa” dan “di mana” tentang kejadian hari itu.",
      "Anak menceritakan dua kejadian berurutan dengan bantuan foto.",
    ],
    activitySlugs: [
      "obrolan-dua-arah",
      "cerita-dari-foto",
      "urutan-aktivitas-harian",
      "main-peran-dapur",
      "ulangi-model-tepat",
    ],
  },
  {
    level: 5,
    name: "L5 — Narasi & kesiapan berinteraksi",
    focus: "Cerita lebih panjang, memahami cerita, rima, dan keterampilan sosial-bahasa.",
    whoFor:
      "Anak sudah bercakap dengan kalimat lengkap dan siap latihan narasi yang lebih kaya.",
    exampleGoals: [
      "Anak menceritakan cerita dengan dua peristiwa atau lebih.",
      "Anak menjaga percakapan lebih dari tiga giliran.",
    ],
    activitySlugs: [
      "urutan-aktivitas-harian",
      "cerita-dari-foto",
      "buku-bergambar-tanya",
      "obrolan-dua-arah",
      "suara-hewan",
    ],
    caution:
      "Bila kejelasan ucapan, pemahaman, atau interaksi sosial tetap menjadi kekhawatiran, level aplikasi tidak menggantikan penilaian terapis wicara.",
  },
];

/** Browsing bands only — assignment always follows observed function. */
export const ageBands = [
  { label: "24–29 bulan", min: 24, max: 29 },
  { label: "30–35 bulan", min: 30, max: 35 },
  { label: "3–4 tahun", min: 36, max: 47 },
  { label: "4–5 tahun", min: 48, max: 59 },
  { label: "5 tahun ke atas", min: 60, max: 999 },
];
