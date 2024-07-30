import * as GrIcon from "react-icons/gr";
import clsx from "clsx";
import { TextGradient } from "@/components/common/TextGradient/TextGradient";
import { getHeroSocials } from "@/modules/cms/queries";

export async function HeroPresentation() {
  const heroSocials = await getHeroSocials();
  return (
    <div className="flex items-center h-full mx-auto max-w-screen-xl px-8">
      <div>
        <h1 className="font-medium text-6xl text-blue-900 dark:text-blue-100">
          Jessy Pouliot
        </h1>
        <h2 className="font-bold text-6xl mt-2">
          <TextGradient className="bg-gradient-to-br from-blue-400 dark:from-blue-600 to-blue-600 dark:to-blue-400">TypeScript Web Developer</TextGradient>
        </h2>
        <h3 className="italic text-sm text-gray-700 dark:text-blue-200 text-right mt-2">
          and aspiring General purpose Developer
        </h3>
        <div className="text-lg text-blue-100 space-y-2 max-w-2xl mt-8">
          <p>
            I’m passionate about writing code that pushes boundaries.
            Whether it’s crafting high-performance websites and apps or building impressive user experiences that make you go <TextGradient className="transition-all ease-in-out scale-100 hover:scale-125 hover:rotate-12 font-bold bg-gradient-to-r from-orange-500 to-blue-500">WOW!</TextGradient>
          </p>
          <p>
            I’m constantly eager to learn and dive into new technologies, frameworks, and programming languages. Right now, I’m exploring <a className="underline"
            href="https://github.com/jessypouliot98?tab=repositories&q=&type=&language=zig&sort=" target="_blank">Zig</a> and sharpening my SQL skills.
          </p>
        </div>
        <menu className="flex items-center gap-4 mt-8 text-2xl">
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
                    "bg-transparent text-gray-700 dark:text-gray-50 border-gray-700 dark:border-gray-50",
                    "hover:text-gray-50 dark:hover:text-gray-900",
                    social.fields.highlightColor
                      ? "hover:!bg-[var(--highlight-color)] hover:!border-[var(--highlight-color)]"
                      : "hover:!bg-blue-500 hover:!border-blue-500",
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