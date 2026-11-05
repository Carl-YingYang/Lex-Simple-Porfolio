import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  /** Small ALL-CAPS label above the title (echoes the app's app-bar style). */
  overline: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Use on dark sections (ink background). */
  dark?: boolean;
  className?: string;
}

/**
 * Shared section heading: overline with the app's signature
 * "ink/purple square pair" motif, bold title, supporting text.
 */
export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          align === "center" && "justify-center"
        )}
      >
        <span aria-hidden className="inline-block size-2 rounded-[1.5px] bg-brand" />
        <span
          aria-hidden
          className={cn(
            "inline-block size-2 rounded-[1.5px]",
            dark ? "bg-white" : "bg-ink"
          )}
        />
        <span
          className={cn(
            "font-mono text-xs font-bold uppercase tracking-[0.22em]",
            dark ? "text-brand-light" : "text-brand-deep"
          )}
        >
          {overline}
        </span>
      </div>
      <h2
        className={cn(
          "mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-white/65" : "text-subtext"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
