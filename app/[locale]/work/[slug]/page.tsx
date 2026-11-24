import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import { getMessages, isLocale } from "@/lib/i18n";
import { locales } from "@/lib/i18n/config";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};

  const canonical = siteUrl ? `${siteUrl}/${locale}/work/${slug}` : undefined;

  return {
    title: project.title,
    description: project.summary,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: canonical,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const messages = getMessages(locale);
  const next = getNextProject(project.slug);

  return (
    <>
      <article className="mx-auto max-w-5xl px-6 pb-24 pt-12">
        <Link
          href={`/${locale}#work`}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
        >
          ← {messages.caseStudy.back}
        </Link>

        <header className="mt-8">
          <h1 className="max-w-3xl text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.03] tracking-[-0.025em] text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>

          <dl className="mt-10 grid gap-6 border-y border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:grid-cols-3">
            <div>
              <dt>{messages.caseStudy.role}</dt>
              <dd className="mt-2 text-balance normal-case tracking-normal text-ink">
                {project.role}
              </dd>
            </div>
            <div>
              <dt>{messages.caseStudy.year}</dt>
              <dd className="mt-2 normal-case tracking-normal text-ink">
                {project.year}
              </dd>
            </div>
            <div>
              <dt>{messages.caseStudy.stack}</dt>
              <dd className="mt-2 normal-case tracking-normal text-ink">
                {project.tags.join(", ")}
              </dd>
            </div>
          </dl>
        </header>

        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.caseStudy.metrics}
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-none tracking-[-0.02em]">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.caseStudy.problem}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">{project.story.problem}</p>
        </section>

        <section className="mt-12 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.caseStudy.role}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">
            {project.story.myRole}
          </p>
        </section>

        <section className="mt-12 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.caseStudy.approach}
          </h2>
          <ol className="max-w-2xl space-y-8">
            {project.story.approach.map((step, index) => (
              <li key={step.title} className="border-l border-line pl-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {messages.caseStudy.outcome}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">
            {project.story.outcome}
          </p>
        </section>

        {project.links?.length ? (
          <section className="mt-12 grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {messages.caseStudy.links}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {project.links.map((link) => {
                const label =
                  link.kind === "live"
                    ? messages.caseStudy.live
                    : messages.caseStudy.repository;
                const className =
                  "rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-ink";
                const internal = link.href.startsWith("/");

                // In-site links stay in the tab; only outside URLs open a new one.
                return (
                  <li key={link.href}>
                    {internal ? (
                      <Link href={link.href} className={className}>
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={className}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {next ? (
          <nav className="mt-20 border-t border-line pt-8">
            <Link
              href={`/${locale}/work/${next.slug}`}
              className="group flex flex-col gap-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {messages.caseStudy.next}
              </span>
              <span className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                {next.title}
              </span>
            </Link>
          </nav>
        ) : null}
      </article>
    </>
  );
}
