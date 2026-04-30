"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";

export default function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  const linkClass = (href: string) =>
    `${
      pathname === href
        ? "text-white"
        : "text-[#34C1E3] hover:text-[#146C82]"
    } text-xs md:text-sm font-medium transition-colors`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 md:py-6 px-4 md:px-8 bg-gradient-to-r from-[#050b16]/95 via-[#146C82]/95 to-[#050b16]/95 backdrop-blur-sm border-b border-[#34C1E3]/20">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex md:relative flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
          <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 items-center gap-3">
            <img
              src="/img/Portrett1.jpg"
              alt="John"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#34C1E3] shadow-lg"
            />
            <span className="text-white text-xs md:text-sm font-medium">
              John-Kristian G. Ruud
            </span>
          </div>

          <nav className="flex justify-center gap-6 md:gap-12">
            <a href="/" className={linkClass("/")}>
              {t("nav.home")}
            </a>
            <a href="/projects" className={linkClass("/projects")}>
              {t("nav.projects")}
            </a>
            <a href="/contact" className={linkClass("/contact")}>
              {t("nav.contact")}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "no" : "en")}
            className="absolute right-3 md:right-0 top-1/2 -translate-y-1/2 text-white/55 hover:text-white/80 text-xs md:text-sm font-medium transition-colors cursor-pointer"
            aria-label={t("nav.lang")}
          >
            {locale === "en" ? "NO" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
