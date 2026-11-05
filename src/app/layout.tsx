import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Lex-Simple",
    "legal literacy",
    "legal document scanner",
    "OCR document scanning",
    "Filipino AI assistant",
    "Taglish legal explanations",
    "legal dictionary",
    "document simplification",
    "contract checker",
    "legal literacy app Pilipinas",
    "paano intindihin ang kontrata",
    "legal na app para sa Pilipino",
  ],
  authors: [{ name: "Lex-Simple Team" }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7C3AED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fil-PH" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-paper font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
