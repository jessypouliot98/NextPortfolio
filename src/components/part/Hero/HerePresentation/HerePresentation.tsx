import * as GrIcon from "react-icons/gr";
import clsx from "clsx";
import { TextGradient } from "@/components/common/TextGradient/TextGradient";
import { getHeroSocials } from "@/modules/cms/queries";

export async function HeroPresentation() {
  const heroSocials = await getHeroSocials();
  return (
    <div className="flex items-center h-full mx-auto max-w-screen-xl">
      <div>
        <h1 className="font-medium text-6xl text-blue-300">
          Jessy Pouliot
        </h1>
        <h2 className="font-bold text-6xl text-blue-400 mt-2">
          <TextGradient className="bg-gradient-to-br from-blue-600 to-blue-400">TypeScript Web Developer</TextGradient>
        </h2>
        <h3 className="italic text-sm text-blue-200 text-right mt-2">
          and aspiring General purpose Developer
        </h3>
        <menu className="flex items-center gap-4 mt-2 text-2xl">
          {heroSocials.fields.socials.map((social) => {
            const Icon = social.fields.icon in GrIcon ? GrIcon[social.fields.icon as keyof typeof GrIcon] : GrIcon.GrCircleQuestion;
            const cssVars: object = {
              "--highlight-color": social.fields.highlightColor
            }
            return (
              <li key={social.fields.slug}>
                <a
                  className={clsx(
                    "grid place-items-center rounded-lg size-12 border-2",
                    "transition-colors duration-300",
                    "bg-transparent text-gray-50 border-gray-50",
                    "hover:text-gray-900",
                    social.fields.highlightColor
                      ? "hover:bg-[var(--highlight-color)] hover:border-[var(--highlight-color)]"
                      : "hover:bg-blue-500 hover:border-blue-500",
                  )}
                  style={cssVars}
                  title={social.fields.title}
                  href={social.fields.href}
                >
                  <Icon/>
                </a>
              </li>
            )
          })}
        </menu>
      </div>
    </div>
  )
}