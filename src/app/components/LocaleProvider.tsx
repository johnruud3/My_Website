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
  | "home.selectedWork"
  | "home.caseStudiesTitle"
  | "home.ctaTitle"
  | "home.ctaText"
  | "home.ctaButton"
  | "stacking.readMore"
  | "stacking.readLess"
  | "stacking.scrollForMore"
  | "stacking.visitSite"
  | "chat.open"
  | "chat.close"
  | "chat.title"
  | "chat.subtitle"
  | "chat.welcome"
  | "chat.askMe"
  | "chat.placeholder"
  | "chat.send"
  | "chat.thinking"
  | "chat.error"
  | "chat.chipContact"
  | "chat.chipAbout"
  | "chat.chipProjects";

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
    "home.selectedWork": "Selected work",
    "home.caseStudiesTitle": "Built for the love of the craft",
    "home.ctaTitle": "Have an idea?",
    "home.ctaText":
      "I'm always open to collaborating on exciting projects. Let's build something amazing together!",
    "home.ctaButton": "Get in Touch",
    "stacking.readMore": "Read more",
    "stacking.readLess": "Read less",
    "stacking.scrollForMore": "Scroll for more",
    "stacking.visitSite": "Visit site",
    "chat.open": "Open chat",
    "chat.close": "Close chat",
    "chat.title": "Ask about John",
    "chat.subtitle": "Quick answers about work & contact",
    "chat.welcome":
      "Hi! I can help with how to reach John, what he builds, and his projects.",
    "chat.askMe": "Ask me a question",
    "chat.placeholder": "Ask a question...",
    "chat.send": "Send",
    "chat.thinking": "Thinking...",
    "chat.error": "Something went wrong. Please try again.",
    "chat.chipContact": "How can I contact John?",
    "chat.chipAbout": "Who is John?",
    "chat.chipProjects": "What is John's experience?",
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
    "home.selectedWork": "Utvalgt arbeid",
    "home.caseStudiesTitle": "Laget med dedikasjon og levert med kvalitet.",
    "home.ctaTitle": "Har du en ide?",
    "home.ctaText":
      "Jeg er alltid åpen for samarbeid med spennende prosjekter. La oss bygge noe bra sammen!",
    "home.ctaButton": "Ta kontakt",
    "stacking.readMore": "Les mer",
    "stacking.readLess": "Les mindre",
    "stacking.scrollForMore": "Bla for mer",
    "stacking.visitSite": "Besøk side",
    "chat.open": "Åpne chat",
    "chat.close": "Lukk chat",
    "chat.title": "Spør om John",
    "chat.subtitle": "John sin nye hjelper har mange svar! ",
    "chat.welcome":
      "Hei! Jeg kan hjelpe med hvordan du kontakter John, hva han jobber med, og prosjektene hans.",
    "chat.askMe": "Still meg et spørsmål",
    "chat.placeholder": "Still et spørsmål...",
    "chat.send": "Send",
    "chat.thinking": "Tenker...",
    "chat.error": "Noe gikk galt. Prøv igjen.",
    "chat.chipContact": "Hvordan kontakter jeg John?",
    "chat.chipAbout": "Hvem er John?",
    "chat.chipProjects": "Hva er John sin erfaring?",
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
