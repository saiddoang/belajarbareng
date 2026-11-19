import type { IllustrationKey } from "@/lib/speech-delay/types";

/**
 * Original, locally drawn SVG flashcards. No stock art, no external requests,
 * no copyrighted characters. `label` becomes the accessible name.
 */
export function Illustration({
  kind,
  label,
  className = "h-28 w-28",
}: {
  kind: IllustrationKey;
  label: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={label}
      className={className}
      fill="none"
    >
      <rect x="2" y="2" width="116" height="116" rx="28" fill="#FBF7EE" />
      {art[kind]}
    </svg>
  );
}

const stroke = "#2C3A33";
const soft = "#E8DFCE";
const accent = "#1F4D3F";
const warm = "#C97B4A";
const sky = "#7FA7B8";

const art: Record<IllustrationKey, React.ReactNode> = {
  buku: (
    <>
      <path d="M24 38h30c4 0 6 3 6 6v40H30c-3.3 0-6 2.7-6 6V38Z" fill="#fff" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M96 38H66c-4 0-6 3-6 6v40h30c3.3 0 6 2.7 6 6V38Z" fill={soft} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M60 44v40" stroke={stroke} strokeWidth="2.5" />
      <path d="M32 50h18M32 58h18M70 50h18M70 58h18M70 66h12" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="92" cy="30" r="7" fill="#F2C879" stroke={warm} strokeWidth="2" />
    </>
  ),
  mobil: (
    <>
      <path d="M20 72h80a6 6 0 0 0 6-6v-6c0-3-2-5-5-6l-10-3-9-13c-1.5-2-3.6-3-6-3H48c-2.4 0-4.5 1-6 3l-9 13-10 3c-3 1-5 3-5 6v6a6 6 0 0 0 6 6Z" fill={warm} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M46 35h9v13H34l7-10c1.2-2 2.8-3 5-3Zm18 0h10c1.2 0 2.4.6 3.2 1.8L86 48H64V35Z" fill="#fff" stroke={stroke} strokeWidth="2.2" />
      <circle cx="38" cy="73" r="9" fill={stroke} />
      <circle cx="38" cy="73" r="3.5" fill={soft} />
      <circle cx="84" cy="73" r="9" fill={stroke} />
      <circle cx="84" cy="73" r="3.5" fill={soft} />
      <rect x="100" y="58" width="6" height="5" rx="2" fill="#F2C879" />
    </>
  ),
  bola: (
    <>
      <circle cx="60" cy="62" r="34" fill="#fff" stroke={stroke} strokeWidth="2.5" />
      <path d="M60 28c10 8 16 20 16 34S70 88 60 96M60 28c-10 8-16 20-16 34s6 26 16 34" stroke={accent} strokeWidth="2.5" />
      <path d="M27 56h66M28 72h64" stroke={warm} strokeWidth="2.5" />
      <circle cx="60" cy="62" r="10" fill="#F2C879" stroke={stroke} strokeWidth="2" />
    </>
  ),
  balok: (
    <>
      <rect x="22" y="64" width="34" height="30" rx="5" fill={warm} stroke={stroke} strokeWidth="2.4" />
      <rect x="62" y="64" width="34" height="30" rx="5" fill={sky} stroke={stroke} strokeWidth="2.4" />
      <rect x="42" y="34" width="34" height="30" rx="5" fill="#F2C879" stroke={stroke} strokeWidth="2.4" />
      <path d="M30 79h18M70 79h18M50 49h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  boneka: (
    <>
      <circle cx="46" cy="34" r="9" fill={soft} stroke={stroke} strokeWidth="2.4" />
      <circle cx="74" cy="34" r="9" fill={soft} stroke={stroke} strokeWidth="2.4" />
      <circle cx="60" cy="52" r="20" fill="#F2D9BE" stroke={stroke} strokeWidth="2.4" />
      <circle cx="53" cy="49" r="2.4" fill={stroke} />
      <circle cx="67" cy="49" r="2.4" fill={stroke} />
      <path d="M56 59c2.5 2.5 5.5 2.5 8 0" stroke={warm} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 96c0-14 9-24 20-24s20 10 20 24" fill={accent} stroke={stroke} strokeWidth="2.4" />
      <circle cx="60" cy="80" r="5" fill="#F2C879" />
    </>
  ),
  dapur: (
    <>
      <path d="M34 58h52v18c0 10-8 18-18 18H52c-10 0-18-8-18-18V58Z" fill={soft} stroke={stroke} strokeWidth="2.5" />
      <rect x="30" y="52" width="60" height="8" rx="4" fill={accent} stroke={stroke} strokeWidth="2.2" />
      <path d="M46 44c0-5 4-6 4-10M60 44c0-5 4-6 4-10M74 44c0-5 4-6 4-10" stroke={warm} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M42 70h36" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  makan: (
    <>
      <path d="M24 60h50c0 12-9 22-21 22h-8c-12 0-21-10-21-22Z" fill="#fff" stroke={stroke} strokeWidth="2.5" />
      <path d="M32 56h34" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M86 40v42M86 40c6 0 9 5 9 10s-3 10-9 10" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 74h18" stroke={warm} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 88h42" stroke={soft} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  tubuh: (
    <>
      <circle cx="60" cy="40" r="16" fill="#F2D9BE" stroke={stroke} strokeWidth="2.4" />
      <circle cx="54" cy="38" r="2" fill={stroke} />
      <circle cx="66" cy="38" r="2" fill={stroke} />
      <path d="M56 46c2.5 2 5.5 2 8 0" stroke={warm} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 56v22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 62 40 52M60 62l20-16" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 78 48 96M60 78l12 18" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="86" cy="42" r="6" fill={accent} opacity=".35" />
    </>
  ),
  hewan: (
    <>
      <path d="M42 42 34 26l18 6M78 42l8-16-18 6" fill={soft} stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="60" cy="56" r="24" fill={soft} stroke={stroke} strokeWidth="2.5" />
      <circle cx="51" cy="52" r="2.6" fill={stroke} />
      <circle cx="69" cy="52" r="2.6" fill={stroke} />
      <path d="M57 61h6l-3 4-3-4Z" fill={warm} stroke={warm} strokeWidth="1.5" />
      <path d="M60 65v4M55 72c3 3 7 3 10 0" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 62h-8M30 68h-8M90 62h8M90 68h8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  kartu: (
    <>
      <rect x="22" y="38" width="42" height="54" rx="8" fill="#fff" stroke={stroke} strokeWidth="2.4" transform="rotate(-6 43 65)" />
      <rect x="58" y="34" width="42" height="54" rx="8" fill="#F2C879" stroke={stroke} strokeWidth="2.4" transform="rotate(6 79 61)" />
      <path d="M36 62h14M43 55v14" stroke={accent} strokeWidth="3" strokeLinecap="round" transform="rotate(-6 43 65)" />
      <path d="M70 60c4-6 12-6 16 0M78 58v14" stroke={accent} strokeWidth="3" strokeLinecap="round" transform="rotate(6 79 61)" />
    </>
  ),
};
