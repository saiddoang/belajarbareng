/**
 * PLACEHOLDER CASE STUDIES.
 *
 * These three projects are written to show the format, not to ship. Replace
 * every field with a real project: the problem, your actual role, the steps you
 * took, and results you can defend in an interview. Never publish a number you
 * cannot explain. Set `placeholder: false` once a project is real — the site
 * stops marking it as sample content.
 */

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  metrics: { value: string; label: string }[];
  story: {
    problem: string;
    myRole: string;
    approach: { title: string; body: string }[];
    outcome: string;
  };
  links?: { href: string; kind: "live" | "repository" }[];
  placeholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "ledger-dashboard",
    title: "Ledger: cutting dashboard load from 6.2s to 1.4s",
    year: "2025",
    role: "Lead frontend engineer",
    summary:
      "Rebuilt a slow reporting dashboard around server components and cached queries, so account managers stopped exporting to spreadsheets.",
    tags: ["Next.js", "TypeScript", "Postgres"],
    metrics: [
      { value: "−78%", label: "p95 load time" },
      { value: "+31%", label: "weekly active accounts" },
      { value: "3 → 11", label: "teams onboarded" },
    ],
    story: {
      problem:
        "[Who used this dashboard, what decision they made with it, and why the old version failed them — the 6.2s figure itself, the support tickets, the workarounds.]",
      myRole:
        "[What you owned: the technical plan, the migration, the team split, the stakeholder conversations. Be precise about what you did alone and what you led.]",
      approach: [
        {
          title: "[Step one]",
          body: "[The first thing you changed and why it was safe to change first.]",
        },
        {
          title: "[Step two]",
          body: "[The trade-off you accepted, and the alternative you rejected.]",
        },
        {
          title: "[Step three]",
          body: "[How you proved the result and stopped it regressing.]",
        },
      ],
      outcome:
        "[What is true now that was not before, in the same numbers as the metrics above. Mention what you would do differently.]",
    },
    links: [{ href: "[your demo URL]", kind: "live" }],
    placeholder: true,
  },
  {
    slug: "kirim-api",
    title: "Kirim: one API in front of three couriers",
    year: "2024",
    role: "Backend engineer, team of four",
    summary:
      "Unified three courier integrations behind one contract, so merchants shipped from a single endpoint instead of three.",
    tags: ["Node.js", "Fastify", "Redis"],
    metrics: [
      { value: "1.2M", label: "requests / month" },
      { value: "0.4%", label: "failed deliveries" },
      { value: "−60%", label: "support tickets" },
    ],
    story: {
      problem:
        "[The integration mess before: duplicated code per courier, what broke, and the business cost of each failure.]",
      myRole:
        "[Your slice of the work — the contract design, the retry layer, the on-call rotation, the review load you carried.]",
      approach: [
        {
          title: "[Step one]",
          body: "[How you mapped the three APIs into one contract without breaking the merchants already live.]",
        },
        {
          title: "[Step two]",
          body: "[How you handled failure: retries, idempotency, the alert that actually mattered.]",
        },
        {
          title: "[Step three]",
          body: "[How you rolled it out and how you knew it was working.]",
        },
      ],
      outcome:
        "[Current volume and reliability, plus the thing that stopped happening. Keep it to what you can source.]",
    },
    links: [{ href: "[your repository URL]", kind: "repository" }],
    placeholder: true,
  },
  {
    slug: "ruang-belajar",
    title: "Ruang: a course player students actually finish",
    year: "2023",
    role: "Full-stack, solo",
    summary:
      "An independent learning platform where the player resumes exactly where a student stopped, built and shipped alone.",
    tags: ["React", "tRPC", "SQLite"],
    metrics: [
      { value: "+24pp", label: "course completion" },
      { value: "4.8/5", label: "learner rating" },
      { value: "2 weeks", label: "to first release" },
    ],
    story: {
      problem:
        "[Who the learners were, why they abandoned courses, and the single behaviour you decided to fix.]",
      myRole:
        "[Solo full-stack: design, schema, player, deploy, and the first ten users you talked to.]",
      approach: [
        {
          title: "[Step one]",
          body: "[The smallest release you could put in front of a real learner.]",
        },
        {
          title: "[Step two]",
          body: "[The part you deliberately left out, and why that was the right call at the time.]",
        },
        {
          title: "[Step three]",
          body: "[How you measured completion and what you learned from the drop-off points.]",
        },
      ],
      outcome:
        "[The result today, honestly scoped — including how many active learners, so the percentage has context.]",
    },
    placeholder: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
