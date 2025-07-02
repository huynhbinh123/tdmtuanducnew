<template>
  <div class="lg:pt-0 pt-[50px]">
    <header
      class="lg:hidden block fixed h-[50px] top-0 left-0 bg-white w-full max-w-screen z-1000"
    >
      <div
        class="flex justify-between items-center gap-2 w-full h-full px-2 shadow-md"
      >
        <div class="flex gap-6 items-center justify-center pt-1">
          <USlideover :title="$t('menu.productCategory')" :close="true">
            <button
              class="rounded-md text-white size-8 bg-orange-500 flex items-center justify-center"
            >
              <UIcon name="material-symbols-light:lists" class="size-6" />
            </button>

            <template #body>
              <div class="h-screen overflow-y-auto bg-white">
                <ul class="bg-white text-black space-y-3 p-3 h-full">
                  <li v-for="(item, index) in categoryMenu" :key="index">
                    <UCollapsible class="w-full">
                      <div
                        class="flex items-center justify-between w-full border-b border-gray-400"
                      >
                        <div>
                          <div class="font-medium flex">
                            {{ item.name }}
                          </div>
                          <div class="text-stone-400">
                            {{ item.desc }}
                          </div>
                        </div>
                        <UIcon
                          name="material-symbols:keyboard-arrow-down"
                          class="size-10"
                        />
                      </div>
                      <template #content>
                        <div v-if="item.child" class="bg-white p-3">
                          <ul class="text-black">
                            <li v-for="(childItem, n) in item.child" :key="n">
                              <h4 class="text-red-500 font-bold">
                                {{ childItem.name }}
                              </h4>
                              <ul>
                                <li
                                  v-for="(child2, x) in childItem.child"
                                  :key="x"
                                >
                                  <h5 class="hover:text-orange-500">
                                    {{ child2.name }}
                                  </h5>
                                  <ul v-if="child2.child" class="">
                                    <li
                                      v-for="(child3, y) in child2.child"
                                      :key="y"
                                    >
                                      {{ child3.name }}
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </template>
                    </UCollapsible>
                  </li>
                </ul>
              </div>
            </template>
          </USlideover>

          <NuxtLinkLocale to="/">
            <NuxtImg
              src="https://www.tdm.vn/image/catalog/global/logo.svg"
              class="w-[100px]"
            />
          </NuxtLinkLocale>
        </div>
        <div class="flex items-center text-black/80 gap-4">
          <UIcon
            name="material-symbols:search-rounded"
            class="p-4 cursor-pointer"
            @click="showSearch = true"
          />
          <NuxtLinkLocale to="/login" class="flex items-center">
            <UIcon name="material-symbols:account-circle" class="p-4" />
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/cart" class="flex items-center"
            ><UIcon name="material-symbols:shopping-cart-rounded" class="p-4"
          /></NuxtLinkLocale>
        </div>
      </div>

      <!-- Overlay nền mờ -->
      <div
        v-if="showSearch"
        class="fixed inset-0 bg-black/40 z-40"
        @click="showSearch = false"
      ></div>

      <!-- Khung tìm kiếm trượt từ trên xuống -->
      <transition name="slide-down mt-10">
        <div
          v-if="showSearch"
          class="fixed top-0 left-0 w-full z-50 bg-white px-4 py-3 shadow-md flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            class="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none text-black"
          />
          <button
            class="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
          >
            <UIcon name="material-symbols:search" />
          </button>
        </div>
      </transition>
    </header>
    <div class="w-full bg-red-500 h-[44px] flex">
      <UContainer class="flex items-center">
        <div class="flex items-center h-full space-x-2 py-0">
          <UIcon
            name="material-symbols:notifications-rounded"
            class="bg-white size-5 rounded-full p-1"
          />
          <h3 class="font-medium text-white text-sm uppercase">
            {{ $t("banner") }}
          </h3>
        </div>
      </UContainer>
    </div>
    <header class="w-full bg-white lg:block hidden relative shadow-md">
      <!-- Header -->
      <UContainer>
        <div
          class="container mx-auto flex justify-between items-center gap-4 py-4"
        >
          <!-- Logo -->
          <NuxtLinkLocale to="/" class="">
            <NuxtImg
              src="https://www.tdm.vn/image/catalog/global/logo.svg"
              alt="Logo"
              class="w-[160px]"
            />
          </NuxtLinkLocale>

          <!-- Tìm kiếm -->
          <div class="w-[500px]">
            <div class="flex text-black">
              <input
                type="text"
                :placeholder="$t('search')"
                class="flex-1 border border-gray-200 rounded-l-md px-4 py-2 transition-all duration-200 focus:outline-none focus:border-gray-200 focus:shadow-sky-200 focus:shadow-md"
              />
              <button
                class="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 rounded-r-md flex items-center transition-colors duration-200 hover:from-orange-500 hover:to-orange-600 active:scale-95"
              >
                <UIcon
                  name="material-symbols:search-rounded"
                  size="20"
                  class="cursor-pointer"
                />
              </button>
            </div>
          </div>

          <div>
            <AppLocale />
          </div>
          <div
            v-if="showCartUser"
            class="flex space-x-6 relative justify-center items-center"
          >
            <!-- Tài khoản -->
            <div>
              <div
                class="flex items-center space-x-2 group cursor-pointer relative whitespace-nowrap"
              >
                <div class="flex justify-center bg-gray-100 p-1 rounded">
                  <UIcon
                    name="material-symbols:account-circle"
                    class="bg-black group-hover:bg-orange-500 text-white rounded p-3"
                  />
                </div>
                <NuxtLinkLocale to="login"
                  ><div class="text-sm">
                    <p
                      class="font-semibold text-black group-hover:text-orange-500"
                    >
                      {{ $t("auth.account") }}
                    </p>
                    <p class="text-gray-500">
                      {{ $t("auth.login") }} / {{ $t("auth.register") }}
                    </p>
                  </div></NuxtLinkLocale
                >

                <!-- Dropdown khi hover -->
                <div
                  class="absolute top-full left-0 pt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-10 text-black"
                >
                  <NuxtLinkLocale
                    to="/dang-ky"
                    class="block px-4 py-2 hover:bg-gray-100 text-sm hover:text-orange-500"
                    >{{ $t("auth.register") }}</NuxtLinkLocale
                  >
                  <NuxtLinkLocale
                    to="login"
                    class="block px-4 py-2 hover:bg-gray-100 text-sm hover:text-orange-500"
                    >{{ $t("auth.login") }}</NuxtLinkLocale
                  >
                </div>
              </div>
            </div>
            <UPopover>
              <div
                class="flex items-center space-x-2 group cursor-pointer w-[200px]"
              >
                <div
                  class="flex justify-center bg-gray-100 p-1 rounded relative mr-3"
                >
                  <UIcon
                    name="material-symbols:shopping-cart-rounded"
                    class="bg-black group-hover:bg-orange-500 p-3"
                  />
                  <span
                    v-if="cartItems && cartItems.length > 0"
                    class="absolute rounded-full bg-red-500 w-5 flex justify-center text-sm -top-2 -right-2"
                    >{{ totalQuantity }}</span
                  >
                </div>

                <div class="text-sm">
                  <p
                    class="font-semibold text-black group-hover:text-orange-500"
                  >
                    {{ $t("cart.title") }}
                  </p>
                  <p class="text-gray-500 whitespace-nowrap">
                    {{ totalQuantity }} {{ $t("product.title") }} -
                    {{ totalCartPrice.toLocaleString() }} đ
                  </p>
                </div>
              </div>

              <template #content>
                <div
                  class="min-w-[600px] max-h-[700px] bg-gray-100 flex-col rounded-md p-5 lg:block hidden absolute right-[-97px] shadow"
                >
                  <div class="overflow-y-auto flex-grow max-h-[500px]">
                    <template v-if="cartItems && cartItems.length">
                      <div
                        v-for="(item, idx) in cartItems"
                        :key="idx"
                        class="flex items-center gap-3 py-2 border-b last:border-b-0"
                      >
                        <NuxtImg
                          :src="item.image"
                          alt=""
                          class="w-12 h-12 object-cover rounded"
                        />
                        <div class="flex gap-2 items-center">
                          <div class="font-semibold text-black">
                            {{ item.name }}
                          </div>
                          <div class="text-gray-500 text-sm">
                            x{{ item.quantity }}
                          </div>
                          <div class="text-orange-500 font-bold">
                            {{ item.price.toLocaleString() }}đ
                          </div>
                          <button
                            class="text-red-500 hover:underline hover:text-red-400 cursor-pointer"
                            @click="removeFromCart(idx)"
                          >
                            {{ $t("cart.remove") }}
                          </button>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="w-full min-h-[100px] flex justify-center items-center"
                      >
                        <h2 class="text-black">
                          {{ $t("cart.desc") }}
                        </h2>
                      </div>
                    </template>
                  </div>
                  <!--  -->
                  <div
                    v-if="cartItems && cartItems.length"
                    class="border-t border-gray-400 pt-4"
                  >
                    <div class="flex justify-end items-center gap-4">
                      <span class="font-bold text-black"
                        >{{ $t("cart.total") }}:</span
                      >
                      <span class="font-bold text-orange-500">
                        {{ totalCartPrice.toLocaleString() }} đ
                      </span>
                    </div>

                    <div class="flex justify-end gap-4 mt-4">
                      <NuxtLinkLocale
                        to="/cart"
                        @click="isOpen = false"
                        class="flex items-center gap-2 justify-center bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 font-semibold min-w-[200px]"
                      >
                        <UIcon name="material-symbols:shopping-cart" />
                        {{ $t("cart.seeCart") }}
                      </NuxtLinkLocale>
                      <NuxtLinkLocale
                        to="/thanh-toan"
                        @click="isOpen = false"
                        class="flex items-center justify-center gap-2 bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 font-semibold min-w-[200px]"
                      >
                        <UIcon name="material-symbols:credit-card" />
                        {{ $t("checkout") }}
                      </NuxtLinkLocale>
                    </div>
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
        </div>
      </UContainer>

      <UContainer>
        <div class="flex justify-between items-center container mx-auto">
          <!-- Bên trái -->
          <div
            v-if="showCategoryMenu"
            class="flex items-center gap-2 text-orange-500 relative group shadow-md min-w-[220px]"
          >
            <UIcon name="ion:navicon" size="25" />
            <button class="py-2 px-4 font-bold">
              {{ $t("menu.productCategory") }}
            </button>

            <div
              :class="{ hidden: route.path !== '/' }"
              class="absolute left-0 top-full bg-white text-black/90 space-y-3 group-hover:block z-10 shadow-md"
            >
              <div>
                <div class="h-[472px] overflow-y-auto min-w-[220px]">
                  <ul class="w-[211px]">
                    <li
                      v-for="(item, index) in categoryMenu"
                      :key="index"
                      class="group/item px-4 py-2 hover:bg-orange-500 cursor-pointer hover:text-white"
                    >
                      <NuxtLinkLocale
                        :to="`/pc/${item.slug}`"
                        class="flex items-center w-full transition-all duration-300 ease-in-out group-hover/item:translate-x-3"
                      >
                        <div class="w-full border-b border-gray-200">
                          <div class="font-bold">
                            {{ item.name }}
                          </div>
                          <div
                            class="text-stone-400 group-hover/item:text-gray-200 text-sm pb-2"
                          >
                            {{ item.desc }}
                          </div>
                        </div>
                        <UIcon
                          name="material-symbols:chevron-right"
                          class="bg-stone-500"
                        />
                      </NuxtLinkLocale>

                      <div
                        v-if="item.child"
                        class="absolute left-full top-0 w-[500px] bg-white p-3 z-50 hidden group-hover/item:block border h-full shadow-[4px_0_8px_2px_rgba(0,0,0,0.1)]"
                      >
                        <ul class="grid grid-cols-3 gap-4 text-black">
                          <li v-for="(childItem, n) in item.child" :key="n">
                            <NuxtLinkLocale :to="`/pc/${childItem.slug}`">
                              <h4 class="text-red-500 font-bold">
                                {{ childItem.name }}
                              </h4>
                            </NuxtLinkLocale>
                            <ul>
                              <NuxtLinkLocale
                                :to="`/pc/${child2.slug}`"
                                v-for="(child2, x) in childItem.child"
                                :key="x"
                              >
                                <h5 class="hover:text-orange-500">
                                  {{ child2.name }}
                                </h5>
                                <ul v-if="child2.child">
                                  <li
                                    v-for="(child3, y) in child2.child"
                                    :key="y"
                                  >
                                    {{ child3.name }}
                                  </li>
                                </ul>
                              </NuxtLinkLocale>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Bên phải -->

          <div v-if="showCategoryMenu" class="flex items-center space-x-6">
            <a href="" class="text-orange-500 hover:underline">{{
              $t("menu.about")
            }}</a>
            <a href="" class="text-orange-500 hover:underline">{{
              $t("menu.instruct")
            }}</a>
            <a href="" class="text-orange-500 hover:underline">{{
              $t("menu.contact")
            }}</a>
            <div class="flex items-center gap-2">
              <UIcon name="material-symbols:call" class="bg-orange-500" />
              <h3 class="text-black font-medium">
                HOTLINE:
                <span class="text-orange-500">0933322232 - 02822448333</span>
              </h3>
            </div>
          </div>
        </div>
      </UContainer>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useCart } from "~/composables/useCart";

const route = useRoute();
const isOpen = ref(true);
type Category = {
  name: string;
  slug?: string;
  desc?: string;
  child?: Array<
    Category & { name: string; slug?: string; desc?: string; child?: any[] }
  >;
};

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const showSearch = ref(false);
const cart = useCart();
const cartItems = computed(() => cart.value);

const totalQuantity = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

const totalCartPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

function removeFromCart(index: number) {
  cart.value.splice(index, 1);
}
const localePath = useLocalePath();
const { t } = useI18n();

const categoryMenu = computed(() => {
  return [
    {
      name: t("menu.brand"),
      slug: localePath("thuong-hieu"),
      desc: "Các thương hiệu nổi bật",
      child: [
        {
          name: "Thiet Bi Ve Sinh",
          slug: "thiet-bi-ve-sinh",
          child: [
            { name: "To To", slug: "to-to" },
            { name: "I Nax", slug: "i-nax" },
            { name: "AMERICAN STANDART", slug: "american-standart" },
            { name: "CAESAR", slug: "caesar" },
            { name: "VIGLACERA", slug: "viglacera" },
            { name: "COTTO", slug: "cotto" },
            { name: "GROHE", slug: "grohe" },
            { name: "KANLY", slug: "kanly" },
            { name: "GLS", slug: "gls" },
            { name: "THIÊN THANH", slug: "thien-thanh" },
            { name: "ĐÌNH QUỐC", slug: "dinh-quoc" },
          ],
        },
        {
          name: "Thiết Bị Nước",
          slug: "thiet-bi-nuoc",
          child: [
            { name: "To To", slug: "to-to" },
            { name: "I Nax", slug: "i-nax" },
            { name: "AMERICAN STANDART", slug: "american-standart" },
            { name: "CAESAR", slug: "caesar" },
            { name: "VIGLACERA", slug: "viglacera" },
            { name: "COTTO", slug: "cotto" },
            { name: "GROHE", slug: "grohe" },
            { name: "KANLY", slug: "kanly" },
            { name: "GLS", slug: "gls" },
          ],
        },
        {
          name: "Thiết Bị Bếp",
          slug: "thiet-bi-bep",
          child: [
            {
              name: "To To",
              slug: "to-to",
              child: [{ name: "toto child", slug: "toto-child" }],
            },
            { name: "COTTO", slug: "cotto" },
            { name: "GROHE", slug: "grohe" },
            { name: "KANLY", slug: "kanly" },
          ],
        },
        {
          name: "Thiet Bi Dien",
          slug: "thiet-bi-dien",
          child: [
            { name: "To To", slug: "to-to" },
            { name: "Quat", slug: "quat" },
          ],
        },
        {
          name: "Thiet Bi Dien",
          slug: "thiet-bi-dien-2",
          child: [{ name: "To To", slug: "to-to" }],
        },
      ],
    },
    {
      name: "Thiết Bị Vệ Sinh",
      slug: "thiet-bi-ve-sinh",
      desc: "Ban cau, Lavado, Voi",
      child: [
        {
          name: "Bon Cau a",
          slug: "bon-cau-a",
          child: [
            { name: "Bon Cau Khoi 1", slug: "bon-cau-khoi-1" },
            { name: "Bon Cau Khoi 2", slug: "bon-cau-khoi-2" },
            { name: "Bon Cau Khoi 3", slug: "bon-cau-khoi-3" },
            { name: "Bon Cau Khoi 4", slug: "bon-cau-khoi-4" },
            { name: "Bon Cau Khoi 5", slug: "bon-cau-khoi-5" },
            { name: "Bon Cau Khoi 6", slug: "bon-cau-khoi-6" },
            { name: "Bon Cau Khoi 7", slug: "bon-cau-khoi-7" },
          ],
        },
        {
          name: "Thiet Bi Nuoc",
          slug: "thiet-bi-nuoc",
          child: [
            { name: "To To", slug: "to-to" },
            { name: "I Nax", slug: "i-nax" },
            { name: "AMERICAN STANDART", slug: "american-standart" },
            { name: "CAESAR", slug: "caesar" },
            { name: "VIGLACERA", slug: "viglacera" },
            { name: "COTTO", slug: "cotto" },
            { name: "GROHE", slug: "grohe" },
            { name: "KANLY", slug: "kanly" },
            { name: "GLS", slug: "gls" },
          ],
        },
        {
          name: "Thiet Bi Bep",
          slug: "thiet-bi-bep",
          child: [
            {
              name: "To To",
              slug: "to-to",
              child: [{ name: "toto child", slug: "toto-child" }],
            },
            { name: "COTTO", slug: "cotto" },
            { name: "GROHE", slug: "grohe" },
            { name: "KANLY", slug: "kanly" },
            { name: "GLS", slug: "gls" },
          ],
        },
        {
          name: "Thiet Bi Dien",
          slug: "thiet-bi-dien",
          child: [
            { name: "To To", slug: "to-to" },
            { name: "Quat", slug: "quat" },
          ],
        },
        {
          name: "Thiet Bi Dien",
          slug: "thiet-bi-dien-2",
          child: [{ name: "To To", slug: "to-to" }],
        },
      ],
    },
  ];
});

const showCart = ref(false);

const toggleCart = () => {
  showCart.value = !showCart.value;
};

defineProps({
  showCategoryMenu: {
    type: Boolean,
    default: true,
  },
  showCartUser: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
/* slide-down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
