import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconChevronDown,
} from "@tabler/icons-react";

const primaryLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
];

const moreLinks = [
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Papers", href: "#papers" },
  { label: "Awards", href: "#awards" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export const StickyNav: React.FC = () => {
  const [activeId, setActiveId] = useState("projects");
  const [isStuck, setIsStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRefDesktop = useRef<HTMLLIElement | null>(null);
  const menuRefMobile = useRef<HTMLDivElement | null>(null);

  const updateOffset = useCallback(() => {
    if (!navRef.current) return;
    const { height } = navRef.current.getBoundingClientRect();
    document.documentElement.style.setProperty(
      "--sticky-nav-offset",
      `${height}px`,
    );
  }, []);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  useEffect(() => {
    updateOffset();
  }, [isStuck, updateOffset]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      setIsStuck(navRef.current.getBoundingClientRect().top <= 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !menuRefDesktop.current?.contains(target) &&
        !menuRefMobile.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

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
    <nav ref={navRef} className="sticky top-0 z-40">
      <div
        className={`mx-auto flex w-full max-w-[1400px] px-6 transition-[padding] duration-300 sm:px-8 lg:px-12 ${
          isStuck ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`ml-auto w-fit rounded-2xl border border-white/10 bg-[#0f1a33] px-6 py-3 transition duration-300 lg:ml-0 lg:w-full ${
            isStuck
              ? "bg-[#0f1a33]/80 shadow-[0_18px_50px_-30px_rgba(8,15,35,0.9)] backdrop-blur"
              : "shadow-none"
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="hidden min-w-[140px] xl:block" aria-hidden="true" />
            <ul className="hidden flex-1 items-center gap-6 text-sm font-semibold text-white sm:text-base lg:flex lg:justify-end xl:justify-center">
              {primaryLinks.map((link) => (
                <li key={link.href} className="hidden lg:block">
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
              <li className="relative hidden lg:block" ref={menuRefDesktop}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                  aria-controls="nav-more-menu"
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none sm:text-base ${
                    menuOpen ? "text-sky-200" : "text-white"
                  }`}
                >
                  More
                  <IconChevronDown
                    size={18}
                    className={`transition duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {menuOpen && (
                  <div
                    id="nav-more-menu"
                    className="absolute top-8 left-1/2 min-w-[180px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#111c32] p-3 shadow-[0_20px_40px_-28px_rgba(8,15,35,0.9)]"
                  >
                    <ul className="flex flex-col gap-2 text-sm font-medium text-slate-100">
                      {primaryLinks.map((link) => (
                        <li key={link.href} className="lg:hidden">
                          <a
                            href={link.href}
                            aria-current={
                              activeId === link.href.slice(1)
                                ? "page"
                                : undefined
                            }
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                      <li className="border-t border-white/10 pt-2 lg:hidden" />
                      {moreLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            aria-current={
                              activeId === link.href.slice(1)
                                ? "page"
                                : undefined
                            }
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <div className="relative lg:hidden" ref={menuRefMobile}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                  aria-controls="nav-more-menu-mobile"
                  className={`inline-flex items-center gap-1 text-sm font-semibold transition hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none sm:text-base ${
                    menuOpen ? "text-sky-200" : "text-white"
                  }`}
                >
                  More
                  <IconChevronDown
                    size={18}
                    className={`transition duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {menuOpen && (
                  <div
                    id="nav-more-menu-mobile"
                    className="absolute top-10 right-0 min-w-[200px] rounded-xl border border-white/10 bg-[#111c32] p-3 shadow-[0_20px_40px_-28px_rgba(8,15,35,0.9)]"
                  >
                    <ul className="flex flex-col gap-2 text-sm font-medium text-slate-100">
                      {primaryLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            aria-current={
                              activeId === link.href.slice(1)
                                ? "page"
                                : undefined
                            }
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                      <li className="border-t border-white/10 pt-2" />
                      {moreLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            aria-current={
                              activeId === link.href.slice(1)
                                ? "page"
                                : undefined
                            }
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:outline-none"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
