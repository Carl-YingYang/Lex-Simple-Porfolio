import { ChevronLeft, Images, Plus, Zap } from "lucide-react";
import { Check } from "lucide-react";

/**
 * CSS recreation of the Lex-Simple Scanner screen (camera mode),
 * following the app's ScannerScreen v7 spec:
 * - Dark media chrome (#090B10 / #121720) that is intentionally not themed.
 * - Purple primary + light-purple accents; no blue, no yellow.
 * - Circular shutter, page badge and icon chips only.
 * - Filipino helper copy, as used throughout the actual app.
 */
export function ScanScreen() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col bg-[#090B10] pt-12 text-white"
    >
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="flex size-8 items-center justify-center rounded-[6px] border border-[#2C3647] bg-[#121720]">
          <ChevronLeft className="size-4 text-[#C5CDDA]" />
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-1.5 rounded-[1px] bg-[#7C3AED]" />
          <span className="inline-block size-1.5 rounded-[1px] bg-white" />
          <span className="text-[11px] font-bold tracking-[0.22em] text-white">
            SCANNER
          </span>
        </span>
        {/* Page badge — circular per spec */}
        <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-[#2C3647] bg-[#121720] px-2 font-mono text-[10px] font-bold text-[#C5CDDA]">
          3&nbsp;PG
        </span>
      </div>

      {/* ---- Viewfinder ---- */}
      <div className="relative mx-3 mb-2 flex-1 overflow-hidden rounded-md border border-[#2C3647] bg-[#121720]/60">
        {/* Document being scanned */}
        <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.5deg] rounded-[3px] border border-black/20 bg-[#F5F5F0] p-3 shadow-lg">
          <div className="mb-2 h-1.5 w-3/5 rounded-full bg-[#9C9C9C]" />
          <div className="mb-1.5 h-1 w-full rounded-full bg-[#CFCFCF]" />
          <div className="mb-1.5 h-1 w-11/12 rounded-full bg-[#CFCFCF]" />
          <div className="mb-1.5 h-1 w-full rounded-full bg-[#CFCFCF]" />
          <div className="mb-1.5 h-1 w-4/5 rounded-full bg-[#CFCFCF]" />
          <div className="mb-1.5 h-1 w-full rounded-full bg-[#CFCFCF]" />
          <div className="mb-3 h-1 w-2/3 rounded-full bg-[#CFCFCF]" />
          <div className="flex items-center justify-between">
            <div className="h-1.5 w-12 rounded-full bg-[#B9B9B9]" />
            <div className="h-2.5 w-10 rounded-[2px] border border-[#B9B9B9]" />
          </div>
          <div className="mt-3 h-1 w-1/2 rounded-full bg-[#CFCFCF]" />
        </div>

        {/* Scanning sweep */}
        <div className="scan-sweep" />

        {/* Corner brackets */}
        <span className="absolute left-3 top-3 size-5 rounded-[2px] border-l-[3px] border-t-[3px] border-[#C4B5FD]" />
        <span className="absolute right-3 top-3 size-5 rounded-[2px] border-r-[3px] border-t-[3px] border-[#C4B5FD]" />
        <span className="absolute bottom-3 left-3 size-5 rounded-[2px] border-b-[3px] border-l-[3px] border-[#C4B5FD]" />
        <span className="absolute bottom-3 right-3 size-5 rounded-[2px] border-b-[3px] border-r-[3px] border-[#C4B5FD]" />

        {/* Filipino helper text */}
        <p className="absolute inset-x-6 bottom-8 text-center text-[9px] font-medium leading-relaxed text-[#8994A6]">
          Ilagay ang dokumento sa loob ng frame
        </p>
      </div>

      {/* ---- Captured pages ---- */}
      <div className="flex items-center gap-2 px-4 pb-2">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-[4px] border border-[#2C3647]">
          <span className="absolute inset-1 rounded-[2px] bg-[#F5F5F0] p-1">
            <span className="mb-0.5 block h-[3px] w-3/4 rounded-full bg-[#CFCFCF]" />
            <span className="mb-0.5 block h-[3px] w-full rounded-full bg-[#CFCFCF]" />
            <span className="block h-[3px] w-2/3 rounded-full bg-[#CFCFCF]" />
          </span>
          <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full border border-[#090B10] bg-[#22C55E]">
            <Check className="size-2 text-[#090B10]" strokeWidth={4} />
          </span>
        </span>
        <span className="relative size-11 shrink-0 overflow-hidden rounded-[4px] border border-[#2C3647]">
          <span className="absolute inset-1 rounded-[2px] bg-[#F5F5F0] p-1">
            <span className="mb-0.5 block h-[3px] w-2/3 rounded-full bg-[#CFCFCF]" />
            <span className="mb-0.5 block h-[3px] w-full rounded-full bg-[#CFCFCF]" />
            <span className="block h-[3px] w-1/2 rounded-full bg-[#CFCFCF]" />
          </span>
          <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full border border-[#090B10] bg-[#22C55E]">
            <Check className="size-2 text-[#090B10]" strokeWidth={4} />
          </span>
        </span>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] border border-dashed border-[#2C3647] text-[#8994A6]">
          <Plus className="size-4" />
        </span>
        <span className="ml-auto font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8994A6]">
          Pahina 3
        </span>
      </div>

      {/* ---- Capture controls ---- */}
      <div className="flex items-center justify-between px-8 pb-5 pt-1">
        <span className="flex size-11 items-center justify-center rounded-[8px] border border-[#2C3647] bg-[#121720]">
          <Images className="size-[18px] text-[#C5CDDA]" />
        </span>

        {/* Shutter — circular per spec */}
        <span className="flex size-[58px] items-center justify-center rounded-full border-[3px] border-white/90 p-[4px]">
          <span className="size-full rounded-full bg-[#7C3AED]" />
        </span>

        {/* Flash — purple tint when on */}
        <span className="flex size-11 items-center justify-center rounded-[8px] border border-[#7C3AED]/70 bg-[#7C3AED]/20">
          <Zap className="size-[18px] text-[#C4B5FD]" />
        </span>
      </div>
    </div>
  );
}
