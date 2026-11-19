import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "./article-body";
import { educationArticles, getArticle } from "@/lib/speech-delay/education";
import { activities } from "@/lib/speech-delay/activities";
import {
  Breadcrumbs,
  Disclaimer,
  SectionTitle,
  buttonSecondary,
} from "@/components/speech-delay/ui";
import { SourceList } from "@/components/speech-delay/source-list";

export const dynamicParams = false;

export function generateStaticParams() {
  return educationArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Ruang Wicara`,
    description: article.dek,
  };
}

export default async function EducationArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = (article.relatedActivitySlugs ?? [])
    .map((item) => activities.find((activity) => activity.slug === item))
    .filter((activity): activity is NonNullable<typeof activity> => Boolean(activity));

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Kenali", href: "/speech-delay/education" },
          { label: article.title },
        ]}
      />

      <SectionTitle
        eyebrow={`${article.readingMinutes} menit baca`}
        title={article.title}
        description={article.dek}
      />

      <div className="mt-8 space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              {section.heading}
            </h2>
            <ArticleBody section={section} />
          </section>
        ))}
      </div>

      {related.length > 0 ? (
        <section className="mt-10 rounded-3xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold">Aktivitas terkait</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {related.map((activity) => (
              <li key={activity.id}>
                <Link
                  href={`/speech-delay/exercises/${activity.slug}`}
                  className="text-sm text-accent underline underline-offset-4"
                >
                  {activity.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <SourceList ids={article.sourceIds} title="Rujukan artikel ini" />

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/speech-delay/education" className={buttonSecondary}>
          Semua artikel
        </Link>
        <Link href="/speech-delay/safety" className={buttonSecondary}>
          Panduan rujukan
        </Link>
      </div>

      <Disclaimer className="mt-6" />
    </div>
  );
}
