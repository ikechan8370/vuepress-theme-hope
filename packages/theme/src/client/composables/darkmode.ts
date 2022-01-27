import { usePreferredDark, useStorage } from "@vueuse/core";
import { computed, inject, onMounted, onUnmounted, provide, watch } from "vue";
import { useThemeData } from "./themeData";

import type { InjectionKey, Ref, WritableComputedRef } from "vue";

export type DarkmodeStatus = "light" | "dark" | "auto";

export type DarkModeRef = WritableComputedRef<boolean>;

export type DarkModeStatusRef = Ref<DarkmodeStatus>;

export const darkModeSymbol: InjectionKey<{
  isDarkMode: DarkModeRef;
  status: DarkModeStatusRef;
}> = Symbol.for("darkMode");

/**
 * Inject dark mode global computed
 */
export const useDarkMode = (): {
  isDarkMode: DarkModeRef;
  status: DarkModeStatusRef;
} => {
  const darkmode = inject(darkModeSymbol);

  if (!darkmode) {
    throw new Error("useDarkMode() is called without provider.");
  }

  return darkmode;
};

export const updateDarkModeAttr = (isDarkMode: DarkModeRef): void => {
  const update = (isDark = isDarkMode.value): void => {
    const body = window?.document.querySelector("body");

    body?.setAttribute("data-theme", isDark ? "dark" : "light");
  };

  onMounted(() => {
    watch(isDarkMode, update, { immediate: true });
  });

  onUnmounted(() => update());
};

export const setupDarkMode = (): void => {
  const themeData = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const darkmodeStorage = useStorage<DarkmodeStatus>(
    "vuepress-theme-hope-scheme",
    "dark"
  );

  const isDarkMode = computed<boolean>(() => {
    const { darkmode } = themeData.value;

    // disable dark mode
    return darkmode === "disable"
      ? false
      : // force dark
      darkmode === "force-dark"
      ? true
      : // auto
      darkmode === "auto"
      ? isDarkPreferred.value
      : // auto switch
      darkmode === "switch"
      ? darkmodeStorage.value === "dark"
      : // auto-swich
        darkmodeStorage.value === "dark" ||
        (darkmodeStorage.value === "auto" && isDarkPreferred.value);
  });

  provide(darkModeSymbol, { isDarkMode, status: darkmodeStorage });

  updateDarkModeAttr(isDarkMode);
};