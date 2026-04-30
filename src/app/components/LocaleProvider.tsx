"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Locale = "en" | "no";

type TranslationKey =
  | "nav.home"
  | "nav.projects"
  | "nav.contact"
  | "nav.lang"
  | "footer.about"
  | "footer.aboutText"
  | "footer.quickLinks"
  | "footer.connect"
  | "footer.rights"
  | "footer.builtWith"
  | "projects.title"
  | "projects.subtitle"
  | "projects.emptyPrefix"
  | "projects.ideaTitle"
  | "projects.ideaText"
  | "projects.getInTouch"
  | "projects.expected"
  | "contact.title"
  | "contact.subtitle"
  | "contact.email"
  | "contact.github"
  | "contact.linkedin"
  | "status.all"
  | "status.planning"
  | "status.inDevelopment"
  | "status.beta"
  | "status.comingSoon"
  | "home.welcome"
  | "home.introPrefix"
  | "home.developer"
  | "home.and"
  | "home.designer"
  | "home.myWork"
  | "stacking.readMore"
  | "stacking.readLess"
  | "stacking.scrollForMore"
  | "stacking.visitSite";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects Overview",
    "nav.contact": "Contact",
    "nav.lang": "Language",
    "footer.about": "About",
    "footer.aboutText":
      "Frontend developer passionate about creating beautiful and functional experiences.",
    "footer.quickLinks": "Quick Links",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with Next.js & Tailwind CSS",
    "projects.title": "Projects Overview",
    "projects.subtitle":
      "Exciting projects currently in development. Stay tuned for updates!",
    "projects.emptyPrefix": "No projects found with status",
    "projects.ideaTitle": "Have an idea?",
    "projects.ideaText":
      "I'm always open to collaborating on exciting projects. Let's build something amazing together!",
    "projects.getInTouch": "Get in Touch",
    "projects.expected": "Expected",
    "contact.title": "Contact",
    "contact.subtitle": "Reach out through any of the channels below.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "status.all": "All",
    "status.planning": "Planning",
    "status.inDevelopment": "In Development",
    "status.beta": "Beta",
    "status.comingSoon": "Coming Soon",
    "home.welcome": "Welcome!",
    "home.introPrefix": "I am John a",
    "home.developer": "developer",
    "home.and": "and",
    "home.designer": "designer",
    "home.myWork": "my work",
    "stacking.readMore": "Read more",
    "stacking.readLess": "Read less",
    "stacking.scrollForMore": "Scroll for more",
    "stacking.visitSite": "Visit site",
  },
  no: {
    "nav.home": "Hjem",
    "nav.projects": "Prosjektoversikt",
    "nav.contact": "Kontakt",
    "nav.lang": "Språk",
    "footer.about": "Om meg",
    "footer.aboutText":
      "Frontend-utvikler med bakrunn i design med lidenskap for å lage vakre og funksjonelle digitale løsninger.",
    "footer.quickLinks": "Hurtiglenker",
    "footer.connect": "Kontakt",
    "footer.rights": "Alle rettigheter reservert.",
    "footer.builtWith": "Laget med Next.js og Tailwind CSS",
    "projects.title": "Prosjektoversikt",
    "projects.subtitle": "Spennende prosjekter under utvikling. Følg med!",
    "projects.emptyPrefix": "Ingen prosjekter funnet med status",
    "projects.ideaTitle": "Har du en ide?",
    "projects.ideaText":
      "Jeg er alltid åpen for samarbeid med spennende prosjekter. La oss bygge noe bra sammen!",
    "projects.getInTouch": "Ta kontakt",
    "projects.expected": "Forventet",
    "contact.title": "Kontakt",
    "contact.subtitle": "Ta kontakt gjennom en av kanalene under.",
    "contact.email": "E-post",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "status.all": "Alle",
    "status.planning": "Planlegging",
    "status.inDevelopment": "Under utvikling",
    "status.beta": "Beta",
    "status.comingSoon": "Kommer snart",
    "home.welcome": "Velkommen!",
    "home.introPrefix": "Jeg er John, en",
    "home.developer": "utvikler",
    "home.and": "og",
    "home.designer": "designer",
    "home.myWork": "mitt arbeid",
    "stacking.readMore": "Les mer",
    "stacking.readLess": "Les mindre",
    "stacking.scrollForMore": "Bla for mer",
    "stacking.visitSite": "Besøk side",
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("no");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-locale");
    if (saved === "en" || saved === "no") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-locale", locale);
    document.documentElement.lang = locale === "no" ? "no" : "en";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translations[locale][key],
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
