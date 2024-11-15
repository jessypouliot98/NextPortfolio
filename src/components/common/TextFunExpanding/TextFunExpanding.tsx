"use client";

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type TextFunExpandingProps = Omit<ComponentPropsWithoutRef<"span">, "children" | "aria-label"> & {
  textParts: [a: string, expand: string, b: string];
};

/**
 * Will cause layout shift when expanding.
 * Use with ViewFunFix to prevent some, but not all, of the layout shift animation bugs.
 */
export function TextFunExpanding({ className, style, textParts, ...props }: TextFunExpandingProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const funRef = useRef<HTMLSpanElement>(null);
  const [funSize, setFunSize] = useState<number>();

  const [partA, partFun, partB] = textParts;
  const text = textParts[0] + textParts[2];

  useEffect(() => {
    const spanContainer = containerRef.current;
    const spanFun = funRef.current;
    if (!spanContainer || !spanFun) return;
    const el = document.createElement("span");
    el.innerHTML = spanFun.innerHTML;
    spanContainer.appendChild(el);
    setFunSize(el.getBoundingClientRect().width);
    spanContainer.removeChild(el);
  }, []);

  const funCssVars: object = {
    "--width": typeof funSize === "number" ? `${funSize}px` : undefined,
  }

  return (
    <span
      {...props}
      className={clsx("group/text-fun inline-block")}
      style={style}
      aria-label={text}
    >
      <span className="inline-block">{partA}</span>
      <span
        ref={funRef}
        className={clsx(
          "inline-block transition-all duration-500",
          "w-0 mx-0 opacity-0 -rotate-12",
          "group-hover/text-fun:w-[var(--width)] group-hover/text-fun:mx-px group-hover/text-fun:opacity-100 group-hover/text-fun:-rotate-3",
          "text-transparent bg-clip-text",
          "bg-gradient-to-r",
          "from-blue-500 to-cyan-500",
          // "dark:from-orange-500 dark:to-yellow-500",
        )}
        style={funCssVars}
      >
        {partFun}
      </span>
      <span className="inline-block">{partB}</span>
    </span>
  )
}