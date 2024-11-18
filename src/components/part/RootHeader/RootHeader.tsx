"use client";

import React, { useEffect, useRef } from "react";
import { RootNavigation } from "@/components/part/RootNavigation/RootNavigation";
import { useMediaQuery } from "@/modules/react-utils/hooks";
import clsx from "clsx";

export function RootHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isTall = useMediaQuery("(min-height: 768px)");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (isTall) {
      header.style.setProperty("--hide", "0");
      return;
    }

    const abortController = new AbortController();
    let initialY = window.scrollY;
    let lastY = initialY;
    let direction = 1;

    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      const deltaY = currentY - initialY;
      const currentDirection = Math.sign(currentY - lastY);

      if (currentDirection !== direction) {
        if (currentDirection < 0) {
        }
        initialY = currentY;
        direction = currentDirection;
      } else {
        if (deltaY < 10) {
          header.style.setProperty("--hide", "0");
        } else if (deltaY > 100) {
          header.style.setProperty("--hide", "1");
        }
      }

      lastY = currentY;
    }, { signal: abortController.signal });

    return () => abortController.abort();
  }, [isTall]);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "z-10 sticky top-0 transition",
        "translate-y-[calc(-100%*var(--hide,0))]",
      )}
    >
      <RootNavigation/>
    </header>
  )
}