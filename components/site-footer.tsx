import Link from "next/link";
import type { Messages } from "@/lib/i18n/types";
import { site } from "@/lib/site";

export function SiteFooter({ messages }: { messages: Messages }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {messages.meta.name}. {messages.footer.note}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/speech-delay" className="hover:text-ink">
            Ruang Wicara
          </Link>
          {site.email ? (
            <a href={`mailto:${site.email}`} className="hover:text-ink">
              Email
            </a>
          ) : null}
          {site.linkedin ? (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
          ) : null}
          {site.github ? (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
