"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { EntryDock } from "@/modules/cms/queries";
import Image from "next/image";
import { MacDockApp } from "@/components/part/MacDock/MacDockApp";

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
}

export function MacDock({ dock }: MacDockProps) {
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
        if (appEl) {
          scaleElement(ev, appEl as HTMLElement);
        }
        if (itemEl) {
          translateElement(ev, itemEl as HTMLElement);
        }
      }
    }, { signal: abortController.signal });

    return () => abortController.abort();
  }, []);

  return (
    <Tooltip.Provider delayDuration={0}>
      <div className="fixed bottom-0 inset-x-0">
        <div
          className="group/zone relative -mb-[100%] transition-all duration-300 ease-in-out delay-150 hover:-translate-y-full grid place-items-center">
          <div className="flex items-end p-2 justify-center absolute inset-x-0 bottom-full h-8">
            <div className="group-hover/zone:delay-300 transition-colors bg-white/30 group-hover/zone:bg-transparent rounded-full backdrop-blur-3xl h-1 w-16"/>
          </div>
          <ul ref={listRef}
              className="group/dock flex items-center rounded-2xl bg-neutral-700/50 border border-neutral-600 backdrop-blur shadow px-3 py-3 gap-3 mb-1">
            {dock.fields.apps.map((app) => (
              <li key={app.fields.slug}>
                <MacDockApp app={app} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Tooltip.Provider>
  )
}