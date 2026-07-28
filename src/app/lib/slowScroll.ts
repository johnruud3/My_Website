/** Ease-in-out cubic for readable, non-jarring page scrolls. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smooth-scrolls to an element over `durationMs` (slower than native smooth).
 * `offsetPx` accounts for fixed header / scroll-margin.
 */
export function slowScrollToElement(
  element: HTMLElement,
  options?: { durationMs?: number; offsetPx?: number },
): void {
  const durationMs = options?.durationMs ?? 1800;
  const offsetPx = options?.offsetPx ?? 104;
  const startY = window.scrollY;
  const targetY =
    element.getBoundingClientRect().top + window.scrollY - offsetPx;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
