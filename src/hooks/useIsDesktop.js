import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", update);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}