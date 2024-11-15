"use client";

import { ThemeProvider } from "@/modules/theme/ThemeProvider";
import { useSyncStore } from "@/modules/sync-store/hooks";
import { Icon } from "@/components/common/Icon/Icon";
import clsx from "clsx";

export function ThemeSwitch() {
  const store = ThemeProvider.ThemeStorageStore.instance;
  const isDark = useSyncStore(store) === "on";

  return (
    <button
      className="group relative w-11 h-11 transition rounded-md bg-transparent hover:bg-blue-100 dark:hover:bg-blue-950"
      suppressHydrationWarning
      data-dark={isDark}
      aria-label={`Toggle ${isDark ? "light" : "dark"} mode`}
      onClick={() => store.toggleValue()}
    >
      <Icon.FaMoon
        className={clsx(
          "text-gray-900",
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "block dark:hidden"
        )}
      />
      <Icon.FaSun
        className={clsx(
          "transition text-white",
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "hidden dark:block"
        )}
      />
    </button>
  )
}