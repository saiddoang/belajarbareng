import type { MilestoneItem } from "./types";

/**
 * CDC milestone checklists, quoted from the primary pages on 2026-11-19.
 * These are surveillance guides ("most children, 75% or more"), not pass/fail
 * tests, and they are kept separate from the caregiver's personalized goals.
 */
export const milestoneBands = [
  { ageMonths: 24, label: "2 tahun", sourceId: "cdc-2y" },
  { ageMonths: 30, label: "30 bulan", sourceId: "cdc-30m" },
  { ageMonths: 36, label: "3 tahun", sourceId: "cdc-3y" },
  { ageMonths: 48, label: "4 tahun", sourceId: "cdc-4y" },
  { ageMonths: 60, label: "5 tahun", sourceId: "cdc-5y" },
] as const;

export const milestoneItems: MilestoneItem[] = [
  // 2 years
  {
    id: "m2-points-book",
    ageMonths: 24,
    ageLabel: "2 tahun",
    domain: "language",
    text: "Menunjuk benda di buku saat diminta, misalnya “Mana beruangnya?”",
    sourceText: "Points to things in a book when you ask, like \"Where is the bear?\"",
    example: "Saat membaca bersama, anak menunjuk gambar saat Anda bertanya.",
    sourceId: "cdc-2y",
  },
  {
    id: "m2-two-words",
    ageMonths: 24,
    ageLabel: "2 tahun",
    domain: "language",
    text: "Mengucapkan setidaknya dua kata bersamaan, misalnya “Mau susu.”",
    sourceText: "Says at least two words together, like \"More milk.\"",
    example: "Kata bisa berupa isyarat + kata, atau dua kata yang disingkat.",
    sourceId: "cdc-2y",
  },
  {
    id: "m2-body-parts",
    ageMonths: 24,
    ageLabel: "2 tahun",
    domain: "language",
    text: "Menunjuk setidaknya dua anggota tubuh saat diminta.",
    sourceText: "Points to at least two body parts when you ask him to show you",
    sourceId: "cdc-2y",
  },
  {
    id: "m2-gestures",
    ageMonths: 24,
    ageLabel: "2 tahun",
    domain: "language",
    text: "Memakai gestur lebih dari sekadar melambai dan menunjuk, misalnya meniup ciuman atau mengangguk.",
    sourceText:
      "Uses more gestures than just waving and pointing, like blowing a kiss or nodding yes",
    sourceId: "cdc-2y",
  },
  {
    id: "m2-notices-hurt",
    ageMonths: 24,
    ageLabel: "2 tahun",
    domain: "social",
    text: "Menyadari saat orang lain sedih atau terluka, misalnya berhenti dan melihat.",
    sourceText:
      "Notices when others are hurt or upset, like pausing or looking sad when someone is crying",
    sourceId: "cdc-2y",
  },
  // 30 months
  {
    id: "m30-fifty-words",
    ageMonths: 30,
    ageLabel: "30 bulan",
    domain: "language",
    text: "Mengucapkan sekitar 50 kata.",
    sourceText: "Says about 50 words",
    example:
      "Hitung hanya kata yang benar-benar dipakai anak sendiri; kata dari dua bahasa boleh dihitung terpisah.",
    sourceId: "cdc-30m",
  },
  {
    id: "m30-action-combo",
    ageMonths: 30,
    ageLabel: "30 bulan",
    domain: "language",
    text: "Menggabungkan dua kata atau lebih dengan satu kata kerja, misalnya “Anjing lari.”",
    sourceText: "Says two or more words together, with one action word, like \"Doggie run\"",
    sourceId: "cdc-30m",
  },
  {
    id: "m30-names-book",
    ageMonths: 30,
    ageLabel: "30 bulan",
    domain: "language",
    text: "Menyebut benda di buku saat Anda menunjuk dan bertanya, “Ini apa?”",
    sourceText: "Names things in a book when you point and ask, \"What is this?\"",
    sourceId: "cdc-30m",
  },
  {
    id: "m30-pronouns",
    ageMonths: 30,
    ageLabel: "30 bulan",
    domain: "language",
    text: "Memakai kata seperti “aku”, “saya”, atau “kami/kita”.",
    sourceText: "Says words like \"I,\" \"me,\" or \"we\"",
    sourceId: "cdc-30m",
  },
  {
    id: "m30-two-step",
    ageMonths: 30,
    ageLabel: "30 bulan",
    domain: "language",
    text: "Mengikuti instruksi dua langkah, misalnya “Taruh mainannya, lalu tutup pintu.”",
    sourceText: "Follows two-step instructions like \"Put the toy down and close the door.\"",
    sourceId: "cdc-30m",
  },
  // 3 years
  {
    id: "m3-conversation",
    ageMonths: 36,
    ageLabel: "3 tahun",
    domain: "language",
    text: "Bercakap-cakap dengan Anda minimal dua kali giliran bolak-balik.",
    sourceText: "Talks with you in conversation using at least two back-and-forth exchanges",
    sourceId: "cdc-3y",
  },
  {
    id: "m3-questions",
    ageMonths: 36,
    ageLabel: "3 tahun",
    domain: "language",
    text: "Bertanya “siapa”, “apa”, “di mana”, atau “kenapa”.",
    sourceText: "Asks \"who,\" \"what,\" \"where,\" or \"why\" questions, like \"Where is mommy/daddy?\"",
    sourceId: "cdc-3y",
  },
  {
    id: "m3-action-picture",
    ageMonths: 36,
    ageLabel: "3 tahun",
    domain: "language",
    text: "Menyebut kegiatan yang terlihat di gambar atau buku, misalnya “lari”, “makan”.",
    sourceText:
      "Says what action is happening in a picture or book when asked, like \"running,\" \"eating,\" or \"playing\"",
    sourceId: "cdc-3y",
  },
  {
    id: "m3-first-name",
    ageMonths: 36,
    ageLabel: "3 tahun",
    domain: "language",
    text: "Menyebut nama panggilan atau nama depannya saat ditanya.",
    sourceText: "Says first name, when asked",
    sourceId: "cdc-3y",
  },
  {
    id: "m3-understood",
    ageMonths: 36,
    ageLabel: "3 tahun",
    domain: "language",
    text: "Berbicara cukup jelas sehingga orang lain paham sebagian besar waktunya.",
    sourceText: "Talks well enough for others to understand, most of the time",
    sourceId: "cdc-3y",
  },
  // 4 years
  {
    id: "m4-four-word",
    ageMonths: 48,
    ageLabel: "4 tahun",
    domain: "language",
    text: "Mengucapkan kalimat dengan empat kata atau lebih.",
    sourceText: "Says sentences with four or more words",
    sourceId: "cdc-4y",
  },
  {
    id: "m4-song-words",
    ageMonths: 48,
    ageLabel: "4 tahun",
    domain: "language",
    text: "Menyebut beberapa kata dari lagu, cerita, atau pantun.",
    sourceText: "Says some words from a song, story, or nursery rhyme",
    sourceId: "cdc-4y",
  },
  {
    id: "m4-day-story",
    ageMonths: 48,
    ageLabel: "4 tahun",
    domain: "language",
    text: "Menceritakan setidaknya satu hal yang terjadi hari itu, misalnya “Aku main bola.”",
    sourceText:
      "Talks about at least one thing that happened during her day, like \"I played soccer.\"",
    sourceId: "cdc-4y",
  },
  {
    id: "m4-function-question",
    ageMonths: 48,
    ageLabel: "4 tahun",
    domain: "language",
    text: "Menjawab pertanyaan sederhana seperti “Jaket untuk apa?”",
    sourceText: "Answers simple questions like \"What is a coat for?\" or \"What is a crayon for?\"",
    sourceId: "cdc-4y",
  },
  // 5 years
  {
    id: "m5-two-event-story",
    ageMonths: 60,
    ageLabel: "5 tahun",
    domain: "language",
    text: "Menceritakan cerita dengan setidaknya dua peristiwa.",
    sourceText:
      "Tells a story she heard or made up with at least two events. For example, a cat was stuck in a tree and a firefighter saved it",
    sourceId: "cdc-5y",
  },
  {
    id: "m5-story-questions",
    ageMonths: 60,
    ageLabel: "5 tahun",
    domain: "language",
    text: "Menjawab pertanyaan sederhana tentang cerita yang baru dibacakan.",
    sourceText:
      "Answers simple questions about a book or story after you read or tell it to him",
    sourceId: "cdc-5y",
  },
  {
    id: "m5-three-turns",
    ageMonths: 60,
    ageLabel: "5 tahun",
    domain: "language",
    text: "Menjaga percakapan lebih dari tiga giliran bolak-balik.",
    sourceText: "Keeps a conversation going with more than three back-and-forth exchanges",
    sourceId: "cdc-5y",
  },
  {
    id: "m5-rhyme",
    ageMonths: 60,
    ageLabel: "5 tahun",
    domain: "language",
    text: "Mengenali atau memakai rima sederhana (bola–sola tidak harus sempurna; bunyi akhir mirip).",
    sourceText: "Uses or recognizes simple rhymes (bat-cat, ball-tall)",
    sourceId: "cdc-5y",
  },
];

export function milestonesForAge(ageMonths: number): MilestoneItem[] {
  if (ageMonths < 30) return milestoneItems.filter((item) => item.ageMonths === 24);
  if (ageMonths < 36) return milestoneItems.filter((item) => item.ageMonths <= 30);
  if (ageMonths < 48) return milestoneItems.filter((item) => item.ageMonths <= 36);
  if (ageMonths < 60) return milestoneItems.filter((item) => item.ageMonths <= 48);
  return milestoneItems;
}

export const milestoneById = new Map(milestoneItems.map((item) => [item.id, item]));
