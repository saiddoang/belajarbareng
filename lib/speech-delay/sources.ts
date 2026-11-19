import type { SourceReference } from "./types";

/**
 * Verified on 2026-11-19 by opening each page and copying the statement below.
 * See SPEECH_DELAY_CONTENT_SOURCES.md for the claim-to-source matrix.
 */
export const MEDICAL_CONTENT_REVIEWED_AT = "2026-11-19";

export const CONTENT_DISCLAIMER =
  "Konten edukasi — bukan pengganti pemeriksaan profesional. Modul ini mendukung stimulasi komunikasi di rumah dan tidak menegakkan diagnosis.";

export const sources: SourceReference[] = [
  {
    id: "cdc-2y",
    title: "Milestones by 2 Years",
    publisher: "Centers for Disease Control and Prevention (CDC), Learn the Signs. Act Early.",
    url: "https://www.cdc.gov/act-early/milestones/2-years.html",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone komunikasi usia 2 tahun dan penegasan bahwa milestone adalah hal yang dilakukan sebagian besar anak (75% atau lebih) pada usia tertentu.",
    statement:
      "\"Developmental milestones are things most children (75% or more) can do by a certain age.\" Language/communication: \"Points to things in a book when you ask, like 'Where is the bear?'\"; \"Says at least two words together, like 'More milk.'\"; \"Points to at least two body parts when you ask him to show you\"; \"Uses more gestures than just waving and pointing, like blowing a kiss or nodding yes\".",
    scope:
      "Populasi umum anak Amerika Serikat yang berkembang tipikal; checklist pemantauan, bukan tes diagnostik.",
  },
  {
    id: "cdc-30m",
    title: "Milestones by 30 Months",
    publisher: "Centers for Disease Control and Prevention (CDC), Learn the Signs. Act Early.",
    url: "https://www.cdc.gov/act-early/milestones/30-months.html",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone komunikasi usia 30 bulan, termasuk menyebut benda di buku dan menggabungkan kata dengan kata kerja.",
    statement:
      "\"Says about 50 words\"; \"Says two or more words together, with one action word, like 'Doggie run'\"; \"Names things in a book when you point and ask, 'What is this?'\"; \"Says words like 'I,' 'me,' or 'we'\".",
    scope: "Checklist pemantauan populasi umum; jumlah kata dilaporkan orang tua.",
  },
  {
    id: "cdc-3y",
    title: "Milestones by 3 Years",
    publisher: "Centers for Disease Control and Prevention (CDC), Learn the Signs. Act Early.",
    url: "https://www.cdc.gov/act-early/milestones/3-years.html",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone komunikasi usia 3 tahun: percakapan dua arah, pertanyaan, kata kerja dalam gambar, nama diri.",
    statement:
      "\"Talks with you in conversation using at least two back-and-forth exchanges\"; \"Asks 'who,' 'what,' 'where,' or 'why' questions\"; \"Says what action is happening in a picture or book when asked\"; \"Says first name, when asked\"; \"Talks well enough for others to understand, most of the time\".",
    scope: "Checklist pemantauan populasi umum.",
  },
  {
    id: "cdc-4y",
    title: "Milestones by 4 Years",
    publisher: "Centers for Disease Control and Prevention (CDC), Learn the Signs. Act Early.",
    url: "https://www.cdc.gov/act-early/milestones/4-years.html",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone komunikasi usia 4 tahun: kalimat empat kata atau lebih, menceritakan kejadian hari itu, menjawab pertanyaan fungsi benda.",
    statement:
      "\"Says sentences with four or more words\"; \"Says some words from a song, story, or nursery rhyme\"; \"Talks about at least one thing that happened during her day, like 'I played soccer.'\"; \"Answers simple questions like 'What is a coat for?'\".",
    scope: "Checklist pemantauan populasi umum.",
  },
  {
    id: "cdc-5y",
    title: "Milestones by 5 Years",
    publisher: "Centers for Disease Control and Prevention (CDC), Learn the Signs. Act Early.",
    url: "https://www.cdc.gov/act-early/milestones/5-years.html",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone komunikasi usia 5 tahun: bercerita dua peristiwa, menjawab pertanyaan tentang cerita, percakapan lebih dari tiga giliran, rima sederhana.",
    statement:
      "\"Tells a story she heard or made up with at least two events\"; \"Answers simple questions about a book or story after you read or tell it to him\"; \"Keeps a conversation going with more than three back-and-forth exchanges\"; \"Uses or recognizes simple rhymes (bat-cat, ball-tall)\".",
    scope: "Checklist pemantauan populasi umum.",
  },
  {
    id: "asha-lle",
    title: "Late Language Emergence (Practice Portal)",
    publisher: "American Speech-Language-Hearing Association (ASHA)",
    url: "https://www.asha.org/practice-portal/clinical-topics/late-language-emergence/",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Definisi late talker yang lazim dipakai, faktor risiko, dan alasan assessment dini serta pemantauan berkala alih-alih menunggu.",
    statement:
      "\"An extensively used set of criteria for LLE is an expressive vocabulary of fewer than 50 words and no two-word combinations by 24 months of age\" ... \"Because children with late language emergence (LLE) remain at risk for later language and literacy problems, early assessment and periodic monitoring are essential.\" Typical pathway includes \"a complete audiologic assessment\" and \"periodic monitoring via screening and systematic observation\".",
    scope:
      "Anak monolingual bahasa Inggris; kriteria ini bukan alat diagnosis mandiri untuk anak bilingual atau konteks bahasa lain.",
  },
  {
    id: "aap-healthychildren",
    title: "Language Delays in Toddlers: Information for Parents",
    publisher: "American Academy of Pediatrics — HealthyChildren.org",
    url: "https://www.healthychildren.org/English/ages-stages/toddler/Pages/Language-Delay.aspx",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Peran pemeriksaan pendengaran dan evaluasi profesional ketika orang tua khawatir, dan bahwa variasi perkembangan tetap perlu dipantau.",
    statement:
      "Halaman AAP untuk orang tua menjelaskan tanda keterlambatan bahasa pada balita, menekankan pemeriksaan pendengaran dan evaluasi oleh profesional, serta bahwa intervensi dini membantu anak yang membutuhkan.",
    scope: "Materi edukasi orang tua, bukan alat skrining.",
  },
  {
    id: "nidcd-milestones",
    title: "Speech and Language Developmental Milestones",
    publisher: "National Institute on Deafness and Other Communication Disorders (NIDCD)",
    url: "https://www.nidcd.nih.gov/health/speech-and-language",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Milestone sebagai panduan pemantauan, kemungkinan penyebab termasuk gangguan pendengaran, dan anjuran berbicara dengan dokter bila ada kekhawatiran.",
    statement:
      "\"These milestones help doctors and other health professionals determine if a child is on track or if he or she may need extra help. Sometimes a delay may be caused by hearing loss, while other times it may be due to a speech or language disorder.\" \"Talk to your child's doctor if you have any concerns.\"",
    scope: "Checklist pemantauan pendengaran dan komunikasi usia 0–5 tahun.",
  },
  {
    id: "roberts-kaiser-2011",
    title:
      "The Effectiveness of Parent-Implemented Language Interventions: A Meta-Analysis",
    publisher: "Roberts, M. Y., & Kaiser, A. P. — American Journal of Speech-Language Pathology, 20(3), 180–199",
    url: "https://pubmed.ncbi.nlm.nih.gov/21478280/",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Dasar untuk menyebut strategi pengasuh sebagai pendekatan yang didukung penelitian, sekaligus batasnya (efek bervariasi antar hasil ukur).",
    statement:
      "\"18 studies\" ... \"parent-implemented language interventions have a significant, positive impact on receptive and expressive language skills of children with and without intellectual disabilities. Effect sizes (g) for child measures ranged from -0.15 to 0.82 depending on the outcome measure and comparison group.\"",
    scope:
      "Anak 18–60 bulan dengan gangguan bahasa primer/sekunder; efek pada satu anak tidak bisa dijamin dari angka rata-rata.",
  },
  {
    id: "roberts-2019",
    title:
      "Association of Parent Training With Child Language Development: A Systematic Review and Meta-analysis",
    publisher: "Roberts, M. Y., Curtis, P. R., Sone, B. J., & Hampton, L. H. — JAMA Pediatrics, 173(7), 631–640",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6537769/",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "Bukti bahwa pelatihan orang tua berhubungan dengan perkembangan bahasa anak dan peningkatan strategi orang tua, beserta besarnya asosiasi.",
    statement:
      "\"This systematic review and meta-analysis of 76 studies found that parent-implemented language interventions were associated with language development in children with or at risk of language impairment.\" \"Across all studies ... mean effect size for ... communication, engagement, and language outcomes was moderate (mean [SE] Hedges g, 0.33 [0.06])\"; parent use of language support strategies \"g, 0.55 [0.11]\".",
    scope:
      "76 studi, 5.848 partisipan; sebagian besar pendekatan naturalistik atau dialogic reading. Asosiasi, bukan jaminan hasil individual.",
  },
  {
    id: "asha-aac-ei",
    title: "Augmentative and Alternative Communication in Early Intervention",
    publisher: "American Speech-Language-Hearing Association (ASHA)",
    url: "https://www.asha.org/practice/early-intervention-provider-support/augmentative-and-alternative-communication-in-early-intervention/",
    accessedAt: "2026-11-19",
    reviewedAt: "2026-11-19",
    supports:
      "AAC (gestur, papan gambar, aplikasi) sebagai dukungan komunikasi yang tidak menghambat perkembangan bicara, dan cara memakainya dalam rutinitas.",
    statement:
      "\"AAC Does Not Hinder Speech Development\" ... \"The evidence strongly indicates that [AAC] does not hinder the development of speech at the very beginning stages of language acquisition\" ... \"Encourage caregivers to use AAC during play, mealtime, dressing, bedtime, etc.\" Core words begin with \"more, help, go, stop, and all done\".",
    scope: "Panduan layanan intervensi dini; pemilihan sistem AAC tetap individual dan dipandu terapis.",
  },
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));

export function getSource(id: string): SourceReference {
  const source = sourceById.get(id);
  if (!source) {
    throw new Error(`Unknown source id: ${id}`);
  }
  return source;
}
