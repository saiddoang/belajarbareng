"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AppSettings,
  AppState,
  BaselineResult,
  ChildProfile,
  Goal,
  GoalReview,
  ObservationStatus,
  PracticeSession,
  Reflection,
  SkillObservation,
} from "./types";
import {
  clearState,
  exportState,
  initialState,
  loadState,
  makeId,
  parseState,
  saveState,
} from "./storage";

interface StoreValue {
  ready: boolean;
  state: AppState;
  error: string | null;
  activeChild: ChildProfile | null;
  children: ChildProfile[];
  addChild: (input: {
    nickname: string;
    ageMonths: number;
    homeLanguages: string[];
    caregiverNote?: string;
  }) => ChildProfile;
  updateChild: (id: string, patch: Partial<ChildProfile>) => void;
  removeChild: (id: string) => void;
  setActiveChild: (id: string) => void;
  saveBaseline: (result: BaselineResult) => void;
  logSession: (input: {
    activityId: string;
    response: ObservationStatus;
    note?: string;
  }) => void;
  removeSession: (id: string) => void;
  setMilestoneObservation: (
    milestoneId: string,
    status: ObservationStatus,
    note?: string,
  ) => void;
  addGoal: (input: Omit<Goal, "id" | "childId" | "createdAt" | "updatedAt" | "situations"> & { situations?: number }) => Goal;
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  addReflection: (input: Omit<Reflection, "id" | "childId" | "createdAt">) => void;
  addGoalReview: (input: Omit<GoalReview, "id" | "childId" | "createdAt">) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  importJson: (raw: string) => { ok: boolean; error?: string };
  exportJson: () => string;
  resetAll: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function SpeechStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const result = loadState();
    setState(result.state);
    setError(result.error);
    setReady(true);
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!ready || !loaded.current || state === initialState) return;
    const failure = saveState(state);
    if (failure) setError(failure);
  }, [state, ready]);

  const activeChild = useMemo(
    () => state.children.find((child) => child.id === state.activeChildId) ?? null,
    [state.children, state.activeChildId],
  );

  const addChild = useCallback<StoreValue["addChild"]>((input) => {
    const child: ChildProfile = {
      id: makeId("child"),
      nickname: input.nickname.trim() || "Anak",
      ageMonths: Math.max(0, Math.round(input.ageMonths)),
      homeLanguages: input.homeLanguages.length > 0 ? input.homeLanguages : ["Indonesia"],
      caregiverNote: input.caregiverNote?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    setState((previous) => ({
      ...previous,
      children: [...previous.children, child],
      activeChildId: child.id,
    }));
    return child;
  }, []);

  const updateChild = useCallback<StoreValue["updateChild"]>((id, patch) => {
    setState((previous) => ({
      ...previous,
      children: previous.children.map((child) =>
        child.id === id ? { ...child, ...patch, id: child.id } : child,
      ),
    }));
  }, []);

  const removeChild = useCallback<StoreValue["removeChild"]>((id) => {
    setState((previous) => {
      const children = previous.children.filter((child) => child.id !== id);
      return {
        ...previous,
        children,
        activeChildId:
          previous.activeChildId === id ? (children[0]?.id ?? null) : previous.activeChildId,
        sessions: previous.sessions.filter((item) => item.childId !== id),
        observations: previous.observations.filter((item) => item.childId !== id),
        goals: previous.goals.filter((item) => item.childId !== id),
        reflections: previous.reflections.filter((item) => item.childId !== id),
        goalReviews: previous.goalReviews.filter((item) => item.childId !== id),
        baselines: previous.baselines.filter((item) => item.childId !== id),
      };
    });
  }, []);

  const setActiveChild = useCallback<StoreValue["setActiveChild"]>((id) => {
    setState((previous) => ({ ...previous, activeChildId: id }));
  }, []);

  const saveBaseline = useCallback<StoreValue["saveBaseline"]>((result) => {
    setState((previous) => ({
      ...previous,
      baselines: [
        ...previous.baselines.filter((item) => item.childId !== result.childId),
        result,
      ],
    }));
  }, []);

  const logSession = useCallback<StoreValue["logSession"]>(
    ({ activityId, response, note }) => {
      setState((previous) => {
        const childId = previous.activeChildId;
        if (!childId) return previous;
        const session: PracticeSession = {
          id: makeId("session"),
          childId,
          activityId,
          completedAt: new Date().toISOString(),
          response,
          note: note?.trim() || undefined,
        };
        return { ...previous, sessions: [...previous.sessions, session] };
      });
    },
    [],
  );

  const removeSession = useCallback<StoreValue["removeSession"]>((id) => {
    setState((previous) => ({
      ...previous,
      sessions: previous.sessions.filter((session) => session.id !== id),
    }));
  }, []);

  const setMilestoneObservation = useCallback<StoreValue["setMilestoneObservation"]>(
    (milestoneId, status, note) => {
      setState((previous) => {
        const childId = previous.activeChildId;
        if (!childId) return previous;
        const observation: SkillObservation = {
          id: makeId("obs"),
          childId,
          skillId: milestoneId,
          status,
          observedAt: new Date().toISOString().slice(0, 10),
          note: note?.trim() || undefined,
        };
        return {
          ...previous,
          observations: [
            ...previous.observations.filter(
              (item) => !(item.childId === childId && item.skillId === milestoneId),
            ),
            observation,
          ],
        };
      });
    },
    [],
  );

  const addGoal = useCallback<StoreValue["addGoal"]>((input) => {
    const now = new Date().toISOString();
    const goal: Goal = {
      id: makeId("goal"),
      childId: "",
      title: input.title.trim(),
      baseline: input.baseline.trim(),
      criterion: input.criterion.trim(),
      situations: input.situations ?? 1,
      status: input.status,
      nextIdea: input.nextIdea.trim(),
      activitySlug: input.activitySlug,
      createdAt: now,
      updatedAt: now,
    };
    setState((previous) => {
      if (!previous.activeChildId) return previous;
      return {
        ...previous,
        goals: [...previous.goals, { ...goal, childId: previous.activeChildId }],
      };
    });
    return goal;
  }, []);

  const updateGoal = useCallback<StoreValue["updateGoal"]>((id, patch) => {
    setState((previous) => ({
      ...previous,
      goals: previous.goals.map((goal) =>
        goal.id === id
          ? { ...goal, ...patch, id: goal.id, updatedAt: new Date().toISOString() }
          : goal,
      ),
    }));
  }, []);

  const removeGoal = useCallback<StoreValue["removeGoal"]>((id) => {
    setState((previous) => ({
      ...previous,
      goals: previous.goals.filter((goal) => goal.id !== id),
    }));
  }, []);

  const addReflection = useCallback<StoreValue["addReflection"]>((input) => {
    setState((previous) => {
      if (!previous.activeChildId) return previous;
      const reflection: Reflection = {
        ...input,
        id: makeId("reflection"),
        childId: previous.activeChildId,
        createdAt: new Date().toISOString(),
      };
      return { ...previous, reflections: [...previous.reflections, reflection] };
    });
  }, []);

  const addGoalReview = useCallback<StoreValue["addGoalReview"]>((input) => {
    setState((previous) => {
      if (!previous.activeChildId) return previous;
      const review: GoalReview = {
        ...input,
        id: makeId("review"),
        childId: previous.activeChildId,
        createdAt: new Date().toISOString(),
      };
      return { ...previous, goalReviews: [...previous.goalReviews, review] };
    });
  }, []);

  const updateSettings = useCallback<StoreValue["updateSettings"]>((patch) => {
    setState((previous) => ({
      ...previous,
      settings: { ...previous.settings, ...patch },
    }));
  }, []);

  const importJson = useCallback<StoreValue["importJson"]>((raw) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { ok: false, error: "Berkas bukan JSON yang valid." };
    }
    const next = parseState(parsed);
    if (!next) {
      return {
        ok: false,
        error:
          "Struktur berkas tidak dikenali. Gunakan berkas ekspor dari modul ini (versi 1).",
      };
    }
    setState(next);
    setError(null);
    return { ok: true };
  }, []);

  const exportJson = useCallback(() => exportState(state), [state]);

  const resetAll = useCallback(() => {
    clearState();
    setState(initialState);
    setError(null);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ready,
      state,
      error,
      activeChild,
      children: state.children,
      addChild,
      updateChild,
      removeChild,
      setActiveChild,
      saveBaseline,
      logSession,
      removeSession,
      setMilestoneObservation,
      addGoal,
      updateGoal,
      removeGoal,
      addReflection,
      addGoalReview,
      updateSettings,
      importJson,
      exportJson,
      resetAll,
    }),
    [
      ready,
      state,
      error,
      activeChild,
      addChild,
      updateChild,
      removeChild,
      setActiveChild,
      saveBaseline,
      logSession,
      removeSession,
      setMilestoneObservation,
      addGoal,
      updateGoal,
      removeGoal,
      addReflection,
      addGoalReview,
      updateSettings,
      importJson,
      exportJson,
      resetAll,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useSpeechStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useSpeechStore must be used inside SpeechStoreProvider");
  }
  return context;
}
