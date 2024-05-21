"use client"

import { Desktop } from "@/modules/desktop/react/Desktop";
import React, { useState } from "react";
import clsx from "clsx";
import { EntryFinderDirectory, EntryFinderFile } from "@/modules/cms/queries";
import Image from "next/image";
import { Icon } from "@/components/common/Icon/Icon";

export type DesktopFinderAppProps = Pick<Desktop.AppLayoutProps, "onAppMinimize" | "onAppMaximize" | "onAppClose" | "onAppFocus"> & {
  finderRoot: EntryFinderDirectory;
}

export function DesktopFinderApp({ finderRoot, ...props }: DesktopFinderAppProps) {
  const [dir, setDir] = useState(finderRoot);

  const openItem = (item: EntryFinderDirectory | EntryFinderFile) => {
    if (item.sys.contentType.sys.id === "component-finder-directory") {
      setDir(item as EntryFinderDirectory);
      return;
    }
    const file = (item as EntryFinderFile).fields.file.fields.file;
    window.open(`https:${file.url}`, "_blank");
  }

  return (
    <DesktopFinderApp.Layout
      Title={dir.fields.title}
      RootTitle={finderRoot.fields.title}
      onOpenRoot={() => openItem(finderRoot)}
      {...props}
    >
      <div className="p-4 grid grid-cols-5 gap-2">
        {dir.fields.items.map((item) => (
          <div key={item.fields.slug} className="flex flex-col">
            <button
              type="button"
              className="block group space-y-1 no-focus-ring"
              onClick={(ev) => {
                ev.currentTarget.focus();
              }}
              onDoubleClick={() => {
                openItem(item);
              }}
              onKeyDown={(ev) => {
                if (ev.key !== "Enter") return;
                ev.preventDefault();
                ev.stopPropagation();
                openItem(item);
              }}
            >
              <div className={clsx(
                "p-2 mx-4 aspect-square rounded-[var(--mac-desktop-rounded-md)]",
                "bg-transparent group-focus:bg-neutral-500/30",
              )}>
                <DesktopFinderApp.ItemIcon item={item} />
              </div>
              <div className="flex justify-center">
                <div className={clsx(
                  "text-center text-xs p-0.5 rounded-sm",
                  "bg-transparent group-focus:bg-blue-500/30"
                )}>
                  {item.fields.title}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </DesktopFinderApp.Layout>
  );
}

export namespace DesktopFinderApp {

  export type LayoutProps = Desktop.AppLayoutProps & {
    RootTitle: React.ReactNode;
    onOpenRoot: () => void;
  }
  export function Layout({ children, className, Title, RootTitle, onOpenRoot, ...props }: LayoutProps) {
    return (
      <Desktop.App
        {...props}
        className={clsx(
          "desktop-app-focus-shadow",
          "desktop-app-rounded desktop-app-rounded-all",
          "flex",
          className,
        )}
        options={{
          initialWidth: 800,
          initialHeight: 500,
        }}
      >
        <aside className={clsx(
          "flex-1 h-full max-w-44",
          "desktop-app-rounded desktop-app-rounded-l",
          "bg-neutral-400/90 dark:bg-neutral-800/90",
        )}>
          <header
            className={clsx(
              "flex items-center w-full desktop-app-topbar-h-lg",
              "px-5 py-3",
            )}
            data-desktop-app="pan"
          >
            <div className="desktop-app-action-container">
              <button
                className="desktop-app-action-button"
                data-desktop-app-action="close"
              />
              <button
                className="desktop-app-action-button"
                data-desktop-app-action="minimize"
              />
              <button
                className="desktop-app-action-button"
                data-desktop-app-action="maximize"
              />
            </div>
          </header>
          <menu className="px-3 py-3">
            <li>
              <button
                className={clsx(
                  "flex items-center gap-2 text-left w-full rounded transition px-2 py-1 text-sm text-[var(--apple-text)]",
                  "bg-transparent hover:bg-neutral-500/30"
                )}
                onClick={() => onOpenRoot()}
              >
                <Icon.GrHome className="text-blue-500" />
                <span>{RootTitle}</span>
              </button>
            </li>
          </menu>
        </aside>
        <div className="flex flex-col flex-1">
          <header
            className={clsx(
              "w-full desktop-app-topbar-h-lg",
              "desktop-app-rounded desktop-app-rounded-tr",
              "bg-[var(--apple-window-background)] dark:bg-neutral-800 text-[var(--apple-text)]",
              "shadow-xl",
              "px-5 py-3",
            )}
            data-desktop-app="pan"
          >
            {Title}
          </header>
          <main className={clsx(
            "flex-1",
            "desktop-app-bg-window desktop-app-text-window",
            "desktop-app-rounded desktop-app-rounded-br",
          )}>
            {children}
          </main>
        </div>
      </Desktop.App>
    )
  }

  export type ItemIconProps = {
    item: EntryFinderDirectory | EntryFinderFile;
  }
  export function ItemIcon({ item }: ItemIconProps) {
    if (item.sys.contentType.sys.id === "component-finder-directory") {
      return (
        <div className="relative size-full">
          <Image
            src="https://images.ctfassets.net/8cut8f9cq03l/4ymTPXBD1uP9gLB4AvrqbD/f5cadf65f0563af7af302d476cf74ccc/285658_blue_folder_icon.svg"
            alt="directory"
            fill
          />
        </div>
      )
    }

    const file = (item as EntryFinderFile).fields.file.fields.file;

    if (file.contentType.includes("image/")) {
      return (
        <div className="relative size-full">
          <Image
            className="object-contain"
            src={`https:${file.url}`}
            alt="directory"
            fill
          />
        </div>
      )
    } else if (file.contentType === "application/pdf") {
      return (
        <div className="grid place-items-center size-full p-2">
          <Icon.FaFilePdf className="size-full"/>
        </div>
      );
    }

    console.log(file);

    return (
      <div className="grid place-items-center size-full">
        <Icon.FaCircleQuestion className="size-full"/>
      </div>
    )
  }

}