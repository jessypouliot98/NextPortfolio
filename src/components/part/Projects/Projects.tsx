"use client";

import { Entries, EntryProject } from "@/modules/cms/queries";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { serialize } from "@/modules/cms/utils/serialize";
import { Icon } from "@/components/common/Icon/Icon";

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
    const scrollRight = list.scrollWidth - list.scrollLeft - list.getBoundingClientRect().width;
    if (index < 0) {
      index = list.children.length - 1;
    } else if (
      index >= list.children.length - 1 ||
      (index > focusedIndexRef.current && scrollRight <= 0)
    ) {
      index = 0;
    }

    const target = list.children[index];
    const nextScrollLeft = target.getBoundingClientRect().left - paddingLeft;
    list.scrollBy({
      left: nextScrollLeft,
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

    let paddingLeft = parseFloat(getComputedStyle(list).paddingLeft);
    window.addEventListener("resize", () => {
      paddingLeft = parseFloat(getComputedStyle(list).paddingLeft);
    }, { signal: abortController.signal })

    list.addEventListener("scroll", () => {
      const elements = Array.from(list.children);
      const best = elements.reduce((best, element, index) => {
        const { right, left } = element.getBoundingClientRect();
        const distance = Math.abs(left + ((right - left) / 2) - paddingLeft);
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
        <h2 className="text-4xl font-bold">
          Projects
        </h2>
      </div>
      <ul
        ref={listRef}
        className={clsx(
          "overflow-x-auto flex gap-12",
          "snap-x scroll-px-[calc((100vw-theme(maxWidth.screen-xl))/2)]",
          // max-w-screen-xl mx-auto as padding to allow for overflow style scrolling effect
          "py-4 px-[calc(((100vw-theme(maxWidth.screen-xl))/2)+theme(spacing.8))]",
        )}
      >
        {projects.items.map((item) => (
          <li key={item.fields.slug} className="group snap-start">
            <div className="rounded-xl bg-blue-600 p-6 text-white w-[24rem] transition group-even:rotate-3 group-odd:-rotate-3 group-hover:rotate-0 scale-90 group-hover:scale-100">
              <div className="relative rounded-lg bg-blue-900 aspect-video">
                <Image
                  className="transition w-full h-full block object-contain filter sepia-[50%] group-hover:sepia-0"
                  src={`https:${item.fields.thumbnail.fields.file.url}`}
                  alt={item.fields.thumbnail.fields.description}
                  fill
                />
              </div>
              <h3 className="font-bold text-2xl mt-4">{item.fields.title}</h3>
              <p className="mt-2">{item.fields.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.fields.links?.map((link) => (
                  <a
                    key={link.fields.slug}
                    className="flex items-center gap-1 underline"
                    href={link.fields.link}
                    target="_blank"
                  >
                    <Icon.FaFirefoxBrowser/>
                    <div>{link.fields.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="max-w-screen-xl mx-auto px-8 text-lg flex justify-between items-center">
        <button className="transition-colors flex items-center gap-1 text-gray-800 hover:text-blue-700 dark:text-white dark:hover:text-blue-200" onClick={handleFocusPrev}>
          <Icon.FaCaretLeft/>
          <div>Previous</div>
        </button>
        <button className="transition-colors flex items-center gap-1 text-gray-800 hover:text-blue-700 dark:text-white dark:hover:text-blue-200" onClick={handleFocusNext}>
          <div>Next</div>
          <Icon.FaCaretRight/>
        </button>
      </div>
    </section>
  )
}