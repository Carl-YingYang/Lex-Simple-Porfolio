import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { LEXIE_FALLBACK } from "@/lib/lexie-knowledge";

/**
 * ============================================================================
 * /api/chat — LEXIE LLM FALLBACK (SERVER ONLY)
 * ============================================================================
 * The website widget answers predefined FAQ questions entirely client-side.
 * Only unmatched questions reach this endpoint, which forwards a sanitized
 * conversation plus the Lexie persona to the LLM via z-ai-web-dev-sdk.
 * Every failure mode degrades to the honest LEXIE_FALLBACK reply — no error
 * details are ever leaked to the client, and no credentials are exposed.
 * ============================================================================
 */

/** Lexie persona + guardrails for the website guide. */
const LEXIE_SYSTEM_PROMPT = `You are Lexie, the friendly guide on the Lex-Simple website.

Lex-Simple is a mobile legal-literacy app (Android) that helps users understand complex legal documents via camera/gallery scanning with multi-page support, ON-DEVICE OCR text extraction, AI document analysis (complexity score, summaries, highlighted clauses — informational findings, NOT legal verdicts), AI chat explanations in simpler Filipino/Taglish, an offline-capable legal dictionary (Lex-Library), and saved scan history.

Answer style: warm, conversational Taglish (natural Filipino-English code-switching, the way Filipinos actually chat — e.g. "Pwede mong i-download ang app gamit ang button sa ibaba"), concise (1-3 short paragraphs max), plain language. Keep technical terms in English (OCR, scanning, APK, download). Mirror the user's language: if they write purely in English, lean English; if Taglish/Filipino, lean Taglish. No emojis. No markdown headers.

Download status: the official Android package is NOT yet published. When asked about downloading, say the Download App button on the site will provide the official file once released. Do NOT invent URLs, dates, or pricing.

Honesty: if asked about things you don't know (pricing, iOS, future features, legal specifics), say you are not sure and suggest exploring the site sections. Never claim the app works fully offline — AI analysis and chat need internet; OCR, the dictionary, and saved details can work offline.

Never provide legal advice. When users ask legal questions, remind them that Lex-Simple is an informational legal-literacy tool, not a substitute for a qualified lawyer.`;

type ChatRole = "user" | "assistant";

interface SanitizedMessage {
  role: ChatRole;
  content: string;
}

/** Minimal structural type for the SDK's completion response. */
interface ChatCompletionLike {
  choices?: Array<{ message?: { content?: string } }>;
}

const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 600;
const RATE_LIMIT_REQUESTS = 15;
const RATE_WINDOW_MS = 60_000;
/** Hard cap so a spoofed-header flood cannot grow the map unboundedly. */
const RATE_MAP_HARD_CAP = 10_000;

/** Module-scoped in-memory rate buckets: per client IP, per minute. */
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return "unknown";
}

/** Delete expired buckets so the map stays bounded. */
function pruneRateBuckets(now: number): void {
  for (const [ip, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(ip);
  }
  if (rateBuckets.size > RATE_MAP_HARD_CAP) rateBuckets.clear();
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateBuckets(now);

  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_REQUESTS;
}

/**
 * Validate and normalize the request body.
 * Expects `{ messages: Array<{ role, content }> }` with 1..12 items, roles
 * limited to "user" | "assistant", and string contents of at most 600 chars
 * once trimmed. Returns null when anything is invalid.
 */
function parseHistory(body: unknown): SanitizedMessage[] | null {
  if (typeof body !== "object" || body === null) return null;

  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > MAX_MESSAGES) return null;

  const history: SanitizedMessage[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_CONTENT_CHARS) return null;
    history.push({ role, content: trimmed });
  }
  return history;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const history = parseHistory(body);
  if (history === null) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ reply: LEXIE_FALLBACK, source: "fallback" });
  }

  try {
    const zai = await ZAI.create();
    const completion = (await zai.chat.completions.create({
      messages: [{ role: "assistant", content: LEXIE_SYSTEM_PROMPT }, ...history],
      thinking: { type: "disabled" },
    })) as ChatCompletionLike;

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (reply) {
      return NextResponse.json({ reply, source: "ai" });
    }
  } catch {
    // Swallow every error — respond with the honest fallback instead.
  }

  return NextResponse.json({ reply: LEXIE_FALLBACK, source: "fallback" });
}
