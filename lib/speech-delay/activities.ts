import { activitiesA } from "./activities-a";
import { activitiesB } from "./activities-b";
import type { Activity, CommunicationDomain } from "./types";

export const activities: Activity[] = [...activitiesA, ...activitiesB];

export const activityBySlug = new Map(
  activities.map((activity) => [activity.slug, activity]),
);

export const activityById = new Map(
  activities.map((activity) => [activity.id, activity]),
);

export function getActivity(slug: string): Activity | undefined {
  return activityBySlug.get(slug);
}

export function activitiesForLevel(level: 0 | 1 | 2 | 3 | 4 | 5): Activity[] {
  return activities.filter((activity) => activity.level === level);
}

export function nextActivity(slug: string): Activity | undefined {
  const index = activities.findIndex((activity) => activity.slug === slug);
  if (index === -1) return undefined;
  return activities[(index + 1) % activities.length];
}

export interface ActivityFilter {
  query?: string;
  level?: number | "all";
  domain?: CommunicationDomain | "all";
  ageMonths?: number;
}

export function filterActivities({
  query = "",
  level = "all",
  domain = "all",
  ageMonths,
}: ActivityFilter): Activity[] {
  const needle = query.trim().toLowerCase();

  return activities.filter((activity) => {
    if (level !== "all" && activity.level !== level) return false;
    if (domain !== "all" && activity.domain !== domain) return false;
    if (ageMonths !== undefined) {
      // Browsing hint only: a child can always use a lower level safely.
      if (ageMonths < 24 && activity.level > 1) return false;
    }
    if (!needle) return true;
    const haystack = [
      activity.title,
      activity.objective,
      activity.ageReference,
      activity.domain,
      activity.materials.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
