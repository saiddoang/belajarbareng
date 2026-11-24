import type { Messages } from "../types";

export const en = {
  meta: {
    name: "Your Name",
    title: "Your Name — Senior Software Engineer",
    description:
      "Senior software engineer. Case studies with measured outcomes. Available for full-time roles and freelance work.",
  },
  nav: {
    work: "Work",
    about: "Approach",
    contact: "Contact",
  },
  hero: {
    status: "Open to full-time roles and freelance work",
    headline: "I build [product type] that [measurable outcome].",
    intro:
      "One or two sentences: what you build, who you build it for, and the result you produce. Replace this paragraph in lib/i18n/messages/en.ts — a recruiter should understand your value in ten seconds.",
    ctaPrimary: "Read the case studies",
    ctaSecondary: "Email me",
  },
  hub: {
    nav: "Ruang Wicara",
    label: "Free tool · Bahasa Indonesia",
    title:
      "Ruang Wicara — a home practice companion for speech and language development",
    body: "Built for parents of children aged 2 and up: 30 play-based activities, CDC milestones for ages 2–5, observation notes and a printable summary to bring to a doctor or speech therapist. Everything runs in your browser — no account, no upload.",
    cta: "Open Ruang Wicara",
    secondary: "See the education library",
    meta: "Non-diagnostic · No account · Data stays on your device",
    points: [
      {
        title: "Start from the child's ability",
        body: "Activities are matched to the communication level you observe, not to age alone.",
      },
      {
        title: "Record what you actually saw",
        body: "Short check-ins keep practice and observed change in two separate records.",
      },
      {
        title: "Walk in prepared",
        body: "Milestone checks and referral signs help you ask better questions at an appointment.",
      },
    ],
  },
  work: {
    label: "Selected work",
    lead: "Three projects, chosen for outcomes rather than volume.",
  },
  about: {
    label: "How I work",
    lead: "Replace these three lines with the way you actually operate — the point is to show judgement, not tool names.",
    items: [
      {
        title: "Start from the number",
        body: "[The metric you are accountable for: load time, conversion, uptime, support load. Say how you find it and how you keep it honest.]",
      },
      {
        title: "Ship in slices",
        body: "[How you cut a large problem into releases that reach users early, and how you decide what goes first.]",
      },
      {
        title: "Leave it maintainable",
        body: "[What you hand over: tests where they pay off, docs for the next person, and the trade-offs you knowingly accepted.]",
      },
    ],
  },
  proof: {
    label: "Trusted by",
    body: "[Company names, client names or a testimonial go here — only ones you have permission to publish.]",
  },
  contact: {
    label: "Contact",
    heading: "Tell me what you are building.",
    body: "The fastest way to reach me is email. I reply to every serious enquiry within two working days.",
    cta: "Send an email",
  },
  footer: {
    note: "Built with Next.js and Tailwind CSS.",
  },
  caseStudy: {
    back: "All work",
    problem: "The problem",
    role: "My role",
    approach: "Approach",
    outcome: "Outcome",
    stack: "Stack",
    year: "Year",
    metrics: "Results",
    links: "Links",
    next: "Next project",
    repository: "Repository",
    live: "Live site",
  },
  notFound: {
    code: "404",
    title: "This page does not exist.",
    body: "The link is broken, or the project is not here. Everything worth reading is one click away.",
    home: "Back to home",
    work: "See the case studies",
  },
  dev: {
    home: "Placeholder content. Copy lives in lib/i18n/messages/en.ts, projects in content/projects.ts, and links in lib/site.ts. Delete this notice (components/dev-notice.tsx) before publishing.",
    caseStudy:
      "Placeholder case study. Replace the story, the metrics and the links in content/projects.ts with your own project, then remove this notice.",
  },
} satisfies Messages;
