"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });

    return () => {
      lenis.destroy();
      started.current = false;
    };
  }, []);

  return null;
}
