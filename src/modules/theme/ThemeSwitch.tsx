"use client";

import { ThemeProvider } from "@/modules/theme/ThemeProvider";
import { useSyncStore } from "@/modules/sync-store/hooks";

export function ThemeSwitch() {
  const store = ThemeProvider.ThemeStorageStore.instance;
  const isDark = useSyncStore(store) === "on";

  return (
    <button suppressHydrationWarning data-dark={isDark} onClick={() => store.toggleValue()}>
      {isDark ? "Dark" : "Light"}
    </button>
  )
}