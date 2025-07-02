<template>
  <UContainer>
    <!-- lg -->
    <div class="lg:block hidden">
      <div class="grid grid-cols-6 gap-16 mt-6">
        <div class="col-span-2">
          <div class="space-y-5">
            <div
              v-for="(name, index) in Categories"
              :key="index"
              class="mb-4 cursor-pointer"
            >
              <h3
                class="text-black text-lg font-medium uppercase py-4 border-t-4 border-orange-600"
              >
                {{ name.name }}
              </h3>

              <ul
                v-if="name.name === t('category.new_posts')"
                class="list-disc pl-5 space-y-1 text-orange-500"
              >
                <li
                  v-for="(child, index) in name.child"
                  :key="index"
                  class="text-orange-500 hover:text-gray-700 leading-snug"
                >
                  <NuxtLinkLocale
                    :to="`/blog/${child.slug}`"
                    class="text-inherit no-underline hover:text-gray-700 line-clamp-3"
                  >
                    {{ child.name }}
                  </NuxtLinkLocale>
                </li>
              </ul>

              <ul v-else class="space-y-1">
                <li v-for="(item, index) in flattenedCategories" :key="index">
                  <TreeNavItem
                    :item="item"
                    :expandedSlug="expandedSlug"
                    @toggle="$emit('toggle', $event)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="p-4 border-t-4 border-orange-600">
            <h2
              class="text-2xl font-semibold text-orange-500 border-b border-gray-200 py-4"
            >
              {{ $t("category.title") }}: {{ selectedCategory?.name }}
            </h2>
            <BlogContent :category="selectedCategory" :allItems="allItems" />
          </div>
        </div>
      </div>
      <div class="flex justify-center py-6">
        <UPagination
          v-model:page="page"
          :total="100"
          :ui="{
            item: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
            first: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
            prev: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
            next: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
            last: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
          }"
        />
      </div>
    </div>
    <!-- Moblie -->
    <div class="lg:hidden block">
      <div class="gap-16 mt-6">
        <!-- noi dung -->
        <div>
          <div class="p-4 border-t-4 border-orange-600">
            <h2
              class="text-2xl font-semibold text-orange-500 border-b border-gray-200 py-4"
            >
              {{ $t("category.title") }}: {{ selectedCategory }}
            </h2>
            <BlogContent :category="selectedCategory" :allItems="allItems" />
          </div>
        </div>
        <div class="flex justify-center py-6">
          <UPagination
            v-model:page="page"
            :total="100"
            :ui="{
              item: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
              first: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
              prev: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
              next: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
              last: 'hover:bg-[#f89e1b] hover:text-white cursor-pointer',
            }"
          />
        </div>
        <!-- danh muc -->
        <div>
          <div
            v-for="(name, index) in Categories"
            :key="index"
            class="mb-4 cursor-pointer"
          >
            <h3
              class="text-black text-lg font-medium uppercase py-4 border-t-4 border-orange-600"
            >
              {{ name.name }}
            </h3>

            <ul
              v-if="name.name === 'bài viết mới'"
              class="list-disc pl-5 space-y-1 text-orange-500"
            >
              <li
                v-for="(child, index) in name.child"
                :key="index"
                class="text-orange-500 hover:text-gray-700 leading-snug"
              >
                <NuxtLinkLocale
                  :to="`/blog/${child.slug}`"
                  class="text-inherit no-underline hover:text-gray-700 line-clamp-2"
                >
                  {{ child.name }}
                </NuxtLinkLocale>
              </li>
            </ul>

            <ul v-else class="space-y-1">
              <li v-for="(item, index) in flattenedCategories" :key="index">
                <TreeNavItem
                  :item="item"
                  :expandedSlug="null"
                  @toggle="$emit('toggle', $event)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const { t } = useI18n();
definePageMeta({
  layout: "blog",
});

import { useMockData } from "~/composables/useMockData";

const { categoryMenu, Categories } = useMockData();

const items = computed(() =>
  allItems.filter((item) => item.category === selectedCategory.value)
);
import { useRoute } from "vue-router";
const route = useRoute();
const selectedCategory = computed(() => {
  const slug = route.path.split("/").filter(Boolean).pop();

  function findCategory(menu) {
    for (const group of menu) {
      if (group.child) {
        for (const item of group.child) {
          if (item.slug === slug) return item;
          if (item.child) {
            for (const sub of item.child) {
              if (sub.slug === slug) return sub;
              if (sub.child) {
                const subSub = sub.child.find((s) => s.slug === slug);
                if (subSub) return subSub;
              }
            }
          }
        }
      }
    }
    return null;
  }

  return findCategory(Categories);
});

onMounted(() => {
  for (let i = 0; i < Categories.length; i++) {
    const group = Categories[i];
    for (let j = 0; j < group.child.length; j++) {
      const child = group.child[j];

      const isMatch =
        child.name === selectedCategory.value ||
        (child.child &&
          child.child.some((sub) => sub.name === selectedCategory.value));

      if (isMatch) {
        expandedIndex.value = j;
        expandedIndexMobile.value = j;
        return;
      }
    }
  }
});

const allItems = [
  {
    name: "So sánh bồn cầu TOTO MS857 và MS885: Giá và chất lượng khác nhau thế nào?",
    category: "khuyen-mai",
    desc: "MS857 và MS885 đều là dòng bồn cầu cao cấp của TOTO. Vậy sự khác biệt nằm ở đâu?MS857 và MS885 đều là dòng bồn cầu cao cấp của TOTO. Vậy sự khác biệt nằm ở đâu?MS857 và MS885 đều là dòng bồn cầu cao cấp của TOTO. Vậy sự khác biệt nằm ở đâu?MS857 và MS885 đều là dòng bồn cầu cao cấp của TOTO. Vậy sự khác biệt nằm ở đâu? ",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "km-thiet-bi-ve-sinh",
  },
  {
    name: "Top 5 vòi sen INAX bán chạy nhất tháng 6/2025",
    category: "thiet-bi-ve-sinh",
    desc: "Danh sách những mẫu vòi sen được ưa chuộng nhất hiện nay từ INAX.",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "san-pham-inax",
  },
  {
    name: "Bồn rửa mặt Caesar LF5255: Có đáng tiền không?",
    category: "thiet-bi-ve-sinh",
    desc: "Đánh giá chi tiết mẫu lavabo Caesar LF5255, dòng sản phẩm bán chạy của hãng.",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "san-pham-caesar",
  },
  {
    name: "Ưu đãi 20% tất cả sản phẩm INAX trong tháng 6!",
    category: "khuyen-mai",
    desc: "Chương trình khuyến mãi hấp dẫn nhất dành cho khách hàng mua thiết bị INAX.",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "km-inax",
  },
  {
    name: "Cách chọn gạch lát nền chống trơn phù hợp cho nhà tắm",
    category: "kien-thuc-xay-dung",
    desc: "Hướng dẫn chi tiết giúp bạn chọn đúng loại gạch an toàn và đẹp mắt cho phòng tắm.",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "kien-thuc-xay-dung",
  },
  {
    name: "So sánh vòi rửa chén nóng lạnh TOTO và INAX: Nên chọn hãng nào?",
    category: "thiet-bi-nha-bep",
    desc: "Phân tích các yếu tố chất lượng, giá và bảo hành giữa hai thương hiệu lớn.",
    NuxtImg:
      "https://www.tdm.vn/thong-tin/wp-content/uploads/2024/07/Thiet-ke-chua-co-ten-9-1.jpg",
    slug: "thiet-bi-nha-bep",
  },
];
const hoverIndex = ref(null);
const expandedIndexMobile = ref(null);
const expandedIndex = ref(null);

function toggleExpand(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}
import { computed } from "vue";

const flattenedCategories = computed(() =>
  Categories.flatMap((item) => {
    const name = item.name.toLowerCase();
    if (name === "bài viết mới") {
      return [];
    }
    if (name === "chuyên mục") {
      return item.child || [];
    }
    return [item];
  })
);

// useSeoMeta({
//   title: () => selectedCategory.value?.title || "Danh mục",
// });

const { data } = await useAsyncData("category", () =>
  $fetch(`/api/category/${route.params.slug}`)
);

useSeoMeta({
  title: () => data.value?.title || "Blog",
  description: () => data.value?.description || "Danh mục blog",
  ogTitle: () => data.value?.title,
  ogDescription: () => data.value?.description,
});
</script>
<style scoped>
.relative > .udropdownmenu {
  z-index: 1000;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
html,
body {
  background-color: white;
  margin: 0;
  padding: 0;
}
</style>
