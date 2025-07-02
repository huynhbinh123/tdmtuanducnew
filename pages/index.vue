<template>
  <UContainer>
    <!-- quang cao anh... -->
    <div>
      <div class="grid grid-cols-6">
        <div class="col-span-1"></div>
        <!-- pc -->
        <div class="lg:block hidden col-span-5 pl-[32px] mx-8">
          <div class="h-[440px] flex flex-col justify-between">
            <UCarousel
              ref="carouselPc"
              v-slot="{ item }"
              arrows
              :loop="true"
              :items="items"
              :prev="{ onClick: onClickPrev, class: 'cursor-pointer' }"
              :next="{ onClick: onClickNext, class: 'cursor-pointer' }"
              class="w-full cursor-pointer"
              @select="onSelect"
            >
              <NuxtImg :src="item" class="rounded-lg w-full" />
            </UCarousel>

            <div class="grid grid-cols-4 cols-span-6 gap-4 mt-4">
              <div
                v-for="(item, index) in nameItems"
                :key="index"
                :class="[
                  'text-black p-4 text-center flex items-center justify-center shadow cursor-pointer ',
                  activeIndex === index
                    ? 'border-t-4 border-t-orange-600 font-semibold text-orange-600 opacity-100'
                    : 'hover:text-orange hover:border-orange-400',
                ]"
                @click="select(index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- mobile -->
        <div class="col-span-6 lg:hidden block w-full mt-8">
          <div class="w-full mt-[-30px] flex flex-col justify-between">
            <div class="relative w-full overflow-hidden">
              <UCarousel
                ref="carouselMb"
                v-slot="{ item }"
                arrows
                :loop="true"
                :items="items2"
                :ui="{
                  item: 'transition-opacity',
                }"
                :prev="{ onClick: onClickPrev }"
                :next="{ onClick: onClickNext }"
                @select="onSelect"
              >
                <NuxtImg :src="item" class="rounded-lg w-full" />
              </UCarousel>
            </div>

            <div class="mt-4">
              <div
                v-for="(item, index) in nameItems"
                :key="index"
                :class="[
                  'text-black p-4 text-center flex items-center justify-center shadow cursor-pointer ',
                  activeIndex === index
                    ? 'border-l-4 border-l-orange-600 font-semibold text-orange-600 opacity-100'
                    : 'hover:text-orange hover:border-orange-400',
                ]"
                @click="select(index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mt-4">
        <div
          v-for="(i, index) in categoryName"
          :key="index"
          class="text-black border-b-4 border-b-orange-600 p-2 rounded-lg items-center text-center flex-col bg-orange-100 relative mt-10 lg:block hidden"
        >
          <NuxtImg
            :src="i.image"
            class="lg:w-[80px] lg:h-[50px] absolute -top-6 z-10 right-26"
          />
          <h3 class="font-bold uppercase mt-10">{{ i.name }}</h3>
          <p class="text-gray-500 mt-2">{{ i.decs }}</p>
        </div>
      </div>

      <div class="lg:hidden block">
        <div class="grid grid-cols-1 gap-4 mt-4">
          <div
            v-for="(i, index) in categoryName"
            :key="index"
            class="text-black border-b-[3px] border-b-orange-600 p-2 rounded-lg flex flex-col bg-orange-100"
          >
            <div class="flex gap-4">
              <div class="flex items-center justify-center">
                <NuxtImg
                  :src="i.image"
                  width="100"
                  class="lg:size-20 w-[100px] h-auto"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="font-bold uppercase text-black/90">{{ i.name }}</h3>
                <p class="text-gray-500 mt-2">{{ i.decs }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- danh muc san pham -->
    <div>
      <div v-for="(item, index) in productCategories" :key="index">
        <h2
          class="text-4xl text-center text-orange-500 mt-10 w-full bg-gray-50 font-bold italic"
        >
          {{ item.name }}
        </h2>
        <div>
          <ul class="grid lg:grid-cols-8 grid-cols-2 gap-0.5 mt-6">
            <li v-for="(child, y) in item.childs" :key="y">
              <ProductCategoryItem
                :name="child.name"
                :image="child.image"
                :slug="child.slug"
              />
            </li>
          </ul>
        </div>

        <div v-if="item.brands" class="mt-2 rounded-lg overflow-hidden">
          <ul
            class="flex flex-wrap justify-center items-center bg-[#f5f5f5] p-2"
          >
            <li
              v-for="(b, z) in item.brands"
              :key="z"
              class="transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:rounded-lg hover:bg-white overflow-hidden"
            >
              <NuxtLinkLocale :to="`/${b.slug}`" class="flex flex-wrap">
                <NuxtImg
                  :src="b.image"
                  alt=""
                  class="hover:border cursor-pointer lg:w-[128px] w-[100px] lg:h-[80px] h-[30px] object-cover rounded-lg"
                />
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints({ lg: 1024 });
const isMobile = breakpoints.smaller("lg");

const carouselPc = useTemplateRef("carouselPc");
const carouselMb = useTemplateRef("carouselMb");
const activeIndex = ref(0);
const onClickNext = () => {
  activeIndex.value = (activeIndex.value + 1) % items.length;
};
const onClickPrev = () => {
  activeIndex.value = (activeIndex.value - 1 + items.length) % items.length;
};

function select(index) {
  activeIndex.value = index;

  if (isMobile.value) {
    carouselMb.value?.emblaApi?.scrollTo(index);
  } else {
    carouselPc.value?.emblaApi?.scrollTo(index);
  }
}

function onSelect(index) {
  activeIndex.value = index;
}

const nameItems = [
  {
    name: "TOTO Khuyến Mãi Hè 2025",
  },
  {
    name: "INAX Khuyến Mãi Hè 2025",
  },
  {
    name: "American Standard Khuyến Mãi Hè 2025",
  },
  {
    name: "Khuyến Mãi Ưu Đãi Caesar",
  },
];

const items = [
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-toto-25-dt-1080x360.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-25-inax-tdm-dt-1080x360.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-as-2025-tdm-dt-1080x360.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-caesar-xuan-2025-dt-1080x360.webp",
];
const items2 = [
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-toto-25-mb-750x900.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-25-inax-tdm-mb-750x900.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-mua-he-as-2025-tdm-mb-750x900.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/banner/km-caesar-xuan-2025-mb-750x900.webp",
];

const productCategories = [
  {
    name: "Thiết Bị Vệ Sinh",
    slug: "thiet-bi-ve-sinh",
    childs: [
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Bồn Cầu",
        slug: "bon-cau",
      },
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Chậu Rửa",
        slug: "chau-rua",
      },
    ],
    brands: [
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Inax",
        slug: "inax",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Toto",
        slug: "toto",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Inax",
        slug: "inax",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Toto",
        slug: "toto",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Inax",
        slug: "inax",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Toto",
        slug: "toto",
      },
      {
        image:
          "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
        name: "Inax",
        slug: "inax",
      },
    ],
  },
  {
    name: "Thiết Bị Điện",
    slug: "thiet-bi-dien",
    childs: [
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Đèn",
        slug: "den",
      },
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Ổ Cắm",
        slug: "o-cam",
      },
    ],
  },
  {
    name: "Thiết Bị Nước",
    slug: "thiet-bi-nuoc",
    childs: [
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Máy Bơm",
        slug: "may-bom",
      },
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Ống Nước",
        slug: "ong-nuoc",
      },
    ],
  },
  {
    name: "Thiết Bị Bếp",
    slug: "thiet-bi-bep",
    childs: [
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Bếp Ga",
        slug: "bep-ga",
      },
      {
        image:
          "https://www.tdm.vn/image/cache/catalog/home/cat-bon-cau-284x284.png",
        name: "Máy Hút Mùi",
        slug: "may-hut-mui",
      },
    ],
  },
];

const categoryName = [
  {
    name: "Giao hàng",
    decs: "Giao hàng nội thành nhanh chóng trong ngày",
    image:
      "https://www.tdm.vn/catalog/view/theme/default/image/icon-shop-features2-1.png",
  },
  {
    name: "Chính hãng",
    decs: "Đảm bảo 100% chính hãng và bảo hành hãng.",
    image:
      "https://www.tdm.vn/catalog/view/theme/default/image/icon-shop-features2-2.png",
  },
  {
    name: "Lắp đặt",
    image:
      "https://www.tdm.vn/catalog/view/theme/default/image/icon-shop-features2-3.png",
    decs: "Lắp đặt miễn phí tại nhà",
  },
  {
    name: "Giá thành",
    image:
      "https://www.tdm.vn/catalog/view/theme/default/image/icon-shop-features2-4.png",
    decs: "Giá thành tốt nhất thị trường",
  },
];
useSeoMeta({
  title:
    "TDM Tuấn Đức - Hệ thống showroom thiết bị vệ sinh, bếp, điện nước hàng đầu",
  description:
    "Mua sắm thiết bị vệ sinh, điện, nước chính hãng, giá tốt nhất 2025.",
  ogTitle: "TDM - Thiết bị vệ sinh chính hãng",
  ogImage: items[0],
  twitterCard: "summary_large_image",
});
</script>
