import type { Activity } from "./types";

/** Activities 16–30. */
export const activitiesB: Activity[] = [
  {
    id: "sd-a16",
    slug: "kata-kerja-lompat-duduk",
    title: "Kata Kerja: Lompat, Duduk, Buka",
    level: 2,
    domain: "ungkapan",
    ageReference: "2–4 tahun",
    objective:
      "Anak memakai atau merespons kata kerja sederhana dalam gerakan nyata, minimal tiga kata.",
    difficulty: "mudah",
    prerequisites: ["Anak bisa meniru gerakan kasar seperti duduk dan melompat."],
    materials: ["Ruang gerak yang aman", "Bantal atau karpet"],
    setup: "Kosongkan ruang. Pilih tiga kata kerja yang paling sering dipakai di rumah.",
    parentSteps: [
      "Lakukan gerakan sambil menyebut kata: “Lompat!” lalu melompat.",
      "Ajak anak melakukan bersama, bukan menyuruh dari jauh.",
      "Ganti permainan menjadi instruksi ringan: “Duduk … sekarang lompat!”",
      "Tambahkan kata kerja baru hanya setelah tiga kata lama dikuasai.",
    ],
    dialogExamples: [
      "“Ayo lompat. Lompat tinggi!”",
      "“Duduk dulu. Satu, dua … lompat!”",
      "Anak melompat: “Iya, lompat. Lagi?”",
    ],
    observations: [
      "Anak melakukan gerakan sesuai kata kerja.",
      "Anak menyebut kata kerja sambil bergerak.",
      "Anak meminta permainan diulang dengan kata atau gestur.",
    ],
    duration: "5–7 menit",
    tipsDisengaged:
      "Ganti menjadi gerakan hewan (melompat seperti katak). Bila anak lelah, hentikan; latihan kata kerja tidak perlu banyak pengulangan.",
    lowPressureAlternative:
      "Lakukan gerakan saat bernyanyi tanpa meminta anak melakukan. Anak bisa ikut kapan saja.",
    evidenceLabel: "general_developmental_play",
    sourceIds: ["cdc-30m", "cdc-3y"],
    illustration: "bola",
  },
  {
    id: "sd-a17",
    slug: "permainan-buka-tutup",
    title: "Permainan Buka–Tutup",
    level: 2,
    domain: "ungkapan",
    ageReference: "2–3 tahun",
    objective:
      "Anak memakai kata atau gestur untuk meminta “buka”, “tutup”, atau “lagi”.",
    difficulty: "mudah",
    prerequisites: ["Anak suka benda yang bisa dibuka dan ditutup."],
    materials: ["Toples, kotak, atau buku dengan pintu", "Benda kecil di dalamnya"],
    setup: "Isi kotak dengan satu benda menarik. Tutup, lalu berikan kepada anak.",
    parentSteps: [
      "Biarkan anak mencoba membuka sendiri sebentar.",
      "Beri model kata: “Buka?” sambil menunjuk tutupnya.",
      "Tunggu; bila anak memberi isyarat, buka dan ucapkan “Buka!”",
      "Ulangi dengan “tutup” sebagai bagian permainan.",
    ],
    dialogExamples: [
      "“Buka?” (menunjuk tutup)",
      "“Terbuka! Ada apa di dalam?”",
      "“Sekarang tutup. Tutup … sudah.”",
    ],
    observations: [
      "Anak menunjuk tutup atau memberi isyarat minta dibuka.",
      "Anak meniru kata “buka” atau “tutup”.",
      "Anak mengulang permainan sendiri.",
    ],
    duration: "3–5 menit",
    tipsDisengaged:
      "Gunakan benda favorit di dalam kotak. Bila anak hanya ingin bendanya, biarkan; kata bisa menyusul.",
    lowPressureAlternative:
      "Mainkan “cilukba” dengan kain. Buka–tutup wajah memberi kesempatan menunggu tanpa tuntutan kata.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-kaiser-2011", "cdc-2y"],
    illustration: "balok",
  },
  {
    id: "sd-a18",
    slug: "tunjuk-atau-pilih",
    title: "Bantu Anak Menunjuk atau Memilih",
    level: 1,
    domain: "gestur_aac",
    ageReference: "2 tahun ke atas",
    objective:
      "Anak memakai gestur, menunjuk, atau kartu untuk menyampaikan pilihan, minimal tiga kali.",
    difficulty: "mudah",
    prerequisites: ["Anak bisa melihat dua pilihan yang disajikan."],
    materials: ["Dua benda atau dua kartu gambar", "Papan/kertas untuk menempel kartu"],
    setup:
      "Letakkan dua pilihan pada posisi yang sama setiap kali agar anak mudah belajar polanya.",
    parentSteps: [
      "Tawarkan dua pilihan sambil menunjuk masing-masing: “Mau ini atau ini?”",
      "Beri waktu, lalu terima tunjuk atau pandangan sebagai jawaban.",
      "Model penggunaan gestur: tunjuk sambil menyebut nama benda.",
      "Ucapkan nama benda yang dipilih, tetapi jangan menuntut anak mengulang.",
    ],
    dialogExamples: [
      "“Mau bola atau balok?” (menunjuk masing-masing)",
      "Anak menunjuk: “Oke, bola. Bola.”",
      "“Bilang ‘mau’ … atau tunjuk saja.”",
    ],
    observations: [
      "Anak menunjuk pilihan dengan jelas.",
      "Anak memakai gestur baru untuk meminta.",
      "Anak menatap pilihan lalu menatap Anda.",
    ],
    duration: "2–3 menit, sering",
    tipsDisengaged:
      "Bila anak tidak memilih, pilih satu untuknya dan beri komentar. Pilihan bisa dilatih lagi nanti tanpa tekanan.",
    lowPressureAlternative:
      "Gunakan pilihan yang sangat disukai versus yang biasa. Selisih minat yang besar membuat pilihan lebih mudah.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["asha-aac-ei", "cdc-2y"],
    illustration: "kartu",
  },
  {
    id: "sd-a19",
    slug: "tambah-satu-kata",
    title: "Tambah Satu Kata dari Ucapan Anak",
    level: 2,
    domain: "kalimat",
    ageReference: "2–3 tahun",
    objective:
      "Anak mendengar versi satu kata lebih lengkap dari ucapannya, tanpa diminta mengulang.",
    difficulty: "sedang",
    prerequisites: ["Anak sudah memakai beberapa kata tunggal."],
    materials: ["Tidak ada — terjadi dalam percakapan sehari-hari"],
    setup: "Pilih satu rutinitas (makan, mandi, main) dan siap mendengar kata anak.",
    parentSteps: [
      "Saat anak mengatakan satu kata, ulangi dengan menambahkan satu kata.",
      "Jangan menyuruh “bilang yang benar”. Cukup beri model.",
      "Ulangi model yang sama pada kesempatan berikutnya.",
      "Biarkan anak tetap memakai versi singkatnya tanpa dikoreksi.",
    ],
    dialogExamples: [
      "Anak: “Susu.” — “Mau susu. Ini susunya.”",
      "Anak: “Bola.” — “Bola besar. Ayo lempar.”",
      "Anak: “Mobil.” — “Mobil jalan. Vroom.”",
    ],
    observations: [
      "Anak menambahkan kata sendiri setelah mendengar model.",
      "Anak memakai gabungan dua kata walau belum jelas.",
      "Anak menunjuk sambil menyebut satu kata.",
    ],
    duration: "Sepanjang hari, 5–10 kesempatan",
    tipsDisengaged:
      "Bila anak berhenti berbicara, kurangi model menjadi satu kata saja. Terlalu banyak koreksi bisa membuat anak diam.",
    lowPressureAlternative:
      "Catat kata-kata anak hari ini tanpa mengubah cara bicara Anda, lalu beri model di lain waktu.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-2019", "cdc-30m"],
    illustration: "boneka",
  },
  {
    id: "sd-a20",
    slug: "ulangi-model-tepat",
    title: "Ulangi dengan Model Tepat (Recasting)",
    level: 2,
    domain: "kalimat",
    ageReference: "2–4 tahun",
    objective:
      "Anak mendengar bentuk kalimat yang lebih lengkap dari ucapannya sendiri, dalam percakapan alami.",
    difficulty: "sedang",
    prerequisites: ["Anak sudah memakai frasa pendek."],
    materials: ["Tidak ada"],
    setup: "Pilih momen santai ketika anak sedang bercerita atau meminta sesuatu.",
    parentSteps: [
      "Dengarkan ucapan anak tanpa memotong.",
      "Ulangi maksudnya dengan bentuk yang lebih lengkap dan benar.",
      "Tambahkan satu unsur baru: subjek, kata kerja, atau keterangan.",
      "Lanjutkan percakapan; jangan menjadikan pengulangan sebagai kuis.",
    ],
    dialogExamples: [
      "Anak: “Mama pergi.” — “Iya, Mama pergi ke pasar.”",
      "Anak: “Mau lagi.” — “Kamu mau main lagi.”",
      "Anak: “Kucing lari.” — “Kucingnya lari cepat.”",
    ],
    observations: [
      "Anak memakai bentuk yang lebih lengkap di lain waktu.",
      "Anak menambahkan kata baru setelah mendengar model.",
      "Anak tetap bersemangat bercerita.",
    ],
    duration: "5 menit percakapan biasa",
    tipsDisengaged:
      "Bila anak tidak merespons model, jangan ulangi. Recasting bekerja lewat paparan, bukan paksaan.",
    lowPressureAlternative:
      "Lakukan saat membaca buku: ulangi kalimat gambar dengan versi lebih lengkap.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-kaiser-2011", "roberts-2019"],
    illustration: "mobil",
  },
  {
    id: "sd-a21",
    slug: "dua-kata-fungsional",
    title: "Dua Kata Fungsional",
    level: 2,
    domain: "kalimat",
    ageReference: "2–3 tahun",
    objective:
      "Anak memakai dua kata bermakna untuk meminta atau menyampaikan sesuatu, minimal dua kali.",
    difficulty: "sedang",
    prerequisites: ["Anak sudah memakai kata tunggal untuk meminta."],
    materials: ["Camilan atau mainan favorit", "Dua pilihan sederhana"],
    setup:
      "Pilih kata yang paling berguna: “mau …”, “buka …”, “lagi …”, “habis”.",
    parentSteps: [
      "Saat anak meminta dengan satu kata, beri model dua kata.",
      "Beri benda hanya setelah ada usaha komunikasi (kata, gestur, atau pandangan).",
      "Jangan menahan benda sampai anak menangis; tujuannya komunikasi, bukan negosiasi.",
      "Ulangi pola yang sama di beberapa situasi berbeda.",
    ],
    dialogExamples: [
      "Anak: “Susu.” — “Mau susu? Bilang: mau susu.”",
      "“Buka kotak. Aku bantu buka.”",
      "“Sudah habis. Mau lagi atau selesai?”",
    ],
    observations: [
      "Anak memakai dua kata saat meminta.",
      "Anak menggabungkan kata dengan gestur.",
      "Anak memakai dua kata di situasi baru, bukan hanya satu rutinitas.",
    ],
    duration: "Sepanjang rutinitas, 3–5 kesempatan",
    tipsDisengaged:
      "Bila anak frustrasi, berikan bendanya sambil memberi model dua kata. Frustrasi bukan alat latihan.",
    lowPressureAlternative:
      "Mainkan dengan boneka yang “minta” sesuatu, sehingga dua kata dipakai dalam cerita, bukan tuntutan pada anak.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-kaiser-2011", "cdc-2y"],
    illustration: "makan",
  },
  {
    id: "sd-a22",
    slug: "buku-bergambar-tanya",
    title: "Buku Bergambar: Tanya-Komunikasi",
    level: 3,
    domain: "percakapan",
    ageReference: "3–5 tahun",
    objective:
      "Anak menjawab pertanyaan sederhana tentang gambar dan menambahkan komentarnya sendiri.",
    difficulty: "sedang",
    prerequisites: ["Anak sudah menikmati buku dan bisa menunjuk gambar."],
    materials: ["Buku cerita bergambar", "Satu buku yang sama selama beberapa hari"],
    setup: "Baca dengan kecepatan anak. Biarkan anak membalik halaman.",
    parentSteps: [
      "Baca cerita pendek, lalu berhenti di satu halaman.",
      "Ajukan satu pertanyaan terbuka: “Apa yang terjadi di sini?”",
      "Tunggu 5 detik; terima jawaban satu kata.",
      "Hubungkan jawaban anak dengan pengalaman nyata: “Seperti kucing kita.”",
    ],
    dialogExamples: [
      "“Apa yang terjadi di sini?”",
      "“Kucingnya sedang apa?”",
      "“Kamu pernah lihat kucing seperti ini?”",
    ],
    observations: [
      "Anak menjawab dengan kata atau kalimat pendek.",
      "Anak mengajukan pertanyaan balik tentang gambar.",
      "Anak menghubungkan cerita dengan pengalaman sendiri.",
    ],
    duration: "10 menit",
    tipsDisengaged:
      "Bila anak bosan, berhenti di halaman yang dia suka dan ceritakan ulang bagian itu saja.",
    lowPressureAlternative:
      "Bacakan tanpa pertanyaan sama sekali, lalu minta anak “membacakan” gambar dengan caranya.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-2019", "cdc-3y", "cdc-4y"],
    illustration: "buku",
  },
  {
    id: "sd-a23",
    slug: "siapa-apa-di-mana",
    title: "Siapa, Apa, Di Mana?",
    level: 3,
    domain: "percakapan",
    ageReference: "3–4 tahun",
    objective:
      "Anak menjawab pertanyaan “siapa”, “apa”, dan “di mana” tentang kejadian nyata.",
    difficulty: "sedang",
    prerequisites: ["Anak bisa menjawab pertanyaan sederhana tentang gambar."],
    materials: ["Foto keluarga atau mainan", "Situasi nyata di rumah"],
    setup:
      "Pilih satu topik konkret, misalnya siapa yang ada di rumah atau apa yang sedang dimasak.",
    parentSteps: [
      "Ajukan satu pertanyaan jenis saja dalam satu waktu.",
      "Beri pilihan bila anak bingung: “Bola di kolong atau di kursi?”",
      "Perluas jawaban dengan satu kata tambahan.",
      "Ganti jenis pertanyaan setelah anak nyaman.",
    ],
    dialogExamples: [
      "“Siapa yang mandi tadi?”",
      "“Apa yang kita masak?”",
      "“Bola disembunyikan di mana?”",
    ],
    observations: [
      "Anak menjawab pertanyaan dengan tepat.",
      "Anak memakai kata tanya sendiri.",
      "Anak menjawab dengan kalimat, bukan hanya satu kata.",
    ],
    duration: "5 menit",
    tipsDisengaged:
      "Ubah menjadi permainan mencari benda; pertanyaan muncul saat anak benar-benar penasaran.",
    lowPressureAlternative:
      "Jawab pertanyaan Anda sendiri dengan suara lucu, lalu tunggu. Anak sering ikut menjawab tanpa diminta.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["cdc-3y", "cdc-30m"],
    illustration: "buku",
  },
  {
    id: "sd-a24",
    slug: "cerita-dari-foto",
    title: "Cerita dari Foto Kegiatan",
    level: 4,
    domain: "percakapan",
    ageReference: "3–5 tahun",
    objective:
      "Anak menceritakan satu atau dua kejadian dari foto yang baru diambil.",
    difficulty: "perlu_pendampingan",
    prerequisites: ["Anak sudah memakai kalimat pendek."],
    materials: ["2–3 foto kegiatan anak hari ini", "Album atau layar foto (opsional)"],
    setup:
      "Cetak atau tampilkan tiga foto sederhana: bermain, makan, tidur. Hindari foto yang memuat data pribadi sensitif.",
    parentSteps: [
      "Tunjukkan satu foto dan beri model kalimat pendek.",
      "Tanyakan satu hal: “Tadi kamu apa?”",
      "Tambahkan kata urutan: “Pertama … lalu …”",
      "Biarkan anak menambahkan detail sendiri tanpa dikoreksi.",
    ],
    dialogExamples: [
      "“Ini foto kamu di taman. Tadi kamu apa?”",
      "“Pertama kamu main ayunan, lalu …?”",
      "“Wah, kamu minum jus. Rasanya apa?”",
    ],
    observations: [
      "Anak menceritakan kejadian dengan kalimat.",
      "Anak memakai kata urutan seperti “lalu” atau “habis itu”.",
      "Anak menambahkan perasaan atau detail sendiri.",
    ],
    duration: "5–10 menit",
    tipsDisengaged:
      "Bila anak tidak tertarik pada foto, ceritakan foto Anda sendiri dan biarkan anak menyela.",
    lowPressureAlternative:
      "Gunakan gambar kartun kegiatan, bukan foto keluarga, bila anak lebih tertarik pada karakter.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["cdc-4y", "cdc-5y"],
    illustration: "kartu",
  },
  {
    id: "sd-a25",
    slug: "main-peran-dapur",
    title: "Main Peran di Dapur Mainan",
    level: 2,
    domain: "main_peran",
    ageReference: "2–4 tahun",
    objective:
      "Anak memainkan peran sederhana (memasak, menyuapi) dan memberi komentar tentang kegiatannya.",
    difficulty: "sedang",
    prerequisites: ["Anak pernah meniru gerakan orang dewasa."],
    materials: ["Peralatan dapur mainan atau alat masak aman", "Boneka atau anggota keluarga"],
    setup: "Siapkan satu “menu” sederhana: sup dan teh. Biarkan anak memilih peran.",
    parentSteps: [
      "Mulai dari peran yang dikenal anak: memasak untuk boneka.",
      "Beri satu kata kunci: “masak”, “panas”, “makan”.",
      "Ikuti arah anak; jangan mengambil alih cerita.",
      "Tutup permainan dengan rutinitas: “sudah matang, ayo makan”.",
    ],
    dialogExamples: [
      "“Ayo masak sup. Airnya panas.”",
      "“Bonekanya lapar. Kasih makan, ya.”",
      "“Sudah matang! Bau apa ini?”",
    ],
    observations: [
      "Anak memakai benda sebagai pengganti (balok jadi makanan).",
      "Anak memberi komentar atau instruksi dalam peran.",
      "Anak menjaga permainan beberapa menit.",
    ],
    duration: "10–15 menit",
    tipsDisengaged:
      "Bila anak cepat berhenti, cukup satu langkah: mencuci sayur atau menuang air. Bermain peran tidak perlu panjang.",
    lowPressureAlternative:
      "Biarkan anak mengamati Anda memasak sungguhan sambil memberi nama tindakan. Main peran bisa muncul nanti.",
    evidenceLabel: "general_developmental_play",
    sourceIds: ["cdc-30m", "cdc-3y"],
    illustration: "dapur",
  },
  {
    id: "sd-a26",
    slug: "instruksi-kontekstual",
    title: "Berikan Instruksi Kontekstual",
    level: 2,
    domain: "pemahaman",
    ageReference: "2–4 tahun",
    objective:
      "Anak mengikuti instruksi dua langkah dalam rutinitas nyata, tanpa gestur besar.",
    difficulty: "sedang",
    prerequisites: ["Anak mengikuti instruksi satu langkah."],
    materials: ["Benda yang ada di rutinitas: sepatu, tas, sendok"],
    setup:
      "Pilih rutinitas yang sudah dikenal, misalnya pulang sekolah atau sebelum mandi.",
    parentSteps: [
      "Mulai dengan satu langkah, lalu tambah langkah kedua.",
      "Gunakan kalimat pendek dan jelas: “Taruh tas, lalu buka sepatu.”",
      "Ulangi sekali dengan lebih lambat bila anak belum bergerak.",
      "Bila anak hanya melakukan satu langkah, akui yang sudah dilakukan dan ingatkan langkah berikutnya.",
    ],
    dialogExamples: [
      "“Taruh tas, lalu buka sepatu.”",
      "“Ambil sendok, taruh di piring.”",
      "“Bagus, tasnya sudah. Sekarang sepatunya.”",
    ],
    observations: [
      "Anak melakukan kedua langkah tanpa diulang.",
      "Anak meminta bantuan saat lupa langkah kedua.",
      "Anak mengikuti instruksi baru di rutinitas lain.",
    ],
    duration: "1–2 menit di rutinitas",
    tipsDisengaged:
      "Turunkan ke satu langkah, lalu tambah lagi setelah beberapa hari. Instruksi bukan ujian kepatuhan.",
    lowPressureAlternative:
      "Lakukan instruksi sebagai bagian permainan: “Kasih makan boneka, lalu tidurkan.”",
    evidenceLabel: "general_developmental_play",
    sourceIds: ["cdc-30m", "cdc-3y"],
    illustration: "balok",
  },
  {
    id: "sd-a27",
    slug: "pasangan-kata-kerja-benda",
    title: "Bermain Pasangan Kata Kerja–Benda",
    level: 3,
    domain: "kalimat",
    ageReference: "3–4 tahun",
    objective:
      "Anak menggabungkan kata kerja dan benda dalam frasa pendek saat bermain.",
    difficulty: "perlu_pendampingan",
    prerequisites: ["Anak memakai dua kata dan beberapa kata kerja."],
    materials: ["Mainan kecil", "Wadah atau kotak", "Gambar kegiatan (opsional)"],
    setup:
      "Siapkan empat pasangan yang sering muncul: buka kotak, taruh bola, cuci tangan, makan roti.",
    parentSteps: [
      "Lakukan satu tindakan sambil memberi frasa lengkap.",
      "Beri kesempatan anak memilih tindakan berikutnya.",
      "Model frasa yang sama tanpa meminta pengulangan.",
      "Rayakan usaha anak, termasuk frasa yang belum sempurna.",
    ],
    dialogExamples: [
      "“Buka kotaknya.”",
      "“Taruh bola di dalam.”",
      "“Sekarang cuci tangan, ya.”",
    ],
    observations: [
      "Anak memakai frasa kata kerja–benda.",
      "Anak menggabungkan tiga kata.",
      "Anak mengoreksi frasa sendiri setelah mendengar model.",
    ],
    duration: "5–10 menit",
    tipsDisengaged:
      "Pilih tindakan yang paling disukai anak (menuang air, membuka tutup). Minat membuat frasa lebih mudah muncul.",
    lowPressureAlternative:
      "Gunakan buku gambar kegiatan dan beri frasa untuk tiap gambar, tanpa tuntutan berbicara.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-kaiser-2011", "cdc-30m"],
    illustration: "dapur",
  },
  {
    id: "sd-a28",
    slug: "obrolan-dua-arah",
    title: "Obrolan Dua Arah tentang Mainan",
    level: 4,
    domain: "percakapan",
    ageReference: "3–5 tahun",
    objective:
      "Anak menjaga percakapan minimal tiga giliran bolak-balik tentang satu topik.",
    difficulty: "perlu_pendampingan",
    prerequisites: ["Anak menjawab pertanyaan sederhana tentang kegiatan."],
    materials: ["Satu mainan atau hasil karya anak"],
    setup:
      "Pilih waktu tenang tanpa layar. Duduk sejajar dengan anak, bukan berhadapan seperti wawancara.",
    parentSteps: [
      "Mulai dengan komentar, bukan pertanyaan: “Menaranya tinggi sekali.”",
      "Tunggu jawaban anak, lalu sambungkan dengan komentar Anda.",
      "Ajukan satu pertanyaan lanjutan setelah dua giliran.",
      "Akhiri saat topik habis, bukan saat Anda kehabisan pertanyaan.",
    ],
    dialogExamples: [
      "“Menaranya tinggi sekali.” — “Iya, tinggi.” — “Kamu taruh apa di atas?”",
      "“Ini mobil merah. Mau ke mana?”",
      "“Kenapa berhenti? Oh, ada jalan rusak.”",
    ],
    observations: [
      "Anak menjawab dan menambahkan informasi baru.",
      "Anak mengajukan pertanyaan balik.",
      "Anak mempertahankan topik beberapa giliran.",
    ],
    duration: "5–10 menit",
    tipsDisengaged:
      "Bila anak menjawab singkat, kurangi pertanyaan dan perbanyak komentar. Pertanyaan beruntun membuat anak berhenti.",
    lowPressureAlternative:
      "Ceritakan mainan Anda sendiri dan biarkan anak menyimak. Percakapan bisa dimulai dari cerita, bukan tanya-jawab.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["roberts-2019", "cdc-3y", "cdc-5y"],
    illustration: "boneka",
  },
  {
    id: "sd-a29",
    slug: "urutan-aktivitas-harian",
    title: "Ceritakan Urutan Aktivitas Harian",
    level: 5,
    domain: "percakapan",
    ageReference: "4–5 tahun",
    objective:
      "Anak menceritakan urutan tiga kegiatan dengan kata urutan yang jelas.",
    difficulty: "perlu_pendampingan",
    prerequisites: ["Anak bercerita tentang kejadian hari itu dengan bantuan."],
    materials: ["Kartu gambar kegiatan atau foto", "Papan sederhana"],
    setup:
      "Susun tiga kartu: bangun, mandi, makan. Biarkan anak menyusun versinya sendiri.",
    parentSteps: [
      "Minta anak menyusun urutan menurut pengalamannya, bukan menurut jawaban benar.",
      "Beri kata urutan: “Pertama … setelah itu … terakhir …”",
      "Tanyakan satu detail: “Siapa yang bangun duluan?”",
      "Ceritakan ulang bersama sebagai penutup.",
    ],
    dialogExamples: [
      "“Pertama bangun, lalu mandi, terakhir makan.”",
      "“Setelah itu kamu ke mana?”",
      "“Coba ceritakan pagi tadi dari awal.”",
    ],
    observations: [
      "Anak memakai kata urutan dengan tepat.",
      "Anak menambahkan detail di luar urutan dasar.",
      "Anak mengoreksi urutan sendiri saat bercerita.",
    ],
    duration: "10 menit",
    tipsDisengaged:
      "Kurangi menjadi dua kartu. Cerita dua langkah tetap melatih urutan.",
    lowPressureAlternative:
      "Bacakan cerita bergambar dan minta anak menunjuk “apa yang terjadi dulu”. Ini melatih urutan tanpa menuntut narasi panjang.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["cdc-4y", "cdc-5y"],
    illustration: "kartu",
  },
  {
    id: "sd-a30",
    slug: "kartu-komunikasi-aku-mau",
    title: "Kartu Komunikasi: Aku Mau / Lagi / Selesai",
    level: 1,
    domain: "gestur_aac",
    ageReference: "2 tahun ke atas",
    objective:
      "Anak memakai kartu atau gestur untuk menyampaikan “mau”, “lagi”, atau “selesai”.",
    difficulty: "sedang",
    prerequisites: ["Anak bisa menunjuk dua pilihan."],
    materials: ["Tiga kartu bergambar: mau, lagi, selesai", "Mainan atau makanan"],
    setup:
      "Tempel tiga kartu di meja atau dinding setinggi anak. Gunakan kartu yang sama setiap hari.",
    parentSteps: [
      "Model pemakaian kartu: tunjuk “mau” saat Anda meminta sesuatu.",
      "Saat anak memberi isyarat, tunjukkan kartu yang sesuai dan ucapkan katanya.",
      "Biarkan anak memakai kartu saja, tanpa kata; itu komunikasi yang sah.",
      "Perluas bertahap menjadi dua kartu, misalnya “mau” + “lagi”.",
    ],
    dialogExamples: [
      "“Kamu mau? Tunjuk ‘mau’.”",
      "“Lagi? Ini kartu ‘lagi’.”",
      "Anak menunjuk “selesai”: “Oke, selesai. Terima kasih sudah bilang.”",
    ],
    observations: [
      "Anak menunjuk kartu untuk meminta.",
      "Anak memakai kartu bersama kata atau gestur.",
      "Anak memakai kartu untuk menolak atau mengakhiri kegiatan.",
    ],
    duration: "Sepanjang rutinitas",
    tipsDisengaged:
      "Kartu tidak perlu dipakai setiap saat. Bila anak menolak, kembalikan ke gestur dan kata biasa.",
    lowPressureAlternative:
      "Cukup tunjukkan kartu saat Anda memberi model tanpa meminta anak memakainya. Paparan dulu, pemakaian menyusul.",
    evidenceLabel: "supported_caregiver_strategy",
    sourceIds: ["asha-aac-ei", "roberts-2019"],
    illustration: "kartu",
  },
];
