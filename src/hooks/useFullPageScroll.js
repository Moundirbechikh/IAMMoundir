// hooks/useFullPageScroll.js
import { useEffect, useRef, useState, useCallback } from "react";

export function useFullPageScroll(sectionCount, { cooldown = 900, swipeThreshold = 70 } = {}) {
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const wheelAccum = useRef(0);
  const lastWheelTime = useRef(0);

  const goTo = useCallback(
    (next) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(sectionCount - 1, next));
      if (clamped === index) return;
      isAnimating.current = true;
      setIndex(clamped);
      setTimeout(() => {
        isAnimating.current = false;
      }, cooldown);
    },
    [index, sectionCount, cooldown]
  );

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      // reset l'accumulateur si trop de temps s'est écoulé (nouveau geste)
      if (now - lastWheelTime.current > 200) wheelAccum.current = 0;
      lastWheelTime.current = now;
      wheelAccum.current += e.deltaY;

      if (isAnimating.current) return;
      if (wheelAccum.current > 60) {
        goTo(index + 1);
        wheelAccum.current = 0;
      } else if (wheelAccum.current < -60) {
        goTo(index - 1);
        wheelAccum.current = 0;
      }
    };

    const handleKey = (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) goTo(index + 1);
      if (["ArrowUp", "PageUp"].includes(e.key)) goTo(index - 1);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < swipeThreshold) return;
      if (delta > 0) goTo(index + 1);
      else goTo(index - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [index, goTo, swipeThreshold]);

  return { index, goTo, setIndex };
}