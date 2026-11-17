import Link from "next/link";
import type { Messages } from "@/lib/i18n/types";

export function NotFoundView({
  locale,
  messages,
}: {
  locale: string;
  messages: Messages;
}) {
  const copy = messages.notFound;

  return (
    <section className="mx-auto flex max-w-5xl flex-col px-6 py-24 sm:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {copy.code}
      </p>
      <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,5.6vw,4rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
        {copy.title}
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted">
        {copy.body}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href={`/${locale}`}
          className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          {copy.home}
        </Link>
        <Link
          href={`/${locale}#work`}
          className="rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
        >
          {copy.work}
        </Link>
      </div>
    </section>
  );
}
