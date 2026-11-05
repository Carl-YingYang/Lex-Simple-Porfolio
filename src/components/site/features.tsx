import {
  ArrowDown,
  ChevronRight,
  Cpu,
  FileText,
  Info,
  Plus,
  Search,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/* ---------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

type BadgeTone = "soft" | "ink" | "brand";

const BADGE_TONES: Record<BadgeTone, string> = {
  soft: "bg-brand-soft text-brand-deep",
  ink: "bg-ink text-white",
  brand: "bg-brand text-white",
};

/** Mock clause findings shown inside the analysis preview (feature 03). */
const CLAUSE_ROWS = [
  {
    severity: "Warning",
    title: "Automatic renewal after 12 months",
    tone: "bg-[#D97706] text-ink",
  },
  {
    severity: "High",
    title: "Early termination penalty clause",
    tone: "bg-[#DC2626] text-white",
  },
  {
    severity: "Review",
    title: "Security deposit conditions",
    tone: "bg-brand-vivid text-ink",
  },
] as const;

/** Mock saved scans shown in the history list (feature 05). */
const HISTORY_ROWS = [
  { name: "Contract of Lease", date: "Jan 12" },
  { name: "Employment Agreement", date: "Jan 08" },
  { name: "Loan Agreement", date: "Dec 30" },
] as const;

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

/** Mono number badge shared by every feature card (fill tone varies). */
function FeatureBadge({ number, tone }: { number: string; tone: BadgeTone }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 items-center justify-center rounded-[4px] border-[1.5px] border-ink font-mono text-sm font-extrabold",
        BADGE_TONES[tone]
      )}
    >
      {number}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * Features section — bento grid of the app's five core capabilities
 * ------------------------------------------------------------------------- */

export function Features() {
  return (
    <section id="features" className="relative bg-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          overline="Features"
          title="Legal documents. Made easier to understand."
          description="From scanning documents to understanding complex legal terms, Lex-Simple brings essential legal-literacy tools into one mobile application."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* ---------------- 01 — Smart Document Scanning ---------------- */}
          <Reveal className="min-w-0 lg:col-span-7">
            <article className="card-neo lift-neo h-full p-6">
              <div className="grid h-full gap-6 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-center">
                <div>
                  <FeatureBadge number="01" tone="soft" />
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                    Smart Document Scanning
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtext">
                    Capture legal documents using your camera or upload images
                    from your gallery. Process multiple pages through the
                    document-scanning workflow.
                  </p>
                </div>

                {/* Visual — camera viewfinder */}
                <div aria-hidden>
                  <div className="relative aspect-[4/3] rounded-md border-[1.5px] border-ink bg-[#090B10] p-3">
                    {/* Corner brackets */}
                    <span className="absolute left-3 top-3 size-4 rounded-[2px] border-l-[3px] border-t-[3px] border-[#C4B5FD]" />
                    <span className="absolute right-3 top-3 size-4 rounded-[2px] border-r-[3px] border-t-[3px] border-[#C4B5FD]" />
                    <span className="absolute bottom-3 left-3 size-4 rounded-[2px] border-b-[3px] border-l-[3px] border-[#C4B5FD]" />
                    <span className="absolute bottom-3 right-3 size-4 rounded-[2px] border-b-[3px] border-r-[3px] border-[#C4B5FD]" />

                    {/* Document being scanned */}
                    <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 -rotate-2 rounded-[3px] bg-[#F5F5F0] p-2.5">
                      <span className="block h-1 w-3/5 rounded-full bg-[#8E8E8E]" />
                      <span className="mt-1.5 block h-1 w-full rounded-full bg-[#CFCFCF]" />
                      <span className="mt-1 block h-1 w-11/12 rounded-full bg-[#CFCFCF]" />
                      <span className="mt-1 block h-1 w-full rounded-full bg-[#CFCFCF]" />
                      <span className="mt-1 block h-1 w-4/5 rounded-full bg-[#CFCFCF]" />
                      <span className="mt-1 block h-1 w-3/5 rounded-full bg-[#CFCFCF]" />
                    </div>

                    {/* Animated scanning line */}
                    <span className="scan-sweep" />
                  </div>

                  {/* Captured pages */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="relative block size-10 rounded-[4px] border border-[#2C3647] bg-[#121720]">
                      <span className="absolute inset-0 m-auto flex h-[64%] w-[56%] flex-col justify-center gap-[2px] rounded-[2px] bg-[#F5F5F0] p-[3px]">
                        <span className="block h-[2px] w-full rounded-full bg-[#CFCFCF]" />
                        <span className="block h-[2px] w-4/5 rounded-full bg-[#CFCFCF]" />
                        <span className="block h-[2px] w-3/5 rounded-full bg-[#CFCFCF]" />
                      </span>
                    </span>
                    <span className="relative block size-10 rounded-[4px] border border-[#2C3647] bg-[#121720]">
                      <span className="absolute inset-0 m-auto flex h-[64%] w-[56%] flex-col justify-center gap-[2px] rounded-[2px] bg-[#F5F5F0] p-[3px]">
                        <span className="block h-[2px] w-full rounded-full bg-[#CFCFCF]" />
                        <span className="block h-[2px] w-2/3 rounded-full bg-[#CFCFCF]" />
                      </span>
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-[4px] border border-dashed border-[#2C3647] text-[#8994A6]">
                      <Plus className="size-4" />
                    </span>
                    <span className="ml-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#8994A6]">
                      Multi-page
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---------------- 02 — OCR-Powered Text Extraction ---------------- */}
          <Reveal delay={80} className="min-w-0 lg:col-span-5">
            <article className="card-neo lift-neo h-full p-6">
              <FeatureBadge number="02" tone="ink" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                OCR-Powered Text Extraction
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtext">
                Extract readable text from document images using on-device OCR
                technology.
              </p>

              {/* Visual — scan-to-text pipeline */}
              <div aria-hidden className="mt-6 flex flex-col items-center gap-2">
                {/* Document photo */}
                <div className="w-16 rounded-[4px] border-[1.5px] border-ink bg-[#F5F5F0] p-2">
                  <span className="block h-1 w-3/5 rounded-full bg-[#8E8E8E]" />
                  <span className="mt-1.5 block h-1 w-full rounded-full bg-[#CFCFCF]" />
                  <span className="mt-1 block h-1 w-5/6 rounded-full bg-[#CFCFCF]" />
                  <span className="mt-1 block h-1 w-full rounded-full bg-[#CFCFCF]" />
                  <span className="mt-1 block h-1 w-2/3 rounded-full bg-[#CFCFCF]" />
                </div>

                {/* Processing arrow */}
                <span className="anim-pulse-dot flex size-8 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand">
                  <ArrowDown className="size-4" />
                </span>

                {/* Extracted text */}
                <div className="card-neo w-full p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-subtext">
                      Extracted text
                    </span>
                    <span className="chip-neo px-1.5 py-0.5 text-[10px] uppercase">
                      <Cpu className="size-3" />
                      On-device
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <span className="block h-1.5 w-full rounded-full bg-ink/80" />
                    <span className="block h-1.5 w-11/12 rounded-full bg-ink/80" />
                    <span className="block h-1.5 w-full rounded-full border border-brand/40 bg-brand-soft" />
                    <span className="block h-1.5 w-4/5 rounded-full bg-ink/80" />
                    <span className="block h-1.5 w-5/6 rounded-full bg-ink/80" />
                    <span className="block h-1.5 w-3/5 rounded-full bg-ink/80" />
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---------------- 03 — Clause Complexity Highlighting ---------------- */}
          <Reveal delay={160} className="min-w-0 lg:col-span-12">
            <article className="card-neo lift-neo relative h-full overflow-hidden p-6 sm:p-8">
              <div
                aria-hidden
                className="bg-dot-grid absolute -right-6 -top-6 size-28 opacity-50"
              />
              <div className="relative grid h-full items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
                <div>
                  <FeatureBadge number="03" tone="brand" />
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                    Clause Complexity Highlighting
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-subtext">
                    Review document analysis results, complexity scores,
                    summaries, and clauses that may require closer attention.
                  </p>
                  <div className="mt-4 flex gap-2.5 rounded-md border-[1.5px] border-ink bg-brand-soft/60 p-3">
                    <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-deep" />
                    <p className="text-xs font-medium leading-relaxed text-brand-deep">
                      Findings are informational — they highlight what deserves
                      a closer look and are not definitive legal judgments or
                      guarantees.
                    </p>
                  </div>
                </div>

                {/* Visual — analysis preview */}
                <div
                  aria-hidden
                  className="rounded-md border-2 border-ink bg-white shadow-brutal-md"
                >
                  <div className="p-4 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-subtext">
                        Analysis preview
                      </span>
                      <span className="rounded-[3px] border-[1.5px] border-ink bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-deep">
                        Complexity 62/100
                      </span>
                    </div>
                    <div className="mt-3 h-2.5 w-full rounded-[2px] border border-ink bg-hairline">
                      <div className="h-full w-[62%] bg-brand" />
                    </div>
                  </div>
                  <ul className="divide-y divide-hairline border-t border-hairline">
                    {CLAUSE_ROWS.map((row) => (
                      <li
                        key={row.title}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-paper"
                      >
                        <span
                          className={cn(
                            "shrink-0 rounded-[3px] border-[1.5px] border-ink px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide",
                            row.tone
                          )}
                        >
                          {row.severity}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">
                          {row.title}
                        </span>
                        <ChevronRight className="size-3.5 shrink-0 text-subtext" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---------------- 04 — Filipino AI Simplification ---------------- */}
          <Reveal delay={240} className="min-w-0 lg:col-span-5">
            <article className="card-neo lift-neo h-full p-6">
              <FeatureBadge number="04" tone="soft" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                Filipino AI Simplification
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtext">
                Understand difficult legal language through simpler Filipino
                and Taglish explanations, document summaries, and contextual
                questions.
              </p>

              {/* Visual — before/after translation */}
              <div aria-hidden className="mt-6">
                <div className="rounded-md border-[1.5px] border-ink bg-white p-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-subtext">
                    Original clause
                  </span>
                  <p className="mt-1.5 text-xs italic leading-relaxed text-subtext">
                    &ldquo;The Lessor shall not be held liable for any damages
                    arising from force majeure events.&rdquo;
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="dash-connector-y block h-4 w-[2px]" />
                  <span className="-my-1 flex size-9 items-center justify-center rounded-[6px] border-[1.5px] border-ink bg-brand text-white shadow-brutal-sm">
                    <Sparkles className="size-4" />
                  </span>
                  <span className="dash-connector-y block h-4 w-[2px]" />
                </div>

                <div className="rounded-md border-[1.5px] border-ink bg-brand-soft p-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brand-deep">
                    Sa Filipino
                  </span>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-brand-deep">
                    Hindi mananagot ang may-ari sa mga pinsalang dulot ng force
                    majeure — tulad ng bagyo o lindol.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---------------- 05 — Legal Dictionary and Document History ---------------- */}
          <Reveal delay={320} className="min-w-0 lg:col-span-7">
            <article className="card-neo lift-neo h-full p-6">
              <FeatureBadge number="05" tone="ink" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tight text-ink">
                Legal Dictionary and Document History
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-subtext">
                Explore legal terminology and access saved document scans and
                available offline resources.
              </p>

              {/* Visual — dictionary entry + saved scans */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Dictionary entry */}
                <div aria-hidden className="card-neo p-4">
                  <div className="flex h-8 items-center gap-2 rounded-[4px] border-[1.5px] border-ink bg-white px-2.5">
                    <Search className="size-3.5 text-subtext" />
                    <span className="text-xs text-subtext">
                      Search legal terms…
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-subtext">
                      Lex-Library
                    </span>
                    <p className="mt-1 text-sm font-extrabold text-ink">
                      Force Majeure
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-subtext">
                      Unexpected events outside one&apos;s control — storms,
                      earthquakes, floods — that may excuse contractual
                      obligations.
                    </p>
                    <span className="chip-neo mt-3 px-1.5 py-0.5 text-[10px] uppercase">
                      <WifiOff className="size-3" />
                      Offline
                    </span>
                  </div>
                </div>

                {/* Document history */}
                <div aria-hidden>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-subtext">
                    Document history
                  </span>
                  <ul className="mt-2 divide-y divide-hairline rounded-[4px] border-[1.5px] border-ink bg-white">
                    {HISTORY_ROWS.map((row) => (
                      <li
                        key={row.name}
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand-deep">
                          <FileText className="size-3.5" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">
                          {row.name}
                        </span>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-subtext">
                          {row.date}
                        </span>
                        <span className="size-2 shrink-0 rounded-[1.5px] bg-brand" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
