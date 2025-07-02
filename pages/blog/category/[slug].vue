<template>
  <UContainer>
    <!-- lg -->
    <div>
      <div class="grid grid-cols-6 gap-16 mt-6">
        <div class="lg:col-span-2 col-span-6 lg:order-1 order-2">
          <div>
            <h3 class="text-black text-lg font-medium uppercase py-4">
              {{ $t("category.new_posts") }}
            </h3>
            <ul>
              <li v-for="(item, index) in newPosts" class="">
                <NuxtLinkLocale
                  :to="`/blog/${item.slug}`"
                  class="block text-orange-500 hover:text-orange-600 py-2"
                >
                  <p class="line-clamp-2">
                    {{ item.name }}
                  </p>
                </NuxtLinkLocale>
              </li>
            </ul>
          </div>

          <BlogMenuCategories />
        </div>
        <div class="lg:col-span-4 col-span-6 lg:order-2 order-1">
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
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
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

const newPosts = [
  {
    name: "11Chậu Rửa Chén Hafele: Chất Liệu Đa Dạng (Đá, Inox), Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 11 Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 11Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 11",
    slug: "chau-rua-chen-hafele-chat-lieu-da-dang-thiet-ke-thong-minh-kinh-nghiem-chon-mua",
  },
  {
    name: "22Chậu Rửa Chén Hafele: Chất Liệu Đa Dạng (Đá, Inox), Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 2 Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 112",
    slug: "chau-rua-chen-hafele-chat-lieu-da-dang-thiet-ke-thong-minh-kinh-nghiem-chon-mua-2",
  },
  {
    name: "33Chậu Rửa Chén Hafele: Chất Liệu Đa Dạng (Đá, Inox), Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 3 Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 113",
    slug: "chau-rua-chen-hafele-chat-lieu-da-dang-thiet-ke-thong-minh-kinh-nghiem-chon-mua-3",
  },
  {
    name: "44Chậu Rửa Chén Hafele: Chất Liệu Đa Dạng (Đá, Inox), Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua4 Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 11 ",
    slug: "chau-rua-chen-hafele-chat-lieu-da-dang-thiet-ke-thong-minh-kinh-nghiem-chon-mua-4",
  },
  {
    name: "5Chậu Rửa Chén Hafele: Chất Liệu Đa Dạng (Đá, Inox), Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua55 Thiết Kế Thông Minh và Kinh Nghiệm Chọn Mua 11",
    slug: "chau-rua-chen-hafele-chat-lieu-da-dang-thiet-ke-thong-minh-kinh-nghiem-chon-mua-5",
  },
];

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
import MenuCategories from "~/components/blog/MenuCategories.vue";

function flattenCategories(categories) {
  const result = [];
  for (const item of categories) {
    if (item.slug) {
      result.push(item);
    }
    if (item.child && Array.isArray(item.child)) {
      result.push(...flattenCategories(item.child));
    }
  }
  return result;
}

const flattenedCategories = computed(() => flattenCategories(Categories));

/// code lay du lieu cua danh muc dang truy cap
interface T {
  title: string;
  slogan: string;
  meta: {
    title: string;
    desc: string;
    image: string;
  };
}
const { locale } = useI18n();
const { data, status } = await useHttp<T>(
  `load-data-blog-category/${route.params.slug}`,
  {
    method: "GET",
    params: {
      locale: locale,
    },
  }
);
if (data.value?.meta) {
  useSeoMeta({
    title: data.value.meta.title,
    description: data.value.meta.desc,
    ogTitle: data.value.meta.title,
    ogDescription: data.value.meta.desc,
    ogImage: useNuxtApp().$storage(data.value.meta.image),
    twitterTitle: data.value.meta.title,
    twitterDescription: data.value.meta.desc,
    twitterImage: useNuxtApp().$storage(data.value.meta.image),
  });
}
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
