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
  title: "Lex-Simple — Understand the fine print. Before you sign.",
  description:
    "Lex-Simple helps you understand complex legal documents through OCR-assisted text extraction, AI-powered explanations, and a conversational Filipino legal assistant.",
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
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
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
 */
export const FAQS: FaqItem[] = [
  {
    question: "What is Lex-Simple?",
    answer:
      "Lex-Simple is a mobile legal-literacy application that helps users understand complex legal documents through OCR-assisted text extraction, AI-powered simplification, document analysis, and a legal dictionary. It explains difficult legal language in simpler Filipino and Taglish, so you can review contracts, agreements, and other documents with more confidence.",
  },
  {
    question: "How does document scanning work?",
    answer:
      "You can capture document pages using your phone's camera or select existing images from your gallery. Lex-Simple then uses on-device OCR (text recognition) to extract the readable text, so the document can be reviewed and analyzed inside the app. Multi-page documents are supported through the scanning workflow.",
  },
  {
    question: "Does Lex-Simple understand Filipino?",
    answer:
      "Yes. One of Lex-Simple's main goals is legal literacy for Filipino users. The AI assistant explains difficult legal language in simpler Filipino and Taglish, provides document summaries, and answers contextual follow-up questions in a conversational way.",
  },
  {
    question: "Does the application require an internet connection?",
    answer:
      "Partially. Some features work offline — on-device OCR text recognition, the available offline legal dictionary, and saved scan details can be used without a connection. AI-powered document analysis and the chat assistant communicate with an online service, so they require internet access.",
  },
  {
    question: "Can Lex-Simple replace a lawyer?",
    answer:
      "No. Lex-Simple is a legal-literacy and informational tool. It is designed to help you understand legal language and spot clauses that may deserve a closer look — not to give definitive legal judgments. For important decisions, always review your original document and consult a qualified legal professional.",
  },
  {
    question: "How do I download and install the application?",
    answer:
      "Lex-Simple is built for Android. Once the official installation package (APK) is published, you will be able to download it directly from this website using the Download App button. After downloading the file on your Android device, open it and follow the installation instructions — depending on your device settings, you may need to allow installation from that source.",
  },
];
