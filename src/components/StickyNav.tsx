import React from "react";
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

export const StickyNav: React.FC = () => {
  return (
    <div className="relative z-40 bg-[#18253F]">
      <nav className="sticky top-0 z-40">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl border border-white/10 bg-[#0f1a33]/85 px-4 py-3 shadow-[0_18px_50px_-30px_rgba(8,15,35,0.9)] backdrop-blur">
            <div className="flex items-center gap-6">
              <ul className="flex flex-1 flex-wrap items-center justify-center gap-6 text-sm font-semibold text-white sm:text-base">
                {primaryLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="relative">
                  <details className="group relative">
                    <summary className="cursor-pointer list-none text-lg leading-none text-white/80 transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70">
                      ...
                    </summary>
                    <div className="absolute left-1/2 top-7 min-w-[180px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#111c32] p-3 shadow-[0_20px_40px_-28px_rgba(8,15,35,0.9)]">
                      <ul className="flex flex-col gap-2 text-sm font-medium text-slate-100">
                        {moreLinks.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="block rounded-lg px-2 py-1 transition hover:bg-white/5 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
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
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-sky-300/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
                >
                  <IconBrandLinkedin size={22} />
                </a>
                <a
                  href="https://github.com/CasperKristiansson"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:border-sky-300/50 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
                >
                  <IconBrandGithub size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
