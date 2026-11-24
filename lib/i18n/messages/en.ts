import type { Messages } from "../types";

export const en = {
  meta: {
    name: "Belajar Bareng",
    title: "Belajar Bareng — free learning tools for Indonesian families",
    description:
      "An independent studio building free, plain-language learning tools for parents and children in Indonesia. First release: Ruang Wicara, a home practice companion for speech and language development.",
  },
  nav: {
    work: "Work",
    about: "Approach",
    contact: "Contact",
  },
  hero: {
    status: "Independent studio · Free tools · Bahasa Indonesia",
    headline: "Learning tools a parent can actually use at nine at night.",
    intro:
      "I build plain-language tools for Indonesian families, starting with speech and language development. No accounts, no uploads, no tracking: every claim is cited, and it all works on the phone already in your pocket.",
    ctaPrimary: "See the work",
    ctaSecondary: "Say hello",
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
    label: "Work",
    lead: "One product, documented properly: what it does, what it refuses to do, and where the content comes from.",
  },
  about: {
    label: "How I build",
    lead: "Three rules decide what ships and what gets cut.",
    items: [
      {
        title: "Write for the person, not the persona",
        body: "The reader is a tired parent on a mid-range Android phone at nine at night. If a sentence needs a second pass, it gets rewritten, not explained.",
      },
      {
        title: "Cite the source or drop the claim",
        body: "Every milestone, activity and referral sign links back to CDC, AAP, ASHA or NIDCD guidance. Where the evidence is thin, the interface says so instead of guessing.",
      },
      {
        title: "Earn trust by not requiring it",
        body: "No account, no upload, no analytics on a child's data. Progress lives in the browser's local storage, and the summary prints so it survives the device.",
      },
    ],
  },
  proof: {
    label: "Sources behind the content",
    body: "Ruang Wicara's milestones and referral signs come from CDC milestone checklists, AAP HealthyChildren, ASHA and NIDCD, and the practice activities are mapped to the same sources. The tool never claims to diagnose a child, and it never replaces a clinician.",
  },
  contact: {
    label: "Contact",
    heading: "Tell me what you are building — or what is missing.",
    bodyEmail:
      "Email reaches me fastest. Questions about Ruang Wicara, corrections to the content and work enquiries all land in the same inbox.",
    bodyGithub:
      "GitHub is the way to reach me today: open an issue with a question, a bug or a correction, and I will answer there. No contact form and no newsletter.",
    ctaEmail: "Send an email",
    ctaGithub: "Open an issue on GitHub",
  },
  footer: {
    note: "Free tools, no tracking, no accounts.",
  },
  caseStudy: {
    back: "All work",
    problem: "The problem",
    role: "My role",
    approach: "Approach",
    outcome: "Outcome",
    stack: "Stack",
    year: "Year",
    metrics: "What shipped",
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
    work: "See the work",
  },
} satisfies Messages;
