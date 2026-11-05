import { ChevronLeft, ChevronRight, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FINDINGS = [
  {
    severity: "WARNING",
    chipClassName: "bg-[#D97706] text-ink",
    title: "Automatic renewal clause",
    note: "Mag-re-renew ang kontrata kung hindi magpaalam 30 araw bago matapos.",
  },
  {
    severity: "HIGH",
    chipClassName: "bg-[#DC2626] text-white",
    title: "Early termination penalty",
    note: "May multa kapag natapos agad ang kontrata.",
  },
  {
    severity: "REVIEW",
    chipClassName: "bg-brand-vivid text-ink",
    title: "Security deposit conditions",
    note: "Tingnan ang kundisyon ng depasito.",
  },
] as const;

/**
 * CSS recreation of the Lex-Simple Result screen (ResultScreen v8 spec):
 * - Light paper theme with purple accents and ink borders.
 * - The complexity score card is the focal element (2px border + hard shadow).
 * - Filipino stat labels and copy, as used in the actual app.
 */
export function ResultScreen() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col bg-paper pt-12">
      {/* ---- App bar ---- */}
      <div className="flex items-center justify-between border-b-[1.5px] border-hairline px-4 pb-2.5">
        <span className="flex size-8 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-white">
          <ChevronLeft className="size-4 text-ink" />
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-[1px] bg-brand" />
          <span className="inline-block size-1.5 rounded-[1px] bg-ink" />
          <span className="text-[11px] font-bold tracking-[0.22em] text-ink">
            RESULT
          </span>
        </span>
        <span className="flex size-8 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-white">
          <Share2 className="size-3.5 text-ink" />
        </span>
      </div>

      {/* ---- Scrollable body (clipped mid-list, like the real screen) ---- */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {/* Hero score card — focal element */}
        <div className="mx-3 mt-3 rounded-md border-2 border-ink bg-white p-3.5 shadow-brutal-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] font-bold uppercase leading-none tracking-[0.18em] text-subtext">
              Complexity Score
            </span>
            <span className="rounded-[3px] border border-ink bg-brand-soft px-1.5 py-0.5 font-mono text-[8px] font-bold leading-none text-brand-deep">
              MODERATE
            </span>
          </div>

          <p className="mt-1.5 flex items-baseline gap-1">
            <span className="font-mono text-4xl font-extrabold leading-none text-ink">
              62
            </span>
            <span className="font-mono text-xs font-bold text-subtext">/100</span>
          </p>

          {/* Flat meter */}
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-[2px] border border-ink bg-hairline">
            <div className="h-full w-[62%] bg-brand" />
          </div>

          {/* Quick stats — labels from the real app */}
          <div className="mt-3 grid grid-cols-3 divide-x-[1.5px] divide-hairline">
            <div className="px-2 text-center">
              <p className="font-mono text-[8px] font-bold uppercase leading-none tracking-[0.14em] text-subtext">
                Findings
              </p>
              <p className="mt-1 font-mono text-sm font-extrabold leading-none text-ink">
                3
              </p>
            </div>
            <div className="px-2 text-center">
              <p className="font-mono text-[8px] font-bold uppercase leading-none tracking-[0.14em] text-subtext">
                Bawas
              </p>
              <p className="mt-1 font-mono text-sm font-extrabold leading-none text-ink">
                2
              </p>
            </div>
            <div className="px-2 text-center">
              <p className="font-mono text-[8px] font-bold uppercase leading-none tracking-[0.14em] text-subtext">
                Detalye
              </p>
              <p className="mt-1 font-mono text-sm font-extrabold leading-none text-ink">
                5
              </p>
            </div>
          </div>
        </div>

        {/* AI summary card */}
        <div className="mx-3 mt-2.5 rounded-md border-[1.5px] border-ink bg-white p-3">
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand-deep">
              <Sparkles className="size-3.5" />
            </span>
            <span className="text-[11px] font-extrabold tracking-wide text-ink">
              AI BUOD
            </span>
            <span className="ml-auto rounded-[3px] border border-ink bg-brand px-1.5 py-0.5 font-mono text-[8px] font-bold leading-none text-white">
              AI
            </span>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-subtext">
            Ang kontrata ay may 12 buwang termino at awtomatikong mag-re-renew.
            May tatlong probisyon na dapat tingnan nang mabuti bago pumirma.
          </p>

          <div className="mt-2.5 flex items-center justify-center gap-1 rounded-[4px] border-[1.5px] border-ink bg-brand py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
            Tingnan ang buong resulta
            <ChevronRight className="size-3" />
          </div>
        </div>

        {/* Findings label */}
        <div className="mx-4 mt-3 flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-[1px] bg-brand" />
          <span className="inline-block size-1.5 rounded-[1px] bg-ink" />
          <span className="font-mono text-[9px] font-bold uppercase leading-none tracking-[0.18em] text-ink">
            Mga Pagkakatuklas / Findings
          </span>
        </div>

        {/* Clause cards */}
        <div className="mx-3 mt-2 space-y-2">
          {FINDINGS.map((finding) => (
            <div
              key={finding.title}
              className="rounded-[4px] border-[1.5px] border-ink bg-white p-2.5"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "shrink-0 rounded-[3px] border border-ink px-1.5 py-0.5 font-mono text-[8px] font-bold leading-none",
                    finding.chipClassName
                  )}
                >
                  {finding.severity}
                </span>
                <span className="text-[10px] font-bold leading-tight text-ink">
                  {finding.title}
                </span>
              </div>
              <p className="mt-1 text-[9px] leading-snug text-subtext">
                {finding.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Pinned disclaimer ---- */}
      <p className="mb-4 mt-3 px-4 text-center text-[8px] leading-relaxed text-subtext">
        Impormasyon lamang — hindi ito legal na payo.
      </p>
    </div>
  );
}
