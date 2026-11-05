import Image from "next/image";
import { ChevronLeft, RotateCcw, Send } from "lucide-react";

/**
 * CSS recreation of the Lex-Simple Ask AI screen (AskAiScreen v9 spec):
 * - Light paper theme with a Lexie identity header and online dot.
 * - Chat bubbles with ink borders; the user bubble uses black text on
 *   purple, exactly per the app spec.
 * - Filipino conversation copy and a live typing indicator.
 */
export function LexieScreen() {
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
            ASK AI
          </span>
        </span>
        <span className="flex size-8 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-white">
          <RotateCcw className="size-3.5 text-ink" />
        </span>
      </div>

      {/* ---- Lexie identity header ---- */}
      <div className="mx-3 mt-2.5 flex items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-white p-2.5">
        <Image
          src="/lexie-avatar.png"
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-[4px] border-[1.5px] border-ink bg-brand-soft object-contain p-0.5"
        />
        <div>
          <p className="text-xs font-extrabold leading-tight text-ink">Lexie</p>
          <p className="text-[9px] leading-tight text-subtext">
            AI Legal Assistant
          </p>
        </div>
        <span className="anim-pulse-dot ml-auto size-2 rounded-full bg-[#16A34A]" />
      </div>

      {/* ---- Messages (anchored to the input, like a real chat) ---- */}
      <div className="flex flex-1 flex-col justify-end space-y-2.5 overflow-hidden px-3 py-3">
        <div className="max-w-[85%] rounded-[6px] border-[1.5px] border-ink bg-white px-3 py-2 text-[10px] leading-relaxed text-ink">
          Kumusta! Ako si Lexie. Ano ang gusto mong malaman tungkol sa
          dokumento mo?
        </div>

        <div className="ml-auto max-w-[85%] rounded-[6px] border-[1.5px] border-ink bg-brand px-3 py-2 text-[10px] font-semibold leading-relaxed text-ink">
          Ano ibig sabihin ng &apos;force majeure&apos;?
        </div>

        <div className="max-w-[85%] rounded-[6px] border-[1.5px] border-ink bg-white px-3 py-2 text-[10px] leading-relaxed text-ink">
          Ang force majeure ay nangyayari kapag may hindi inaasahang
          pangyayari — tulad ng bagyo, lindol, o kaguluhan — na hindi kayang
          kontrolin ng mga partido sa kontrata.
        </div>

        {/* Typing indicator */}
        <div className="w-fit max-w-[85%] rounded-[6px] border-[1.5px] border-ink bg-white px-3 py-2">
          <div className="flex gap-1 py-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
      </div>

      {/* ---- Input bar ---- */}
      <div className="border-t-[1.5px] border-hairline bg-white p-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 flex-1 items-center rounded-[4px] border-[1.5px] border-ink bg-white px-2.5 text-[10px] text-subtext">
            Magtanong ka pa…
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] border-2 border-ink bg-brand shadow-[2px_2px_0_#111]">
            <Send className="size-4 text-ink" />
          </span>
        </div>
      </div>
    </div>
  );
}
