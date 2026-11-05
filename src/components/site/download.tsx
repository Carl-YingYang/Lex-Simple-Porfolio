import { Clock, Cpu, Download, Github, Info, Languages, Smartphone } from "lucide-react";
import { APP_DOWNLOAD_URL, SITE } from "@/config/site";
import { Reveal } from "./reveal";

/**
 * Download — the conversion section on a deep-purple field.
 *
 * The CTA area branches on `APP_DOWNLOAD_URL` (src/config/site.ts):
 * - When the official APK is published, a real download link renders.
 * - While it is null, a professional "coming soon" state renders instead:
 *   a status pill, an intentionally disabled dashed CTA (never a broken
 *   link), and a working "Follow progress on GitHub" action.
 */
export function DownloadSection() {
  return (
    <section id="download" className="relative overflow-hidden bg-brand-deep py-20 sm:py-28">
      {/* Dot-grid texture, faded towards the edges */}
      <div
        aria-hidden
        className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />
      {/* Geometric accents */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 size-64 rotate-12 rounded-xl border-2 border-white/10"
      />
      <div
        aria-hidden
        className="absolute -left-16 bottom-16 size-40 -rotate-6 rounded-lg border-2 border-white/10"
      />

      <div className="container-site relative">
        {/* Heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden className="inline-block size-2 rounded-[1.5px] bg-brand-light" />
            <span aria-hidden className="inline-block size-2 rounded-[1.5px] bg-white" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-brand-light">
              Get the app
            </span>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            A clearer understanding starts here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Take the first step toward understanding complex legal documents
            with Lex-Simple.
          </p>
        </Reveal>

        {/* Central offer card */}
        <Reveal delay={120}>
          <div
            id="download-offer-card"
            className="mx-auto mt-12 w-full max-w-2xl rounded-lg border-2 border-ink bg-white p-6 shadow-brutal-xl sm:p-8"
          >
            <div className="flex flex-wrap gap-2">
              <span className="chip-neo">
                <Smartphone aria-hidden className="size-3.5" />
                Android
              </span>
              <span className="chip-neo">
                <Languages aria-hidden className="size-3.5" />
                Filipino &amp; English
              </span>
              <span className="chip-neo">
                <Cpu aria-hidden className="size-3.5" />
                On-device OCR
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">
              Download Lex-Simple
            </h3>

            {APP_DOWNLOAD_URL ? (
              <div className="mt-5">
                <a
                  href={APP_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal btn-brutal-primary btn-brutal-lg w-full sm:w-auto"
                >
                  <Download aria-hidden className="size-4" />
                  Download Lex-Simple
                </a>
                <p className="mt-3 font-mono text-xs text-subtext">
                  Free Android package (APK) — opens the official release.
                </p>
              </div>
            ) : (
              <div className="mt-5">
                {/* Status pill */}
                <span className="inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-ink bg-brand-soft px-3 py-1.5">
                  <Clock aria-hidden className="size-3.5 text-brand-deep" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand-deep">
                    Android download coming soon
                  </span>
                </span>

                {/* Intentionally disabled CTA + real secondary action */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-[4px] border-2 border-dashed border-ink/40 bg-paper font-semibold text-subtext sm:w-auto sm:px-6"
                  >
                    <Download aria-hidden className="size-4" />
                    Download Lex-Simple
                  </button>
                  <a
                    href={SITE.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-outline btn-brutal-md w-full sm:w-auto"
                  >
                    <Github aria-hidden className="size-4" />
                    Follow progress on GitHub
                  </a>
                </div>
              </div>
            )}

            {/* Fine print */}
            <p className="mt-6 flex items-start gap-1.5 border-t-[1.5px] border-hairline pt-4 text-xs leading-relaxed text-subtext">
              <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              <span>
                Designed for mobile use. Android download availability will be
                indicated once the official installation package is published.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
