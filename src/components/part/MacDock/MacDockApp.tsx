import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import Image from "next/image";
import { EntryDockApp } from "@/modules/cms/queries";

export type MacDockAppProps = {
  app: EntryDockApp;
}

export function MacDockApp({ app }: MacDockAppProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        className={clsx(
          "grid place-items-center",
          "transition group-hover/dock:duration-0",
          "group-hover/dock:translate-x-[var(--magnitude-translate)]"
        )}
        data-dock="item"
      >
        <div
          className={clsx(
            "relative size-10 grid place-items-center",
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
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content sideOffset={16} side="top" align="center">
          <div
            className="rounded-lg text-xs px-3 py-1.5 bg-neutral-700/70 backdrop-blur text-white font-medium"
          >
            {app.fields.title}
          </div>
          <Tooltip.Arrow className="fill-neutral-700/70"/>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}