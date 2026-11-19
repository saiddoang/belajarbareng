import type {
  Activity,
  CommunicationDomain,
  Goal,
  ObservationStatus,
  PracticeSession,
  SkillObservation,
} from "./types";

export function toISODate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

/** Monday 00:00 local time of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = copy.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return copy;
}

export function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export interface WeeklyPractice {
  weekStart: string;
  label: string;
  count: number;
}

/** Practice sessions per week for the last `weeks` weeks, oldest first. */
export function sessionsByWeek(
  sessions: PracticeSession[],
  weeks = 8,
  now = new Date(),
): WeeklyPractice[] {
  const buckets: WeeklyPractice[] = [];
  const current = startOfWeek(now);

  for (let index = weeks - 1; index >= 0; index -= 1) {
    const start = new Date(current);
    start.setDate(start.getDate() - index * 7);
    buckets.push({
      weekStart: toISODate(start),
      label: start.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      count: 0,
    });
  }

  for (const session of sessions) {
    const date = new Date(session.completedAt);
    if (Number.isNaN(date.getTime())) continue;
    const weekStart = toISODate(startOfWeek(date));
    const bucket = buckets.find((item) => item.weekStart === weekStart);
    if (bucket) bucket.count += 1;
  }

  return buckets;
}

export interface DomainCount {
  domain: CommunicationDomain;
  count: number;
}

export function domainBreakdown(
  sessions: PracticeSession[],
  activities: Activity[],
): DomainCount[] {
  const byId = new Map(activities.map((activity) => [activity.id, activity]));
  const counts = new Map<CommunicationDomain, number>();

  for (const session of sessions) {
    const activity = byId.get(session.activityId);
    if (!activity) continue;
    counts.set(activity.domain, (counts.get(activity.domain) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count);
}

export function uniqueDaysPracticed(sessions: PracticeSession[]): number {
  const days = new Set(
    sessions.map((session) => session.completedAt.slice(0, 10)).filter(Boolean),
  );
  return days.size;
}

export function goalStatusCounts(goals: Goal[]): Record<ObservationStatus, number> {
  const counts: Record<ObservationStatus, number> = {
    not_observed: 0,
    not_yet: 0,
    emerging: 0,
    consistent: 0,
  };
  for (const goal of goals) counts[goal.status] += 1;
  return counts;
}

export function observationStatusCounts(
  observations: SkillObservation[],
  skillIds?: string[],
): Record<ObservationStatus, number> {
  const allowed = skillIds ? new Set(skillIds) : null;
  const counts: Record<ObservationStatus, number> = {
    not_observed: 0,
    not_yet: 0,
    emerging: 0,
    consistent: 0,
  };
  for (const observation of observations) {
    if (allowed && !allowed.has(observation.skillId)) continue;
    counts[observation.status] += 1;
  }
  return counts;
}

/** Share of the goals that are emerging or consistent, 0–100. */
export function goalMovementPercent(goals: Goal[]): number {
  if (goals.length === 0) return 0;
  const moving = goals.filter(
    (goal) => goal.status === "emerging" || goal.status === "consistent",
  ).length;
  return Math.round((moving / goals.length) * 100);
}

export function sessionsInLastDays(
  sessions: PracticeSession[],
  days: number,
  now = new Date(),
): PracticeSession[] {
  const threshold = new Date(now);
  threshold.setDate(threshold.getDate() - days);
  return sessions.filter((session) => {
    const date = new Date(session.completedAt);
    return !Number.isNaN(date.getTime()) && date >= threshold;
  });
}

export function latestByDate<T extends { observedAt?: string; completedAt?: string; createdAt: string }>(
  items: T[],
): T | null {
  if (items.length === 0) return null;
  return [...items].sort((a, b) => {
    const left = a.observedAt ?? a.completedAt ?? a.createdAt;
    const right = b.observedAt ?? b.completedAt ?? b.createdAt;
    return right.localeCompare(left);
  })[0];
}
