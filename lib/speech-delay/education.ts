import { MEDICAL_CONTENT_REVIEWED_AT } from "./sources";

export interface EducationSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EducationArticle {
  id: string;
  slug: string;
  title: string;
  dek: string;
  readingMinutes: number;
  sections: EducationSection[];
  sourceIds: string[];
  relatedActivitySlugs?: string[];
}

/**
 * Parent-facing education. Every article ends with its references section
 * rendered from sourceIds; claims are limited to what those pages state.
 */
export const educationArticles: EducationArticle[] = [
  {
    id: "edu-01",
    slug: "bicara-bahasa-komunikasi",
    title: "Bicara, bahasa, dan komunikasi: apa bedanya?",
    dek: "Empat hal yang sering dianggap sama, padahal berbeda — dan mengapa bedanya penting.",
    readingMinutes: 6,
    sections: [
      {
        heading: "Bicara (speech) adalah produksi bunyi",
        paragraphs: [
          "Bicara berkaitan dengan cara anak menghasilkan bunyi: gerakan mulut, lidah, dan napas yang membentuk kata. Anak bisa memahami banyak hal tetapi belum mampu mengucapkan bunyi dengan jelas. Kejelasan ucapan adalah bagian dari bicara, bukan ukuran pemahaman.",
          "Karena itu, anak yang ucapannya belum jelas belum tentu terlambat bahasanya. Sebaliknya, anak yang ucapannya jelas bisa tetap kesulitan memahami atau menyusun kalimat.",
        ],
      },
      {
        heading: "Bahasa reseptif: memahami",
        paragraphs: [
          "Bahasa reseptif adalah kemampuan memahami kata dan instruksi. Contoh sehari-hari: anak mengambil sepatu ketika diminta, atau melihat ke jendela saat Anda menyebut “hujan”.",
          "Bahasa reseptif sering lebih sulit diamati daripada bicara, karena tidak ada suara yang keluar. Orang tua biasanya melihatnya lewat respons anak terhadap rutinitas dan permintaan sederhana.",
        ],
      },
      {
        heading: "Bahasa ekspresif: menyampaikan",
        paragraphs: [
          "Bahasa ekspresif adalah cara anak menyampaikan maksud: kata, frasa, kalimat, gestur, atau suara. Komunikasi bisa berhasil tanpa satu kata pun — misalnya menunjuk, mengangguk, atau membawa botol kosong kepada orang tua.",
          "Gestur, pandangan mata, dan suara yang terarah adalah bagian sah dari perkembangan komunikasi, bukan kegagalan bicara.",
        ],
      },
      {
        heading: "Komunikasi sosial: memakai bahasa bersama orang lain",
        paragraphs: [
          "Komunikasi sosial mencakup bergantian, menatap, berbagi minat, dan memahami situasi. Anak bisa punya banyak kata tetapi belum memakai kata untuk mengajak orang lain berinteraksi.",
          "Dalam kegiatan di modul ini, ketiga hal di atas dilatih bersama: memahami, menyampaikan, dan menikmati kebersamaan dengan orang lain.",
        ],
      },
      {
        heading: "Artikulasi adalah bagian dari bicara",
        paragraphs: [
          "Artikulasi adalah ketepatan bunyi tertentu, misalnya bunyi /r/, /s/, atau /l/. Banyak anak melewati tahap bunyi yang belum tepat. Penilaian artikulasi membutuhkan pemeriksaan langsung oleh terapis wicara, bukan latihan mandiri dari aplikasi.",
          "Modul ini tidak mengajarkan hierarki bunyi atau protokol motorik bicara. Bila kejelasan ucapan menjadi kekhawatiran, itu alasan untuk berkonsultasi.",
        ],
      },
    ],
    sourceIds: ["nidcd-milestones", "asha-lle", "cdc-3y"],
  },
  {
    id: "edu-02",
    slug: "variasi-atau-sinyal",
    title: "Variasi normal atau sinyal yang perlu diperiksa?",
    dek: "Anak berkembang dengan kecepatan berbeda, tetapi tidak semua keterlambatan boleh ditunggu.",
    readingMinutes: 7,
    sections: [
      {
        heading: "Milestone adalah panduan, bukan ujian",
        paragraphs: [
          "CDC menyebut milestone sebagai hal yang dilakukan sebagian besar anak — 75% atau lebih — pada usia tertentu. Artinya, ada anak yang sehat dan tetap membutuhkan waktu lebih lama. Panduan ini dipakai untuk memantau, bukan untuk memberi label.",
          "NIDCD menjelaskan milestone membantu tenaga kesehatan menilai apakah anak berada pada jalur yang diharapkan atau membutuhkan bantuan tambahan.",
        ],
      },
      {
        heading: "Apa itu “late talker”?",
        paragraphs: [
          "Dalam literatur berbahasa Inggris, late language emergence sering dirumuskan sebagai kosakata ekspresif di bawah 50 kata dan belum ada gabungan dua kata pada usia 24 bulan. Kriteria ini dipakai untuk anak monolingual dan tidak otomatis berlaku untuk anak yang tumbuh dengan dua bahasa.",
          "Penting: kriteria ini bukan diagnosis. Ia hanya menandai anak yang perlu dipantau lebih dekat dan, bila ada kekhawatiran, dievaluasi.",
        ],
      },
      {
        heading: "Yang lebih perlu perhatian",
        paragraphs: [
          "Beberapa hal bukan sekadar variasi dan sebaiknya tidak ditunggu: kehilangan kemampuan yang sudah dimiliki, kekhawatiran pendengaran, kesulitan memahami instruksi sehari-hari, serta kekhawatiran tentang interaksi sosial anak.",
          "Anak yang tidak menoleh saat dipanggil, tidak menunjuk untuk berbagi minat, atau tidak memakai gestur sama sekali juga perlu dibicarakan dengan dokter.",
        ],
      },
      {
        heading: "Mengapa “tunggu sampai sekolah” berisiko",
        paragraphs: [
          "ASHA menyatakan anak dengan late language emergence tetap berisiko mengalami kesulitan bahasa dan literasi di kemudian hari, sehingga assessment dini dan pemantauan berkala penting.",
          "Menunggu bukan pilihan netral: ia menunda kesempatan mendapat dukungan. Modul ini tidak menggantikan evaluasi, dan tidak menyarankan Anda menunda pemeriksaan.",
        ],
      },
    ],
    sourceIds: ["cdc-2y", "asha-lle", "nidcd-milestones"],
    relatedActivitySlugs: ["ikuti-minat-anak", "tunggu-beri-ruang"],
  },
  {
    id: "edu-03",
    slug: "faktor-dan-pemeriksaan",
    title: "Faktor yang mungkin berperan, dan mengapa pendengaran diperiksa lebih dulu",
    dek: "Banyak faktor bisa memengaruhi keterlambatan bicara. Tidak satu pun bisa disimpulkan dari aplikasi.",
    readingMinutes: 7,
    sections: [
      {
        heading: "Faktor risiko yang tercatat dalam literatur",
        paragraphs: [
          "ASHA mencantumkan beberapa faktor yang berhubungan dengan late language emergence: jenis kelamin laki-laki, riwayat keluarga, berat lahir rendah atau kelahiran sebelum 37 minggu, serta kemampuan bahasa pada usia 12 bulan.",
          "Faktor-faktor ini bersifat statistik pada tingkat populasi. Adanya satu faktor tidak berarti seorang anak pasti terlambat, dan tidak adanya faktor tidak berarti tidak ada kekhawatiran.",
        ],
      },
      {
        heading: "Pendengaran adalah langkah pertama",
        paragraphs: [
          "NIDCD menyebut keterlambatan bisa disebabkan gangguan pendengaran, atau bisa juga karena gangguan bicara/bahasa. Karena itu pemeriksaan pendengaran adalah bagian penting dari penelusuran awal.",
          "Anak yang sering tidak merespons panggilan, mendengarkan televisi lebih keras, atau sering bertanya “apa?” perlu pemeriksaan pendengaran, bukan hanya latihan bicara.",
        ],
      },
      {
        heading: "Kondisi lain yang perlu dinilai profesional",
        paragraphs: [
          "Gangguan bahasa perkembangan, gangguan pendengaran, kesulitan motorik bicara, hingga perbedaan perkembangan sosial-komunikasi memerlukan penilaian langsung. Aplikasi tidak bisa membedakannya.",
          "Karena itu modul ini tidak memberi label apa pun. Hasil “Cek Kemampuan Awal” hanya menyarankan titik mulai latihan dan menandai hal yang perlu dibicarakan dengan profesional.",
        ],
      },
      {
        heading: "Yang bisa dilakukan sambil menunggu jadwal",
        paragraphs: [
          "Sambil menunggu jadwal, Anda bisa memakai strategi komunikasi di modul ini, mencatat observasi, dan menyiapkan pertanyaan untuk dokter. Itu bukan pengganti pemeriksaan.",
          "Bila ada kekhawatiran pendengaran atau kehilangan kemampuan, jangan menunggu hasil latihan di rumah: hubungi dokter lebih dahulu.",
        ],
      },
    ],
    sourceIds: ["asha-lle", "nidcd-milestones", "aap-healthychildren"],
  },
  {
    id: "edu-04",
    slug: "dua-bahasa-di-rumah",
    title: "Anak tumbuh dengan dua bahasa: apa yang perlu diketahui",
    dek: "Dua bahasa bukan penyebab keterlambatan bahasa, tetapi pemantauannya perlu cara yang tepat.",
    readingMinutes: 5,
    sections: [
      {
        heading: "Dua bahasa tidak otomatis menyebabkan keterlambatan",
        paragraphs: [
          "Anak yang tumbuh dengan dua bahasa bisa mencapai milestone pada waktu yang sedikit berbeda, dan kosakatanya terbagi di antara bahasa-bahasa yang dipakai. Yang penting adalah kemampuan komunikasi total anak, bukan jumlah kata dalam satu bahasa.",
          "Jangan menyimpulkan bahwa keterlambatan disebabkan oleh dua bahasa. Bila ada kekhawatiran, kekhawatiran itu tetap perlu diperiksa, bukan dijelaskan sebagai “karena bilingual”.",
        ],
      },
      {
        heading: "Cara mengamati yang lebih adil",
        paragraphs: [
          "Hitung kemampuan anak dalam semua bahasa yang dia dengar dan pakai. Anak mungkin menamai benda dalam bahasa ibu, tetapi meminta dalam bahasa sekolah.",
          "Catat juga gestur dan pemahaman, karena keduanya bisa terlihat kuat walaupun produksi kata masih sedikit.",
        ],
        bullets: [
          "Tanyakan: apakah anak memahami instruksi dalam bahasa yang paling sering dipakai di rumah?",
          "Apakah anak menunjuk, mengangguk, atau membawa benda untuk menyampaikan maksud?",
          "Apakah ada orang dewasa yang konsisten memakai satu bahasa dengan anak?",
        ],
      },
      {
        heading: "Saran praktis",
        paragraphs: [
          "Tidak ada bukti bahwa mengurangi bahasa di rumah akan mempercepat bicara. Yang lebih penting adalah konsistensi, kualitas interaksi, dan paparan yang kaya dalam bahasa yang bermakna bagi keluarga.",
          "Saat berkonsultasi, sebutkan bahasa apa saja yang dipakai di rumah dan siapa yang memakai bahasa apa. Informasi ini membantu penilaian yang adil.",
        ],
      },
    ],
    sourceIds: ["asha-lle", "nidcd-milestones"],
    relatedActivitySlugs: ["komentar-singkat", "tambah-satu-kata"],
  },
  {
    id: "edu-05",
    slug: "teknik-pengasuh",
    title: "Teknik pengasuh yang didukung penelitian",
    dek: "Lima strategi yang dipakai dalam intervensi bahasa oleh orang tua, beserta batasnya.",
    readingMinutes: 8,
    sections: [
      {
        heading: "Apa yang ditunjukkan penelitian",
        paragraphs: [
          "Meta-analisis Roberts & Kaiser (2011) atas 18 studi menemukan intervensi bahasa yang dijalankan orang tua berdampak positif pada kemampuan bahasa reseptif dan ekspresif anak, dengan besar efek yang bervariasi antar hasil ukur.",
          "Meta-analisis Roberts dkk. (2019) atas 76 studi menemukan asosiasi moderat antara pelatihan orang tua dan perkembangan bahasa anak, serta asosiasi kuat pada peningkatan strategi yang dipakai orang tua.",
          "Kata “asosiasi” dan “rata-rata” penting: hasil satu anak tidak bisa dijanjikan dari angka populasi. Usia, kemampuan awal, kondisi anak, dan kualitas pelaksanaan ikut menentukan.",
        ],
      },
      {
        heading: "1. Mengikuti minat anak",
        paragraphs: [
          "Masuk ke kegiatan yang anak pilih membuat interaksi lebih mungkin bertahan. Anak belajar kata untuk hal yang benar-benar dia perhatikan.",
          "Caution: mengikuti minat bukan berarti membiarkan tanpa interaksi. Anda tetap hadir, memberi komentar, dan menunggu.",
        ],
      },
      {
        heading: "2. Menunggu dan memberi ruang",
        paragraphs: [
          "Jeda memberi anak kesempatan mengambil giliran. Banyak orang tua mengisi jeda terlalu cepat karena tidak nyaman dengan diam.",
          "Caution: jeda yang terlalu lama bisa membuat anak berhenti mencoba. Mulai dari dua sampai lima detik.",
        ],
      },
      {
        heading: "3. Menambah satu kata dan mengulang dengan model tepat",
        paragraphs: [
          "Ulangi ucapan anak dengan versi yang sedikit lebih lengkap, tanpa menyuruh mengulang. Ini memberi contoh yang bisa didengar, bukan koreksi.",
          "Caution: bila anak berhenti berbicara saat dikoreksi, hentikan koreksi dan kembali ke percakapan biasa.",
        ],
      },
      {
        heading: "4. Memberi pilihan",
        paragraphs: [
          "Dua pilihan yang jelas memberi anak alasan untuk berkomunikasi dan jalan keluar yang aman ketika kata belum tersedia.",
          "Caution: jangan jadikan pilihan sebagai ujian. Terima tunjuk, pandangan, atau gestur sebagai jawaban.",
        ],
      },
      {
        heading: "5. Membaca bersama secara interaktif",
        paragraphs: [
          "Bertanya tentang gambar, menunggu jawaban, dan menghubungkan cerita dengan pengalaman anak termasuk pendekatan yang diteliti (dialogic reading).",
          "Caution: berhenti sebelum anak bosan. Satu halaman yang dinikmati lebih baik daripada sepuluh halaman yang dipaksakan.",
        ],
      },
    ],
    sourceIds: ["roberts-kaiser-2011", "roberts-2019", "cdc-2y"],
    relatedActivitySlugs: [
      "ikuti-minat-anak",
      "tunggu-beri-ruang",
      "tambah-satu-kata",
      "buku-bergambar-tanya",
    ],
  },
  {
    id: "edu-06",
    slug: "stimulasi-dalam-rutinitas",
    title: "Stimulasi di rutinitas: makan, mandi, berpakaian, bermain",
    dek: "Latihan tidak perlu sesi khusus. Rutinitas yang sama setiap hari adalah tempat terbaik.",
    readingMinutes: 5,
    sections: [
      {
        heading: "Mengapa rutinitas",
        paragraphs: [
          "Rutinitas memberi anak urutan yang bisa diprediksi, sehingga kata yang sama muncul berulang dalam konteks yang sama. Pengulangan dalam konteks bermakna membantu pemahaman.",
          "Ini juga mengurangi kebutuhan waktu layar: interaksi terjadi sambil melakukan hal yang memang harus dilakukan.",
        ],
      },
      {
        heading: "Contoh per kegiatan",
        paragraphs: [
          "Tidak perlu menambahkan alat baru. Gunakan apa yang ada dan beri nama pada tindakan.",
        ],
        bullets: [
          "Makan: sebut nama makanan, tawarkan dua pilihan, tunggu isyarat sebelum membantu.",
          "Mandi: namai anggota tubuh, main tuang air, beri jeda sebelum menuang lagi.",
          "Berpakaian: sebut nama pakaian dan warnanya, biarkan anak memilih antara dua kaus.",
          "Membaca: ikuti halaman pilihan anak, tanyakan satu hal per halaman.",
          "Bermain: ikuti minat anak, tiru gerakannya, beri komentar pendek.",
          "Di luar rumah: tunjuk benda, beri nama, tunggu anak melihat ke arah yang sama.",
        ],
      },
      {
        heading: "Yang perlu dihindari",
        paragraphs: [
          "Hindari menjadikan setiap rutinitas sebagai latihan wajib. Bila anak lelah atau menolak, kembalikan rutinitas menjadi rutinitas biasa.",
          "Hindari juga latihan oral-motor yang tidak diminta profesional, seperti meniup lilin berulang sebagai “terapi”. Tidak ada bukti kuat bahwa latihan itu mengatasi keterlambatan bahasa.",
        ],
      },
    ],
    sourceIds: ["cdc-2y", "cdc-30m", "roberts-2019"],
    relatedActivitySlugs: ["nama-makanan-saat-makan", "ayo-bereskan-mainan", "komentar-singkat"],
  },
  {
    id: "edu-07",
    slug: "kapan-mencari-bantuan",
    title: "Kapan mencari bantuan profesional, dan apa yang diharapkan",
    dek: "Tanda yang perlu ditindaklanjuti, siapa yang ditemui, dan apa yang dibawa saat konsultasi.",
    readingMinutes: 7,
    sections: [
      {
        heading: "Segera bicarakan dengan dokter bila",
        paragraphs: [
          "Beberapa tanda tidak perlu ditunggu sampai jadwal kontrol berikutnya.",
        ],
        bullets: [
          "Anak kehilangan kemampuan yang sudah dimiliki (kata, gestur, atau keterampilan sosial).",
          "Ada kekhawatiran pendengaran, atau anak tidak menoleh saat dipanggil.",
          "Anak sulit memahami instruksi sederhana yang biasa dipakai di rumah.",
          "Ada kekhawatiran tentang interaksi sosial, bermain, atau berbagi minat.",
          "Milestone yang diharapkan belum terlihat, dan Anda merasa ada yang tidak sesuai.",
        ],
      },
      {
        heading: "Siapa yang bisa ditemui",
        paragraphs: [
          "Dokter anak atau dokter keluarga adalah pintu masuk untuk pemeriksaan tumbuh kembang dan rujukan. Audiolog menangani pemeriksaan pendengaran. Terapis wicara (speech-language pathologist) menangani penilaian dan intervensi bicara/bahasa.",
          "Di Indonesia, layanan tumbuh kembang anak tersedia di puskesmas, rumah sakit, dan klinik tumbuh kembang. Tanyakan jalur rujukan yang berlaku di daerah Anda.",
        ],
      },
      {
        heading: "Apa yang biasanya terjadi",
        paragraphs: [
          "Penilaian biasanya mencakup wawancara riwayat, observasi interaksi, pemeriksaan pendengaran, dan penilaian bahasa serta komunikasi sosial. Tidak ada satu tes tunggal yang menentukan segalanya.",
          "Bila disarankan terapi, tanyakan tujuan yang terukur, frekuensi, dan bagaimana Anda bisa melanjutkan di rumah.",
        ],
      },
      {
        heading: "Yang bisa dibawa",
        paragraphs: [
          "Bawa catatan observasi, bukan hanya ingatan. Modul ini menyediakan halaman laporan yang bisa dicetak untuk membantu percakapan dengan profesional.",
          "Sebutkan bahasa yang dipakai di rumah, riwayat pendengaran, dan contoh ucapan anak apa adanya — termasuk rekaman singkat bila Anda nyaman dan anak tidak terganggu.",
        ],
      },
    ],
    sourceIds: ["nidcd-milestones", "asha-lle", "aap-healthychildren"],
  },
  {
    id: "edu-08",
    slug: "aac-gestur-kartu",
    title: "AAC, gestur, dan kartu komunikasi",
    dek: "Komunikasi tidak harus berupa kata. Alat bantu komunikasi tidak menghambat bicara.",
    readingMinutes: 6,
    sections: [
      {
        heading: "Apa itu AAC",
        paragraphs: [
          "AAC (augmentative and alternative communication) mencakup semua bentuk komunikasi selain bicara: gestur, isyarat, papan gambar, buku komunikasi, hingga aplikasi dengan suara.",
          "ASHA menjelaskan AAC bisa dipakai sementara atau jangka panjang, dan pemilihannya merupakan bagian dari layanan terapis wicara.",
        ],
      },
      {
        heading: "Mitos yang perlu dikoreksi",
        paragraphs: [
          "Kekhawatiran umum adalah bahwa memberi kartu atau alat akan membuat anak malas bicara. ASHA secara eksplisit menyatakan AAC tidak menghambat perkembangan bicara, dan merujuk bukti bahwa AAC tidak memperlambat bicara pada tahap awal pemerolehan bahasa.",
          "Menyediakan jalan komunikasi justru mengurangi frustrasi dan memberi anak pengalaman bahwa komunikasi berhasil.",
        ],
      },
      {
        heading: "Cara memakai di rumah",
        paragraphs: [
          "Mulai dari sedikit kata inti yang sering dipakai: mau, lagi, selesai, bantu, buka, pergi. Model pemakaiannya saat Anda sendiri berkomunikasi, bukan hanya menyuruh anak memakainya.",
          "Letakkan kartu di tempat yang mudah dijangkau: meja makan, kamar mandi, tas. Konsistensi lebih penting daripada jumlah kartu.",
        ],
      },
      {
        heading: "Kapan perlu pendampingan",
        paragraphs: [
          "Untuk kebutuhan yang lebih kompleks, pemilihan sistem AAC dan pengajarannya sebaiknya dipandu terapis wicara. Modul ini hanya menyediakan latihan kartu sederhana dengan kata inti.",
        ],
      },
    ],
    sourceIds: ["asha-aac-ei", "roberts-2019"],
    relatedActivitySlugs: ["kartu-komunikasi-aku-mau", "tunjuk-atau-pilih"],
  },
  {
    id: "edu-09",
    slug: "mitos",
    title: "Mitos yang sering didengar orang tua",
    dek: "Sebelas anggapan umum, dan apa yang sebenarnya diketahui.",
    readingMinutes: 6,
    sections: [
      {
        heading: "Mitos seputar menunggu",
        paragraphs: [
          "“Nanti juga bisa sendiri” adalah nasihat yang berisiko bila ada kekhawatiran nyata. Sebagian anak memang menyusul, tetapi tidak ada cara memastikan anak Anda termasuk di antaranya tanpa pemantauan.",
        ],
        bullets: [
          "Mitos: anak laki-laki memang lebih lambat bicara, jadi tidak perlu diperiksa. Faktanya: risiko lebih tinggi pada laki-laki, bukan alasan menunda pemeriksaan.",
          "Mitos: dua bahasa menyebabkan keterlambatan. Faktanya: tidak. Keterlambatan tetap perlu dinilai.",
          "Mitos: tunggu sampai usia sekolah. Faktanya: dukungan lebih awal lebih bermanfaat bila memang dibutuhkan.",
        ],
      },
      {
        heading: "Mitos seputar latihan",
        paragraphs: [
          "Banyak “terapi” rumahan beredar tanpa dasar. Yang paling sering: latihan meniup, memijat wajah, atau menyuruh anak mengulang kata berkali-kali.",
        ],
        bullets: [
          "Mitos: meniup lilin menyembuhkan keterlambatan bicara. Faktanya: tidak ada bukti kuat sebagai terapi keterlambatan bahasa.",
          "Mitos: anak harus dipaksa mengulang sampai benar. Faktanya: paksaan bisa membuat anak menghindari bicara.",
          "Mitos: aplikasi bisa menggantikan terapis. Faktanya: aplikasi tidak bisa menegakkan diagnosis atau menilai kejelasan ucapan.",
        ],
      },
      {
        heading: "Mitos seputar layar dan alat bantu",
        paragraphs: [
          "Layar bukan penyebab tunggal, tetapi waktu layar yang banyak menggantikan interaksi mengurangi kesempatan belajar bahasa. CDC menyarankan pembatasan waktu layar untuk anak usia dini.",
        ],
        bullets: [
          "Mitos: kartu komunikasi membuat anak malas bicara. Faktanya: AAC tidak menghambat bicara.",
          "Mitos: anak yang belum bicara tidak perlu diajak bicara. Faktanya: paparan bahasa tetap penting.",
          "Mitos: jumlah kata di aplikasi menunjukkan kemampuan anak. Faktanya: hitungan otomatis bukan penilaian klinis.",
        ],
      },
    ],
    sourceIds: ["cdc-2y", "asha-aac-ei", "asha-lle", "nidcd-milestones"],
  },
  {
    id: "edu-10",
    slug: "glosarium-faq",
    title: "Glosarium & pertanyaan yang sering diajukan",
    dek: "Istilah teknis dalam bahasa sederhana, plus jawaban singkat untuk pertanyaan umum.",
    readingMinutes: 8,
    sections: [
      {
        heading: "Glosarium",
        paragraphs: ["Istilah berikut muncul di modul ini dan dalam percakapan dengan profesional."],
        bullets: [
          "Bicara (speech): produksi bunyi kata.",
          "Bahasa reseptif: kemampuan memahami kata dan instruksi.",
          "Bahasa ekspresif: kemampuan menyampaikan maksud dengan kata atau kalimat.",
          "Artikulasi: ketepatan bunyi tertentu.",
          "Late language emergence / late talker: istilah untuk anak yang kosakatanya sedikit dan belum menggabungkan kata pada usia tertentu.",
          "Milestone: keterampilan yang dilakukan sebagian besar anak pada usia tertentu (panduan pemantauan).",
          "AAC: alat atau cara komunikasi selain bicara.",
          "Terapis wicara: profesional yang menilai dan menangani gangguan bicara dan bahasa.",
          "Audiolog: profesional pemeriksaan pendengaran.",
        ],
      },
      {
        heading: "FAQ",
        paragraphs: ["Jawaban berikut bersifat umum dan tidak menggantikan konsultasi."],
        bullets: [
          "Apakah modul ini bisa mendiagnosis? Tidak. Modul ini menyusun latihan dan mencatat observasi.",
          "Apakah aplikasi bisa membuat anak bicara? Tidak ada jaminan. Latihan mendukung interaksi; hasil berbeda pada setiap anak.",
          "Apakah data anak diunggah? Tidak. Data disimpan di peramban perangkat ini dan bisa diekspor atau dihapus.",
          "Apakah saya harus latihan setiap hari? Tidak. Pilih ritme yang realistis dan sesuai arahan profesional.",
          "Apakah anak harus menyelesaikan level? Tidak ada level wajib. Level hanya urutan saran.",
          "Bagaimana bila anak menolak? Berhenti, kembali ke rutinitas biasa, dan coba lagi di lain waktu tanpa paksaan.",
          "Apakah kartu komunikasi akan memperlambat bicara? Tidak; bukti menunjukkan AAC tidak menghambat bicara.",
        ],
      },
      {
        heading: "Catatan pembaruan",
        paragraphs: [
          `Konten ini disusun dan diperiksa ulang terhadap sumber primer pada ${MEDICAL_CONTENT_REVIEWED_AT}.`,
          "Konten belum ditinjau oleh klinisi. Bila Anda seorang profesional dan menemukan ketidaksesuaian, perbaiki registri sumber di repositori agar semua halaman ikut diperbarui.",
        ],
      },
    ],
    sourceIds: ["asha-aac-ei", "asha-lle", "nidcd-milestones", "cdc-30m"],
  },
];

export const articleBySlug = new Map(
  educationArticles.map((article) => [article.slug, article]),
);

export function getArticle(slug: string): EducationArticle | undefined {
  return articleBySlug.get(slug);
}
