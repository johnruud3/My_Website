"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./StackingCards.module.css";

interface CardItem {
  id: number;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  color: string;
  image?: string;
}

const cards: CardItem[] = [
  {
    id: 1,
    title: <> My name is <span style={{ color: '#34C1E3' }}> John</span> </>,
    description:
      <>jdsjsdfsdf</>
    ,
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
    image: "/img/portrett1.jpg",
  },
  {
    id: 2,
    title: "Project 2",
    description: "write something hsidfgsiaf",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
  },
  {
    id: 3,
    title: "Project 3",
    description: "write something hsidfgsiaf",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
  },
  {
    id: 4,
    title: "Project 4",
    description: "write something hsidfgsiaf",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
  },
  {
    id: 5,
    title: "Contact me",
    description: "write something hsidfgsiaf",
    color: "linear-gradient(135deg, #050b16, #146C82, #050b16)",
  },
];

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const isAnimating = useRef(false);
  const totalCards = cards.length;
  const leftOffset = 30;

  // Animate cards when currentPage changes
  useEffect(() => {
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    cardElements.forEach((card, index) => {
      if (index <= currentPage) {
        // Cards that should be visible (stacked)
        gsap.to(card, {
          yPercent: 0,
          left: index * leftOffset,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            if (index === currentPage) {
              isAnimating.current = false;
            }
          },
        });
      } else {
        // Cards that should be hidden below
        gsap.to(card, {
          yPercent: 100,
          left: index * leftOffset,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    });
  }, [currentPage]);

  // Handle wheel scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAccumulator = 0;
    const scrollThreshold = 200; // User needs to scroll this much to trigger page change
    let lastScrollTime = Date.now();
    let animationLockUntil = 0;

    const handleWheel = (e: WheelEvent) => {
      // Check if we're in the stacking section
      const rect = container.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) {
        scrollAccumulator = 0;
        return; // Not in view, let normal scroll happen
      }

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
      if (scrollAccumulator > scrollThreshold && currentPage < totalCards - 1) {
        scrollAccumulator = 0;
        isAnimating.current = true;
        animationLockUntil = Date.now() + 1000; // Lock for 1 second
        setCurrentPage((prev) => prev + 1);
      } else if (scrollAccumulator < -scrollThreshold && currentPage > 0) {
        scrollAccumulator = 0;
        isAnimating.current = true;
        animationLockUntil = Date.now() + 1000; // Lock for 1 second
        setCurrentPage((prev) => prev - 1);
      } else if (scrollAccumulator < -scrollThreshold && currentPage === 0) {
        // Allow scrolling up past the section when on first page
        scrollAccumulator = 0;
        window.scrollBy(0, -100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, totalCards]);

  // Set initial positions
  useEffect(() => {
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    cardElements.forEach((card, index) => {
      gsap.set(card, {
        left: index * leftOffset,
        yPercent: index === 0 ? 0 : 100,
        opacity: 1,
      });
    });
  }, []);

  const handleCardClick = (index: number) => {
    if (isAnimating.current || index === currentPage) return;
    isAnimating.current = true;
    setCurrentPage(index);
  };

  return (
    <section className={styles.stackingSection} ref={containerRef}>
      <div className={styles.cardsWrapper}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`${styles.card} ${index < currentPage ? styles.cardStacked : ""}`}
            style={{
              background: card.color,
              zIndex: index + 1,
              cursor: index < currentPage ? "pointer" : "default",
            }}
            onClick={() => index < currentPage && handleCardClick(index)}
          >
            {card.image ? (
              <div className={styles.cardContent}>
                <div className={styles.cardImageWrapper}>
                  <img src={card.image} alt={`Project ${card.id}`} className={styles.cardImage} />
                </div>
                <div className={styles.cardTextWrapper}>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
                {/* Scroll indicator for first card */}
                {index === 0 && currentPage === 0 && (
                  <div className={styles.scrollIndicator}>
                    <p className={styles.scrollText}>Scroll for more</p>
                    <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDescription}>{card.description}</p>
                {/* Scroll indicator for first card */}
                {index === 0 && currentPage === 0 && (
                  <div className={styles.scrollIndicator}>
                    <p className={styles.scrollText}>Scroll for more</p>
                    <svg className={styles.scrollArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
