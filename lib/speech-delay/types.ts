/**
 * Data model for the parent-facing speech & language development hub.
 *
 * Everything here describes home stimulation practice. Nothing in this
 * module produces a diagnosis, a clinical score, or a predicted outcome.
 */

export type CommunicationDomain =
  | "koneksi"
  | "pemahaman"
  | "kosakata"
  | "ungkapan"
  | "kalimat"
  | "percakapan"
  | "gestur_aac"
  | "main_peran";

export type EvidenceLabel =
  | "supported_caregiver_strategy"
  | "general_developmental_play"
  | "requires_clinician_guidance";

export type ObservationStatus =
  | "not_observed"
  | "not_yet"
  | "emerging"
  | "consistent";

export type IllustrationKey =
  | "buku"
  | "mobil"
  | "bola"
  | "balok"
  | "boneka"
  | "dapur"
  | "makan"
  | "tubuh"
  | "hewan"
  | "kartu";

export interface SourceReference {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** ISO date the agent opened the page and copied the statement from. */
  accessedAt: string;
  /** ISO date the quoted statement was re-checked. */
  reviewedAt: string;
  /** The claim this source is used for, in Indonesian. */
  supports: string;
  /** Direct quotation or close paraphrase, kept in the source language. */
  statement: string;
  scope: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  /** Functional level 0–5. Assigned by observed communication, not age. */
  level: 0 | 1 | 2 | 3 | 4 | 5;
  domain: CommunicationDomain;
  /** Reference age band to browse with; not a requirement to start. */
  ageReference: string;
  objective: string;
  difficulty: "mudah" | "sedang" | "perlu_pendampingan";
  prerequisites: string[];
  materials: string[];
  setup: string;
  parentSteps: string[];
  /** At least three concrete parent–child exchanges in Bahasa Indonesia. */
  dialogExamples: string[];
  /** Spontaneous behaviours to watch for, never verbal tests to force. */
  observations: string[];
  duration: string;
  tipsDisengaged: string;
  lowPressureAlternative: string;
  evidenceLabel: EvidenceLabel;
  sourceIds: string[];
  illustration: IllustrationKey;
}

export interface MilestoneItem {
  id: string;
  ageMonths: number;
  ageLabel: string;
  domain: "language" | "social";
  /** Indonesian parent-facing wording. */
  text: string;
  /** Verbatim wording from the CDC checklist. */
  sourceText: string;
  example?: string;
  sourceId: string;
}

export interface ChildProfile {
  id: string;
  nickname: string;
  ageMonths: number;
  homeLanguages: string[];
  caregiverNote?: string;
  createdAt: string;
}

export interface SkillObservation {
  id: string;
  childId: string;
  /** Milestone id or goal id. */
  skillId: string;
  status: ObservationStatus;
  observedAt: string;
  note?: string;
}

export interface PracticeSession {
  id: string;
  childId: string;
  activityId: string;
  completedAt: string;
  response: ObservationStatus;
  note?: string;
}

export interface Goal {
  id: string;
  childId: string;
  title: string;
  /** What the child did before practice started. */
  baseline: string;
  /** Observable, everyday criterion — not a test score. */
  criterion: string;
  /** In how many different real situations it has been seen. */
  situations: number;
  status: ObservationStatus;
  nextIdea: string;
  activitySlug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reflection {
  id: string;
  childId: string;
  /** Monday of the reviewed week, ISO date. */
  weekOf: string;
  wins: string;
  concerns: string;
  nextWeek: string;
  createdAt: string;
}

export interface GoalReview {
  id: string;
  childId: string;
  /** First day of the reviewed month, ISO date. */
  monthOf: string;
  summary: string;
  decision: "lanjut" | "ubah" | "istirahat" | "konsultasi";
  createdAt: string;
}

export type BaselineKey =
  | "follows_instruction"
  | "points_to_show"
  | "gestures"
  | "requests_wants"
  | "functional_words"
  | "two_words"
  | "shared_play"
  | "name_response"
  | "hearing_concern"
  | "regression"
  | "understanding_concern"
  | "social_concern";

export type BaselineValue = "ya" | "kadang" | "tidak" | "tidak_yakin";

export interface BaselineResult {
  id: string;
  childId: string;
  answers: Record<BaselineKey, BaselineValue>;
  level: 0 | 1 | 2 | 3 | 4 | 5;
  summary: string;
  redFlags: BaselineKey[];
  suggestedActivitySlugs: string[];
  completedAt: string;
}

export interface AppSettings {
  /** Opt-in browser speech synthesis for prompt playback. */
  audioEnabled: boolean;
  showEnglishSourceText: boolean;
  reviewRhythm: "mingguan" | "dua_mingguan" | "bulanan";
}

export interface AppState {
  version: 1;
  activeChildId: string | null;
  children: ChildProfile[];
  sessions: PracticeSession[];
  observations: SkillObservation[];
  goals: Goal[];
  reflections: Reflection[];
  goalReviews: GoalReview[];
  baselines: BaselineResult[];
  settings: AppSettings;
}

export const DOMAIN_LABELS: Record<CommunicationDomain, string> = {
  koneksi: "Koneksi & perhatian bersama",
  pemahaman: "Pemahaman bahasa",
  kosakata: "Kosakata",
  ungkapan: "Menyampaikan keinginan",
  kalimat: "Merangkai kata",
  percakapan: "Percakapan & cerita",
  gestur_aac: "Gestur & kartu komunikasi",
  main_peran: "Main peran",
};

export const EVIDENCE_LABELS: Record<
  EvidenceLabel,
  { label: string; note: string }
> = {
  supported_caregiver_strategy: {
    label: "Strategi pengasuh yang didukung penelitian",
    note: "Strategi ini termasuk pendekatan yang diteliti dalam intervensi bahasa oleh pengasuh. Efek pada anak bervariasi menurut usia, kemampuan awal, kondisi, dan kualitas pelaksanaan.",
  },
  general_developmental_play: {
    label: "Saran bermain & stimulasi umum",
    note: "Kegiatan ini masuk akal secara perkembangan dan lazim disarankan, tetapi belum diuji sebagai protokol tersendiri. Anggap sebagai ide bermain, bukan resep terapi.",
  },
  requires_clinician_guidance: {
    label: "Perlu arahan tenaga profesional",
    note: "Bagian ini menyentuh kebutuhan individual (mis. kejelasan ucapan atau alat komunikasi khusus). Lakukan hanya dengan pendampingan terapis wicara atau dokter anak.",
  },
};

export const STATUS_LABELS: Record<ObservationStatus, string> = {
  not_observed: "Belum diamati",
  not_yet: "Belum terlihat",
  emerging: "Mulai muncul",
  consistent: "Konsisten",
};
