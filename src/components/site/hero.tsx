import Image from "next/image";
import { ArrowRight, BookOpen, ChevronDown, FileText, Info, Languages, ScanLine } from "lucide-react";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { ScanScreen } from "@/components/phone/scan-screen";
import { Reveal } from "./reveal";
import { DownloadButton } from "./download-button";

const HERO_POINTS = [
  { icon: ScanLine, label: "OCR-Powered Document Scanning" },
  { icon: Languages, label: "Filipino AI Simplification" },
  { icon: BookOpen, label: "Legal Term Dictionary" },
] as const;

/**
 * Hero — strong typography on the left, a floating recreation of the
 * Lex-Simple scanner on the right, with an analysis-preview card and
 * a Lexie assistant chip orbiting the device.
 */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-paper">
      {/* Backdrop: faint grid + geometric accents */}
      <div
        aria-hidden
        className="bg-grid-lines absolute inset-0 [mask-image:radial-gradient(75%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-16 hidden size-72 rotate-12 rounded-xl border-2 border-brand-light/60 lg:block"
      />
      <div
        aria-hidden
        className="absolute -left-20 bottom-10 hidden size-40 -rotate-6 rounded-lg bg-brand-soft lg:block"
      />

      <div className="container-site relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-24">
        {/* ---------------- Left: copy ---------------- */}
        <div>
          <Reveal>
            <span className="chip-neo">
              <span aria-hidden className="inline-block size-2 rounded-[1.5px] bg-brand" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-deep">
                Legal literacy, made simpler
              </span>
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl xl:text-[3.6rem]">
              Understand the{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.12em] bottom-[0.06em] h-[0.34em] rounded-[2px] bg-brand-soft"
                />
                <span className="relative">fine print.</span>
              </span>{" "}
              <br className="hidden sm:block" />
              <span className="text-brand">Before you sign.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-subtext sm:text-lg">
              Lex-Simple helps you understand complex legal documents through
              OCR-assisted text extraction, AI-powered explanations, and a
              conversational Filipino legal assistant.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton label="Download the App" size="lg" />
              <a href="#features" className="btn-brutal btn-brutal-outline btn-brutal-lg">
                Explore Features
                <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-5 flex items-center gap-1.5 text-xs text-subtext">
              <Info aria-hidden className="size-3.5 shrink-0" />
              Informational tool — not a substitute for professional legal advice.
            </p>
          </Reveal>

          <Reveal delay={420}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-3">
              {HERO_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-white px-3 py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand-deep">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---------------- Right: device showcase ---------------- */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
          <div className="relative mx-auto w-[300px] max-w-full">
            {/* Backdrop panel behind the device */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[86%] w-[92%] -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-2xl border-2 border-ink bg-brand-soft"
            />
            <div
              aria-hidden
              className="absolute -right-8 -top-6 hidden h-24 w-32 rounded-lg bg-dot-grid opacity-80 sm:block"
            />

            {/* Device */}
            <div className="anim-float relative">
              <PhoneFrame dark>
                <ScanScreen />
              </PhoneFrame>
            </div>

            {/* Floating analysis preview */}
            <div className="anim-float-soft absolute -left-6 top-28 w-40 sm:-left-12 sm:w-44">
              <div className="-rotate-3 rounded-md border-[1.5px] border-ink bg-white p-3 shadow-brutal-md">
                <div className="flex items-center gap-1.5">
                  <span className="flex size-6 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand-deep">
                    <FileText aria-hidden className="size-3" />
                  </span>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-subtext">
                    Analysis
                  </span>
                </div>
                <p className="mt-2 truncate text-xs font-bold text-ink">
                  Contract of Lease
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-subtext">
                    Complexity
                  </span>
                  <span className="font-mono text-xl font-extrabold leading-none text-brand-deep">
                    62
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-[2px] border border-ink/60 bg-hairline">
                  <div className="h-full w-[62%] rounded-[1px] bg-brand" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded-[3px] border border-ink bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold text-brand-deep">
                    3 findings
                  </span>
                  <span className="rounded-[3px] border border-ink bg-white px-1.5 py-0.5 text-[9px] font-bold text-ink">
                    2 review
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Lexie chip */}
            <div className="anim-float-delayed absolute -bottom-8 -right-2 sm:-right-12">
              <div className="rotate-2 rounded-md border-[1.5px] border-ink bg-white p-2.5 shadow-brutal-md">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/lexie-avatar.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-[4px] border-[1.5px] border-ink bg-brand-soft object-contain p-0.5"
                  />
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                      Lexie
                      <span
                        aria-label="online"
                        className="anim-pulse-dot inline-block size-1.5 rounded-full bg-[#16A34A]"
                      />
                    </p>
                    <p className="text-[10px] font-medium text-subtext">
                      Ano&apos;ng gusto mong malaman?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden flex-col items-center gap-1 text-subtext lg:flex"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown aria-hidden className="anim-float-soft size-4 text-brand" />
      </div>
    </section>
  );
}
