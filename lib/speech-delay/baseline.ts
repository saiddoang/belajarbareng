import type {
  BaselineKey,
  BaselineResult,
  BaselineValue,
  ChildProfile,
} from "./types";

export interface BaselineQuestion {
  key: BaselineKey;
  question: string;
  help?: string;
  kind: "skill" | "concern";
}

/**
 * Non-diagnostic functional questions. "Tidak yakin" is always available,
 * because caregivers often have not observed a behaviour yet.
 */
export const baselineQuestions: BaselineQuestion[] = [
  {
    key: "follows_instruction",
    question:
      "Apakah anak mengikuti instruksi sederhana yang biasa dipakai sehari-hari, misalnya “ambil sepatu” atau “taruh di sini”?",
    help: "Pikirkan instruksi tanpa gestur besar, di situasi yang familiar.",
    kind: "skill",
  },
  {
    key: "points_to_show",
    question:
      "Apakah anak menunjuk untuk menunjukkan sesuatu kepada Anda, bukan hanya menunjuk saat meminta?",
    help: "Menunjuk untuk berbagi minat berbeda dari menarik tangan Anda.",
    kind: "skill",
  },
  {
    key: "gestures",
    question:
      "Apakah anak memakai gestur seperti melambai, mengangguk, menggeleng, atau mengangkat tangan minta digendong?",
    kind: "skill",
  },
  {
    key: "requests_wants",
    question:
      "Apakah anak menyampaikan keinginannya dengan cara yang bisa Anda pahami (kata, gestur, suara, atau menunjuk)?",
    kind: "skill",
  },
  {
    key: "functional_words",
    question:
      "Apakah anak punya beberapa kata yang dipakai rutin untuk meminta atau menyebut hal yang dia suka?",
    help: "Kata boleh dari bahasa apa pun yang dipakai di rumah, termasuk kata yang belum jelas.",
    kind: "skill",
  },
  {
    key: "two_words",
    question:
      "Apakah anak pernah menggabungkan dua kata, misalnya “mau susu”, “mama pergi”, atau “buka ini”?",
    kind: "skill",
  },
  {
    key: "shared_play",
    question:
      "Apakah anak mau bermain bersama Anda sebentar, memperhatikan hal yang sama, dan bergantian?",
    kind: "skill",
  },
  {
    key: "name_response",
    question:
      "Apakah anak menoleh atau merespons saat namanya dipanggil dari dekat?",
    kind: "skill",
  },
  {
    key: "hearing_concern",
    question:
      "Apakah Anda punya kekhawatiran tentang pendengaran anak, atau pernah ada hasil pemeriksaan pendengaran yang belum normal?",
    help: "Kekhawatiran pendengaran perlu diperiksa lebih dahulu, terlepas dari hasil cek ini.",
    kind: "concern",
  },
  {
    key: "regression",
    question:
      "Apakah anak kehilangan kemampuan yang sebelumnya sudah dia miliki, misalnya berhenti memakai kata atau gestur yang dulu sering dipakai?",
    help: "Kehilangan kemampuan adalah alasan untuk segera berkonsultasi.",
    kind: "concern",
  },
  {
    key: "understanding_concern",
    question:
      "Apakah Anda khawatir anak sulit memahami pembicaraan atau instruksi dibanding anak seusianya?",
    kind: "concern",
  },
  {
    key: "social_concern",
    question:
      "Apakah Anda khawatir tentang cara anak berinteraksi sosial, bermain, atau berbagi minat dengan orang lain?",
    kind: "concern",
  },
];

export const baselineOptions: { value: BaselineValue; label: string }[] = [
  { value: "ya", label: "Ya, sering" },
  { value: "kadang", label: "Kadang-kadang" },
  { value: "tidak", label: "Belum pernah" },
  { value: "tidak_yakin", label: "Tidak yakin" },
];

const skillWeights: Record<BaselineValue, number> = {
  ya: 2,
  kadang: 1,
  tidak: 0,
  tidak_yakin: 0,
};

export const levelSuggestions: Record<
  0 | 1 | 2 | 3 | 4 | 5,
  { title: string; summary: string; slugs: string[] }
> = {
  0: {
    title: "Level 0 — Koneksi dan perhatian bersama",
    summary:
      "Titik mulai yang paling aman adalah kebersamaan: mengikuti minat anak, menunggu, dan memberi kesempatan komunikasi. Ini bukan penilaian kemampuan anak, hanya urutan latihan yang masuk akal.",
    slugs: [
      "ikuti-minat-anak",
      "tunggu-beri-ruang",
      "tatap-tunjuk-bersama",
      "bergantian-dorong-mobil",
    ],
  },
  1: {
    title: "Level 1 — Pemahaman kata familiar dan permintaan",
    summary:
      "Latihan diarahkan pada kata-kata yang dipakai sehari-hari, permintaan sederhana, dan gestur sebagai jalur komunikasi yang sah.",
    slugs: [
      "tunjuk-gambar-di-buku",
      "memberi-dua-pilihan",
      "minta-bantuan-saat-bermain",
      "tunjuk-atau-pilih",
    ],
  },
  2: {
    title: "Level 2 — Menambah kosakata dan mencoba menggabungkan kata",
    summary:
      "Latihan menekankan kata baru yang bermakna, pilihan, dan percobaan dua kata — tanpa menuntut pengucapan sempurna.",
    slugs: [
      "tambah-satu-kata",
      "dua-kata-fungsional",
      "cocokkan-benda-dan-gambar",
      "permainan-buka-tutup",
    ],
  },
  3: {
    title: "Level 3 — Kata kerja, kalimat pendek, instruksi",
    summary:
      "Latihan memperluas kata kerja dan deskripsi, lalu merangkainya dalam frasa pendek dan instruksi kontekstual.",
    slugs: [
      "siapa-apa-di-mana",
      "buku-bergambar-tanya",
      "pasangan-kata-kerja-benda",
      "instruksi-kontekstual",
    ],
  },
  4: {
    title: "Level 4 — Giliran bicara dan bercerita",
    summary:
      "Fokus pada percakapan dua arah, urutan kejadian, dan cerita pendek dari pengalaman nyata anak.",
    slugs: [
      "obrolan-dua-arah",
      "cerita-dari-foto",
      "urutan-aktivitas-harian",
      "main-peran-dapur",
    ],
  },
  5: {
    title: "Level 5 — Cerita, pragmatic, kesiapan sekolah",
    summary:
      "Latihan mendukung narasi yang lebih panjang, memahami cerita, dan keterampilan berinteraksi. Bila ada kekhawatiran kejelasan ucapan atau bahasa, tetap perlu penilaian terapis wicara.",
    slugs: [
      "urutan-aktivitas-harian",
      "cerita-dari-foto",
      "buku-bergambar-tanya",
      "obrolan-dua-arah",
    ],
  },
};

export function suggestedLevel(answers: Record<BaselineKey, BaselineValue>): 0 | 1 | 2 | 3 | 4 | 5 {
  const skillKeys: BaselineKey[] = [
    "follows_instruction",
    "points_to_show",
    "gestures",
    "requests_wants",
    "functional_words",
    "two_words",
    "shared_play",
    "name_response",
  ];
  const score = skillKeys.reduce((total, key) => total + skillWeights[answers[key]], 0);
  let level: 0 | 1 | 2 | 3 | 4 | 5;

  if (score <= 3) level = 0;
  else if (score <= 6) level = 1;
  else if (score <= 9) level = 2;
  else if (score <= 11) level = 3;
  else if (score <= 13) level = 4;
  else level = 5;

  // Functional words are the gate to anything beyond foundational practice.
  if (answers.functional_words !== "ya" && level > 1) level = 1;
  // Word combinations are a prerequisite for the sentence-level levels.
  if (answers.two_words !== "ya" && level > 2) level = 2;

  return level;
}

export function redFlagsFor(
  answers: Record<BaselineKey, BaselineValue>,
): BaselineKey[] {
  const concerns: BaselineKey[] = [
    "hearing_concern",
    "regression",
    "understanding_concern",
    "social_concern",
  ];
  return concerns.filter((key) => answers[key] === "ya");
}

export function buildBaselineResult(
  child: Pick<ChildProfile, "id">,
  answers: Record<BaselineKey, BaselineValue>,
  now = new Date(),
): BaselineResult {
  const level = suggestedLevel(answers);
  const suggestion = levelSuggestions[level];
  const redFlags = redFlagsFor(answers);
  const unknownCount = Object.values(answers).filter(
    (value) => value === "tidak_yakin",
  ).length;

  return {
    id: `baseline-${now.getTime()}`,
    childId: child.id,
    answers,
    level,
    summary: [
      suggestion.summary,
      unknownCount > 0
        ? `${unknownCount} pertanyaan dijawab “tidak yakin”. Amati dulu dalam kegiatan sehari-hari; tidak perlu menebak.`
        : null,
      redFlags.length > 0
        ? "Ada jawaban yang perlu dibicarakan dengan dokter atau terapis wicara. Lihat panduan rujukan."
        : null,
    ]
      .filter(Boolean)
      .join(" "),
    redFlags,
    suggestedActivitySlugs: suggestion.slugs,
    completedAt: now.toISOString(),
  };
}

export function emptyAnswers(): Record<BaselineKey, BaselineValue> {
  return {
    follows_instruction: "tidak_yakin",
    points_to_show: "tidak_yakin",
    gestures: "tidak_yakin",
    requests_wants: "tidak_yakin",
    functional_words: "tidak_yakin",
    two_words: "tidak_yakin",
    shared_play: "tidak_yakin",
    name_response: "tidak_yakin",
    hearing_concern: "tidak_yakin",
    regression: "tidak_yakin",
    understanding_concern: "tidak_yakin",
    social_concern: "tidak_yakin",
  };
}
