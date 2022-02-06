import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";
import ArticleList from "./ArticleList";
import ArticleType from "./ArticleType";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import TimelineItems from "./TimelineItems";
import DropTransition from "../transitions/DropTransition.vue";
import {
  useArticles,
  useCategoryMap,
  useEncryptedArticles,
  useSlides,
  useTagMap,
  useStars,
} from "../../composables";

import type { VNode } from "vue";
import type {
  BlogCategoryFrontmatterOptions,
  BlogPluginFrontmatter,
} from "vuepress-plugin-blog2";

export default defineComponent({
  name: "BlogPage",

  components: {
    ArticleType,
    CategoryList,
    TagList,
  },

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginFrontmatter>();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const encryptedArticles = useEncryptedArticles();
    const slides = useSlides();
    const stars = useStars();
    const tagMap = useTagMap();

    const componentName = computed(() => {
      const { key } = frontmatter.value.blog || {};

      return key === "category"
        ? "CategoryList"
        : key === "tag"
        ? "TagList"
        : key === "timeline"
        ? ""
        : "ArticleType";
    });

    const items = computed(() => {
      const { name = "", key = "" } =
        (frontmatter.value.blog as BlogCategoryFrontmatterOptions) || {};

      return key === "encrypted"
        ? encryptedArticles.value.items
        : key === "star"
        ? stars.value.items
        : key === "slide"
        ? slides.value.items
        : key === "timeline"
        ? []
        : key === "category"
        ? name
          ? categoryMap.value.map[name].items
          : []
        : key === "tag"
        ? name
          ? tagMap.value.map[name].items
          : []
        : key === "timeline"
        ? []
        : articles.value.items;
    });

    return (): VNode =>
      h("main", { class: "blog-page" }, [
        h(DropTransition, () =>
          componentName.value ? h(resolveComponent(componentName.value)) : null
        ),
        h(DropTransition, { delay: 0.24 }, () =>
          frontmatter.value.blog?.key === "timeline"
            ? h(TimelineItems)
            : h(ArticleList, { items: items.value })
        ),
      ]);
  },
});