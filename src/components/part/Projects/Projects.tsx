"use client";

import { Entries, EntryProject } from "@/modules/cms/queries";
import React, { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { serialize } from "@/modules/cms/utils/serialize";
import { Icon } from "@/components/common/Icon/Icon";
import { useBoundingClientRect } from "@/modules/react-utils/hooks";

export type ProjectsProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  projects: serialize.Serialized<Entries<EntryProject>>;
}

export function Projects({ projects, ...props }: ProjectsProps) {
  const [list, setList] = useState<HTMLUListElement | null>(null);
  const listRect = useBoundingClientRect(list);
  const focusedIndexRef = useRef(0);

  const handleFocusIndex = (index: number) => {
    if (!list) return;
    const paddingLeft = parseFloat(getComputedStyle(list).paddingLeft);
    const scrollRight = list.scrollWidth - list.scrollLeft - list.getBoundingClientRect().width;
    if (index < 0) {
      index = list.children.length - 1;
    } else if (
      index >= list.children.length - 1 ||
      (index > focusedIndexRef.current && scrollRight <= Projects.scrollRightRollbackBreakpoint)
    ) {
      index = 0;
    }

    const target = list.children[index];
    const nextScrollLeft = target.getBoundingClientRect().left - paddingLeft;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({
      left: nextScrollLeft,
      behavior: isReducedMotion ? "auto" : "smooth",
    })
  }

  const handleFocusPrev = () => {
    handleFocusIndex(focusedIndexRef.current - 1);
  }

  const handleFocusNext = () => {
    handleFocusIndex(focusedIndexRef.current + 1);
  }

  useEffect(() => {
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
  }, [list]);

  return (
    <section {...props}>
      <div className="max-w-screen-xl px-8 mx-auto">
        <h2 className="text-4xl font-bold">
          Projects
        </h2>
      </div>
      <div
        className="relative h-[var(--h)]"
        style={{
          "--h": `${listRect?.height ?? 0}px`,
        } as object}
      >
        <ul
          ref={setList}
          className={clsx(
            "absolute inset-x-0 top-0",
            "scroll-smooth motion-reduce:scroll-auto overflow-x-auto flex gap-12",
            "snap-x scroll-px-[max(calc((100vw-theme(maxWidth.screen-xl))/2),theme(spacing.8))]",
            // max-w-screen-xl mx-auto as padding to allow for overflow style scrolling effect
            "py-4 px-[max(calc(((100vw-theme(maxWidth.screen-xl))/2)+theme(spacing.8)),theme(spacing.8))]",
          )}
        >
          {projects.items.map((item) => (
            <li key={item.fields.slug} className="group/li">
              <div className="group snap-start">
                <div
                  className={clsx(
                    "transition rounded-xl bg-blue-600 p-6 text-white w-[24rem] max-w-[calc(100vw-theme(width.16))]",
                    "lg:group-even/li:rotate-3 lg:group-odd/li:-rotate-3 lg:group-hover:rotate-0",
                    "lg:scale-90 lg:group-hover:scale-100",
                  )}>
                  <div className="relative rounded-lg bg-blue-900 aspect-video">
                    <Image
                      className={clsx(
                        "w-full h-full block object-contain",
                        "transition filter",
                        "lg:grayscale-[70%] lg:group-hover:grayscale-0"
                      )}
                      src={`https:${item.fields.thumbnail.fields.file.url}`}
                      alt={item.fields.thumbnail.fields.description}
                      fill
                    />
                  </div>
                  <h3 className="font-bold text-2xl mt-4">{item.fields.title}</h3>
                  <ul className="sr-only">
                    {item.fields.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <p className="mt-2 max-h-[25vh] overflow-y-auto">{item.fields.description}</p>
                  {item.fields.links && item.fields.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.fields.links.map((link) => {
                        const IconComp = link.fields.icon && link.fields.icon in Icon ? Icon[link.fields.icon as keyof typeof Icon] : undefined;
                        return (
                          <a
                            key={link.fields.slug}
                            className="transition bg-blue-900 hover:bg-blue-950 px-1.5 py-1 rounded-md flex items-center gap-1"
                            href={link.fields.link}
                            target="_blank"
                          >
                            {IconComp && <IconComp/>}
                            <div>{link.fields.label}</div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-screen-xl mx-auto my-8 px-8 text-lg flex justify-between items-center">
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
          onClick={handleFocusPrev}>
          <Icon.FaCaretLeft/>
          <div>Previous</div>
        </button>
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
          onClick={handleFocusNext}>
          <div>Next</div>
          <Icon.FaCaretRight/>
        </button>
      </div>
    </section>
  )
}

export namespace Projects {

  export const scrollRightRollbackBreakpoint = 15;

}