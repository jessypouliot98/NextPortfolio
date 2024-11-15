import { SkillSpinner } from "@/components/domain/skill/SkillSpinner/SkillSpinner";
import clsx from "clsx";
import { EntryRing, getHeroSkillCircle } from "@/modules/cms/queries";

export type HeroSkillSpinnerProps = {
  className?: string;
}

export async function HeroSkillSpinner({ className }: HeroSkillSpinnerProps) {
  const entryHeroSkillCircle = await getHeroSkillCircle();
  const firstRing = entryHeroSkillCircle.fields.rings.at(0);
  const ringSize = firstRing ? HeroSkillSpinner.getRingSize(firstRing) : "0px";
  const bubbleSize = firstRing ? HeroSkillSpinner.getRingBubbleSize(firstRing) : "0px";
  const cssVars: object = {
    "--spinner-size": `calc(${ringSize} - (${bubbleSize} / 2))`,
  }

  return (
    <SkillSpinner
      className={clsx(
        "size-[var(--spinner-size)]",
        className,
      )}
      style={cssVars}
    >
      {entryHeroSkillCircle.fields.rings.map((ring, i) => {
        return (
          <SkillSpinner.Ring
            key={ring.fields.title}
            classNames={{
              ring: clsx(
                (i & 1) === 0 ? "border-dashed border-orange-500/70" : "border-solid border-orange-500/30",
                i < 2 ? "border-4" : "border-2"
              )
            }}
            size={{
              ring: HeroSkillSpinner.getRingSize(ring),
              bubble: HeroSkillSpinner.getRingBubbleSize(ring),
            }}
            spinDuration={HeroSkillSpinner.getRingSpinDuration(ring)}
            skills={ring.fields.skills}
          />
        )
      })}
    </SkillSpinner>
  )
}

export namespace HeroSkillSpinner {

  export function getRingSize(ring: EntryRing) {
    const conf = ring.fields.configuration;
    let sizeRing: string;
    if (typeof conf?.size?.ring === "string") {
      sizeRing = conf.size.ring;
    } else if (typeof conf?.size.ring === "number") {
      sizeRing = `${conf.size.ring}px`;
    } else {
      sizeRing = "500px";
    }
    return sizeRing;
  }

  export function getRingBubbleSize(ring: EntryRing) {
    const conf = ring.fields.configuration;
    let sizeBubble: string;
    if (typeof conf?.size?.bubble === "string") {
      sizeBubble = conf.size?.bubble;
    } else if (typeof conf?.size.bubble === "number") {
      sizeBubble = `${conf.size.bubble}px`;
    } else {
      sizeBubble = "4rem";
    }
    return sizeBubble;
  }

  export function getRingSpinDuration(ring: EntryRing) {
    const conf = ring.fields.configuration;
    let spinDuration: string;
    if (typeof conf?.spinDuration === "string") {
      spinDuration = conf.spinDuration;
    } else if (typeof conf?.spinDuration === "number") {
      spinDuration = `${conf.spinDuration}ms`;
    } else {
      spinDuration = "30s";
    }
    return spinDuration;
  }

}