import { MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/config/site";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * FAQ section — sticky intro column on the left, neo-brutalist accordion on
 * the right. Questions and answers come verbatim from `FAQS` in the site
 * config (Taglish copy following the app documentation — keep facts exact).
 */
export function Faq() {
  return (
    <section id="faq" className="relative bg-paper py-20 sm:py-28">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          {/* Left — sticky heading + support hint */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              overline="FAQ"
              title="Mga madalas itanong"
              description="Lahat ng kailangan mong malaman tungkol sa Lex-Simple — paano ito gumagana, ano ang kailangan nito, at ano ang hindi nito ginagawa."
            />

            <Reveal delay={120} className="mt-8">
              <div className="lift-neo rounded-md border-[1.5px] border-ink bg-white p-5">
                <span className="flex size-9 items-center justify-center rounded-[4px] border-[1.5px] border-ink bg-brand-soft text-brand-deep">
                  <MessageCircle aria-hidden="true" className="size-4.5" />
                </span>
                <p className="mt-3 text-base font-extrabold tracking-tight text-ink">
                  May tanong ka pa ba?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-subtext">
                  Buksan ang Lexie chat sa kanang sulok sa ibaba ng page na
                  ito — tutulungan ka niya sa app, sa download, at sa
                  installation.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, index) => (
                <Reveal key={item.question} delay={index * 70}>
                  {/* Hard offset shadow on hover/open — written as an arbitrary value
                      because Tailwind v4 cannot attach hover:/data- variants to the
                      plain-CSS `shadow-brutal-sm` utility from globals.css. */}
                  <AccordionItem
                    value={item.question}
                    className="card-neo mb-3 border-b-[1.5px] px-5 transition-shadow last:border-b-[1.5px] hover:shadow-[3px_3px_0_0_#111111] data-[state=open]:shadow-[3px_3px_0_0_#111111]"
                  >
                    <AccordionTrigger className="py-4.5 text-left text-[15px] font-bold text-ink hover:no-underline hover:text-brand-deep [&_svg]:size-5 [&_svg]:text-brand">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-relaxed text-subtext">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
