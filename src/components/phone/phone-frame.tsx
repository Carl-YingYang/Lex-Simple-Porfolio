import type { ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  /** Status-bar contrast: true for dark screens, false for light screens. */
  dark?: boolean;
  className?: string;
  /** Tailwind shadow class for the device (defaults to shadow-brutal-lg). */
  shadowClassName?: string;
}

/**
 * Realistic smartphone frame used for all app-interface mockups.
 * 9:19.5 screen, ink bezel, dynamic island, side buttons.
 * Screens are rendered as children and should fill the screen with
 * `absolute inset-0` and their own top padding for the status bar.
 */
export function PhoneFrame({
  children,
  dark = false,
  className,
  shadowClassName = "shadow-brutal-lg",
}: PhoneFrameProps) {
  return (
    <div className={cn("relative w-full max-w-[300px]", className)}>
      {/* Side buttons */}
      <div
        aria-hidden
        className="absolute -left-[3px] top-[110px] h-9 w-[3px] rounded-l-[2px] bg-ink"
      />
      <div
        aria-hidden
        className="absolute -left-[3px] top-[156px] h-14 w-[3px] rounded-l-[2px] bg-ink"
      />
      <div
        aria-hidden
        className="absolute -right-[3px] top-[128px] h-16 w-[3px] rounded-r-[2px] bg-ink"
      />

      {/* Device */}
      <div
        className={cn(
          "relative rounded-[2.4rem] border-2 border-ink bg-ink p-[9px]",
          shadowClassName
        )}
      >
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.9rem] bg-white">
          {/* Status bar */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[13px] font-semibold",
              dark ? "text-white" : "text-ink"
            )}
          >
            <span className="text-[11px] tracking-wide">9:41</span>
            <span className="flex items-center gap-1.5">
              <Signal aria-hidden className="size-[13px]" strokeWidth={2.5} />
              <Wifi aria-hidden className="size-[13px]" strokeWidth={2.5} />
              <BatteryFull aria-hidden className="size-[15px]" strokeWidth={2.5} />
            </span>
          </div>

          {/* Dynamic island */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[10px] z-40 h-[19px] w-[72px] -translate-x-1/2 rounded-full bg-ink"
          />

          {children}
        </div>
      </div>
    </div>
  );
}
