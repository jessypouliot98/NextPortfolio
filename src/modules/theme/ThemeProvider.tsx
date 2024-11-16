"use client";

import React, { useEffect } from "react";
import { BooleanStorageStore } from "@/modules/sync-store/implementations/BooleanStorageStore";
import { SyncStorageStore } from "@/modules/sync-store/implementations/SyncStorageStore";

export function ThemeProvider({ children }: React.PropsWithChildren) {
  useEffect(() => {
    const store = ThemeProvider.ThemeStorageStore.instance;
    const applyTheme = () => {
      const darkMode = store.getSnapshot() === "on";
      if (darkMode) {
        document.body.parentElement!.classList.add("dark");
      } else {
        document.body.parentElement!.classList.remove("dark");
      }
    };
    applyTheme();
    return store.subscribe(applyTheme);
  }, []);

  return (
    <>
      {children}
    </>
  )
}

export namespace ThemeProvider {

  export class ThemeStorageStore extends BooleanStorageStore {

    private static __instance__: ThemeStorageStore | undefined;

    public static get instance() {
      if (!this.__instance__) {
        this.__instance__ = new ThemeStorageStore();
      }
      return this.__instance__;
    }

    constructor() {
      const isDarkModePreferred: boolean =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      super({
        storage: SyncStorageStore.withServerStorage(() => window.localStorage),
        key: "preference:dark-mode",
        initialValue: isDarkModePreferred ? "on" : "off",
      });
      this.toggleValue.bind(this);
    }

    protected onMount() {
      super.onMount();

      if (typeof window !== "undefined") {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (ev) => {
          const isDarkModePreferred = ev.matches;
          this.setValue(isDarkModePreferred ? "on" : "off");
        }, { signal: this.cleanupController.signal });
      }
    }

    protected onUnmount() {
      super.onUnmount();
    }

  }

}