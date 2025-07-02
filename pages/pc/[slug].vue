<template>
  <UContainer class="">
    <Breadcrumb :items="[{ name: category.name }]" />

    <!-- list -->
    <div>
      <div>
        <h1 class="text-orange-500 uppercase font-bold text-4xl py-4">
          {{ category.name }}
        </h1>
        <div>
          <ul class="grid lg:grid-cols-7 grid-cols-2 gap-0.5 mt-6">
            <li
              v-for="(child, y) in category.childCategories"
              :key="y"
              class="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-orange-500"
            >
              <ProductCategoryItem
                :name="child.name"
                :image="child.image"
                :slug="child.slug"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- san pham lg -->
    <div class="lg:block hidden">
      <div class="flex justify-between items-center text-black my-8">
        <div class="text-2xl">{{ $t("product.title") }}</div>
        <div
          v-for="(item, x) in akas"
          :key="x"
          class="flex justify-center items-center gap-4"
        >
          <div class="text-gray-500">{{ item.name }}</div>
          <button
            v-for="(child, y) in item.childs"
            :key="y"
            :class="[
              'cursor-pointer px-4 rounded py-2',
              route.query.sort === child.slug
                ? 'bg-gray-300 text-black'
                : 'bg-gray-100 hover:bg-orange-500 hover:text-white',
            ]"
            @click="handleSortChange(child)"
          >
            <p>
              {{ child.name }}
            </p>
          </button>
        </div>
      </div>
    </div>
    <!-- moblie -->
    <div class="lg:hidden block">
      <div class="flex flex-col text-black my-8">
        <div class="text-2xl">{{ $t("product.title") }}</div>
        <div class="relative inline-block text-left mt-4">
          <div class="flex items-center gap-2 text-xl">
            <span class="font-medium">{{ akas[0].name }}</span>
            <button
              @click="showDropdown = !showDropdown"
              class="border border-gray-300 px-4 py-1 rounded bg-white shadow-sm hover:bg-gray-100 flex items-center"
            >
              {{ selectedSort.name }}
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div
            v-show="showDropdown"
            class="absolute mt-2 w-full bg-white border border-gray-200 rounded shadow z-50"
          >
            <ul class="py-1 text-m text-gray-700 z-1">
              <li
                v-for="(option, index) in akas[0].childs"
                :key="index"
                class="px-4 py-2"
                :class="{
                  'bg-blue-500 text-white': selectedSort.name === option.name,
                  'hover:bg-blue-100': selectedSort.name !== option.name,
                }"
                @click="handleSortChange(option)"
              >
                {{ option.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- danh sach san pham -->
    <div class="grid lg:grid-cols-4 grid-cols-1 mt-6">
      <div
        v-for="(item, x) in category.products"
        :key="x"
        class="flex items-center gap-4"
      >
        <ProductItem
          :name="item.name"
          :image="item.image"
          :slug="item.slug"
          :price="item.price"
          :price_old="item.price_old"
          :description="item.description"
          :discountPercent="item.discountPercent"
        />
      </div>
    </div>

    <!-- trang -->

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

    <div class="flex flex-col justify-center items-center mt-8 gap-2">
      <div
        v-for="(item, index) in category.descFotter"
        :key="index"
        class="flex flex-col gap-4"
      >
        <h1 class="text-orange-500 uppercase font-bold text-xl py-2">
          {{ item.name }}
        </h1>
        <p class="text-gray-500 text-lg">{{ item.desc }}</p>
        <p class="text-gray-500 text-lg">{{ item.desc2 }}</p>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const page = ref(1);
const category = {
  name: "TO TO",
  childCategories: [
    {
      name: "Bồn cầu",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "bon-cau",
    },
    {
      name: "Chậu rửa",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "chau-rua",
    },
    {
      name: "Vòi nước",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "voi-nuoc",
    },
    {
      name: "Bồn cầu",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "bon-cau",
    },
    {
      name: "Chậu rửa",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "chau-rua",
    },
    {
      name: "Vòi nước",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "voi-nuoc",
    },
    {
      name: "Bồn cầu",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "bon-cau",
    },
    {
      name: "Chậu rửa",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "chau-rua",
    },
    {
      name: "Vòi nước",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/danhmuc/bon-cau-toto-408x408.webp",
      slug: "voi-nuoc",
    },
  ],
  products: [
    {
      name: "Bồn cầu TOTO",
      description:
        "Bồn cầu TOTO chất lượng cao, thiết kế hiện đại, tiết kiệm nước.",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-408x408.webp",
      slug: "bon-cau-toto",
      price: 1000000,
      price_old: 2000000,
      discountPercent: undefined,
    },
    {
      name: "Chậu rửa TOTO",
      description:
        "Chậu rửa TOTO sang trọng, phù hợp mọi không gian phòng tắm.",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-408x408.webp",
      slug: "chau-rua-toto",
      price: 1000000,
      price_old: 2000000,
      discountPercent: undefined,
    },
    {
      name: "Vòi nước TOTO",
      description: "Vòi nước TOTO bền bỉ, dễ dàng lắp đặt và sử dụng.",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-408x408.webp",
      slug: "voi-nuoc-toto",
      price: 1000000,
      price_old: 2000000,
      discountPercent: undefined,
    },
    {
      name: "Chậu rửa TOTO",
      description:
        "Chậu rửa TOTO sang trọng, phù hợp mọi không gian phòng tắm.",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-408x408.webp",
      slug: "chau-rua-toto",
      price: 1000000,
      price_old: 2000000,
      discountPercent: undefined,
    },
    {
      name: "Vòi nước TOTO",
      description: "Vòi nước TOTO bền bỉ, dễ dàng lắp đặt và sử dụng.",
      image:
        "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-408x408.webp",
      slug: "voi-nuoc-toto",
      price: 1000000,
      price_old: 12000000,
      discountPercent: undefined,
    },
  ],
  descFotter: [
    {
      name: "Thiết bị vệ sinh TOTO của nước nào?",
      desc: "Tất cả sản phẩm đều được nhập khẩu chính hãng từ các thương hiệu nổi tiếng, đảm bảo chất lượng và độ bền cao. Chúng tôi cam kết mang đến cho bạn những sản phẩm tốt nhất với giá cả hợp lý.",
      desc2:
        "Các sản phẩm của thiết bị vs TOTO bao gồm từ bồn cầu, vòi nước, bồn rửa cho đến các thiết bị phòng tắm, bình nước nóng và các thiết bị trong nhà bếp. Và giờ đây, thiết bị vệ sinh cao cấp TOTO đang vững bước tiến vào thế kỷ 21 với tầm nhìn chung rộng lớn. TOTO đang có những kế hoạch mở rộng tập trung vào việc hoàn thiện môi trường tự nhiên.",
    },
    {
      name: "Thiết bị vệ sinh TOTO của nước nào?",
      desc: "Tất cả sản phẩm đều được nhập khẩu chính hãng từ các thương hiệu nổi tiếng, đảm bảo chất lượng và độ bền cao. Chúng tôi cam kết mang đến cho bạn những sản phẩm tốt nhất với giá cả hợp lý.",
      desc2:
        "Các sản phẩm của thiết bị vs TOTO bao gồm từ bồn cầu, vòi nước, bồn rửa cho đến các thiết bị phòng tắm, bình nước nóng và các thiết bị trong nhà bếp. Và giờ đây, thiết bị vệ sinh cao cấp TOTO đang vững bước tiến vào thế kỷ 21 với tầm nhìn chung rộng lớn. TOTO đang có những kế hoạch mở rộng tập trung vào việc hoàn thiện môi trường tự nhiên.",
    },
    {
      name: "Thiết bị vệ sinh TOTO của nước nào?",
      desc: "Tất cả sản phẩm đều được nhập khẩu chính hãng từ các thương hiệu nổi tiếng, đảm bảo chất lượng và độ bền cao. Chúng tôi cam kết mang đến cho bạn những sản phẩm tốt nhất với giá cả hợp lý.",
      desc2:
        "Các sản phẩm của thiết bị vs TOTO bao gồm từ bồn cầu, vòi nước, bồn rửa cho đến các thiết bị phòng tắm, bình nước nóng và các thiết bị trong nhà bếp. Và giờ đây, thiết bị vệ sinh cao cấp TOTO đang vững bước tiến vào thế kỷ 21 với tầm nhìn chung rộng lớn. TOTO đang có những kế hoạch mở rộng tập trung vào việc hoàn thiện môi trường tự nhiên.",
    },
  ],
};

const { t } = useI18n();

const akas = [
  {
    name: t("sort.title"),
    childs: [
      { name: t("sort.bestSeller"), slug: "ban-chay" },
      { name: t("sort.default"), slug: "mac-dinh" },
      { name: t("sort.priceHighToLow"), slug: "gia-cao-den-thap" },
      { name: t("sort.priceLowToHigh"), slug: "gia-thap-den-cao" },
    ],
  },
];

const soft_type = ref("ban_chay");

const selectedSort = ref(akas[0].childs[0]); // Mặc định là "Bán chạy"
const showDropdown = ref(false);

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const handleSortChange = (option: { name: string; slug: string }) => {
  selectedSort.value = option;
  soft_type.value = option.slug;
  showDropdown.value = false;

  router.push({
    query: {
      ...route.query,
      sort: option.slug,
    },
  });
};

onMounted(() => {
  const currentSortSlug = route.query.sort || "ban-chay";
  const foundSort = akas[0].childs.find(
    (item) => item.slug === currentSortSlug
  );
  if (foundSort) {
    selectedSort.value = foundSort;
    soft_type.value = foundSort.slug;
  }
});
useSeoMeta({
  title: "Bồn cầu TOTO chính hãng - TDM Tuấn Đức",
  description: "Sản phẩm chính hãng, bảo hành toàn quốc, lắp đặt miễn phí.",
  ogTitle: "Bồn cầu TOTO chính hãng - TDM Tuấn Đức",
  ogDescription: "Sản phẩm chính hãng, bảo hành toàn quốc, lắp đặt miễn phí.",
  ogImage: "https://www.tdm.vn/image/logo.jpg",
});
</script>

<style scoped>
:global(.bg-primary) {
  background-color: #f97316;
  color: white;
  transition: background-color 0.2s ease;
}
</style>
