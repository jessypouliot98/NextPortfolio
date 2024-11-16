import { HeroSkillSpinner } from "@/components/part/Hero/HeroSkillSpinner/HeroSkillSpinner";
import { HeroPresentation } from "@/components/part/Hero/HerePresentation/HerePresentation";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

export type HeroProps = Omit<ComponentPropsWithoutRef<"section">, "children">;

export function Hero({ className, ...props }: HeroProps) {
  return (
    <section {...props} className={clsx("relative py-16 lg:py-8 sm:min-h-[max(80vh,600px)]", className)}>
      <div className="absolute inset-12 blur-3xl bg-gradient-to-tl from-transparent via-blue-700/30 dark:via-blue-500/20 to-transparent to-60%"/>
      <div className={clsx(
        "opacity-15 lg:opacity-30 xl:opacity-100",
        "absolute top-0 right-0",
        "-translate-y-1/2 translate-x-1/2",
        "lg:-translate-y-1/3 lg:translate-x-1/3",
      )}>
        <HeroSkillSpinner />
      </div>
      <div className="relative sm:absolute sm:inset-0">
        <HeroPresentation />
      </div>
    </section>
  )
}