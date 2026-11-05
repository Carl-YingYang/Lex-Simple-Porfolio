import Image from "next/image";
import { Github, Scale } from "lucide-react";

import { APP_DOWNLOAD_URL, NAV_LINKS, SITE } from "@/config/site";

/** Shared styling for every plain footer link. */
const footerLinkClass = "text-sm text-white/65 transition-colors hover:text-white";

/** App-related destinations — the download link only goes external once a real APK URL exists. */
const APP_LINKS: { label: string; href: string; external: boolean }[] = [
  {
    label: "I-download ang App",
    href: APP_DOWNLOAD_URL ?? "#download",
    external: Boolean(APP_DOWNLOAD_URL),
  },
  { label: "Silip sa App", href: "#showcase", external: false },
  { label: "Lex-Simple sa GitHub", href: SITE.repoUrl, external: true },
];

/**
 * Site footer — dark ink panel with the signature brand top edge, a dot-grid
 * texture, navigation, the required legal disclaimer, and the bottom bar.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* Signature brand top edge */}
      <div aria-hidden="true" className="h-1.5 w-full bg-brand" />

      {/* Subtle dot-grid texture fading out from the top */}
      <div
        aria-hidden="true"
        className="bg-dot-grid-dark pointer-events-none absolute inset-x-0 bottom-0 top-1.5 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]"
      />

      <div className="container-site relative pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/lex-simple-logo.png"
                alt="Lex-Simple logo"
                width={40}
                height={40}
                className="size-10 rounded-[6px] border-2 border-white/80 object-cover"
              />
              <span className="text-lg font-extrabold tracking-tight text-white">
                Lex-Simple
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Ang mobile legal-literacy buddy na tutulong sa iyo mag-scan ng
              documents, intindihin ang mga kumplikadong clauses sa mas
              simpleng Filipino, at magtanong — kahit kailan.
            </p>
            <a
              href={SITE.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-white/30 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/60 hover:text-white"
            >
              <Github aria-hidden="true" className="size-3.5" />
              GitHub repository
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-light">
              I-explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={footerLinkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* App */}
          <nav aria-label="App">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-light">
              App
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {APP_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={footerLinkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal disclaimer (required) */}
        <div className="mt-12 rounded-md border-[1.5px] border-white/20 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2">
            <Scale aria-hidden="true" className="size-4 text-brand-light" />
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
              Legal disclaimer
            </h3>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-white/50">
            <span className="font-semibold text-white/70">Paalala: </span>
            {SITE.legalDisclaimer}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/45">
            © {year} Lex-Simple. Nakalaan ang lahat ng karapatan.
          </p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-brand-light">
            Legal literacy, gawing simple
          </p>
        </div>
      </div>
    </footer>
  );
}
