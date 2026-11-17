import Link from "next/link";
import { notFound } from "next/navigation";
import { DevNotice } from "@/components/dev-notice";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { getMessages, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = getMessages(locale);
  const featured = projects.slice(0, 3);

  return (
    <>
      <DevNotice>{messages.dev.home}</DevNotice>

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pt-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.hero.status}
          </p>
          <h1 className="mt-8 max-w-4xl text-[clamp(2.4rem,6.4vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
            {messages.hero.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            {messages.hero.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              {messages.hero.ctaPrimary}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              {messages.hero.ctaSecondary}
            </a>
            {site.cvUrl ? (
              <a
                href={site.cvUrl}
                download
                className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
              >
                CV (PDF)
              </a>
            ) : null}
          </div>
        </Reveal>
      </section>

      <section id="work" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {messages.work.label}
            </h2>
            <p className="max-w-sm text-sm text-muted">{messages.work.lead}</p>
          </div>

          <ul className="mt-10 border-y border-line">
            {featured.map((project, index) => (
              <li key={project.slug} className="border-b border-line last:border-b-0">
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  className="group grid gap-4 py-8 sm:grid-cols-[3rem_1fr_9rem] sm:items-baseline"
                >
                  <span className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight text-balance transition-colors group-hover:text-accent sm:text-[1.7rem]">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                      {project.summary}
                    </p>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:text-right">
                    <p>{project.year}</p>
                    <p className="mt-1 normal-case tracking-normal">
                      {project.role}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.about.label}
          </h2>
          <p className="mt-6 max-w-2xl text-2xl leading-snug tracking-tight text-balance">
            {messages.about.lead}
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {messages.about.items.map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {messages.proof.label}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-muted">
              {messages.proof.body}
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.contact.label}
          </h2>
          <p className="mt-8 max-w-3xl text-[clamp(1.9rem,4.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-balance">
            {messages.contact.heading}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {messages.contact.body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              {messages.contact.cta}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
