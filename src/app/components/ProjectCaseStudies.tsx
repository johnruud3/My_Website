"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./ProjectCaseStudies.module.css";
import { useLocale } from "./LocaleProvider";

type MediaImageItem = {
  src: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

type MediaGridModifier =
  | "joblaunch"
  | "treoppdrag"
  | "eliterollespill"
  | "nordmind";

type CaseStudyItem = {
  id: number;
  anchorId: string;
  titleEn: ReactNode;
  titleNo: ReactNode;
  descriptionEn: string;
  descriptionNo: string;
  image?: string;
  images?: Array<string | MediaImageItem>;
  mediaGridModifier?: MediaGridModifier;
  link?: string;
};

function normalizeMediaItems(
  images: CaseStudyItem["images"],
  singleImage: CaseStudyItem["image"],
): MediaImageItem[] {
  if (images?.length) {
    return images
      .slice(0, 4)
      .map((item) => (typeof item === "string" ? { src: item } : item));
  }
  if (singleImage) return [{ src: singleImage }];
  return [];
}

function mediaGridClassName(modifier?: MediaGridModifier): string {
  if (modifier === "joblaunch") return styles.mediaGrid_joblaunch;
  if (modifier === "treoppdrag") return styles.mediaGrid_treoppdrag;
  if (modifier === "eliterollespill") return styles.mediaGrid_eliterollespill;
  if (modifier === "nordmind") return styles.mediaGrid_nordmind;
  return "";
}

const caseStudies: CaseStudyItem[] = [
  {
    id: 1,
    anchorId: "about",
    titleEn: (
      <>
        My name is <span className={styles.accent}>John</span>
      </>
    ),
    titleNo: (
      <>
        Jeg heter <span className={styles.accent}>John</span>
      </>
    ),
    descriptionEn:
      "I’m John, a developer and creator focused on building modern, practical solutions that people actually use. I enjoy taking ideas from concept to reality whether it’s designing clean user interfaces, developing full platforms, or experimenting with new technology. I have a background in both graphic design and frontend development.\n\n My work is driven by a mix of creativity and problem-solving. I like building systems that are not only functional, but also efficient and scalable, such as automated platforms, user dashboards, and AI-powered tools. I’m especially interested in projects where I can simplify complex processes and turn them into something intuitive and easy to use.\n\n Over time, I’ve worked on everything from branding and logo design to full web applications and service platforms. I enjoy having control over the entire process, from idea and design to development and deployment.\n\n Right now, I’m focused on growing my own projects and building solutions that can scale both technically and as businesses. I’m always looking for new challenges and opportunities to create something meaningful, whether working in a team or independently.",
    descriptionNo:
      "Jeg heter John, og jeg bygger moderne og praktiske digitale løsninger som folk faktisk bruker. Jeg liker å ta ideer fra konsept til ferdige produkter, enten det handler om ren UI, komplette plattformer eller ny teknologi. Jeg har skole bakgrunn i både grafisk design og frontend utvikling.\n\nArbeidet mitt er en kombinasjon av kreativitet og prøblemløsninger. Jeg fokuserer på løsninger som er funksjonelle, effektive og skalerbare, for eksempel automatiserte plattformer, dashboards og KI-drevne verktøy.\n\nJeg har jobbet med alt fra branding og logodesign til komplette webapplikasjoner og tjenesteplattformer. Jeg liker a ha kontroll på hele prosessen fra ide og design til utvikling og lansering. Samtidig som jeg har hatt/har en del teamprosjekter. \n\nAkkurat nå bygger jeg egne prosjekter videre og jobber med løsninger som kan vokse både teknisk og kommersielt.",
    image: "/img/Portrett1.jpg",
  },
  {
    id: 2,
    anchorId: "matboksen",
    titleEn: "Matboksen",
    titleNo: "Matboksen",
    descriptionEn:
      "Matboksen is a modern, AI-powered food and nutrition app designed to make healthy living simple and intuitive. Currently in TestFlight and nearing its full release, the app focuses on helping users stay on track with their food and training goals without the hassle of manual tracking. With Matboksen, you can simply take a photo of your meal, and the AI will instantly analyze it and tell you whether it fits your personal goals. It then automatically logs the meal into your plan within seconds. The app also features a conversational AI assistant. So the user can adjust their plan.\n\nThe app is built on next.js and tailwindcss.",
    descriptionNo:
      "Matboksen er en moderne KI-app for kosthold og trening, laget for a gjøre en sunn hverdag enklere. Appen er i Testflight og nærmer seg full lansering.\n\nDu kan ta bilde av maten din, og KI analyserer raskt om måltidet passer din hverdagsstruktur. Deretter blir det automatisk loggført i planen din på sekunder. Appen har ogsa en KI-assistent som hjelper brukeren med a justere planen underveis.\n\nAppen er bygget med Next.js og Tailwind.",
    images: [
      "/img/matboksen.png",
      "/img/skolebolle-matboksen.png",
      "/img/ai-matboksen.png",
      "/img/coach-matboksen.png",
    ],
  },
  {
    id: 3,
    anchorId: "joblaunch",
    titleEn: "JobLaunch",
    titleNo: "JobLaunch",
    descriptionEn:
      "JobLaunch was the first logo I designed from the ground up, created for a professional hiring company focused on helping people take the next step in their careers. The concept is inspired by a rocket launch. The shape and structure of the logo are designed to resemble something firing upward symbolizing momentum, ambition, and new opportunities.\n\n It reflects that powerful moment when someone transitions from searching for a job to successfully landing one. At its core, JobLaunch represents growth, direction, and progress. The logo was designed to feel both motivating and professional, capturing the company’s mission to connect people with the right opportunities and help them “launch” their careers with confidence.",
    descriptionNo:
      "JobLaunch var den første logoen jeg designet helt fra bunnen av for et profesjonelt rekrutteringsselskap. Konseptet er inspirert av en rakettoppskytning, og formen symboliserer fart, ambisjon og nye muligheter.\n\nLogoen representerer overgangen fra jobbsøking til å lande riktig stilling. I kjernen handler JobLaunch om vekst, retning og fremdrift, og uttrykket er laget for a være både motiverende og profesjonelt.",
    link: "https://joblaunch.no",
    images: [
      "/img/joblaunchLogo.jpg",
      "/img/jobblaunch-liten.jpg",
      "/img/joblaunch-ekte.jpg",
      "/img/joblaunch-mockup.png",
    ],
    mediaGridModifier: "joblaunch",
  },
  {
    id: 4,
    anchorId: "treoppdrag",
    titleEn: "Treoppdrag",
    titleNo: "Treoppdrag",
    descriptionEn:
      "Treoppdrag.no is a platform built to connect customers across Norway with professional, insured tree cutters in a fast, reliable, and secure way.\n\n Customers can create an account and submit a job request in just a few steps. Behind the scenes, the system handles everything automatically. We’ve built a custom round-robin distribution system from the ground up that intelligently assigns each job to the most suitable tree cutter based on location and availability.\n\n For professionals, Treoppdrag.no includes a powerful admin and user dashboard where they can manage jobs, track assignments, and handle their workflow efficiently. To maintain a high standard of safety and trust, we only accept contractors who have valid insurance giving customers peace of mind when booking services. \n\n Treoppdrag.no is created with next.js",
    descriptionNo:
      "Treoppdrag.no er en plattform som kobler kunder i hele Norge med profesjonelle og forsikrede trefellere på en rask og trygg måte.\n\nKunder kan opprette konto og sende inn oppdrag på få steg. I bakgrunnen fordeler et egenutviklet round-robin-system oppdrag basert på trefellernes lokasjon og tilgjengelighet.\n\nFor fagfolk tilbyr plattformen et kraftig dashboard for håndtering av oppdrag og arbeidsflyt. For å sikre kvalitet og trygghet godkjennes kun aktører med gyldig forsikring. Her har jeg utviklet logoen, og nettsiden har jeg laget i samarbeid med det fantastiske teamet vårt!\n\nTreoppdrag.no er bygget med Next.js og Tailwind.",
    link: "https://treoppdrag.no",
    images: [
      { src: "/img/ads-1.png", objectFit: "contain" },
      { src: "/img/treoppdrag-admin.png", objectFit: "cover" },
      { src: "/img/treoppdrag-burgermenu.png", objectFit: "cover" },
      { src: "/img/post-3.png", objectFit: "cover" },
    ],
    mediaGridModifier: "treoppdrag",
  },
  {
    id: 6,
    anchorId: "eliterollespill",
    titleEn: "Elite Rollespill",
    titleNo: "Elite Rollespill",
    descriptionEn:
      "Elite Rollespill is a roleplay server for the game Grand Theft Auto 5. It is a server that allows players to roleplay in the game. It is a server where the ingame world is made out to be Oslo in Norway. Hardcore roleplay in norwegian and everything is immersed down to the street signs and names on the street signs. Even the buildings have the real original names on them. This is an ambitious project. And we have a strong team of developers and designers working on it. \n\n Elite Rollespill is created with lua script and mysql database.",
    descriptionNo:
      "Elite Rollespill er en Norsk rollespill-server for Grand Theft Auto 5 hvor jeg er utvikler, designer og deleier for tiden. Spillere kan spille ut realistiske scenarioer i et norskt miljø. Hele spillverdenen er bygget opp i Oslo, med norske gateskilt, navn og detaljer for høy innlevelse.\n\nDette er et ambisiøst prosjekt med et sterkt team på tre personer som består av to utviklere og en designer.\n\nElite Rollespill er bygget med Lua-skript og MySQL-database.",
    link: "https://eliterollespill.no",
    images: [
      { src: "/img/eliterollespill.png", objectFit: "contain" },
      { src: "/img/eliterollespill2.png", objectFit: "cover" },
      {
        src: "/img/eliterollespill3.png",
        objectFit: "cover",
        objectPosition: "left center",
      },
      { src: "/img/eliterollespill4.png", objectFit: "cover" },
    ],
    mediaGridModifier: "eliterollespill",
  },
  {
    id: 5,
    anchorId: "nordmind",
    titleEn: "NordMind",
    titleNo: "NordMind",
    descriptionEn:
      "NordMind is a web application designed to simplify how users manage emails, schedules, and team communication. By integrating with tools like Google Mail and Google Calendar, it brings messages, planning, and tasks into one structured system. A built-in AI assistant can help write emails, create calendar plans, and automate routine actions. NordMind can also forward important updates from emails to team platforms through an approval-based system, keeping communication clear and relevant. The platform is flexible and customizable to fit different workflows. The platform will also include AI-driven insights that analyze similar platforms and online content to suggest improvements, helping users keep their websites relevant and optimized for search visibility. It will be able to generate blog posts and content ideas automatically, with user approval before publishing. NordMind is currently in development, with ongoing work focused on smarter automation, content optimization, and AI-assisted workflows. \n\n Nordmind.no is created with next.js",
    descriptionNo:
      "NordMind er en webapplikasjon som forenkler håndtering av e-post, planlegging og teamkommunikasjon. Med integrasjoner som Google Mail og Google Calendar samles meldinger, planer og oppgaver i ett strukturert system.\n\nEn innebygd KI-assistent kan hjelpe med å skrive e-poster, lage kalenderplaner og automatisere rutineoppgaver. NordMind kan også videreformidle viktige oppdateringer fra e-post til teamplattformer via en godkjenningsbasert innlogging på for eksempel slack eller discord.\n\nPlattformen er fleksibel og kan tilpasses ulike arbeidsprosesser. Den vil også inkludere KI-innsikt som analyserer lignende plattformer og innhold på nett for å foreslå forbedringer, inkludert SEO og innholdsproduksjon med godkjenning for publisering.\n\nNordmind.no er laget med Next.js og Tailwind.",
    images: [
      { src: "/img/dashboard_nordmind.png", objectFit: "cover" },
      { src: "/img/calendar_nordmind.png", objectFit: "cover" },
      { src: "/img/landing_nordmind.png", objectFit: "cover" },
      { src: "/img/dashboard2_nordmind.png", objectFit: "contain" },
    ],
    mediaGridModifier: "nordmind",
  },
];

function CaseStudyMedia({
  study,
  titleLabel,
}: {
  study: CaseStudyItem;
  titleLabel: string;
}) {
  const mediaSources = normalizeMediaItems(study.images, study.image);

  return (
    <div
      className={`${styles.mediaGrid} ${mediaGridClassName(study.mediaGridModifier)}`}
      data-count={mediaSources.length}
    >
      {mediaSources.map((item, mediaIndex) => {
        const imageStyle: CSSProperties = {};
        if (item.objectFit) imageStyle.objectFit = item.objectFit;
        if (item.objectPosition)
          imageStyle.objectPosition = item.objectPosition;

        return (
          <div key={`${study.id}-${mediaIndex}`} className={styles.mediaItem}>
            <img
              src={item.src}
              alt={`${titleLabel} image ${mediaIndex + 1}`}
              className={styles.mediaImage}
              style={Object.keys(imageStyle).length ? imageStyle : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectCaseStudies() {
  const { t, locale } = useLocale();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleIds, setVisibleIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-study-id"));
          if (!Number.isFinite(id)) return;
          if (entry.isIntersecting) {
            setVisibleIds((prev) =>
              prev[id] ? prev : { ...prev, [id]: true },
            );
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-label={t("home.selectedWork")}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t("home.caseStudiesTitle")}</h2>
      </div>

      <div className={styles.studies}>
        {caseStudies.map((study, index) => {
          const title = locale === "no" ? study.titleNo : study.titleEn;
          const description =
            locale === "no" ? study.descriptionNo : study.descriptionEn;
          const titleLabel =
            typeof title === "string" ? title : `Project ${study.id}`;
          const reverse = index % 2 === 1;

          return (
            <article
              key={study.id}
              id={study.anchorId}
              data-study-id={study.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`${styles.study} ${reverse ? styles.studyReverse : ""} ${
                visibleIds[study.id] ? styles.studyVisible : ""
              }`}
            >
              <div className={styles.mediaColumn}>
                <div className={styles.mediaSticky}>
                  <CaseStudyMedia study={study} titleLabel={titleLabel} />
                </div>
              </div>

              <div className={styles.copyColumn}>
                <h3 className={styles.studyTitle}>{title}</h3>
                <p className={styles.studyDescription}>{description}</p>
                {study.link && (
                  <a
                    href={study.link}
                    className={styles.studyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("stacking.visitSite")}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
