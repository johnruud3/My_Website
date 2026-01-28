"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./ImageSlider.module.css";

interface SlideItem {
  id: number;
  title: string;
  image: string;
  color: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    title: "Project One",
    image: "/images/project1.jpg",
    color: "#e74c3c",
  },
  {
    id: 2,
    title: "Project Two",
    image: "/images/project2.jpg",
    color: "#3498db",
  },
  {
    id: 3,
    title: "Project Three",
    image: "/images/project3.jpg",
    color: "#2ecc71",
  },
  {
    id: 4,
    title: "Project Four",
    image: "/images/project4.jpg",
    color: "#9b59b6",
  },
  {
    id: 5,
    title: "Project Five",
    image: "/images/project5.jpg",
    color: "#f39c12",
  },
];

export default function ImageSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startIndex = useRef(2);

  const cardCount = slides.length;

  useEffect(() => {
    updateCards();
  }, [activeIndex]);

  const updateCards = () => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const offset = index - activeIndex;
      const xPos = offset * 220;
      // Center card stays straight, only outer cards twist inward
      const angle = offset * -32;
      const zPos = -Math.abs(offset) * -80;
      const yPos = Math.abs(offset) * 25;
      const scale = 1 - Math.abs(offset) * -0.1;

      gsap.to(card, {
        x: xPos,
        y: yPos,
        rotateY: angle,
        z: zPos,
        scale: scale,
        opacity: Math.abs(offset) > 2 ? 0 : 1,
        duration: 0.5,
        ease: "power2.out",
        zIndex: 10 - Math.abs(offset),
      });
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    startIndex.current = activeIndex;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX.current;
    const indexChange = Math.round(-deltaX / 100);
    const newIndex = Math.max(0, Math.min(cardCount - 1, startIndex.current + indexChange));

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    startIndex.current = activeIndex;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - dragStartX.current;
    const indexChange = Math.round(-deltaX / 100);
    const newIndex = Math.max(0, Math.min(cardCount - 1, startIndex.current + indexChange));

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.main}>
      <h2 className={styles.main__heading}>My Work</h2>

      <div
        className={styles.carouselContainer}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.carousel}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={styles.cardWrapper}
            >
              <div
                className={styles.card}
                style={{ backgroundColor: slide.color }}
                onClick={() => goToSlide(index)}
              >
                <div className={styles.cardInner}>
                  <span className={styles.cardTitle}>{slide.title}</span>
                </div>
              </div>
              <div
                className={styles.cardReflection}
                style={{ backgroundColor: slide.color }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
