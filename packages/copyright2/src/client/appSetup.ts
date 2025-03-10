import {
  defineClientAppSetup,
  usePageFrontmatter,
  usePageData,
} from "@vuepress/client";
import { computed, onBeforeUnmount, onMounted, watchEffect } from "vue";

import type { WatchStopHandle } from "vue";
import type { CopyrightPluginFrontmatter } from "../shared";

declare const COPYRIGHT_TRIGGER_WORDS: number;
declare const COPYRIGHT_DISABLE_COPY: boolean;
declare const COPYRIGHT_DISABLE_SELECTION: boolean;
declare const COPYRIGHT_GLOBAL: boolean;

let app: HTMLDivElement;

export default defineClientAppSetup(() => {
  let stopHandler: WatchStopHandle;
  const page = usePageData<{ copyright: string }>();
  const frontmatter = usePageFrontmatter<CopyrightPluginFrontmatter>();

  const enabled = computed(
    () =>
      Boolean(frontmatter.value.copy) ||
      (frontmatter.value.copy !== false && COPYRIGHT_GLOBAL)
  );

  const disableCopy = computed(() => {
    const frontmatterOptions = frontmatter.value.copy;

    if (!enabled.value) return false;

    if (
      typeof frontmatterOptions === "object" &&
      "disableCopy" in frontmatterOptions
    )
      return frontmatterOptions.disableCopy;

    return COPYRIGHT_DISABLE_COPY;
  });

  const disableSelection = computed(() => {
    const frontmatterOptions = frontmatter.value.copy;

    if (!enabled.value) return false;

    if (
      typeof frontmatterOptions === "object" &&
      "disableSelection" in frontmatterOptions
    )
      return frontmatterOptions.disableSelection;

    return COPYRIGHT_DISABLE_SELECTION;
  });

  const onCopy = (event: ClipboardEvent): void => {
    const selection = getSelection();

    if (selection) {
      const textRange = selection.getRangeAt(0);

      if (enabled.value) {
        if (disableCopy.value) {
          event.preventDefault();

          return;
        }

        if (textRange.toString().length >= COPYRIGHT_TRIGGER_WORDS) {
          event.preventDefault();

          const node = document.createElement("div");

          node.appendChild(selection.getRangeAt(0).cloneContents());

          if (event.clipboardData) {
            event.clipboardData.setData(
              "text/html",
              `${
                node.innerHTML
              }<hr><div class="copyright">${page.value.copyright.replace(
                /\\n/g,
                "<br>"
              )}</div>`
            );
            event.clipboardData.setData(
              "text/plain",
              `${
                selection.getRangeAt(0).cloneContents().textContent || ""
              }\n------\n${page.value.copyright}`
            );
          }
        }
      }
    }
  };

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    app = document.querySelector<HTMLDivElement>("#app")!;
    app.addEventListener("copy", onCopy);

    stopHandler = watchEffect(() => {
      app.style.userSelect = disableSelection.value ? "none" : "auto";
    });
  });

  onBeforeUnmount(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    document.querySelector("#app")!.removeEventListener("copy", onCopy);

    stopHandler();
  });
});
