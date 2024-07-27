import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { EntrySkill } from "@/modules/cms/queries";

export type SkillSpinnerProps = {
  className?: string;
  style?: React.CSSProperties;
}

export function SkillSpinner({ children, className, style }: React.PropsWithChildren<SkillSpinnerProps>) {
  return (
    <div
      className={clsx(
        "relative",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export namespace SkillSpinner {

  export type Skill = {
    name: string;
    slug: string;
    image: {
      url: string;
      alt: string;
    }
  }

  export type RingProps = {
    className?: string;
    classNames?: Partial<Record<"container" | "ring" | "bubble", string>>;
    style?: React.CSSProperties;
    skills: EntrySkill[];
    size: {
      ring: number | string;
      bubble: number | string;
    },
    spinDuration: number | string;
  }

  export function Ring({ className, classNames, style, skills, size, spinDuration }: RingProps) {
    const ringCssVars: object = {
      "--ring-size": typeof size.ring === "number" ? `${size.ring}px` : size.ring,
      "--animation-duration": typeof spinDuration === "number" ? `${spinDuration}ms` : spinDuration,
    }

    return (
      <div
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
          classNames?.container,
          className,
        )}
        style={style}
      >
        <div
          className={clsx(
            "relative rounded-full animate-spin size-[--ring-size]",
            classNames?.ring,
          )}
          style={ringCssVars}
        >
          {skills.map((skill, i) => (
            <Bubble
              key={skill.fields.slug}
              className={clsx(
                "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
                classNames?.bubble,
              )}
              offset={typeof size.ring === "number" ? size.ring / 2 : `calc(${size.ring} / 2)`}
              anglePercent={(i + 1) / skills.length}
              size={size.bubble}
              skill={skill}
            />
          ))}
        </div>
      </div>
    )
  }

  export type BubbleProps = {
    className?: string;
    offset: number | string;
    anglePercent: number;
    size: number | string;
    skill: EntrySkill;
  }

  export function Bubble({ className, skill, size, offset, anglePercent }: BubbleProps) {
    const offsetCss = typeof offset === "number" ? `${offset}px` : offset;
    const cssVars: object = {
      "--bubble-offset-x": `calc(${offsetCss} * sin(${anglePercent * 360}deg))`,
      "--bubble-offset-y": `calc(${offsetCss} * cos(${anglePercent * 360}deg))`,
      "--bubble-rotation": `${-anglePercent * 360 - 90}deg`,
      "--bubble-size": typeof size === "number" ? `${size}px` : size,
    };
    const customStyle: object | null = typeof skill.fields.extra?.skillSpinnerBubbleStyle === "object" ? skill.fields.extra?.skillSpinnerBubbleStyle : null;

    return (
      <div className={className}>
        <div
          className={clsx(
            "rounded-full p-2 size-[--bubble-size] shadow bg-white flex justify-center items-center overflow-hidden",
            "origin-center transform rotate-[--bubble-rotation] translate-y-[--bubble-offset-y] translate-x-[--bubble-offset-x]"
          )}
          style={cssVars}
        >
          <div className="w-full h-full" style={customStyle ?? undefined}>
            <div className="relative w-full h-full rounded-full">
              <Image
                className="block w-full h-full"
                src={`https:${skill.fields.image.fields.file.url}`}
                alt={skill.fields.image.fields.description}
                fill
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}