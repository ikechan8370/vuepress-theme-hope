import { defineUserConfig } from "@vuepress/cli";
import { version } from "../../../../lerna.json";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/copy-code/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Quick Code Copy",
      description: "Quick Code Copy Plugin for vuepress",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "代码一键复制",
      description: "VuePress 的代码一键复制插件",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname: "https://vuepress-theme-hope.github.io",

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/copy-code2/src",

    logo: "/logo.svg",

    enableBlog: false,

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    locales: {
      "/": {
        navbar: [
          { text: "Home", icon: "home", link: "/README.md" },
          {
            text: "Guide",
            icon: "creative",
            link: "/guide.md",
          },
          {
            text: "Config",
            icon: "config",
            link: "/config.md",
          },
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 Docs",
                link: "https://vuepress-theme-hope.github.io/copy-code/",
              },
            ],
          },
        ],
      },

      "/zh/": {
        navbar: [
          { text: "主页", icon: "home", link: "/zh/README.md" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide.md",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config.md",
          },
          {
            text: version,
            icon: "note",
            children: [
              {
                text: "V1 文档",
                link: "https://vuepress-theme-hope.github.io/copy-code/zh/",
              },
            ],
          },
        ],
      },
    },

    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      mdEnhance: {
        codegroup: true,
      },

      pwa: {
        favicon: "/v2/copy-code/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/copy-code/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/copy-code/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-copy-code2",
          short_name: "copy-code plugin",
          icons: [
            {
              src: "/v2/copy-code/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/copy-code/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/copy-code/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/copy-code/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/copy-code/guide.html",
              icons: [
                {
                  src: "/v2/copy-code/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/copy-code/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/copy-code/config.html",
              icons: [
                {
                  src: "/v2/copy-code/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/copy-code/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },
    },
  },
});