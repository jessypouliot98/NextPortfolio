"use client"

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { getComputedStyle } from "@floating-ui/utils/dom";
import clsx from "clsx";
import { useDynamicRef } from "@/modules/react-utils/hooks";

export type MacWindowProps = {
  className?: string;
  classNames?: Partial<{
    container?: string;
    content?: string;
  }>;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  onFocus?: () => void;
}

export type MacWindowRef = {
  maximize: () => void;
  minimize: () => void;
  close: () => void;
  focus: () => void;
}

export const MacWindow = forwardRef<MacWindowRef, React.PropsWithChildren<MacWindowProps>>(({ children, className, classNames, onMinimize, onClose, onMaximize, onFocus }, ref) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const eventHandlersRef = useDynamicRef({
    onMinimize,
    onMaximize,
    onClose,
  });

  const windowActions = useMemo(() => {
    return {
      minimize: () => {
        const windowEl = windowRef.current;
        if (!windowEl) return;
        windowEl.style.setProperty("--opacity", "0%");
        eventHandlersRef.current.onMinimize?.();
      },
      maximize: () => {
        const windowEl = windowRef.current;
        if (!windowEl) return;
        windowEl.style.setProperty("--opacity", "100%");
        windowEl.style.setProperty("--size-x", `${window.innerWidth}px`);
        windowEl.style.setProperty("--size-y", `${window.innerHeight}px`);
        windowEl.style.setProperty("--translate-x", "0px");
        windowEl.style.setProperty("--translate-y", "0px");
        eventHandlersRef.current.onMaximize?.();
      },
      close: () => {
        const windowEl = windowRef.current;
        if (!windowEl) return;
        eventHandlersRef.current.onClose?.();
      },
      focus: () => {
        const windowEl = windowRef.current;
        if (!windowEl) return;
        windowEl.focus();
      },
    }
  }, [eventHandlersRef]);

  useImperativeHandle(ref, () => windowActions, [windowActions])

  useEffect(() => {
    const windowEl = windowRef.current;
    const topBarEl = windowEl?.querySelector(`[data-window="top-bar"]`) as HTMLElement | undefined;
    if (!windowEl || !topBarEl) return;

    windowEl.style.setProperty("--opacity", "100%");
    windowEl.style.setProperty("--size-x", "600px");
    windowEl.style.setProperty("--size-y", "380px");
    const computedStyle = getComputedStyle(windowEl);
    windowEl.style.setProperty("--translate-x", `${window.innerWidth / 2 - parseFloat(computedStyle.width) / 2}px`);
    windowEl.style.setProperty("--translate-y", `${window.innerHeight / 2 - parseFloat(computedStyle.height) / 2}px`);

    const abortController = new AbortController();
    let initial: { rect: DOMRect; x: number; y: number } | undefined;

    topBarEl.addEventListener("mousedown", (ev) => {
      initial = {
        rect: windowEl.getBoundingClientRect(),
        x: ev.clientX,
        y: ev.clientY,
      }
      document.body.classList.add("select-none");
    }, { signal: abortController.signal });

    window.addEventListener("mouseup", (ev) => {
      initial = undefined;
      document.body.classList.remove("select-none");
    }, { signal: abortController.signal });

    window.addEventListener("mousemove", (ev) => {
      if (!initial) return;
      const delta = { x: ev.clientX - initial.x, y: ev.clientY - initial.y };
      windowEl.style.setProperty("--translate-x", `${initial.rect.x + delta.x}px`);
      windowEl.style.setProperty("--translate-y", `${initial.rect.y + delta.y}px`);
    }, { signal: abortController.signal });

    return () => abortController.abort();
  }, []);

  return (
    <div
      ref={windowRef}
      tabIndex={0}
      className={clsx(
        "group flex flex-col shadow-xl pointer-events-auto",
        "absolute top-0 left-0 w-[var(--size-x)] h-[var(--size-y)] translate-x-[var(--translate-x)] translate-y-[var(--translate-y)] opacity-[var(--opacity,0%)]",
        className,
        classNames?.container,
      )}
      onClick={(ev) => (ev.target as HTMLElement).focus()}
      onFocus={onFocus}
    >
      <div
        className="flex justify-between shadow bg-neutral-200/95 border-neutral-300 dark:bg-neutral-900/95 dark:border-black backdrop-blur px-2 h-7 rounded-t-lg"
        data-window="top-bar"
      >
        <div className="flex items-center gap-1.5">
          <button
            className="rounded-full size-3 shadow border bg-neutral-300 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-700 group-focus-within:bg-red-500 group-focus-within:border-red-600"
            onClick={() => windowActions.close()}
          />
          <button
            className="rounded-full size-3 shadow border bg-neutral-300 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-700 group-focus-within:bg-yellow-500 group-focus-within:border-yellow-600"
            onClick={() => windowActions.minimize()}
          />
          <button
            className="rounded-full size-3 shadow border bg-neutral-300 dark:bg-neutral-600 border-neutral-400 dark:border-neutral-700 group-focus-within:bg-green-500 group-focus-within:border-green-600"
            onClick={() => windowActions.maximize()}
          />
        </div>
      </div>
      <div className={clsx("flex-1 rounded-b-lg overflow-hidden", classNames?.content)}>
        {children}
      </div>
    </div>
  )
});

MacWindow.displayName = "MacWindow";