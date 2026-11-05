# Task 3-d — Lexie Chat Widget (floating) + /api/chat LLM fallback

**Agent:** lexie-widget builder
**Status:** COMPLETE — lint clean (exit 0), tsc clean for both files, curl tests passed.

## Files created (only these two)

1. `src/components/lexie/lexie-widget.tsx` — `"use client"` component exporting `LexieWidget`.
2. `src/app/api/chat/route.ts` — POST endpoint using `z-ai-web-dev-sdk` (server only).

No other files were touched. `page.tsx` / `layout.tsx` / `globals.css` untouched — **the widget still needs to be mounted** (e.g. `<LexieWidget />` at the end of the page body by whoever owns `page.tsx`).

## Widget summary (`LexieWidget`)

- Root `fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3`; panel + FAB stack vertically; FAB and tooltip share a row wrapper so the tooltip renders **left of the FAB**.
- FAB 56px (`size-14`), brand bg, hard 4px shadow, white icon plate with `/lexie-avatar.png` (next/image); swaps to lucide `X` when open; pulsing green online dot; `aria-expanded` / `aria-controls="lexie-chat-panel"` / descriptive aria-label.
- Tooltip "Need help? Ask Lexie" (`role="status"`, anim-pop-in, dismiss X button) shows 2.5s after mount, auto-hides 14s later, hidden while open or after dismissal.
- Panel: `role="dialog" aria-modal="false"`, `h-[min(34rem,calc(100dvh-7.5rem))] w-[min(24rem,calc(100vw-2rem))]` (no navbar overlap, no horizontal overflow), `anim-pop-in`, `shadow-brutal-lg`. Header = avatar + name + online pill + close btn (brand bg). Escape closes (window keydown while open); focus moves to input on open and back to FAB on close.
- Messages area: `nice-scroll`, `aria-live="polite"`, auto-scrolls on `messages`/`typing`/`open` change with `prefers-reduced-motion` respected. Lexie bubbles (white, 1.5px ink border), user bubbles (brand bg, `ml-auto`), 3-dot `typing-dot` indicator with sr-only "Lexie is typing".
- Conversation state seeded once with `LEXIE_WELCOME` and persists across close/open for the page lifetime (no localStorage).
- Suggestion chips from `LEXIE_SUGGESTIONS` render only while the user has sent 0 messages; clicking sends it as a normal user message.
- Input bar: `<form>` + input (aria-label, autocomplete off) + send button `disabled` while a reply is pending; Enter submits.
- Response pipeline: `findLexieResponse(text)` first (650–1200ms simulated delay, pure client, no backend needed) → else `fetch POST /api/chat` with the last 8 messages mapped to user/assistant roles, `AbortController` with 20s timeout → any failure appends `LEXIE_FALLBACK`. Unmount-safe via `isMountedRef` + timer/abort cleanup in `useEffect` return. Message ids via `crypto.randomUUID()` (Math.random fallback). All setState lives inside callbacks (timers/handlers/promises) — no synchronous setState in effects (repo ESLint rule).
- Classes match the spec verbatim; only deliberate addition: `w-fit` on message/typing bubbles so `max-w-[85%]` behaves as intended (shrink-to-fit, cap at 85%).

## API summary (`POST /api/chat`)

- Validates body: `messages` array of 1..12, roles `"user"|"assistant"`, string contents trimmed to max 600 chars, non-empty after trim → else `400 {error:"Invalid request"}`.
- Module-scope in-memory rate limit per IP (`x-forwarded-for` first value, else `"unknown"`): 15 req/min; expired buckets pruned every request, hard map cap 10k. On limit → `200 {reply: LEXIE_FALLBACK, source:"fallback"}`.
- LLM call: `ZAI.create()` → `zai.chat.completions.create({ messages: [persona(role "assistant"), ...history], thinking: disabled })`. Non-empty reply → `{reply, source:"ai"}`; empty reply or ANY thrown error → `{reply: LEXIE_FALLBACK, source:"fallback"}` (never leaks error details).
- Persona (system prompt, role "assistant") covers: what Lex-Simple is (Android legal-literacy app: multi-page scanning, on-device OCR, AI analysis as informational findings, Filipino/Taglish explanations, Lex-Library, history), answer style (warm, 1-3 short paragraphs, mirror user language, no emojis/markdown headers), download status (not published yet, no invented URLs/dates/pricing), honesty rules (never claims full offline), and no-legal-advice reminders.
- `LEXIE_FALLBACK` imported from `@/lib/lexie-knowledge` (pure data, server-safe).

## Test results

- Valid: `{"messages":[{"role":"user","content":"hello, who are you?"}]}` → 200 `{"reply":"Hello! I'm Lexie, your friendly guide...","source":"ai"}`.
- Invalid (empty array / bad role / malformed JSON / missing key / 601-char content) → 400 `{"error":"Invalid request"}` in all cases.
- Burst of 16 concurrent → rate limiter + upstream 429s both degraded gracefully to fallback replies (all HTTP 200, no leaked details); window resets after 60s (next request returned `source:"ai"`).
- iOS question answered honestly per persona (Android-only, no invented dates).
- `bun run lint` → exit 0. `bunx tsc --noEmit` → the only 3 errors are pre-existing in `examples/` and `skills/` (not task files).

## Notes for other agents

- Mount with `import { LexieWidget } from "@/components/lexie/lexie-widget"` and render once (e.g. after `</main>` / before footer in `page.tsx`). It is self-contained; needs nothing else.
- Widget works fully offline for all predefined knowledge-base questions; the AI fallback is optional and degrades to `LEXIE_FALLBACK` on any failure.
- `SITE` / `APP_DOWNLOAD_URL` from `@/config/site` were NOT imported in the widget (spec'd UI/logic never uses them; download Q&A is covered by the knowledge base) — avoids unused imports.
