import type { LucideIcon } from "lucide-react";
import { Camera, ChevronRight, MessageCircle, ScanText } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/* ---------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

interface Step {
  /** Large translucent watermark digit shown in the card corner. */
  number: string;
  label: string;
  icon: LucideIcon;
  title: string;
  copy: string;
}

const STEPS: Step[] = [
  {
    number: "1",
    label: "Hakbang 01",
    icon: Camera,
    title: "I-scan o I-upload",
    copy: "Kumuha ng litrato ng dokumento gamit ang camera, o pumili ng existing image mula sa gallery mo.",
  },
  {
    number: "2",
    label: "Hakbang 02",
    icon: ScanText,
    title: "I-extract at I-analyze",
    copy: "Kinukuha ng OCR ang text ng dokumento, na gagamitin naman para sa AI-assisted document analysis.",
  },
  {
    number: "3",
    label: "Hakbang 03",
    icon: MessageCircle,
    title: "Intindihin at Magtanong",
    copy: "Basahin ang buod ng dokumento, mga naka-highlight na clauses, at mga paliwanag. Kung may gusto kang linawin pa, tanungin mo si Lexie.",
  },
];

/* ---------------------------------------------------------------------------
 * How It Works — three numbered steps on a dark ink panel with animated
 * dashed connectors (horizontal between columns on desktop, vertical in the
 * left margin of the stacked mobile layout).
 * ------------------------------------------------------------------------- */

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-ink py-20 sm:py-28"
    >
      {/* Backdrop: faint dot grid */}
      <div
        aria-hidden
        className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
      />

      <div className="container-site relative">
        <SectionHeading
          dark
          overline="Paano Gumagana"
          title="Tatlong simpleng hakbang para mas maintindihan ang mga documents mo."
        />

        <div className="relative mt-14">
          {/* Desktop connector — spans between the first and last card centers */}
          <div
            aria-hidden
            className="dash-connector-x absolute left-[16%] right-[16%] top-10 hidden h-[2px] md:block"
          />
          <span
            aria-hidden
            className="absolute left-1/3 top-10 hidden size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[3px] bg-ink md:flex"
          >
            <ChevronRight className="size-3.5 text-brand-light" />
          </span>
          <span
            aria-hidden
            className="absolute left-2/3 top-10 hidden size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[3px] bg-ink md:flex"
          >
            <ChevronRight className="size-3.5 text-brand-light" />
          </span>

          {/* Mobile connector — vertical dashes in the left margin */}
          <div
            aria-hidden
            className="dash-connector-y absolute bottom-4 left-[27px] top-4 w-[2px] md:hidden"
          />

          <ol className="relative z-10 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
            {STEPS.map(({ icon: Icon, label, number, title, copy }, index) => (
              <li key={label}>
                <Reveal delay={index * 120} className="h-full">
                  <article className="relative h-full rounded-md border-[1.5px] border-white/85 bg-[#1C1C1E] p-6">
                    <span
                      aria-hidden
                      className="absolute right-4 top-3 font-mono text-5xl font-extrabold text-white/10"
                    >
                      {number}
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-brand-light">
                      {label}
                    </span>
                    <span className="mt-4 flex size-12 items-center justify-center rounded-[6px] border-2 border-white bg-brand shadow-brutal-white">
                      <Icon aria-hidden className="size-6 text-white" />
                    </span>
                    <h3 className="mt-4 text-xl font-extrabold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {copy}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
