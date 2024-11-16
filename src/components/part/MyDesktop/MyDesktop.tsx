"use client";

import "@/modules/desktop/core/css/core.css";
import "@/modules/desktop/core/css/macos.css";
import { Desktop } from "@/modules/desktop/react/Desktop";
import { MacDock } from "@/components/part/MacDock/MacDock";
import { EntryDock, EntryFinderDirectory } from "@/modules/cms/queries";
import React, { useState } from "react";
import { Xterm } from "@/components/common/Xterm/Xterm";
import { DesktopFinderApp } from "@/components/part/DesktopFinderApp/DesktopFinderApp";

export type MyDesktopProps = {
  dock: EntryDock;
  finderRoot: EntryFinderDirectory;
}

export function MyDesktop({ dock, finderRoot }: MyDesktopProps) {
  const [apps, setApps] = useState<string[]>([]);

  const handleRequestOpen = (appId: string) => {
    setApps((prev) => {
      const next = [...prev];
      if (!next.includes(appId)) {
        next.push(appId);
      }
      return next;
    });
  }

  return (
    <>
      <Desktop.Provider>
        <Desktop.Root className="transition z-10 fixed inset-0 bg-black/10 backdrop-blur [&:not([data-desktop-root-apps-opened])]:hidden">
          {apps.map((appId) => {
            switch (appId) {
              case "Finder.app": {
                return (
                  <DesktopFinderApp
                    key={appId}
                    finderRoot={finderRoot}
                    onAppFocus={() => {
                      setApps((prev) => {
                        return [...prev].sort((a) => a === appId ? 1 : -1);
                      })
                    }}
                    onAppClose={() => {
                      setApps((prev) => {
                        return prev.filter((item) => item !== appId);
                      })
                    }}
                    onAppMinimize={() => {
                      setApps((prev) => {
                        return prev.filter((item) => item !== appId);
                      })
                    }}
                  />
                );
              }
              case "Terminal.app": {
                return (
                  <Desktop.AppLayout
                    key={appId}
                    classNames={{
                      content: "bg-black/70 backdrop-blur text-white",
                    }}
                    Title={appId}
                    onAppFocus={() => {
                      setApps((prev) => {
                        return [...prev].sort((a) => a === appId ? 1 : -1);
                      })
                    }}
                    onAppClose={() => {
                      setApps((prev) => {
                        return prev.filter((item) => item !== appId);
                      })
                    }}
                    onAppMinimize={() => {
                      setApps((prev) => {
                        return prev.filter((item) => item !== appId);
                      })
                    }}
                  >
                    <Xterm/>
                  </Desktop.AppLayout>
                );
              }
              default: {
                return null;
              }
            }
          })}
        </Desktop.Root>
      </Desktop.Provider>
      <MacDock
        dock={dock}
        onRequestOpen={handleRequestOpen}
      />
    </>
  )
}