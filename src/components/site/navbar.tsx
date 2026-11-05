"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { DownloadButton } from "./download-button";

/**
 * Sticky, responsive navigation bar.
 * - Scrollspy highlights the section currently in view.
 * - Mobile menu animates open below the bar (grid-rows trick, no JS measuring).
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(NAV_LINKS[0]?.href ?? "#home");

  // Scrollspy: highlight whichever section crosses the upper band.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Scrim behind the open mobile menu — closes it on tap */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-0 cursor-default bg-ink/25 lg:hidden"
        />
      )}
      <div className="relative border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label={`${SITE.name} — back to top`}
          >
            <Image
              src="/lex-simple-logo.png"
              alt="Lex-Simple logo"
              width={40}
              height={40}
              priority
              className="size-10 rounded-[6px] border-2 border-ink object-cover shadow-[3px_3px_0_#111]"
            />
            <span className="text-lg font-extrabold tracking-tight text-ink">
              Lex-Simple
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={active === link.href}
                aria-current={active === link.href ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DownloadButton size="sm" className="hidden sm:inline-flex" />

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center rounded-[4px] border-2 border-ink bg-white text-ink shadow-[3px_3px_0_#111] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#111] lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div
          className="overflow-hidden"
          inert={!open}
        >
          <nav
            aria-label="Mobile"
            className="border-b-2 border-ink bg-paper shadow-[0_6px_0_rgba(17,17,17,0.08)]"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="nav-link px-2 py-3 text-base"
                  data-active={active === link.href}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 border-t-[1.5px] border-hairline pt-4">
                <DownloadButton size="md" className="w-full" />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
