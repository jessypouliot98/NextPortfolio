import { HeroSkillSpinner } from "@/components/part/Hero/HeroSkillSpinner/HeroSkillSpinner";
import { HeroPresentation } from "@/components/part/Hero/HerePresentation/HerePresentation";

export function Hero() {
  return (
    <div className="relative min-h-[70vh] backdrop-blur-3xl">
      <div className="absolute inset-12 blur-3xl bg-gradient-to-tl from-transparent via-blue-900/30 to-transparent to-60%"/>
      <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3">
        <HeroSkillSpinner />
      </div>
      <div className="absolute inset-0">
        <HeroPresentation />
      </div>
    </div>
  )
}