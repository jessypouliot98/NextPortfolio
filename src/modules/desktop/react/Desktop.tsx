"use client";

import { Desktop as DesktopCore } from "../core/Desktop";
import { DesktopApp as DesktopAppCore } from "../core/DesktopApp";
import React, { ComponentPropsWithoutRef, useContext, useEffect, useRef, useState } from "react";
import { assertDefined } from "@/modules/assert";
import { createPortal } from "react-dom";
import { useDynamicRef } from "@/modules/react-utils/hooks";
import clsx from "clsx";

export namespace Desktop {

  const DesktopContext = React.createContext<DesktopCore | null>(null);

  export function Provider({ children }: React.PropsWithChildren) {
    const [desktop] = useState(() => new DesktopCore());

    return (
      <DesktopContext.Provider value={desktop}>
        {children}
      </DesktopContext.Provider>
    )
  }

  export type RootProps = ComponentPropsWithoutRef<"div">
  export function Root({ children, ...props }: RootProps) {
    const desktop = useContext(DesktopContext);
    assertDefined(desktop);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const div = divRef.current;
      if (!div) return;
      return desktop.init(div);
    }, [desktop]);

    return (
      <div ref={divRef} {...props}>
        {desktop.isInitialized && createPortal(children, desktop.containerEl)}
      </div>
    )
  }

  export type AppProps = ComponentPropsWithoutRef<"div"> & {
    onAppClose?: () => void;
    onAppFocus?: () => void;
    onAppMinimize?: () => void;
    onAppMaximize?: () => void;
    options?: Partial<Omit<DesktopAppCore.Options, "desktop">>;
  };
  export function App({ children, className, onAppClose, onAppFocus, onAppMinimize, onAppMaximize, options, ...props }: React.PropsWithChildren<AppProps>) {
    const desktop = useContext(DesktopContext);
    assertDefined(desktop);
    const [app] = useState(() => new DesktopAppCore({
      ...options,
      desktop,
    }));
    const divRef = useRef<HTMLDivElement>(null);

    const eventPropsRef = useDynamicRef({
      onAppClose,
      onAppFocus,
      onAppMinimize,
      onAppMaximize,
    })

    useEffect(() => {
      const div = divRef.current;
      if (!div) return;
      const deInit = app.init(div);
      const handleFocus = () => eventPropsRef.current.onAppFocus?.();
      const handleClose = () => eventPropsRef.current.onAppClose?.();
      const handleMinimize = () => eventPropsRef.current.onAppMinimize?.();
      const handleMaximize = () => eventPropsRef.current.onAppMaximize?.();
      app.on("focus", handleFocus);
      app.on("close", handleClose);
      app.on("minimize", handleMinimize);
      app.on("maximize", handleMaximize);
      return () => {
        deInit();
        app.off("focus", handleFocus);
        app.off("close", handleClose);
        app.off("minimize", handleMinimize);
        app.off("maximize", handleMaximize);
      }
    }, [app, eventPropsRef]);

    return (
      <div
        ref={divRef}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }

  export type AppLayoutProps = AppProps & {
    classNames?: Partial<{
      container: string;
      title: string;
      content: string;
    }>
    Title: React.ReactNode;
  }
  export function AppLayout({ children, Title, className, classNames, ...props }: AppLayoutProps) {
    return (
      <App
        className={clsx(
          "flex flex-col",
          className,
          classNames?.container
        )}
        {...props}
      >
        <header
          className={clsx(
            "flex items-center bg-neutral-800",
            "desktop-app-topbar-h",
            "px-2 py-1",
            "desktop-app-rounded desktop-app-rounded-t"
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
        <main
          className={clsx(
            "flex-1",
            "desktop-app-rounded desktop-app-rounded-b",
            classNames?.content
          )}
        >
          {children}
        </main>
      </App>
    )
  }

}