"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";
import {
  LEXIE_FALLBACK,
  LEXIE_SUGGESTIONS,
  LEXIE_WELCOME,
  findLexieResponse,
} from "@/lib/lexie-knowledge";

/**
 * ============================================================================
 * LEXIE — FLOATING CHAT WIDGET
 * ============================================================================
 * FAQ-first guide for the Lex-Simple website.
 *
 * Response pipeline:
 *   1. Predefined client-side knowledge base (`findLexieResponse`) — the
 *      widget stays fully functional with no backend at all.
 *   2. Unmatched questions escalate to POST /api/chat (LLM fallback).
 *   3. Any failure there degrades gracefully to the honest LEXIE_FALLBACK.
 * ============================================================================
 */

type ChatMessage = {
  id: string;
  role: "user" | "lexie";
  text: string;
};

/** Message id helper — crypto.randomUUID with a safe fallback. */
function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

/** Simulated thinking delay for knowledge-base answers (ms). */
const PREDEFINED_DELAY_BASE_MS = 650;
const PREDEFINED_DELAY_JITTER_MS = 550;
/** Hard timeout for the /api/chat fallback request. */
const FETCH_TIMEOUT_MS = 20_000;
/** Max conversation turns forwarded to the AI fallback. */
const HISTORY_WINDOW = 8;
/** Tooltip lifecycle: shows 2.5s after mount, auto-hides 14s later. */
const TOOLTIP_SHOW_DELAY_MS = 2_500;
const TOOLTIP_LIFETIME_MS = 14_000;

export function LexieWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  /** On phones: hide the FAB while the download offer card sits in the
      bottom fold zone, so it never covers the download CTAs. */
  const [fabHidden, setFabHidden] = useState(false);
  // Seeded once: the conversation (including the welcome message) persists
  // for the lifetime of the page, across close/open cycles.
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "lexie-welcome", role: "lexie", text: LEXIE_WELCOME },
  ]);

  const panelBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const isMountedRef = useRef(false);
  const pendingTimerRef = useRef<number | null>(null);
  const fetchTimeoutRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Tooltip: appears 2.5s after mount, auto-hides 14s after appearing.
     Auto-show is desktop-only — on phones the bubble would cover page
     content at the fold, so it never pops up on its own there. */
  useEffect(() => {
    if (!window.matchMedia("(min-width: 640px)").matches) return;
    const showTimer = window.setTimeout(() => setTooltipVisible(true), TOOLTIP_SHOW_DELAY_MS);
    const hideTimer = window.setTimeout(
      () => setTooltipVisible(false),
      TOOLTIP_SHOW_DELAY_MS + TOOLTIP_LIFETIME_MS
    );
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  /* Mount flag + cleanup of any in-flight reply work on unmount. */
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (pendingTimerRef.current !== null) window.clearTimeout(pendingTimerRef.current);
      if (fetchTimeoutRef.current !== null) window.clearTimeout(fetchTimeoutRef.current);
      abortRef.current?.abort();
    };
  }, []);

  /* On phones, fade the launcher out whenever the download offer card is
     within the bottom fold zone — the chat bubble must never cover the
     download CTAs (explicit mobile requirement). */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const isPhone = window.innerWidth < 640;
      const card = document.getElementById("download-offer-card");
      if (!isPhone || !card) {
        setFabHidden(false);
        return;
      }
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const inFoldZone = rect.bottom > viewportHeight - 150 && rect.top < viewportHeight;
      setFabHidden(inFoldZone);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Schedule the first check through rAF so setState never runs
    // synchronously inside the effect body.
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Escape closes the panel while it is open. */
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        fabRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  /* Focus the input whenever the panel opens. */
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* Auto-scroll to the newest message, respecting reduced-motion. */
  useEffect(() => {
    const el = panelBodyRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages, typing, open]);

  /**
   * Send a user message and run the response pipeline.
   * Returns false when the send was ignored (empty text / already typing).
   */
  const sendMessage = (raw: string): boolean => {
    const text = raw.trim();
    if (!text || typing) return false;

    const userMessage: ChatMessage = { id: makeId(), role: "user", text };
    const history = [...messages, userMessage];
    setMessages(history);
    setTyping(true);

    /* 1. Predefined knowledge base — no backend needed. */
    const predefined = findLexieResponse(text);
    if (predefined !== null) {
      const timer = window.setTimeout(
        () => {
          pendingTimerRef.current = null;
          if (!isMountedRef.current) return;
          setMessages((prev) => [...prev, { id: makeId(), role: "lexie", text: predefined }]);
          setTyping(false);
        },
        PREDEFINED_DELAY_BASE_MS + Math.random() * PREDEFINED_DELAY_JITTER_MS
      );
      pendingTimerRef.current = timer;
      return true;
    }

    /* 2. AI fallback via /api/chat. */
    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    fetchTimeoutRef.current = timeoutId;

    const payload = history.slice(-HISTORY_WINDOW).map((message) => ({
      role: message.role === "user" ? ("user" as const) : ("assistant" as const),
      content: message.text,
    }));

    void (async () => {
      let reply = "";
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
          signal: controller.signal,
        });
        const data: unknown = await response.json().catch(() => null);
        if (
          typeof data === "object" &&
          data !== null &&
          "reply" in data &&
          typeof (data as { reply: unknown }).reply === "string"
        ) {
          reply = (data as { reply: string }).reply.trim();
        }
      } catch {
        reply = "";
      } finally {
        window.clearTimeout(timeoutId);
        if (fetchTimeoutRef.current === timeoutId) fetchTimeoutRef.current = null;
        if (abortRef.current === controller) abortRef.current = null;
      }

      /* 3. Anything wrong above degrades to the honest fallback. */
      if (!isMountedRef.current) return;
      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: "lexie", text: reply.length > 0 ? reply : LEXIE_FALLBACK },
      ]);
      setTyping(false);
    })();

    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendMessage(input)) setInput("");
  };

  const showTooltip = tooltipVisible && !tooltipDismissed && !open;
  const showSuggestions = !messages.some((message) => message.role === "user");

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* ---------------- Chat panel ---------------- */}
      {open && (
        <section
          id="lexie-chat-panel"
          role="dialog"
          aria-label="Lexie chat"
          aria-modal="false"
          className="anim-pop-in flex h-[min(34rem,calc(100dvh-7.5rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border-2 border-ink bg-white shadow-brutal-lg"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b-2 border-ink bg-brand px-4 py-3">
            <Image
              src="/lexie-avatar.png"
              alt="Lexie avatar"
              width={40}
              height={40}
              className="size-10 rounded-[6px] border-[1.5px] border-ink bg-white object-contain p-0.5"
            />
            <div>
              <p className="text-sm font-extrabold text-white">Lexie</p>
              <p className="text-[11px] font-medium text-white/75">Your Lex-Simple guide</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-[4px] border border-white/40 px-2 py-1">
              <span
                aria-hidden="true"
                className="anim-pulse-dot size-1.5 rounded-full bg-[#4ADE80]"
              />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/85">
                Online
              </span>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                fabRef.current?.focus();
              }}
              className="ml-1 flex size-8 items-center justify-center rounded-[4px] border border-white/40 text-white transition-colors hover:bg-white/15"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={panelBodyRef}
            aria-live="polite"
            className="nice-scroll flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4"
          >
            {messages.map((message) =>
              message.role === "user" ? (
                <div
                  key={message.id}
                  className="ml-auto w-fit max-w-[85%] rounded-md border-[1.5px] border-ink bg-brand px-3 py-2 text-[13px] font-medium leading-relaxed text-white"
                >
                  {message.text}
                </div>
              ) : (
                <div
                  key={message.id}
                  className="w-fit max-w-[85%] rounded-md border-[1.5px] border-ink bg-white px-3 py-2 text-[13px] leading-relaxed text-ink"
                >
                  {message.text}
                </div>
              )
            )}

            {typing && (
              <div className="w-fit max-w-[85%] rounded-md border-[1.5px] border-ink bg-white px-3 py-2">
                <span className="flex items-center gap-1.5 py-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="sr-only">Lexie is typing</span>
                </span>
              </div>
            )}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {LEXIE_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-[4px] border-[1.5px] border-ink bg-white px-2.5 py-1.5 text-left text-[11px] font-semibold text-ink shadow-[2px_2px_0_#111] transition-colors hover:bg-brand-soft"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <form onSubmit={handleSubmit} className="border-t-[1.5px] border-ink bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                aria-label="Message Lexie"
                placeholder="Type your question…"
                autoComplete="off"
                className="h-10 min-w-0 flex-1 rounded-[4px] border-[1.5px] border-ink bg-white px-3 text-[13px] text-ink placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-brand/60"
              />
              <button
                type="submit"
                disabled={typing}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-[4px] border-2 border-ink bg-brand shadow-[3px_3px_0_#111] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#111] disabled:opacity-50"
              >
                <Send aria-hidden="true" className="size-4 text-white" />
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ---------------- FAB + tooltip row ---------------- */}
      <div
        className={`flex items-center gap-3 transition-[opacity,transform] duration-300 ${
          fabHidden && !open
            ? "pointer-events-none translate-y-24 opacity-0"
            : "opacity-100"
        }`}
      >
        {showTooltip && (
          <div
            role="status"
            className="anim-pop-in flex items-center gap-2 rounded-md border-[1.5px] border-ink bg-white px-3 py-2 shadow-brutal-sm"
          >
            <p className="text-xs font-bold text-ink">Need help? Ask Lexie</p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setTooltipDismissed(true)}
              className="flex items-center justify-center rounded-[2px] p-0.5 text-subtext transition-colors hover:text-ink"
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </div>
        )}

        <button
          ref={fabRef}
          type="button"
          aria-expanded={open}
          aria-controls="lexie-chat-panel"
          aria-label={
            open
              ? "Close Lexie chat"
              : "Open Lexie chat — Lexie can answer questions about Lex-Simple"
          }
          onClick={() => setOpen((previous) => !previous)}
          className="relative flex size-14 items-center justify-center rounded-[12px] border-2 border-ink bg-brand shadow-[4px_4px_0_#111] transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {open ? (
            <X aria-hidden="true" className="size-5 text-white" />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-white">
              <Image
                src="/lexie-avatar.png"
                alt=""
                width={32}
                height={32}
                className="size-7 object-contain"
              />
            </span>
          )}
          <span
            aria-hidden="true"
            className="anim-pulse-dot absolute -right-1.5 -top-1.5 size-3.5 rounded-full border-2 border-paper bg-[#16A34A]"
          />
        </button>
      </div>
    </div>
  );
}
