---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: Append copyright info during copy
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-copyright2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-copyright2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { copyright } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyright({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { copyright } = require("vuepress-plugin-copyright2");

module.exports = {
  plugins: [
    copyright({
      // your options
    }),
  ],
};
```

:::

::::
