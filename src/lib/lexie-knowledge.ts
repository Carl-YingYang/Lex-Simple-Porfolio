/**
 * ============================================================================
 * LEXIE — CLIENT-SIDE KNOWLEDGE BASE
 * ============================================================================
 * Lightweight, offline-first FAQ brain for the Lexie chat widget.
 * All answers are based on the actual Lex-Simple application documentation
 * (LexSimpleMobile). No API, no keys, no backend required for these responses.
 *
 * Questions that fall outside this knowledge base are escalated to the
 * optional /api/chat fallback (which itself degrades gracefully to an honest
 * "I'm not sure" answer).
 * ============================================================================
 */

export interface LexieTopic {
  id: string;
  /** Canonical question (used for logging/debugging only). */
  question: string;
  /** Keywords/phrases used for matching. Multi-word entries are phrase-matched. */
  keywords: string[];
  /** Conversational answer. */
  answer: string;
  /** Single-keyword topics (greetings, thanks) match more loosely. */
  loose?: boolean;
}

export const LEXIE_WELCOME =
  "Hi! I'm Lexie, your Lex-Simple guide. I can help you explore the application, understand its features, and guide you through downloading and installing it. What would you like to know?";

export const LEXIE_FALLBACK =
  "I'm not sure about that yet. You can explore the application's features in the sections above for more information.";

export const LEXIE_SUGGESTIONS = [
  "What is Lex-Simple?",
  "How do I download the app?",
  "How do I install it?",
  "How does document scanning work?",
  "What does the AI assistant do?",
  "Does it work offline?",
] as const;

export const LEXIE_TOPICS: LexieTopic[] = [
  {
    id: "greeting",
    question: "Hello / Hi",
    keywords: ["hello", "hi", "hey", "yo", "kumusta", "kamusta", "good morning", "good afternoon", "good evening"],
    answer:
      "Hello! I'm Lexie, your Lex-Simple guide. Ask me anything about the app — its features, how scanning works, or how to download and install it.",
    loose: true,
  },
  {
    id: "thanks",
    question: "Thank you",
    keywords: ["thank", "thanks", "thank you", "salamat", "thanks a lot", "appreciate"],
    answer: "You're welcome! If you have any other questions about Lex-Simple, just ask. I'm happy to help.",
    loose: true,
  },
  {
    id: "what-is",
    question: "What is Lex-Simple?",
    keywords: [
      "what is lex simple",
      "what is lex-simple",
      "what's lex simple",
      "what's lex-simple",
      "about lex simple",
      "about lex-simple",
      "about the app",
      "what is this app",
      "what is this website",
      "ano ang lex",
      "ano ang lex-simple",
    ],
    answer:
      "Lex-Simple is a mobile legal-literacy application that helps users understand complex legal documents through OCR-assisted text extraction, AI-powered simplification, document analysis, and a legal dictionary. It explains difficult legal language in simpler Filipino and Taglish.",
  },
  {
    id: "features",
    question: "What can Lex-Simple do?",
    keywords: [
      "features",
      "what can it do",
      "what can the app do",
      "capabilities",
      "what does it do",
      "functions",
      "tools",
    ],
    answer:
      "Lex-Simple includes smart document scanning (camera or gallery, multi-page), on-device OCR text extraction, document analysis with complexity scores and highlighted clauses, AI simplification in Filipino and Taglish, an Ask AI chat assistant, a legal dictionary (Lex-Library), and saved scan history. You can see all of them in the Features section above.",
  },
  {
    id: "download",
    question: "How do I download the app?",
    keywords: [
      "download",
      "download the app",
      "download app",
      "where can i get",
      "where do i get",
      "get the app",
      "get lex simple",
      "get lex-simple",
      "apk",
      "installation file",
      "paano madownload",
    ],
    answer:
      "You can download Lex-Simple using the Download App button on this website once the official Android installation file is available. The button is ready — as soon as the official package is published, it will point to the real download link.",
  },
  {
    id: "install",
    question: "How do I install it?",
    keywords: [
      "install",
      "installation",
      "how to install",
      "install it",
      "setup",
      "set up",
      "paano i-install",
      "installation instructions",
    ],
    answer:
      "When the official APK is available, download the file on your Android device. Open the downloaded APK and follow Android's installation instructions. Depending on your device settings, you may need to allow installation from that source.",
  },
  {
    id: "scanning",
    question: "How does document scanning work?",
    keywords: [
      "scanning",
      "scan",
      "scanner",
      "camera",
      "capture",
      "take a picture",
      "take photo",
      "gallery",
      "upload",
      "multi page",
      "multiple pages",
      "pages",
    ],
    answer:
      "You can capture document pages using your camera or select images from your gallery. Lex-Simple uses OCR to extract the text so the document can be reviewed and analyzed. Multi-page documents are supported through the document-scanning workflow.",
  },
  {
    id: "ocr",
    question: "What is OCR / text extraction?",
    keywords: ["ocr", "text extraction", "extract text", "extract the text", "text recognition", "reads text"],
    answer:
      "OCR stands for Optical Character Recognition. Lex-Simple runs OCR on your device to turn document images into readable text. That extracted text is what the app uses for review and AI-assisted document analysis.",
  },
  {
    id: "analysis",
    question: "What does the document analysis show?",
    keywords: [
      "analysis",
      "analyze",
      "result",
      "results",
      "complexity",
      "score",
      "findings",
      "clauses",
      "clause",
      "highlight",
      "highlights",
      "summary",
      "summarize",
      "buod",
    ],
    answer:
      "After scanning, Lex-Simple can analyze the document and show a complexity score, a document summary, and clauses that may deserve closer attention. These are informational findings to help you review — they are not definitive legal judgments or guarantees that a document is safe or unsafe.",
  },
  {
    id: "ai-assistant",
    question: "What does the AI assistant do?",
    keywords: [
      "ai assistant",
      "what does the ai do",
      "ask ai",
      "lexie app",
      "assistant",
      "chatbot",
      "chat bot",
      "simplification",
      "simplify",
      "explain",
      "explanation",
      "artificial intelligence",
    ],
    answer:
      "The AI assistant (also named Lexie inside the app) explains difficult legal language in simpler Filipino and Taglish. It provides document summaries, simplifies complex clauses, and answers contextual questions about your scanned documents in a conversational chat.",
  },
  {
    id: "filipino",
    question: "Does it understand Filipino?",
    keywords: [
      "filipino",
      "tagalog",
      "taglish",
      "language",
      "wika",
      "taga pilipinas",
      "philippines",
      "pinoy",
    ],
    answer:
      "Yes! Lex-Simple was built with Filipino users in mind. The AI explains legal documents in simpler Filipino and Taglish, and you can ask follow-up questions conversationally. The app interface itself also uses Filipino in places.",
  },
  {
    id: "offline",
    question: "Does it work offline?",
    keywords: [
      "offline",
      "internet",
      "connection",
      "no internet",
      "without internet",
      "wifi",
      "data",
      "online",
      "walang internet",
    ],
    answer:
      "Some features, such as on-device OCR, the available offline legal dictionary, and saved resources, can work without an internet connection. AI-powered document analysis and chat may require internet access.",
  },
  {
    id: "lawyer",
    question: "Can Lex-Simple replace a lawyer?",
    keywords: [
      "lawyer",
      "attorney",
      "legal advice",
      "replace a lawyer",
      "abogado",
      "substitute",
      "is it reliable",
      "can i trust",
      "accurate",
    ],
    answer:
      "No. Lex-Simple is designed to support legal literacy and help users understand legal language. It is not a replacement for a lawyer or professional legal advice. For important matters, always consult a qualified legal professional.",
  },
  {
    id: "dictionary",
    question: "What is the legal dictionary?",
    keywords: [
      "dictionary",
      "legal terms",
      "terminology",
      "terms",
      "lex library",
      "lex-library",
      "library",
      "definition",
      "definitions",
      "vocabulary",
    ],
    answer:
      "The Lex-Library is Lex-Simple's legal dictionary. It lets you explore legal terminology with searchable definitions, and it's one of the features that can be used offline.",
  },
  {
    id: "history",
    question: "Does it save my documents?",
    keywords: [
      "history",
      "saved",
      "save",
      "past documents",
      "previous scans",
      "my scans",
      "records",
      "save documents",
    ],
    answer:
      "Yes — Lex-Simple keeps a scan history where you can revisit your saved document scans and their available details, even when you're offline.",
  },
  {
    id: "documents",
    question: "What document types are supported?",
    keywords: [
      "pdf",
      "word",
      "document converter",
      "file types",
      "file formats",
      "docx",
      "contracts",
      "contract",
      "agreement",
      "documents",
    ],
    answer:
      "You can scan printed documents with your camera, upload images from your gallery, and use the document converter for PDF and Word files. Common examples include contracts, lease agreements, and other legal paperwork.",
  },
  {
    id: "platform",
    question: "What devices does it run on?",
    keywords: [
      "android",
      "ios",
      "iphone",
      "apple",
      "platform",
      "device",
      "phone",
      "requirements",
      "supported",
      "device requirements",
    ],
    answer:
      "Lex-Simple is a mobile application built for Android. The official Android installation package will be available through the Download App button on this page once it's published. I don't have confirmed details about other platforms yet.",
  },
  {
    id: "cost",
    question: "How much does it cost?",
    keywords: ["cost", "price", "pricing", "free", "bayad", "payment", "pay", "subscription", "fee", "charge"],
    answer:
      "I don't have pricing details to share here. Keep an eye on the Download section of this page — download availability and any related details will be announced there once the official package is published.",
  },
];

/**
 * Normalize free-text input: lowercase, strip punctuation, collapse spaces.
 */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Find the best-matching predefined answer for a user message.
 * Returns null when nothing matches well enough (the caller can then try
 * the optional AI fallback or respond with the honest fallback message).
 */
export function findLexieResponse(input: string): string | null {
  const text = normalize(input);
  if (!text) return null;

  const words = new Set(text.split(" "));

  let best: { topic: LexieTopic; score: number } | null = null;

  for (const topic of LEXIE_TOPICS) {
    let score = 0;
    for (const keyword of topic.keywords) {
      const kw = normalize(keyword);
      if (!kw) continue;
      if (kw.includes(" ")) {
        // Phrase keyword — strong signal.
        if (text.includes(kw)) score += 3;
      } else {
        // Single token — weak signal, but counts.
        if (words.has(kw)) score += 1;
        else if (kw.length > 4 && text.includes(kw)) score += 1;
      }
    }
    const threshold = topic.loose ? 1 : 2;
    if (score >= threshold && (!best || score > best.score)) {
      best = { topic, score };
    }
  }

  return best ? best.topic.answer : null;
}
