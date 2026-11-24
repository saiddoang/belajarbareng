/**
 * Case studies for Belajar Bareng.
 *
 * Only work that exists is listed here. Every number is countable from the
 * repository or the running app; if a result was not measured, the story says
 * so instead of inventing a percentage.
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
};

export const projects: Project[] = [
  {
    slug: "ruang-wicara",
    title: "Ruang Wicara: a speech practice companion for parents",
    year: "2026",
    role: "Design, engineering and content sourcing — solo",
    summary:
      "A free Bahasa Indonesia web app that turns speech and language milestones into 30 play-based activities, keeps observation notes on the device, and prints a summary to bring to a paediatrician or speech therapist.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    metrics: [
      { value: "30", label: "play-based activities" },
      { value: "10", label: "plain-language guides" },
      { value: "0", label: "accounts or uploads" },
    ],
    story: {
      problem:
        "Speech and language worries arrive early and quietly: a two-year-old with a handful of words, a three-year-old whose sentences stopped growing. Indonesian parents usually meet two options — clinical material written for professionals, or English apps that want an account and a child's data before they show anything useful. Between the first worry and the first appointment there can be months, and nothing fills them.",
      myRole:
        "Solo: information architecture, the React and TypeScript implementation, the Indonesian content structure, the sourcing of every claim, and the test suite. Content is mapped to public guidance from CDC, AAP HealthyChildren, ASHA and NIDCD, but no clinician has reviewed the module — that gap is written into the app rather than hidden.",
      approach: [
        {
          title: "Match the activity to the child, not the calendar",
          body: "A baseline check sorts activities by the communication level a parent can actually observe. A three-year-old who is not yet joining two words gets turn-taking and choice routines, not sentence drills chosen by age alone.",
        },
        {
          title: "Keep practice and observation in two records",
          body: "Sessions log what was practised; observations log what changed. Mixing them lets hope look like evidence, which is the one thing an appointment cannot afford.",
        },
        {
          title: "Make the offline path the default",
          body: "State sits in localStorage behind a versioned schema with a parser that discards malformed data, and export is a print stylesheet. Nothing leaves the browser, so there is nothing to leak and no account to maintain.",
        },
      ],
      outcome:
        "Ships as a static Next.js module with 30 sourced activities, CDC milestones for ages 24–60 months, red-flag referral signs, progress charts and a printable summary. Two limits are stated in the app and in its QA report: the content has not been reviewed by a clinician, and the module collects no analytics, so adoption is unknown by design.",
    },
    links: [{ href: "/speech-delay", kind: "live" }],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  // With a single case study, "next" would link back to itself, so it is not
  // rendered at all until a second project exists.
  if (projects.length < 2) return undefined;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
