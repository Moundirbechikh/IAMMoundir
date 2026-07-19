import { useEffect, useRef, useState, useCallback } from "react";

export function useFullPageScroll(sectionCount, { cooldown = 600, breakpoint = 1024 } = {}) {
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);
  const wheelAccum = useRef(0);
  const lastWheelTime = useRef(0);
  const isDesktop = useRef(window.innerWidth >= breakpoint);

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
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    isDesktop.current = mq.matches;
    const updateDesktop = (e) => (isDesktop.current = e.matches);
    mq.addEventListener("change", updateDesktop);

    // Wheel — desktop uniquement, le mobile scroll nativement
    const handleWheel = (e) => {
      if (!isDesktop.current) return;
      e.preventDefault();
      const now = Date.now();
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

    // Clavier — desktop uniquement
    const handleKey = (e) => {
      if (!isDesktop.current) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) goTo(index + 1);
      if (["ArrowUp", "PageUp"].includes(e.key)) goTo(index - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);

    return () => {
      mq.removeEventListener("change", updateDesktop);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, goTo, breakpoint]);

  return { index, goTo, setIndex };
}