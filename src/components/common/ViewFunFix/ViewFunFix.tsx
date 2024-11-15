"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

export type ViewFunFix = ComponentPropsWithoutRef<"div">;

/**
 * Fixes some layout shift bugs that happen from animating sizes of child nodes.
 * By clipping the height to the rendered height, any layout shifts will not affect the container height.
 * The children will instead overflow, which is likely a less dramatic issue than resizing the height.
 */
export function ViewFunFix({ children, ...props }: ViewFunFix) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const abortController = new AbortController();

    const saveCurrentHeight = () => {
      div.style.height = `${div.getBoundingClientRect().height}px`;
    }

    const unsaveCurrentHeight = () => {
      div.style.height = "";
    }

    window.addEventListener("resize", () => {
      // unclip fixed height to auto-resize and reclip height next frame
      unsaveCurrentHeight();
      requestAnimationFrame(saveCurrentHeight);
    }, { signal: abortController.signal });

    saveCurrentHeight();

    return () => abortController.abort();
  }, []);

  return (
    <div ref={divRef} {...props}>
      {children}
    </div>
  )
}