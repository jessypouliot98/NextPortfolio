import clsx from "clsx";
import React from "react";
import Image from "next/image";

export type SkillSpinnerProps = {
  className?: string;
  classNames?: Partial<Record<"container" | `ring-nth-${number | "odd" | "even"}` | `bubble-nth-${number | "odd" | "even"}` | `bubble-nth-${number}`, string>>,
  style?: React.CSSProperties;
  skills: SkillSpinner.Skill[];
  rings: number;
  sizes: {
    ringCircle: Partial<Record<`nth-${number}`, number | string>>;
    ringBubble: Partial<Record<"default" | `nth-${number}`, number | string>>;
  }
  spinDurations: Partial<Record<"default" | `nth-${number}`, number | string>>;
}

export function SkillSpinner({ className, classNames, style, skills, rings, sizes, spinDurations }: SkillSpinnerProps) {
  const spinnerSize = sizes.ringCircle?.["nth-1"];
  if (!spinnerSize) {
    throw new Error("Missing sizes.ringCircle.nth-1");
  }

  const cssVars: object = {
    "--spinner-size": typeof spinnerSize === "number" ? `${spinnerSize}px` : spinnerSize,
  }

  return (
    <div
      className={clsx(
        "relative size-[--spinner-size]",
        classNames?.container,
        className,
      )}
      style={{
        ...style,
        ...cssVars,
      }}
    >
      {Array.from({ length: rings }, (_, i) => {
        const layer = i + 1;
        const ringSize = sizes.ringCircle?.[`nth-${layer}`];
        if (!ringSize) {
          throw new Error(`Missing sizes.ringSize.nth-${layer}`);
        }
        const bubbleSize = sizes.ringBubble?.[`nth-${layer}`] ?? sizes.ringBubble?.default;
        if (!bubbleSize) {
          throw new Error(`Missing sizes.ringBubble.nth-${layer}`);
        }
        const spinDuration = spinDurations?.[`nth-${layer}`] ?? spinDurations?.default;
        if (!spinDuration) {
          throw new Error(`Missing spinDurations.nth-${layer}`);
        }

        return (
          <SkillSpinner.Ring
            key={layer}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            classNames={{
              ring: clsx(
                classNames?.[`ring-nth-${layer}`],
                (layer & 1) === 0 && classNames?.[`ring-nth-even`],
                (layer & 1) === 1 && classNames?.[`ring-nth-odd`],
              ),
              bubble: clsx(
                classNames?.[`bubble-nth-${layer}`],
                (layer & 1) === 0 && classNames?.[`bubble-nth-even`],
                (layer & 1) === 1 && classNames?.[`bubble-nth-odd`],
              ),
            }}
            size={{
              ring: ringSize,
              bubble: bubbleSize,
            }}
            spinDuration={spinDuration}
            skills={skills}
          />
        )
      })}
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
    skills: SkillSpinner.Skill[];
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
              key={skill.slug}
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
    skill: Skill;
  }

  export function Bubble({ className, skill, size, offset, anglePercent }: BubbleProps) {
    const offsetCss = typeof offset === "number" ? `${offset}px` : offset;
    const cssVars: object = {
      "--bubble-offset-x": `calc(${offsetCss} * sin(${anglePercent * 360}deg))`,
      "--bubble-offset-y": `calc(${offsetCss} * cos(${anglePercent * 360}deg))`,
      "--bubble-rotation": `${anglePercent * 360}deg`,
      "--bubble-size": typeof size === "number" ? `${size}px` : size,
    };

    return (
      <div
        className={clsx(
          className,
        )}
      >
        <div
          className={clsx(
            "rounded-full p-2 size-[--bubble-size] shadow bg-white flex justify-center items-center",
            "origin-center transform rotate-[--bubble-rotation] translate-y-[--bubble-offset-y] translate-x-[--bubble-offset-x]"
          )}
          style={cssVars}
        >
          <div className="w-full h-full bg-red-500 rounded-full object-contain">
            <Image
              className="block w-full h-full"
              src={skill.image.url}
              alt={skill.image.alt}
            />
          </div>
        </div>
      </div>
    )
  }

}