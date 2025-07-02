type CategoryKey = "vue" | "nuxt";

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug as CategoryKey | undefined;

  const categories: Record<
    CategoryKey,
    { title: string; description: string }
  > = {
    vue: {
      title: "Vue.js Blog",
      description: "Bài viết về Vue.js và các kỹ thuật liên quan",
    },
    nuxt: {
      title: "Nuxt Blog",
      description: "Bài viết chuyên sâu về Nuxt 3",
    },
  };

  return (
    (slug && categories[slug]) || {
      title: "Không tìm thấy",
      description: "Danh mục không tồn tại",
    }
  );
});
