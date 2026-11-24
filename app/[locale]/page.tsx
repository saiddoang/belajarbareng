import Link from "next/link";
import { notFound } from "next/navigation";
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
  const featured = projects;

  return (
    <>
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
            <Link
              href="/speech-delay"
              className="rounded-full border border-accent/40 bg-accent/5 px-5 py-3 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10"
            >
              {messages.hub.nav} →
            </Link>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
              >
                {messages.hero.ctaSecondary}
              </a>
            ) : null}
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

      <section id="ruang-wicara" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-accent px-6 py-8 text-paper sm:px-10 sm:py-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
                    {messages.hub.label}
                  </p>
                  <h2 className="mt-4 text-[clamp(1.7rem,3.4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-balance">
                    {messages.hub.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/80">
                    {messages.hub.body}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href="/speech-delay"
                      className="rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
                    >
                      {messages.hub.cta}
                    </Link>
                    <Link
                      href="/speech-delay/education"
                      className="rounded-full border border-paper/40 px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
                    >
                      {messages.hub.secondary}
                    </Link>
                  </div>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/75">
                    {messages.hub.meta}
                  </p>
                </div>

                <ul className="grid gap-3 self-center sm:grid-cols-2 lg:grid-cols-1">
                  {messages.hub.points.map((point) => (
                    <li
                      key={point.title}
                      className="rounded-2xl border border-paper/15 bg-paper/5 p-4"
                    >
                      <p className="text-sm font-medium text-paper">
                        {point.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-paper/70">
                        {point.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
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
                  className="group grid gap-4 py-8 sm:grid-cols-[3rem_1fr_13rem] sm:items-baseline"
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
                  <div className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted sm:text-right">
                    <p>{project.year}</p>
                    <p className="mt-1 text-balance normal-case tracking-normal">
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
            {site.email
              ? messages.contact.bodyEmail
              : messages.contact.bodyGithub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {messages.contact.ctaEmail}
              </a>
            ) : (
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                {messages.contact.ctaGithub}
              </a>
            )}
            {site.linkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
              >
                LinkedIn
              </a>
            ) : null}
            <Link
              href="/speech-delay"
              className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              {messages.hub.nav}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
