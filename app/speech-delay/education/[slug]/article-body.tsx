import type { EducationSection } from "@/lib/speech-delay/education";

export function ArticleBody({ section }: { section: EducationSection }) {
  return (
    <>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                •
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
