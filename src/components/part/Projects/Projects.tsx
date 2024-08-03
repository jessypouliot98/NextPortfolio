"use client";

import { Entries, EntryProject } from "@/modules/cms/queries";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { serialize } from "@/modules/cms/utils/serialize";

export type ProjectsProps = {
  projects: serialize.Serialized<Entries<EntryProject>>;
}

export function Projects({ projects }: ProjectsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const focusedIndexRef = useRef(0);

  const handleFocusIndex = (index: number) => {
    const list = listRef.current;
    if (!list) return;
    const paddingLeft = parseFloat(getComputedStyle(list).paddingLeft);
    index = Math.max(0, Math.min(index, list.children.length));
    const target = list.children[index];
    list.scrollBy({
      left: target.getBoundingClientRect().left - paddingLeft,
      behavior: "smooth",
    })
  }

  const handleFocusPrev = () => {
    handleFocusIndex(focusedIndexRef.current - 1);
  }

  const handleFocusNext = () => {
    handleFocusIndex(focusedIndexRef.current + 1);
  }

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const abortController = new AbortController();
    list.addEventListener("scroll", () => {
      const elements = Array.from(list.children);
      const best = elements.reduce((best, element, index) => {
        const { left } = element.getBoundingClientRect();
        const distance = Math.abs(left);
        if (distance >= best.distance) {
          return best;
        }
        return {
          index,
          distance,
        }
      }, { index: 0, distance: Infinity });
      focusedIndexRef.current = best.index;
    }, { signal: abortController.signal })
    return () => abortController.abort();
  })

  return (
    <section className="">
      <div className="max-w-screen-xl px-8 mx-auto">
        <h2 className="text-4xl font-bold text-blue-100">
          Projects
        </h2>
      </div>
      <ul
        ref={listRef}
        className={clsx(
          "overflow-x-auto flex gap-12",
          "scroll-px-[calc((100vw-theme(maxWidth.screen-xl))/2)]",
          // max-w-screen-xl mx-auto as padding to allow for overflow style scrolling effect
          "py-4 px-[calc(((100vw-theme(maxWidth.screen-xl))/2)+theme(spacing.8))]",
        )}
      >
        {projects.items.map((item) => (
          <li key={item.fields.slug} className="group snap-start">
            <div className="rounded-xl bg-blue-600 p-6 w-[24rem] transition group-even:rotate-3 group-odd:-rotate-3 group-hover:rotate-0 scale-90 group-hover:scale-100">
              <div className="relative rounded-lg bg-blue-900 aspect-video">
                <Image
                  className="w-full h-full block object-contain"
                  src={`https:${item.fields.thumbnail.fields.file.url}`}
                  alt={item.fields.thumbnail.fields.description}
                  fill
                />
              </div>
              <h3 className="font-bold text-2xl mt-4">{item.fields.name}</h3>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque, cum
                delectus eligendi enim eos et, impedit inventore iusto labore nam odit pariatur quia quidem repudiandae
                sequi soluta voluptate.</p>
              <div className="grid gap-2">
                {item.fields.linkPresentation && (
                  <a href={item.fields.linkPresentation}>
                    presentation
                  </a>
                )}
                {item.fields.linkProject && (
                  <a href={item.fields.linkProject}>
                    project
                  </a>
                )}
                {item.fields.link && (
                  <a href={item.fields.link}>
                    link
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="max-w-screen-xl mx-auto px-8 text-xl font-bold flex justify-between items-center">
        <button onClick={handleFocusPrev}>Previous</button>
        <button onClick={handleFocusNext}>Next</button>
      </div>
    </section>
  )
}

export namespace Projects {

  export const maxWidth = 1280; // tailwind max-w-screen-xl

}