"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./StackingCards.module.css";
import { useLocale } from "./LocaleProvider";

/** Per tile: path + optional fit (overrides grid CSS for that image only). */
type MediaImageItem = {
  src: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

interface CardItem {
  id: number;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  color: string;
  image?: string;
  /** Plain strings use card / grid CSS; objects let you set `objectFit` per image. */
  images?: Array<string | MediaImageItem>;
  /** Optional: extra styles for this card’s image grid only (see CSS module). */
  mediaGridModifier?:
    | "joblaunch"
    | "treoppdrag"
    | "eliterollespill"
    | "nordmind";
  link?: string;
}

function normalizeMediaItems(
  images: CardItem["images"],
  singleImage: CardItem["image"],
): MediaImageItem[] {
  if (images?.length) {
    return images
      .slice(0, 4)
      .map((item) => (typeof item === "string" ? { src: item } : item));
  }
  if (singleImage) return [{ src: singleImage }];
  return [];
}

function mediaGridClassName(modifier: CardItem["mediaGridModifier"]): string {
  if (modifier === "joblaunch") return styles.cardMediaGrid_joblaunch;
  if (modifier === "treoppdrag") return styles.cardMediaGrid_treoppdrag;
  if (modifier === "eliterollespill")
    return styles.cardMediaGrid_eliterollespill;
  if (modifier === "nordmind") return styles.cardMediaGrid_nordmind;
  return "";
}

const cards: CardItem[] = [
  {
    id: 1,
    title: (
      <>
        {" "}
        My name is <span style={{ color: "#34C1E3" }}> John</span>{" "}
      </>
    ),
    description:
      "I’m John, a developer and creator focused on building modern, practical solutions that people actually use. I enjoy taking ideas from concept to reality whether it’s designing clean user interfaces, developing full platforms, or experimenting with new technology. I have a background in both graphic design and frontend development.\n\n My work is driven by a mix of creativity and problem-solving. I like building systems that are not only functional, but also efficient and scalable, such as automated platforms, user dashboards, and AI-powered tools. I’m especially interested in projects where I can simplify complex processes and turn them into something intuitive and easy to use.\n\n Over time, I’ve worked on everything from branding and logo design to full web applications and service platforms. I enjoy having control over the entire process, from idea and design to development and deployment.\n\n Right now, I’m focused on growing my own projects and building solutions that can scale both technically and as businesses. I’m always looking for new challenges and opportunities to create something meaningful, whether working in a team or independently.",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
    image: "/img/Portrett1.jpg",
  },
  {
    id: 2,
    title: "Matboksen",
    description:
      "Matboksen is a modern, AI-powered food and nutrition app designed to make healthy living simple and intuitive. Currently in TestFlight and nearing its full release, the app focuses on helping users stay on track with their food and training goals without the hassle of manual tracking. With Matboksen, you can simply take a photo of your meal, and the AI will instantly analyze it and tell you whether it fits your personal goals. It then automatically logs the meal into your plan within seconds. The app also features a conversational AI assistant. So the user can adjust their plan.\n\nThe app is built on next.js and tailwindcss.",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
    images: [
      "/img/matboksen.png",
      "/img/skolebolle-matboksen.png",
      "/img/ai-matboksen.png",
      "/img/coach-matboksen.png",
    ],
  },
  {
    id: 3,
    title: "JobLaunch",
    description:
      "JobLaunch was the first logo I designed from the ground up, created for a professional hiring company focused on helping people take the next step in their careers. The concept is inspired by a rocket launch. The shape and structure of the logo are designed to resemble something firing upward symbolizing momentum, ambition, and new opportunities.\n\n It reflects that powerful moment when someone transitions from searching for a job to successfully landing one. At its core, JobLaunch represents growth, direction, and progress. The logo was designed to feel both motivating and professional, capturing the company’s mission to connect people with the right opportunities and help them “launch” their careers with confidence.",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
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
    title: "Treoppdrag",
    description:
      "Treoppdrag.no is a platform built to connect customers across Norway with professional, insured tree cutters in a fast, reliable, and secure way.\n\n Customers can create an account and submit a job request in just a few steps. Behind the scenes, the system handles everything automatically. We’ve built a custom round-robin distribution system from the ground up that intelligently assigns each job to the most suitable tree cutter based on location and availability.\n\n For professionals, Treoppdrag.no includes a powerful admin and user dashboard where they can manage jobs, track assignments, and handle their workflow efficiently. To maintain a high standard of safety and trust, we only accept contractors who have valid insurance giving customers peace of mind when booking services. \n\n Treoppdrag.no is created with next.js",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
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
    title: "Elite Rollespill",
    description:
      "Elite Rollespill is a roleplay server for the game Grand Theft Auto 5. It is a server that allows players to roleplay in the game. It is a server where the ingame world is made out to be Oslo in Norway. Hardcore roleplay in norwegian and everything is immersed down to the street signs and names on the street signs. Even the buildings have the real original names on them. This is an ambitious project. And we have a strong team of developers and designers working on it. \n\n Elite Rollespill is created with lua script and mysql database.",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
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
    title: "NordMind", //VELDIG VIKTIG. ALDRI BYTT UT ELLER LEGG TIL SIDER ETTER DENNE!!! ETTER CARD 5 STOPPER PROSSESSEN HELT TIL CARD 1 ER TILBAKE.
    description:
      "NordMind is a web application designed to simplify how users manage emails, schedules, and team communication. By integrating with tools like Google Mail and Google Calendar, it brings messages, planning, and tasks into one structured system. A built-in AI assistant can help write emails, create calendar plans, and automate routine actions. NordMind can also forward important updates from emails to team platforms through an approval-based system, keeping communication clear and relevant. The platform is flexible and customizable to fit different workflows. The platform will also include AI-driven insights that analyze similar platforms and online content to suggest improvements, helping users keep their websites relevant and optimized for search visibility. It will be able to generate blog posts and content ideas automatically, with user approval before publishing. NordMind is currently in development, with ongoing work focused on smarter automation, content optimization, and AI-assisted workflows. \n\n Nordmind.no is created with next.js",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
    images: [
      { src: "/img/dashboard_nordmind.png", objectFit: "cover" },
      { src: "/img/calendar_nordmind.png", objectFit: "cover" },
      { src: "/img/landing_nordmind.png", objectFit: "cover" },
      { src: "/img/dashboard2_nordmind.png", objectFit: "contain" },
    ],
    mediaGridModifier: "nordmind",
  },
];

const LEFT_OFFSET = 30;

export default function StackingCards() {
  const { t, locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>(
    {},
  );
  const isAnimating = useRef(false);
  const hasScrolledToFooter = useRef(false);
  const hasReachedLastCard = useRef(false);
  const totalCards = cards.length;

  // Detect if mobile
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  const localizedNoByCardId: Record<
    number,
    { title: React.ReactNode; description: string }
  > = {
    1: {
      title: (
        <>
          Jeg heter <span style={{ color: "#34C1E3" }}>John</span>
        </>
      ),
      description:
        "Jeg heter John, og jeg bygger moderne og praktiske digitale løsninger som folk faktisk bruker. Jeg liker å ta ideer fra konsept til ferdige produkter, enten det handler om ren UI, komplette plattformer eller ny teknologi. Jeg har skole bakgrunn i både grafisk design og frontend utvikling.\n\nArbeidet mitt er en kombinasjon av kreativitet og prøblemløsninger. Jeg fokuserer på løsninger som er funksjonelle, effektive og skalerbare, for eksempel automatiserte plattformer, dashboards og KI-drevne verktøy.\n\nJeg har jobbet med alt fra branding og logodesign til komplette webapplikasjoner og tjenesteplattformer. Jeg liker a ha kontroll på hele prosessen fra ide og design til utvikling og lansering. Samtidig som jeg har hatt/har en del teamprosjekter. \n\nAkkurat nå bygger jeg egne prosjekter videre og jobber med løsninger som kan vokse både teknisk og kommersielt.",
    },
    2: {
      title: "Matboksen",
      description:
        "Matboksen er en moderne KI-app for kosthold og trening, laget for a gjøre en sunn hverdag enklere. Appen er i Testflight og nærmer seg full lansering.\n\nDu kan ta bilde av maten din, og KI analyserer raskt om måltidet passer din hverdagsstruktur. Deretter blir det automatisk loggført i planen din på sekunder. Appen har ogsa en KI-assistent som hjelper brukeren med a justere planen underveis.\n\nAppen er bygget med Next.js og Tailwind.",
    },
    3: {
      title: "JobLaunch",
      description:
        "JobLaunch var den første logoen jeg designet helt fra bunnen av for et profesjonelt rekrutteringsselskap. Konseptet er inspirert av en rakettoppskytning, og formen symboliserer fart, ambisjon og nye muligheter.\n\nLogoen representerer overgangen fra jobbsøking til å lande riktig stilling. I kjernen handler JobLaunch om vekst, retning og fremdrift, og uttrykket er laget for a være både motiverende og profesjonelt.",
    },
    4: {
      title: "Treoppdrag",
      description:
        "Treoppdrag.no er en plattform som kobler kunder i hele Norge med profesjonelle og forsikrede trefellere på en rask og trygg måte.\n\nKunder kan opprette konto og sende inn oppdrag på få steg. I bakgrunnen fordeler et egenutviklet round-robin-system oppdrag basert på trefellernes lokasjon og tilgjengelighet.\n\nFor fagfolk tilbyr plattformen et kraftig dashboard for håndtering av oppdrag og arbeidsflyt. For å sikre kvalitet og trygghet godkjennes kun aktører med gyldig forsikring. Her har jeg utviklet logoen, og nettsiden har jeg laget i samarbeid med det fantastiske teamet vårt!\n\nTreoppdrag.no er bygget med Next.js og Tailwind.",
    },
    5: {
      title: "NordMind",
      description:
        "NordMind er en webapplikasjon som forenkler håndtering av e-post, planlegging og teamkommunikasjon. Med integrasjoner som Google Mail og Google Calendar samles meldinger, planer og oppgaver i ett strukturert system.\n\nEn innebygd KI-assistent kan hjelpe med å skrive e-poster, lage kalenderplaner og automatisere rutineoppgaver. NordMind kan også videreformidle viktige oppdateringer fra e-post til teamplattformer via en godkjenningsbasert innlogging på for eksempel slack eller discord.\n\nPlattformen er fleksibel og kan tilpasses ulike arbeidsprosesser. Den vil også inkludere KI-innsikt som analyserer lignende plattformer og innhold på nett for å foreslå forbedringer, inkludert SEO og innholdsproduksjon med godkjenning for publisering.\n\nNordmind.no er laget med Next.js og Tailwind.",
    },
    6: {
      title: "Elite Rollespill",
      description:
        "Elite Rollespill er en Norsk rollespill-server for Grand Theft Auto 5 hvor jeg er utvikler, designer og deleier for tiden. Spillere kan spille ut realistiske scenarioer i et norskt miljø. Hele spillverdenen er bygget opp i Oslo, med norske gateskilt, navn og detaljer for høy innlevelse.\n\nDette er et ambisiøst prosjekt med et sterkt team på tre personer som består av to utviklere og en designer.\n\nElite Rollespill er bygget med Lua-skript og MySQL-database.",
    },
  };

  const getLocalizedCardTitle = (card: CardItem): React.ReactNode => {
    if (locale !== "no") return card.title;
    return localizedNoByCardId[card.id]?.title ?? card.title;
  };

  const getLocalizedCardDescription = (card: CardItem): React.ReactNode => {
    if (locale !== "no") return card.description;
    return localizedNoByCardId[card.id]?.description ?? card.description;
  };

  // Animate cards when currentPage changes (desktop only)
  useEffect(() => {
    if (isMobile()) return; // Skip animations on mobile

    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cardElements.forEach((card, index) => {
      if (index <= currentPage) {
        // Cards that should be visible (stacked)
        gsap.to(card, {
          yPercent: 0,
          left: index * LEFT_OFFSET,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            if (index === currentPage) {
              isAnimating.current = false;

              // Show footer when card 5 is reached
              if (
                currentPage === totalCards - 1 &&
                !hasReachedLastCard.current
              ) {
                hasReachedLastCard.current = true;
                const footer = document.querySelector("footer");
                if (footer) {
                  (footer as HTMLElement).style.display = "block";
                }
              }
            }
          },
        });
      } else {
        // Cards that should be hidden below
        gsap.to(card, {
          yPercent: 100,
          left: index * LEFT_OFFSET,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [currentPage, totalCards]);

  // Handle wheel scroll (desktop only)
  useEffect(() => {
    if (isMobile()) return; // Skip wheel handler on mobile

    const container = containerRef.current;
    if (!container) return;

    let scrollAccumulator = 0;
    const scrollThreshold = 200; // User needs to scroll this much to trigger page change
    let lastScrollTime = Date.now();
    let animationLockUntil = 0;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();

      // Section hasn't been reached yet (still above)
      if (rect.top > 0) {
        scrollAccumulator = 0;
        hasScrolledToFooter.current = false; // Reset flag when returning to section
        return; // Allow normal scroll to reach it
      }

      // If we've already scrolled to footer, release control entirely
      if (hasScrolledToFooter.current) {
        scrollAccumulator = 0;
        return;
      }

      // If footer has been revealed, don't hijack scroll anymore
      if (hasReachedLastCard.current) {
        scrollAccumulator = 0;
        return;
      }

      // Section is in view - LOCK SCROLL (prevent default)
      e.preventDefault();

      // Prevent scroll while animating or during lock period
      const now = Date.now();
      if (isAnimating.current || now < animationLockUntil) {
        scrollAccumulator = 0;
        return;
      }

      // Reset accumulator if too much time passed
      if (now - lastScrollTime > 300) {
        scrollAccumulator = 0;
      }
      lastScrollTime = now;

      // Accumulate scroll with less dampening
      scrollAccumulator += e.deltaY * 0.8;

      // Check if threshold reached
      if (scrollAccumulator > scrollThreshold) {
        if (currentPage < totalCards - 1) {
          // NOT on last card - go to next card (NO page scroll)
          scrollAccumulator = 0;
          isAnimating.current = true;
          animationLockUntil = Date.now() + 1000;
          setCurrentPage((prev) => prev + 1);
        } else if (currentPage === totalCards - 1) {
          // ONLY on last card - allow scroll to footer
          scrollAccumulator = 0;
          hasScrolledToFooter.current = true;
          window.scrollBy({
            top: window.innerHeight * 0.5,
            behavior: "smooth",
          });
        }
      } else if (scrollAccumulator < -scrollThreshold) {
        if (currentPage > 0) {
          // Go to previous card (NO page scroll)
          scrollAccumulator = 0;
          isAnimating.current = true;
          animationLockUntil = Date.now() + 1000;
          setCurrentPage((prev) => prev - 1);
        } else if (currentPage === 0) {
          // On FIRST card scrolling UP - allow scroll up to previous sections
          scrollAccumulator = 0;
          window.scrollBy(0, -100);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, totalCards]);

  // Set initial positions (desktop only)
  useEffect(() => {
    if (isMobile()) return; // Skip initial positioning on mobile

    // Hide footer initially on desktop
    const footer = document.querySelector("footer");
    if (footer) {
      (footer as HTMLElement).style.display = "none";
    }

    // Use setTimeout to ensure refs are ready
    const timer = setTimeout(() => {
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cardElements.length === 0) return; // Not ready yet

      cardElements.forEach((card, index) => {
        gsap.set(card, {
          left: index * LEFT_OFFSET,
          yPercent: index === 0 ? 0 : 100,
          opacity: 1,
        });
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (index: number) => {
    if (isAnimating.current || index === currentPage) return;

    // If clicking on first card, reset everything
    if (index === 0) {
      hasReachedLastCard.current = false;
      hasScrolledToFooter.current = false;

      // Hide footer
      const footer = document.querySelector("footer");
      if (footer) {
        (footer as HTMLElement).style.display = "none";
      }
    }

    isAnimating.current = true;
    setCurrentPage(index);
  };

  const toggleCardExpansion = (cardId: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <section className={styles.stackingSection} ref={containerRef}>
      <div className={styles.cardsWrapper}>
        {cards.map((card, index) => {
          const localizedTitle = getLocalizedCardTitle(card);
          const localizedDescription = getLocalizedCardDescription(card);
          const isExpanded = !!expandedCards[card.id];
          const canCollapseDescription =
            typeof localizedDescription === "string";

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`${styles.card} ${index < currentPage ? styles.cardStacked : ""}`}
              style={{
                background: card.color,
                zIndex: index + 1,
                cursor: index < currentPage ? "pointer" : "default",
              }}
              onClick={() => index < currentPage && handleCardClick(index)}
            >
              {card.image || card.images?.length ? (
                <div className={styles.cardContent}>
                  <div className={styles.cardTextWrapper}>
                    <h2 className={styles.cardTitle}>{localizedTitle}</h2>
                    <p
                      className={`${styles.cardDescription} ${
                        canCollapseDescription && !isExpanded
                          ? styles.cardDescriptionCollapsed
                          : ""
                      }`}
                    >
                      {localizedDescription}
                    </p>
                    {canCollapseDescription && (
                      <button
                        type="button"
                        className={styles.readMoreButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardExpansion(card.id);
                        }}
                      >
                        {isExpanded
                          ? t("stacking.readLess")
                          : t("stacking.readMore")}
                      </button>
                    )}
                    {card.link && (
                      <a
                        href={card.link}
                        className={styles.cardLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("stacking.visitSite")}
                      </a>
                    )}
                  </div>
                  {(() => {
                    const mediaSources = normalizeMediaItems(
                      card.images,
                      card.image,
                    );

                    return (
                      <div
                        className={`${styles.cardMediaGrid} ${mediaGridClassName(card.mediaGridModifier)}`}
                        data-count={mediaSources.length}
                      >
                        {mediaSources.map((item, mediaIndex) => (
                          <div
                            key={`${card.id}-${mediaIndex}`}
                            className={styles.cardMediaItem}
                          >
                            <img
                              src={item.src}
                              alt={`${typeof localizedTitle === "string" ? localizedTitle : "Project"} image ${mediaIndex + 1}`}
                              className={styles.cardMediaImage}
                              style={
                                item.objectFit || item.objectPosition
                                  ? {
                                      ...(item.objectFit
                                        ? { objectFit: item.objectFit }
                                        : {}),
                                      ...(item.objectPosition
                                        ? {
                                            objectPosition: item.objectPosition,
                                          }
                                        : {}),
                                    }
                                  : undefined
                              }
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                  {/* Scroll indicator for first card */}
                  {index === 0 && currentPage === 0 && (
                    <div className={styles.scrollIndicator}>
                      <p className={styles.scrollText}>
                        {t("stacking.scrollForMore")}
                      </p>
                      <svg
                        className={styles.scrollArrow}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h2 className={styles.cardTitle}>{localizedTitle}</h2>
                  <p
                    className={`${styles.cardDescription} ${
                      canCollapseDescription && !isExpanded
                        ? styles.cardDescriptionCollapsed
                        : ""
                    }`}
                  >
                    {localizedDescription}
                  </p>
                  {canCollapseDescription && (
                    <button
                      type="button"
                      className={styles.readMoreButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardExpansion(card.id);
                      }}
                    >
                      {isExpanded
                        ? t("stacking.readLess")
                        : t("stacking.readMore")}
                    </button>
                  )}
                  {card.link && (
                    <a
                      href={card.link}
                      className={styles.cardLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("stacking.visitSite")}
                    </a>
                  )}
                  {/* Scroll indicator for first card */}
                  {index === 0 && currentPage === 0 && (
                    <div className={styles.scrollIndicator}>
                      <p className={styles.scrollText}>
                        {t("stacking.scrollForMore")}
                      </p>
                      <svg
                        className={styles.scrollArrow}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
