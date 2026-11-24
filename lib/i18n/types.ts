export type Messages = {
  meta: {
    name: string;
    title: string;
    description: string;
  };
  nav: {
    work: string;
    about: string;
    contact: string;
  };
  hero: {
    status: string;
    headline: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  hub: {
    nav: string;
    label: string;
    title: string;
    body: string;
    cta: string;
    secondary: string;
    meta: string;
    points: { title: string; body: string }[];
  };
  work: {
    label: string;
    lead: string;
  };
  about: {
    label: string;
    lead: string;
    items: { title: string; body: string }[];
  };
  proof: {
    label: string;
    body: string;
  };
  contact: {
    label: string;
    heading: string;
    bodyEmail: string;
    bodyGithub: string;
    ctaEmail: string;
    ctaGithub: string;
  };
  footer: {
    note: string;
  };
  caseStudy: {
    back: string;
    problem: string;
    role: string;
    approach: string;
    outcome: string;
    stack: string;
    year: string;
    metrics: string;
    links: string;
    next: string;
    repository: string;
    live: string;
  };
  notFound: {
    code: string;
    title: string;
    body: string;
    home: string;
    work: string;
  };
};
