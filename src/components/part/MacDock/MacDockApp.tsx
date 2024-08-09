import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import Image from "next/image";
import { EntryDockApp } from "@/modules/cms/queries";
import { ComponentPropsWithoutRef } from "react";

export type MacDockAppProps = {
  app: EntryDockApp;
}

export function MacDockApp({ app }: MacDockAppProps) {
  let trigger: { Comp: "a", props: ComponentPropsWithoutRef<"a"> } | { Comp: "button", props: ComponentPropsWithoutRef<"button"> }
  if (typeof app.fields.options?.href === "string") {
    trigger = {
      Comp: "a",
      props: {
        href: app.fields.options.href,
        target: "_blank",
      }
    }
  } else {
    trigger = {
      Comp: "button",
      props: {
        onClick: () => console.log(app.fields.options),
      }
    }
  }
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        asChild
        className={clsx(
          "grid place-items-center",
          "transition group-hover/dock:duration-0",
          "group-hover/dock:translate-x-[var(--magnitude-translate)]"
        )}
        data-dock="item"
      >
        <trigger.Comp
          {...trigger.props as any}
          className={clsx(
            "relative size-12 grid place-items-center",
            "transition group-hover/dock:duration-0",
            "group-hover/dock:scale-[var(--magnitude-scale,1)] origin-bottom"
          )}
          data-dock="app"
        >
          <Image
            src={`https:${app.fields.appIcon.fields.file.url}`}
            alt={app.fields.appIcon.fields.description}
            fill
          />
        </trigger.Comp>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={16} side="top" align="center">
          <div
            className="rounded-lg text-xs px-3 py-1.5 bg-neutral-300/70 dark:bg-neutral-700/70 backdrop-blur text-neutral-900 dark:text-white"
          >
            {app.fields.title}
          </div>
          <Tooltip.Arrow className="fill-neutral-300/70 dark:fill-neutral-700/70"/>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}