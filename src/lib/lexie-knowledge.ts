/**
 * ============================================================================
 * LEXIE — CLIENT-SIDE KNOWLEDGE BASE
 * ============================================================================
 * Lightweight, offline-first FAQ brain for the Lexie chat widget.
 * All answers are based on the actual Lex-Simple application documentation
 * (LexSimpleMobile). No API, no keys, no backend required for these responses.
 *
 * Copy is written in conversational Taglish to match the app's target users —
 * technical terms (OCR, scanning, APK, download) stay in English, exactly the
 * way the app itself speaks.
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
  "Kumusta! Ako si Lexie, ang guide mo sa Lex-Simple. Pwede mo akong tanungin tungkol sa app — mga features, paano ang scanning, o paano i-download at i-install ito. Ano'ng gusto mong malaman?";

export const LEXIE_FALLBACK =
  "Pasensya na, hindi ko pa sigurado diyan. Pwede mong i-explore ang mga features ng app sa mga sections sa itaas para sa karagdagang impormasyon.";

export const LEXIE_SUGGESTIONS = [
  "Ano ang Lex-Simple?",
  "Paano i-download ang app?",
  "Paano i-install?",
  "Paano ang document scanning?",
  "Ano ang ginagawa ng AI?",
  "Gumagana ba offline?",
] as const;

export const LEXIE_TOPICS: LexieTopic[] = [
  {
    id: "greeting",
    question: "Hello / Hi / Kumusta",
    keywords: [
      "hello", "hi", "hey", "yo", "kumusta", "kamusta", "musta",
      "good morning", "good afternoon", "good evening", "magandang umaga",
    ],
    answer:
      "Kumusta! Ako si Lexie, ang guide mo sa Lex-Simple. Pwede mo akong tanungin kahit ano tungkol sa app — mga features, paano ang scanning, o paano i-download at i-install ito.",
    loose: true,
  },
  {
    id: "thanks",
    question: "Salamat / Thank you",
    keywords: ["thank", "thanks", "thank you", "salamat", "thanks a lot", "appreciate", "maraming salamat"],
    answer:
      "Walang anuman! Kung may iba ka pang tanong tungkol sa Lex-Simple, itanong mo lang. Andito ako para tumulong.",
    loose: true,
  },
  {
    id: "who-are-you",
    question: "Sino ka? / Sino si Lexie?",
    keywords: [
      "sino ka", "sino si lexie", "sino ka ba", "who are you", "ano ka",
      "about you", "ikaw ba si lexie", "bakit ka nandito",
    ],
    answer:
      "Ako si Lexie — ang AI guide mo dito sa Lex-Simple website. Nandito ako para sagutin ang mga tanong mo tungkol sa app: mga features, scanning, download, installation, at iba pa.",
  },
  {
    id: "what-is",
    question: "Ano ang Lex-Simple?",
    keywords: [
      "what is lex simple", "what is lex-simple", "what's lex simple", "what's lex-simple",
      "about lex simple", "about lex-simple", "about the app", "what is this app", "what is this website",
      "ano ang lex", "ano ang lex-simple", "ano ang lex simple", "ano ba ang lex simple",
      "ano yung lex simple", "ano po ang lex simple",
    ],
    answer:
      "Ang Lex-Simple ay isang mobile legal-literacy app na tutulong sa iyo na intindihin ang mga kumplikadong legal documents — may OCR text extraction, AI simplification, document analysis, at legal dictionary. Ipinapaliwanag nito ang mahihirap na legal language sa mas simpleng Filipino at Taglish.",
  },
  {
    id: "features",
    question: "Ano ang mga features ng Lex-Simple?",
    keywords: [
      "features", "feature", "what can it do", "what can the app do", "capabilities",
      "what does it do", "functions", "tools", "mga features", "ano ang mga features",
      "para saan ang app", "paano gamitin ang app", "mga gamit",
    ],
    answer:
      "May smart document scanning (camera o gallery, multi-page), on-device OCR text extraction, document analysis na may complexity score at naka-highlight na clauses, AI simplification sa Filipino at Taglish, Ask AI chat assistant, legal dictionary (Lex-Library), at saved scan history. Makikita mo lahat 'yan sa Mga Feature section sa itaas.",
  },
  {
    id: "download",
    question: "Paano i-download ang app?",
    keywords: [
      "download", "download the app", "download app", "where can i get", "where do i get",
      "get the app", "get lex simple", "get lex-simple", "apk", "installation file",
      "paano madownload", "paano mag download", "paano magdownload", "paano i-download ang app",
      "i-download", "i-download ang app", "saan ako makakakuha", "saan makukuha", "paano kukuha",
    ],
    answer:
      "Pwede mong i-download ang Lex-Simple gamit ang I-download ang App button sa website na ito kapag nailabas na ang opisyal na Android installation file. Naka-ready na ang button — kapag nailabas na ang opisyal na package, magiging aktwal na download link na siya.",
  },
  {
    id: "install",
    question: "Paano i-install ito?",
    keywords: [
      "install", "installation", "how to install", "install it", "setup", "set up",
      "paano i-install", "paano mag-install", "installation instructions", "i-install",
      "paano iinstall",
    ],
    answer:
      "Kapag available na ang opisyal na APK, i-download mo muna ang file sa Android device mo. Buksan mo yung na-download na APK at sundan ang installation instructions ng Android. Depende sa device settings mo, baka kailangan mong i-allow ang installation from that source.",
  },
  {
    id: "scanning",
    question: "Paano gumagana ang document scanning?",
    keywords: [
      "scanning", "scan", "scanner", "camera", "capture", "take a picture", "take photo",
      "gallery", "upload", "multi page", "multiple pages", "pages", "document scanning",
      "paano ang document scanning", "paano ang scanning", "paano mag-scan", "paano mag scan",
      "paano kumuha ng litrato", "maraming pahina",
    ],
    answer:
      "Pwede kang kumuha ng document pages gamit ang camera o pumili ng images mula sa gallery. Gagamitin ng Lex-Simple ang OCR para kunin ang text ng dokumento, tapos mare-review at ma-analyze na siya sa app. Suportado rin ang multi-page documents sa document-scanning workflow.",
  },
  {
    id: "ocr",
    question: "Ano ang OCR / text extraction?",
    keywords: [
      "ocr", "text extraction", "extract text", "extract the text", "text recognition",
      "reads text", "ano ang ocr", "on-device",
    ],
    answer:
      "Ang OCR o Optical Character Recognition ay teknolohiya na nagko-convert ng images ng teksto into readable text. Ginagawa ito ng Lex-Simple sa device mismo — ito yung extracted text na ginagamit ng app para sa review at AI-assisted document analysis.",
  },
  {
    id: "analysis",
    question: "Ano ang ipinapakita ng document analysis?",
    keywords: [
      "analysis", "analyze", "result", "results", "complexity", "score", "findings",
      "clauses", "clause", "highlight", "highlights", "summary", "summarize", "buod",
      "ai buod", "pagkakatuklas",
    ],
    answer:
      "Pagkatapos mag-scan, pwedeng i-analyze ng Lex-Simple ang dokumento at ipakita ang complexity score, buod ng dokumento, at mga clause na baka kailangang tingnan nang masusi. Impormasyon lang ang mga findings para gabayan ka sa review — hindi ito final na legal na hatol o garantisya na safe o hindi safe ang dokumento.",
  },
  {
    id: "ai-assistant",
    question: "Ano ang ginagawa ng AI assistant?",
    keywords: [
      "ai assistant", "what does the ai do", "ask ai", "lexie app", "assistant", "chatbot",
      "chat bot", "simplification", "simplify", "explain", "explanation", "artificial intelligence",
      "ano ang ginagawa ng ai", "ginagawa ng ai", "ano ang ai", "sino si lexie sa app",
    ],
    answer:
      "Ang AI assistant (si Lexie rin sa loob ng app) ay nagpapaliwanag ng mahihirap na legal language sa mas simpleng Filipino at Taglish. Nagbibigay siya ng document summaries, sina-simplify ang mga kumplikadong clauses, at sumasagot ng contextual na mga tanong tungkol sa mga na-scan mong documents.",
  },
  {
    id: "filipino",
    question: "Naiintindihan ba niya ang Filipino?",
    keywords: [
      "filipino", "tagalog", "taglish", "language", "wika", "taga pilipinas",
      "philippines", "pinoy", "naiintindihan ba", "marunong ba",
    ],
    answer:
      "Oo naman! Ginawa ang Lex-Simple para sa mga Filipino users. Ipinapaliwanag ng AI ang mga legal documents sa mas simpleng Filipino at Taglish, at pwede kang magtanong nang parang kausap mo lang. May mga Filipino na rin sa mismong interface ng app.",
  },
  {
    id: "offline",
    question: "Gumagana ba offline?",
    keywords: [
      "offline", "internet", "connection", "no internet", "without internet", "wifi",
      "data", "online", "walang internet", "gumagana ba offline", "gumagana ba walang internet",
      "offline ba", "kailangan ba ng internet", "kailangan ba ng data", "may signal",
    ],
    answer:
      "May mga features na gumagana kahit walang internet — tulad ng on-device OCR, ng legal dictionary, at ng mga na-save mong scan details. Pero ang AI-powered document analysis at chat ay kumokonekta sa online service, kaya kailangan nila ng internet connection.",
  },
  {
    id: "lawyer",
    question: "Pwede bang mapalitan ng Lex-Simple ang abogado?",
    keywords: [
      "lawyer", "attorney", "legal advice", "replace a lawyer", "abogado", "substitute",
      "is it reliable", "can i trust", "accurate", "legal na payo", "kailangan pa ba ang abogado",
      "pumalit sa abogado",
    ],
    answer:
      "Hindi. Ang Lex-Simple ay para sa legal literacy — tutulong sa iyo na intindihin ang legal language at makita ang mga clause na baka kailangan ng mas malapit na tingin. Hindi ito kapalit ng abogado o propesyonal na legal na payo. Sa mga mahahalagang bagay, laging kumonsulta sa qualified na legal professional.",
  },
  {
    id: "dictionary",
    question: "Ano ang legal dictionary?",
    keywords: [
      "dictionary", "legal terms", "terminology", "terms", "lex library", "lex-library",
      "library", "definition", "definitions", "vocabulary", "diksyunaryo",
      "ano ang lex-library", "may dictionary ba",
    ],
    answer:
      "Ang Lex-Library ang legal dictionary ng Lex-Simple. Pwede kang mag-explore ng mga legal terms na may searchable definitions — at isa ito sa mga features na pwedeng gamitin kahit offline.",
  },
  {
    id: "history",
    question: "Nakakatipid ba ng documents? / May history ba?",
    keywords: [
      "history", "saved", "save", "past documents", "previous scans", "my scans",
      "records", "save documents", "may history ba", "na-save", "binalikan",
    ],
    answer:
      "Oo — may scan history ang Lex-Simple kung saan pwede mong balikan ang mga na-save mong document scans at ang mga detalye nila, kahit offline ka.",
  },
  {
    id: "documents",
    question: "Anong document types ang supported?",
    keywords: [
      "pdf", "word", "document converter", "file types", "file formats", "docx",
      "contracts", "contract", "agreement", "documents", "kontrata", "resibo",
      "anong documents", "anong files",
    ],
    answer:
      "Pwede kang mag-scan ng printed documents gamit ang camera, mag-upload ng images mula sa gallery, at gumamit ng document converter para sa PDF at Word files. Mga common examples: kontrata, lease agreements, at iba pang legal paperwork.",
  },
  {
    id: "platform",
    question: "Anong devices ang pwedeng gamitan?",
    keywords: [
      "android", "ios", "iphone", "apple", "platform", "device", "phone", "requirements",
      "supported", "device requirements", "pwede ba sa iphone", "pwede ba sa ios",
      "anong cellphone",
    ],
    answer:
      "Ang Lex-Simple ay mobile app na ginawa para sa Android. Ilalabas ang opisyal na Android installation package sa pamamagitan ng Download App button sa page na ito kapag available na. Wala pa akong kumpirmadong detalye tungkol sa ibang platforms.",
  },
  {
    id: "cost",
    question: "Magkano ito? / Libre ba?",
    keywords: [
      "cost", "price", "pricing", "free", "bayad", "payment", "pay", "subscription",
      "fee", "charge", "magkano", "libre", "libre ba", "may bayad ba", "presyo",
    ],
    answer:
      "Wala pa akong pricing details na maibabahagi dito. Abangan ang Download section ng page na ito — doon i-aannounce ang download availability at iba pang detalye kapag nailabas na ang opisyal na package.",
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
