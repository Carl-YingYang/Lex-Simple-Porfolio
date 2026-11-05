/**
 * ============================================================================
 * LEX-SIMPLE WEBSITE — CENTRAL CONFIGURATION
 * ============================================================================
 * This is the single, convenient place for important website values.
 *
 * ➤ APP DOWNLOAD URL
 * ----------------------------------------------------------------------------
 * The official application download link lives HERE and only here.
 *
 * The repository currently has NO published release or APK, so this value is
 * `null`. While it is null, every "Download" control on the website renders a
 * professional "Android download coming soon" state instead of a broken link.
 *
 * When the official installation package is published, replace `null` with the
 * real public URL, e.g.:
 *
 *   export const APP_DOWNLOAD_URL =
 *     "https://github.com/Carl-YingYang/The-Lex-Simple/releases/download/v1.0.0/lex-simple-v1.0.0.apk";
 *
 * Every download button (navbar, hero, download section) will automatically
 * become a working link that opens/downloads the file. No other edits needed.
 * ============================================================================
 */
export const APP_DOWNLOAD_URL: string | null = null;

export const SITE = {
  name: "Lex-Simple",
  shortName: "Lex-Simple",
  /** Primary headline used across metadata. */
  title: "Lex-Simple — Intindihin ang fine print. Bago ka pumirma.",
  description:
    "Tutulungan ka ng Lex-Simple na intindihin ang mga kumplikadong legal documents — may OCR text extraction, AI-powered explanations sa Filipino at Taglish, at kausap na legal assistant. Legal literacy, gawing simple.",
  /** Official source repository (do not invent other social links). */
  repoUrl: "https://github.com/Carl-YingYang/The-Lex-Simple",
  repoBranchUrl:
    "https://github.com/Carl-YingYang/The-Lex-Simple/tree/lexsimple-prototype",
  legalDisclaimer:
    "Lex-Simple is a legal-literacy and informational tool. It does not provide professional legal advice and is not a substitute for consultation with a qualified legal professional. AI-generated explanations and document findings may be incomplete or inaccurate. Always review your original document and seek professional advice when necessary.",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Mga Feature", href: "#features" },
  { label: "Paano Gumagana", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ answers follow the actual application documentation:
 * - OCR runs on-device (ML Kit text recognition).
 * - The legal dictionary and saved scan details are available offline.
 * - AI-powered document analysis and chat need an internet connection.
 * - Lex-Simple never claims to replace professional legal consultation.
 *
 * Copy is written in conversational Taglish to match the app's target users.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Ano ang Lex-Simple?",
    answer:
      "Ang Lex-Simple ay isang mobile legal-literacy app na tutulong sa iyo na intindihin ang mga kumplikadong legal documents — may OCR-assisted text extraction, AI-powered simplification, document analysis, at legal dictionary. Ipinapaliwanag nito ang mahihirap na legal language sa mas simpleng Filipino at Taglish, para mas may kumpiyansa kang i-review ang mga kontrata, agreements, at iba pang documents.",
  },
  {
    question: "Paano gumagana ang document scanning?",
    answer:
      "Pwede kang kumuha ng document pages gamit ang camera ng phone mo, o pumili ng existing images mula sa gallery. Gagamitin ng Lex-Simple ang on-device OCR (text recognition) para kunin ang readable text ng dokumento, tapos mare-review at ma-analyze na siya sa app. Suportado rin ang multi-page documents sa scanning workflow.",
  },
  {
    question: "Naiintindihan ba ng Lex-Simple ang Filipino?",
    answer:
      "Oo naman! Isa sa pangunahing layunin ng Lex-Simple ay legal literacy para sa mga Filipino users. Ipinapaliwanag ng AI assistant ang mahihirap na legal language sa mas simpleng Filipino at Taglish, nagbibigay ng document summaries, at sumasagot ng contextual follow-up questions na parang kausap mo lang.",
  },
  {
    question: "Kailangan ba ng internet connection?",
    answer:
      "Partially lang. May mga features na gumagana kahit walang internet — ang on-device OCR text recognition, ang available na offline legal dictionary, at ang mga saved scan details. Pero ang AI-powered document analysis at ang chat assistant ay kumokonekta sa online service, kaya kailangan nila ng internet access.",
  },
  {
    question: "Pwede bang mapalitan ng Lex-Simple ang abogado?",
    answer:
      "Hindi. Ang Lex-Simple ay isang legal-literacy at informational tool. Dinisenyo ito para tulungan kang intindihin ang legal language at makita ang mga clause na baka kailangan ng mas malapit na pagtingin — hindi para magbigay ng final na legal na hatol. Sa mga mahahalagang desisyon, laging i-review ang original document mo at kumonsulta sa qualified na legal professional.",
  },
  {
    question: "Paano ko i-download at i-install ang app?",
    answer:
      "Ang Lex-Simple ay para sa Android. Kapag nailabas na ang opisyal na installation package (APK), pwede mo na itong i-download direkta mula sa website na ito gamit ang I-download ang App button. Pagkatapos i-download ng file sa Android device mo, buksan mo ito at sundan ang installation instructions — depende sa device settings mo, baka kailangan mong i-allow ang installation from that source.",
  },
];
