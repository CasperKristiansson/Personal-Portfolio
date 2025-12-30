import React, { useEffect, useRef, useState } from "react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const primaryLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Work Exp", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
];

const moreLinks = [
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Papers", href: "#papers" },
  { label: "Awards", href: "#awards" },
  { label: "Links", href: "#external-links" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export const StickyNav: React.FC = () => {
  const [activeId, setActiveId] = useState("projects");
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateOffset = () => {
      if (!navRef.current) return;
      const { height } = navRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--sticky-nav-offset",
        `${height}px`,
      );
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    const sections = allLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const nextId = visible[0].target.getAttribute("id");
        if (nextId) {
          setActiveId(nextId);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40 bg-[#18253F]/90 backdrop-blur"
    >
      <div className="mx-auto w-full max-w-[1400px] py-4 pr-6 pl-4 sm:pr-8 sm:pl-6 lg:pr-12 lg:pl-10">
        <div className="rounded-2xl border border-white/10 bg-[#0f1a33]/85 px-4 py-3 shadow-[0_18px_50px_-30px_rgba(8,15,35,0.9)]">
          <div className="flex items-center gap-6">
            <div className="hidden min-w-[140px] lg:block" aria-hidden="true" />
            <ul className="flex flex-1 flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white sm:text-base">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={
                      activeId === link.href.slice(1) ? "page" : undefined
                    }
                    className={`transition focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none ${
                      activeId === link.href.slice(1)
                        ? "text-sky-200"
                        : "hover:text-sky-200"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="relative">
                <details className="group relative">
                  <summary className="cursor-pointer list-none text-lg leading-none text-white/80 transition hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none">
                    ...
                  </summary>
                  <div className="absolute top-7 left-1/2 min-w-[180px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#111c32] p-3 shadow-[0_20px_40px_-28px_rgba(8,15,35,0.9)]">
                    <ul className="flex flex-col gap-2 text-sm font-medium text-slate-100">
                      {moreLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            aria-current={
                              activeId === link.href.slice(1)
                                ? "page"
                                : undefined
                            }
                            className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/casperKristiansson/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-sky-300/50 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
              >
                <IconBrandLinkedin size={22} />
              </a>
              <a
                href="https://github.com/CasperKristiansson"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-sky-300/50 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
              >
                <IconBrandGithub size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
