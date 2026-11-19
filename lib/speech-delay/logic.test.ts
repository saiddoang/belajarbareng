import { describe, expect, it } from "vitest";
import {
  buildBaselineResult,
  emptyAnswers,
  redFlagsFor,
  suggestedLevel,
} from "./baseline";
import {
  domainBreakdown,
  goalMovementPercent,
  goalStatusCounts,
  sessionsByWeek,
  startOfWeek,
  toISODate,
  uniqueDaysPracticed,
} from "./progress";
import { initialState, parseState, exportState } from "./storage";
import { activities } from "./activities";
import type {
  BaselineKey,
  BaselineValue,
  Goal,
  PracticeSession,
} from "./types";

function answers(overrides: Partial<Record<BaselineKey, BaselineValue>>) {
  return { ...emptyAnswers(), ...overrides };
}

const allYes = () =>
  answers({
    follows_instruction: "ya",
    points_to_show: "ya",
    gestures: "ya",
    requests_wants: "ya",
    functional_words: "ya",
    two_words: "ya",
    shared_play: "ya",
    name_response: "ya",
  });

describe("suggestedLevel", () => {
  it("starts at level 0 when nothing is reported", () => {
    expect(suggestedLevel(emptyAnswers())).toBe(0);
  });

  it("does not exceed level 1 without functional words", () => {
    expect(suggestedLevel(answers({ ...allYes(), functional_words: "kadang" }))).toBe(1);
    expect(suggestedLevel(answers({ ...allYes(), functional_words: "tidak" }))).toBe(1);
  });

  it("caps at level 2 without two-word combinations", () => {
    expect(suggestedLevel(answers({ ...allYes(), two_words: "kadang" }))).toBe(2);
  });

  it("reaches level 5 only with every gated skill reported", () => {
    expect(suggestedLevel(allYes())).toBe(5);
  });

  it("ignores concerns when computing the level", () => {
    const withConcerns = answers({
      ...allYes(),
      hearing_concern: "ya",
      regression: "ya",
      understanding_concern: "ya",
      social_concern: "ya",
    });
    expect(suggestedLevel(withConcerns)).toBe(5);
  });
});

describe("redFlagsFor", () => {
  it("flags only the four concern questions answered yes", () => {
    expect(redFlagsFor(emptyAnswers())).toEqual([]);
    expect(
      redFlagsFor(answers({ hearing_concern: "ya", regression: "ya" })),
    ).toEqual(["hearing_concern", "regression"]);
  });

  it("does not flag 'kadang' or 'tidak yakin' as a red flag", () => {
    expect(
      redFlagsFor(answers({ social_concern: "kadang", understanding_concern: "tidak_yakin" })),
    ).toEqual([]);
  });
});

describe("buildBaselineResult", () => {
  it("never produces a diagnosis, only a suggested level and slugs", () => {
    const result = buildBaselineResult({ id: "child-1" }, answers({ functional_words: "ya" }));
    expect(result.childId).toBe("child-1");
    expect(result.level).toBeGreaterThanOrEqual(0);
    expect(result.level).toBeLessThanOrEqual(5);
    expect(result.suggestedActivitySlugs.length).toBeGreaterThan(0);
    const slugs = new Set(activities.map((item) => item.slug));
    for (const slug of result.suggestedActivitySlugs) {
      expect(slugs.has(slug), slug).toBe(true);
    }
    expect(result.summary.toLowerCase()).not.toContain("diagnosis anak");
  });

  it("mentions unanswered questions and red flags in the summary", () => {
    const result = buildBaselineResult(
      { id: "child-2" },
      answers({ hearing_concern: "ya" }),
    );
    expect(result.summary).toContain("tidak yakin");
    expect(result.summary).toContain("dokter");
    expect(result.redFlags).toContain("hearing_concern");
  });
});

describe("parseState", () => {
  it("rejects non-objects, wrong versions and unknown shapes", () => {
    expect(parseState(null)).toBeNull();
    expect(parseState({})).toBeNull();
    expect(parseState({ version: 2 })).toBeNull();
    expect(parseState({ version: 1, children: "nope" })).not.toBeNull();
  });

  it("accepts a state written by this app", () => {
    const parsed = parseState(initialState);
    expect(parsed).not.toBeNull();
    expect(parsed?.version).toBe(1);
    expect(parsed?.children).toEqual([]);
  });

  it("drops records that belong to unknown children", () => {
    const parsed = parseState({
      version: 1,
      activeChildId: "child-a",
      children: [
        { id: "child-a", nickname: "A", ageMonths: 30, homeLanguages: ["Indonesia"], createdAt: "2026-01-01" },
      ],
      sessions: [
        { id: "s1", childId: "child-a", activityId: "a1", completedAt: "2026-01-02", response: "emerging" },
        { id: "s2", childId: "orphan", activityId: "a1", completedAt: "2026-01-02", response: "emerging" },
      ],
      goals: [],
      observations: [],
      reflections: [],
      goalReviews: [],
      baselines: [],
    });
    expect(parsed?.sessions).toHaveLength(1);
    expect(parsed?.sessions[0].id).toBe("s1");
  });

  it("fills missing settings with defaults", () => {
    const parsed = parseState({ version: 1, children: [] });
    expect(parsed?.settings.audioEnabled).toBe(true);
    expect(parsed?.settings.reviewRhythm).toBe("mingguan");
  });

  it("round-trips through export", () => {
    const json = exportState(initialState);
    const parsed = parseState(JSON.parse(json));
    expect(parsed?.version).toBe(1);
  });
});

describe("progress maths", () => {
  const now = new Date("2026-11-19T12:00:00");
  const session = (id: string, completedAt: string, activityId = "act-1"): PracticeSession => ({
    id,
    childId: "child-a",
    activityId,
    completedAt,
    response: "emerging",
  });

  it("startOfWeek returns Monday", () => {
    expect(startOfWeek(new Date("2026-11-19T10:00:00")).getDay()).toBe(1);
    expect(toISODate(startOfWeek(new Date("2026-11-22T10:00:00")))).toBe("2026-11-16");
  });

  it("buckets sessions into the correct weeks", () => {
    const data = sessionsByWeek(
      [
        session("1", "2026-11-19T09:00:00"),
        session("2", "2026-11-18T09:00:00"),
        session("3", "2026-11-05T09:00:00"),
      ],
      6,
      now,
    );
    expect(data).toHaveLength(6);
    expect(data[data.length - 1].count).toBe(2);
    expect(data.reduce((sum, item) => sum + item.count, 0)).toBe(3);
  });

  it("counts unique practice days", () => {
    expect(
      uniqueDaysPracticed([
        session("1", "2026-11-19T09:00:00"),
        session("2", "2026-11-19T18:00:00"),
        session("3", "2026-11-18T09:00:00"),
      ]),
    ).toBe(2);
  });

  it("computes goal status counts and movement percentage", () => {
    const goals: Goal[] = [
      {
        id: "g1",
        childId: "c",
        title: "a",
        baseline: "b",
        criterion: "c",
        situations: 1,
        status: "consistent",
        nextIdea: "n",
        createdAt: "2026-11-01",
        updatedAt: "2026-11-01",
      },
      {
        id: "g2",
        childId: "c",
        title: "a",
        baseline: "b",
        criterion: "c",
        situations: 1,
        status: "not_yet",
        nextIdea: "n",
        createdAt: "2026-11-01",
        updatedAt: "2026-11-01",
      },
      {
        id: "g3",
        childId: "c",
        title: "a",
        baseline: "b",
        criterion: "c",
        situations: 1,
        status: "emerging",
        nextIdea: "n",
        createdAt: "2026-11-01",
        updatedAt: "2026-11-01",
      },
    ];
    expect(goalStatusCounts(goals)).toEqual({
      not_observed: 0,
      not_yet: 1,
      emerging: 1,
      consistent: 1,
    });
    expect(goalMovementPercent(goals)).toBe(67);
    expect(goalMovementPercent([])).toBe(0);
  });

  it("breaks sessions down by domain and ignores unknown activities", () => {
    const data = domainBreakdown(
      [session("1", "2026-11-19T09:00:00", activities[0].id), session("2", "2026-11-19T09:00:00", "missing")],
      activities,
    );
    expect(data).toHaveLength(1);
    expect(data[0].domain).toBe(activities[0].domain);
    expect(data[0].count).toBe(1);
  });
});
