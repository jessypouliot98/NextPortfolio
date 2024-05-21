"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useRef } from "react";
import { EntryDock } from "@/modules/cms/queries";
import { MacDockApp } from "@/components/part/MacDock/MacDockApp";
import clsx from "clsx";

const maxScaleDistance = 150;
const maxTranslateDistance = 400;
const scaleMultiplier = 0.15;

function magnitudeEasing(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function translateElement(ev: MouseEvent, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + (rect.width / 2);
  const distance = ev.clientX - centerX;
  const dir = Math.sign(distance);
  const clampedDistance = Math.min(Math.abs(distance), maxTranslateDistance);
  const translate = magnitudeEasing(clampedDistance / maxTranslateDistance) * 3;
  element.style.setProperty("--magnitude-translate", `${dir * translate}px`);
}

function scaleElement(ev: MouseEvent, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + (rect.width / 2);
  const distance = Math.abs(ev.clientX - centerX);
  const clampedDistance = Math.min(distance, maxScaleDistance);
  const scale = magnitudeEasing((maxScaleDistance - clampedDistance) / maxScaleDistance) * scaleMultiplier;
  element.style.setProperty("--magnitude-scale", String(1 + scale));
}

export type MacDockProps = {
  dock: EntryDock;
  onRequestOpen?: (appId: string) => void;
}

export function MacDock({ dock, onRequestOpen }: MacDockProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const abortController = new AbortController();
    const elements = Array.from(list.children);

    window.addEventListener("mousemove", (ev) => {
      for (const element of elements) {
        const itemEl = element.querySelector("[data-dock='item']");
        const appEl = element.querySelector("[data-dock='app']");
        if (appEl && itemEl) {
          scaleElement(ev, appEl as HTMLElement);
          translateElement(ev, itemEl as HTMLElement);
        } else {
          console.warn("Missing element", { appEl, itemEl });
        }
      }
    }, { signal: abortController.signal });

    return () => abortController.abort();
  }, []);

  return (
    <Tooltip.Provider delayDuration={0}>
      <div className="z-10 fixed bottom-0 inset-x-0">
        <div
          className={clsx(
            "group/zone relative -mb-[100%] grid place-items-center",
            "transition-all ease-in-out duration-300 delay-300",
            "hover:-translate-y-full",
            "focus-within:-translate-y-full focus-within:delay-0"
          )}>
          <div className="flex items-end p-2 justify-center absolute inset-x-0 bottom-full h-8">
            <div className="group-hover/zone:delay-300 transition-colors bg-black/30 dark:bg-white/30 group-hover/zone:bg-transparent rounded-full backdrop-blur-3xl h-1 w-16"/>
          </div>
          <ul ref={listRef}
              className="group/dock flex items-center rounded-2xl bg-neutral-300/50 dark:bg-neutral-700/50 border border-neutral-200 dark:border-neutral-600 backdrop-blur shadow px-3 py-1.5 gap-2 mb-1">
            {dock.fields.apps.map((app) => (
              <li key={app.fields.slug}>
                <MacDockApp
                  app={app}
                  onRequestOpen={onRequestOpen}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Tooltip.Provider>
  )
}