"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { entries } from "@/modules/ts-utils/object";

export function useDynamicRef<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export function useRootCssVars(cssVars: Record<`--${string}`, string>) {
  useEffect(() => {
    const html = document.body.parentElement;
    if (!html) return;
    for (const [varName, value] of entries(cssVars)) {
      html.style.setProperty(varName, value);
    }
    return () => {
      for (const varName of Object.keys(cssVars)) {
        html.style.removeProperty(varName);
      }
    }
  }, [cssVars]);
}

export function useBoundingClientRect(el: Element | null) {
  const [rect, setRect] = React.useState<DOMRect | undefined>(() => el?.getBoundingClientRect());

  useEffect(() => {
    if (!el) return;
    setRect(el.getBoundingClientRect());
    const observer = new ResizeObserver(() => {
      setRect(el.getBoundingClientRect());
    })
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  return rect;
}

export function useMediaQuery(mediaQuery: string) {
  const matchMedia = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    return window.matchMedia(mediaQuery);
  }, [mediaQuery])

  const [matches, setMatches] = useState(matchMedia?.matches ?? false);

  useEffect(() => {
    if (!matchMedia) return;
    setMatches(matchMedia.matches);
    const abortController = new AbortController();
    matchMedia.addEventListener("change", (ev) => {
      setMatches(ev.matches);
    }, { signal: abortController.signal });
    return () => abortController.abort();
  }, [matches]);

  return matches;
}