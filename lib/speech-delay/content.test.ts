import { describe, expect, it } from "vitest";
import { activities, filterActivities, getActivity } from "./activities";
import { educationArticles } from "./education";
import { milestoneItems, milestonesForAge } from "./milestones";
import { programLevels } from "./programs";
import { sources, sourceById } from "./sources";
import { activitiesA } from "./activities-a";
import { activitiesB } from "./activities-b";
import { starterWeek } from "./weekly-plan";

const sourceIds = new Set(sources.map((source) => source.id));

describe("activity registry", () => {
  it("contains at least 30 authored activities", () => {
    expect(activities.length).toBeGreaterThanOrEqual(30);
    expect(activitiesA.length + activitiesB.length).toBe(activities.length);
  });

  it("keeps ids and slugs unique", () => {
    expect(new Set(activities.map((item) => item.id)).size).toBe(activities.length);
    expect(new Set(activities.map((item) => item.slug)).size).toBe(activities.length);
  });

  it("gives every activity real dialogue, steps and observations", () => {
    for (const activity of activities) {
      expect(activity.dialogExamples.length, activity.slug).toBeGreaterThanOrEqual(3);
      expect(activity.parentSteps.length, activity.slug).toBeGreaterThanOrEqual(3);
      expect(activity.observations.length, activity.slug).toBeGreaterThanOrEqual(2);
      expect(activity.materials.length, activity.slug).toBeGreaterThanOrEqual(1);
      expect(activity.prerequisites.length, activity.slug).toBeGreaterThanOrEqual(1);
      expect(activity.objective.length, activity.slug).toBeGreaterThan(20);
      expect(activity.tipsDisengaged.length, activity.slug).toBeGreaterThan(10);
      expect(activity.lowPressureAlternative.length, activity.slug).toBeGreaterThan(10);
      expect(activity.level).toBeGreaterThanOrEqual(0);
      expect(activity.level).toBeLessThanOrEqual(5);
      expect(["mudah", "sedang", "perlu_pendampingan"]).toContain(activity.difficulty);
      expect(["supported_caregiver_strategy", "general_developmental_play", "requires_clinician_guidance"]).toContain(
        activity.evidenceLabel,
      );
    }
  });

  it("only cites registered sources", () => {
    for (const activity of activities) {
      expect(activity.sourceIds.length, activity.slug).toBeGreaterThan(0);
      for (const id of activity.sourceIds) {
        expect(sourceIds.has(id), `${activity.slug} -> ${id}`).toBe(true);
      }
    }
  });

  it("varies titles and setups instead of duplicating one shell", () => {
    expect(new Set(activities.map((item) => item.title)).size).toBe(activities.length);
    expect(new Set(activities.map((item) => item.setup)).size).toBe(activities.length);
    expect(new Set(activities.map((item) => item.objective)).size).toBe(activities.length);
  });

  it("filters by level, domain and free text", () => {
    expect(filterActivities({ level: 0 }).every((item) => item.level === 0)).toBe(true);
    expect(filterActivities({ domain: "kosakata" }).every((item) => item.domain === "kosakata")).toBe(true);
    expect(filterActivities({ query: "buku" }).some((item) => item.title.toLowerCase().includes("buku"))).toBe(true);
    expect(filterActivities({ query: "tidak-ada-kata-ini" })).toHaveLength(0);
  });

  it("resolves every slug used by programs, baseline suggestions and the weekly plan", () => {
    const slugs = new Set(activities.map((item) => item.slug));
    for (const program of programLevels) {
      for (const slug of program.activitySlugs) {
        expect(slugs.has(slug), `program L${program.level} -> ${slug}`).toBe(true);
      }
    }
    for (const day of starterWeek) {
      for (const slug of day.slugs) {
        expect(slugs.has(slug), `day ${day.day} -> ${slug}`).toBe(true);
      }
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getActivity("slug-yang-tidak-ada")).toBeUndefined();
  });
});

describe("CDC milestones", () => {
  it("covers 2y, 30m, 3y, 4y and 5y", () => {
    const ages = new Set(milestoneItems.map((item) => item.ageMonths));
    expect([...ages].sort((a, b) => a - b)).toEqual([24, 30, 36, 48, 60]);
  });

  it("keeps ids unique and quotes a registered CDC source", () => {
    expect(new Set(milestoneItems.map((item) => item.id)).size).toBe(milestoneItems.length);
    for (const item of milestoneItems) {
      expect(sourceById.has(item.sourceId), item.id).toBe(true);
      expect(item.sourceText.length, item.id).toBeGreaterThan(8);
      expect(item.sourceId.startsWith("cdc-"), item.id).toBe(true);
    }
  });

  it("returns cumulative milestones for a given age", () => {
    expect(milestonesForAge(20).every((item) => item.ageMonths === 24)).toBe(true);
    expect(milestonesForAge(24).every((item) => item.ageMonths === 24)).toBe(true);
    expect(milestonesForAge(40).some((item) => item.ageMonths === 36)).toBe(true);
    expect(milestonesForAge(40).some((item) => item.ageMonths === 48)).toBe(false);
    expect(milestonesForAge(72).length).toBe(milestoneItems.length);
  });
});

describe("education library", () => {
  it("has the ten required articles with unique slugs", () => {
    expect(educationArticles).toHaveLength(10);
    expect(new Set(educationArticles.map((item) => item.slug)).size).toBe(10);
  });

  it("gives every article body content, references and a reading time", () => {
    for (const article of educationArticles) {
      expect(article.sections.length, article.slug).toBeGreaterThanOrEqual(2);
      expect(article.readingMinutes, article.slug).toBeGreaterThan(0);
      expect(article.sourceIds.length, article.slug).toBeGreaterThan(0);
      for (const id of article.sourceIds) {
        expect(sourceIds.has(id), `${article.slug} -> ${id}`).toBe(true);
      }
      const text = article.sections
        .flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])])
        .join(" ");
      expect(text.length, article.slug).toBeGreaterThan(400);
    }
  });
});

describe("source registry", () => {
  it("records a URL, access date and scope for every source", () => {
    for (const source of sources) {
      expect(source.url.startsWith("https://"), source.id).toBe(true);
      expect(source.accessedAt, source.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.reviewedAt, source.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(source.scope.length, source.id).toBeGreaterThan(10);
      expect(source.statement.length, source.id).toBeGreaterThan(20);
    }
  });

  it("keeps ids unique", () => {
    expect(new Set(sources.map((source) => source.id)).size).toBe(sources.length);
  });
});
