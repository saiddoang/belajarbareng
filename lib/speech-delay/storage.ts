import type {
  AppSettings,
  AppState,
  BaselineResult,
  ChildProfile,
  Goal,
  GoalReview,
  PracticeSession,
  Reflection,
  SkillObservation,
} from "./types";

export const STORAGE_KEY = "speech-delay:v1";

export const defaultSettings: AppSettings = {
  audioEnabled: true,
  showEnglishSourceText: false,
  reviewRhythm: "mingguan",
};

export const initialState: AppState = {
  version: 1,
  activeChildId: null,
  children: [],
  sessions: [],
  observations: [],
  goals: [],
  reflections: [],
  goalReviews: [],
  baselines: [],
  settings: defaultSettings,
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asArray<T>(value: unknown, guard: (item: unknown) => item is T): T[] {
  return Array.isArray(value) ? value.filter(guard) : [];
}

const isChild = (value: unknown): value is ChildProfile =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.nickname === "string" &&
  typeof value.ageMonths === "number" &&
  Array.isArray(value.homeLanguages) &&
  typeof value.createdAt === "string";

const isSession = (value: unknown): value is PracticeSession =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.activityId === "string" &&
  typeof value.completedAt === "string" &&
  typeof value.response === "string";

const isObservation = (value: unknown): value is SkillObservation =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.skillId === "string" &&
  typeof value.status === "string" &&
  typeof value.observedAt === "string";

const isGoal = (value: unknown): value is Goal =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.title === "string" &&
  typeof value.status === "string";

const isReflection = (value: unknown): value is Reflection =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.weekOf === "string";

const isGoalReview = (value: unknown): value is GoalReview =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.monthOf === "string";

const isBaseline = (value: unknown): value is BaselineResult =>
  isObject(value) &&
  typeof value.id === "string" &&
  typeof value.childId === "string" &&
  typeof value.level === "number" &&
  typeof value.completedAt === "string";

/** Validates an untrusted object (imported file or stored JSON). */
export function parseState(raw: unknown): AppState | null {
  if (!isObject(raw) || raw.version !== 1) return null;

  const children = asArray(raw.children, isChild);
  const ids = new Set(children.map((child) => child.id));
  const belongsToKnownChild = (childId: string) => ids.has(childId);

  const activeChildId =
    typeof raw.activeChildId === "string" && ids.has(raw.activeChildId)
      ? raw.activeChildId
      : (children[0]?.id ?? null);

  const settings = isObject(raw.settings)
    ? {
        audioEnabled:
          typeof raw.settings.audioEnabled === "boolean"
            ? raw.settings.audioEnabled
            : defaultSettings.audioEnabled,
        showEnglishSourceText:
          typeof raw.settings.showEnglishSourceText === "boolean"
            ? raw.settings.showEnglishSourceText
            : defaultSettings.showEnglishSourceText,
        reviewRhythm:
          raw.settings.reviewRhythm === "mingguan" ||
          raw.settings.reviewRhythm === "dua_mingguan" ||
          raw.settings.reviewRhythm === "bulanan"
            ? raw.settings.reviewRhythm
            : defaultSettings.reviewRhythm,
      }
    : { ...defaultSettings };

  return {
    version: 1,
    activeChildId,
    children,
    sessions: asArray(raw.sessions, isSession).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    observations: asArray(raw.observations, isObservation).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    goals: asArray(raw.goals, isGoal).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    reflections: asArray(raw.reflections, isReflection).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    goalReviews: asArray(raw.goalReviews, isGoalReview).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    baselines: asArray(raw.baselines, isBaseline).filter((item) =>
      belongsToKnownChild(item.childId),
    ),
    settings,
  };
}

export function loadState(): { state: AppState; error: string | null } {
  if (typeof window === "undefined") {
    return { state: initialState, error: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { state: initialState, error: null };
    const parsed = parseState(JSON.parse(raw));
    if (!parsed) {
      return {
        state: initialState,
        error:
          "Data tersimpan tidak dapat dibaca (format lama atau rusak). Data tidak ditimpa sampai Anda memilih untuk mengatur ulang.",
      };
    }
    return { state: parsed, error: null };
  } catch {
    return {
      state: initialState,
      error:
        "Penyimpanan lokal tidak dapat dibaca di perangkat ini. Anda tetap bisa memakai modul, tetapi progres tidak akan tersimpan.",
    };
  }
}

export function saveState(state: AppState): string | null {
  if (typeof window === "undefined") return null;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return null;
  } catch {
    return "Gagal menyimpan: ruang penyimpanan penuh atau diblokir peramban.";
  }
}

export function clearState(): string | null {
  if (typeof window === "undefined") return null;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    return "Gagal menghapus data dari perangkat ini.";
  }
}

export function exportState(state: AppState): string {
  return JSON.stringify(
    { ...state, exportedAt: new Date().toISOString(), app: "speech-language-hub" },
    null,
    2,
  );
}

export function makeId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `${prefix}-${random}`;
}
