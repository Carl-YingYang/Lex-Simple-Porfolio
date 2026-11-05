import type { ComponentType } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { ScanScreen } from "@/components/phone/scan-screen";
import { ResultScreen } from "@/components/phone/result-screen";
import { LexieScreen } from "@/components/phone/lexie-screen";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

interface ShowcasePreview {
  id: string;
  index: string;
  title: string;
  copy: string;
  /** Status-bar contrast for the phone frame. */
  dark: boolean;
  /** Stagger / rotation applied directly to the phone frame. */
  frameClassName: string;
  shadowClassName: string;
  Screen: ComponentType;
}

const PREVIEWS: ShowcasePreview[] = [
  {
    id: "scanner",
    index: "01 / Scanner",
    title: "Document Scanner",
    copy: "Kumuha ng mga pahina gamit ang camera mo o mag-import ng images mula sa gallery. Multi-page scanning para naka-sama-sama ang mahahabang documents sa isang workflow.",
    dark: true,
    frameClassName: "-rotate-2 lg:translate-y-6",
    shadowClassName: "shadow-brutal-md",
    Screen: ScanScreen,
  },
  {
    id: "analysis",
    index: "02 / Analysis",
    title: "Analysis Results",
    copy: "I-review ang complexity score, AI-generated summary, at mga clause na naka-highlight para sa mas malapitang tingin — impormasyon lang ito, hindi legal na hatol.",
    dark: false,
    frameClassName: "relative z-10 lg:-translate-y-2",
    shadowClassName: "shadow-brutal-xl",
    Screen: ResultScreen,
  },
  {
    id: "lexie",
    index: "03 / Lexie",
    title: "Lexie Assistant",
    copy: "Magtanong sa Filipino o Taglish at makatanggap ng malinaw at kausap na mga paliwanag mula sa built-in assistant.",
    dark: false,
    frameClassName: "rotate-2 lg:translate-y-6",
    shadowClassName: "shadow-brutal-md",
    Screen: LexieScreen,
  },
];

/**
 * App Showcase — three phone mockups (Scanner, Result, Ask AI) in a
 * mobile-first scroll-snap carousel that becomes a staggered 3-column
 * row on large screens.
 */
export function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Faint dot-grid texture, faded towards the edges */}
      <div
        aria-hidden
        className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(70%_55%_at_50%_40%,black,transparent)]"
      />

      <div className="container-site relative">
        <SectionHeading
          overline="Silip sa App"
          title="Kilalanin ang legal-literacy buddy mo."
          description="Mas malapitang tingin sa core Lex-Simple experience — mula sa pag-capture ng documents hanggang sa pakikipagkuwentuhan kay Lexie."
        />

        {/* Mobile-only carousel hint */}
        <div
          aria-hidden
          className="mt-8 flex items-center justify-center gap-1.5 lg:hidden"
        >
          <ChevronLeft className="size-3.5 text-subtext" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-subtext">
            I-swipe para mag-explore
          </span>
          <ChevronRight className="size-3.5 text-subtext" />
        </div>

        <div className="mt-16">
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-10 nice-scroll lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
            {PREVIEWS.map((preview, index) => {
              const { Screen } = preview;
              return (
                <div
                  key={preview.id}
                  className="w-[280px] shrink-0 snap-center sm:w-[300px] lg:w-auto"
                >
                  <Reveal delay={index * 100}>
                    <PhoneFrame
                      dark={preview.dark}
                      className={cn("mx-auto", preview.frameClassName)}
                      shadowClassName={preview.shadowClassName}
                    >
                      <Screen />
                    </PhoneFrame>

                    <div className="mt-8 rounded-md border-[1.5px] border-ink bg-paper p-5 lg:mt-12">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-deep">
                        {preview.index}
                      </p>
                      <h3 className="mt-2 text-lg font-extrabold tracking-tight text-ink">
                        {preview.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-subtext">
                        {preview.copy}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* Honesty note */}
        <p className="mx-auto mt-4 flex max-w-md items-start justify-center gap-1.5 text-center text-xs text-subtext">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Ang mga interface previews ay mga illustrative recreations na
            inspired by the Lex-Simple app — hindi mga aktwal na screenshots.
          </span>
        </p>
      </div>
    </section>
  );
}
