import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Features } from "@/components/site/features";
import { HowItWorks } from "@/components/site/how-it-works";
import { Showcase } from "@/components/site/showcase";
import { DownloadSection } from "@/components/site/download";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { LexieWidget } from "@/components/lexie/lexie-widget";

/**
 * Lex-Simple — official single-page landing site.
 *
 * Section rhythm: paper hero → paper features → ink how-it-works →
 * white showcase → deep-purple download → paper FAQ → ink footer,
 * with the Lexie chat widget floating above everything.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Showcase />
        <DownloadSection />
        <Faq />
      </main>

      <Footer />

      {/* Floating Lexie assistant (fixed, bottom-right) */}
      <LexieWidget />
    </div>
  );
}
