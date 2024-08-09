"use client"

import { MacWindow } from "@/components/common/MacWindow/MacWindow";
import { Xterm } from "@/components/common/Xterm/Xterm";
import { MacWindowScreen } from "@/components/common/MacWindow/MacWindowScreen/MacWindowScreen";
import React, { useState } from "react";
import { MacDock } from "@/components/part/MacDock/MacDock";
import { EntryDock } from "@/modules/cms/queries";

export type DesktopAppManagerProps = {
  dock: EntryDock;
}

export function DesktopAppManager({ dock }: DesktopAppManagerProps) {
  const [apps, setApps] = useState<Array<{ key: string; render: React.ReactElement }>>([]);

  return (
    <>
      {apps.length > 0 && (
        <MacWindowScreen>
          {apps.map((app) => (
            <React.Fragment key={app.key}>
              {app.render}
            </React.Fragment>
          ))}
        </MacWindowScreen>
      )}
      <MacDock
        dock={dock}
        onRequestOpen={(appId) => {
          switch (appId) {
            case "Finder.app": {
              const render = (
                <MacWindow
                  classNames={{ content: "bg-gray-50 text-black dark:bg-neutral-800 dark:text-white" }}
                  onClose={() => setApps((prev) => prev.filter((app) => app.key !== appId))}
                  onFocus={() => setApps((prev) => [...prev].sort((a, b) => a.key === appId ? 1 : -1))}
                >
                  <div>TODO Finder.app</div>
                </MacWindow>
              )
              setApps((prev) => [...prev.filter((app) => app.key !== appId), { key: appId, render }]);
              break;
            }
            case "Terminal.app": {
              const render = (
                <MacWindow
                  classNames={{ content: "bg-black/70 backdrop-blur" }}
                  onClose={() => setApps((prev) => prev.filter((app) => app.key !== appId))}
                  onFocus={() => setApps((prev) => [...prev].sort((a, b) => a.key === appId ? 1 : -1))}
                >
                  <Xterm/>
                </MacWindow>
              )
              setApps((prev) => [...prev.filter((app) => app.key !== appId), { key: appId, render }]);
              break;
            }
          }
        }}
      />
    </>
  )
}
