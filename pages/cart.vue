<template>
  <UContainer>
    <div>
      <Breadcrumb :items="[{ name: $t('cart.title') }]" />
    </div>

    <div class="py-10">
      <h1 class="text-4xl text-black">{{ $t("cart.title") }}</h1>
      <div>
        <div v-if="cartItems && cartItems.length">
          <div class="overflow-x-auto">
            <table
              class="table-auto w-full text-left text-black mt-6 border-collapse min-w-[600px]"
            >
              <thead class="bg-gray-100">
                <tr class="whitespace-nowrap">
                  <th class="p-2 border">{{ $t("table.image") }}</th>
                  <th class="p-2 border">{{ $t("table.productName") }}</th>
                  <th class="p-2 border text-center">
                    {{ $t("table.quantity") }}
                  </th>
                  <th class="p-2 border text-right">
                    {{ $t("table.unitPrice") }}
                  </th>
                  <th class="p-2 border text-right whitespace-nowrap">
                    {{ $t("table.total") }}
                  </th>
                  <th class="p-2 border text-center">
                    {{ $t("table.actions") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in cartItems"
                  :key="idx"
                  class="border-b"
                >
                  <td class="p-2 border">
                    <NuxtImg
                      :src="item.image"
                      alt=""
                      class="w-12 h-12 object-cover rounded border border-gray-300 mx-auto"
                    />
                  </td>
                  <td class="p-2 border">{{ item.name }}</td>
                  <td class="p-2 border text-center">{{ item.quantity }}</td>
                  <td class="p-2 border text-right whitespace-nowrap">
                    {{ item.price.toLocaleString() }} đ
                  </td>
                  <td class="p-2 border text-right whitespace-nowrap">
                    {{ (item.price * item.quantity).toLocaleString() }} đ
                  </td>
                  <td class="p-2 border text-center">
                    <button
                      class="text-red-500 hover:underline hover:text-red-400 cursor-pointer"
                      @click="removeFromCart(idx)"
                    >
                      {{ $t("cart.remove") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-end gap-4 mt-4">
            <span class="font-bold text-black"
              >{{ $t("cart.totalPrice") }}:</span
            >
            <span class="font-bold text-orange-500">
              {{ totalCartPrice.toLocaleString() }} đ
            </span>
          </div>
          <div class="flex justify-between items-center mt-4">
            <NuxtLinkLocale
              to="/"
              class="bg-gray-200 text-black/50 rounded p-2 border border-black-100 hover:border-black-200 hover:text-black/80"
            >
              {{ $t("cart.continueShopping") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="/thanh-toan"
              class="flex justify-center items-center gap-2 bg-orange-500 text-white text-center py-2 rounded hover:bg-orange-600 font-semibold lg:min-w-[200px] min-w-[150px]"
            >
              <UIcon name="material-symbols:credit-card" />
              {{ $t("checkout") }}
            </NuxtLinkLocale>
          </div>
        </div>
        <div v-else>
          <h2 class="text-black/80 py-4">{{ $t("cart.empty") }}</h2>
          <NuxtLinkLocale to="/">
            <UButton
              class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-semibold cursor-pointer w-[100px]"
            >
              {{ $t("cart.continue") }}
            </UButton></NuxtLinkLocale
          >
        </div>
      </div>
    </div>
  </UContainer>
</template>
<script lang="ts" setup>
type Category = {
  name: string;
  slug?: string;
  desc?: string;
  child?: Category[];
};

import { ref, computed } from "vue";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const cartItems = ref<CartItem[]>([
  {
    name: "Vòi Hoa Sen Inax BFV-1403S-4C (BFV1403S4C) Nóng Lạnh",
    quantity: 1,
    price: 160000,
    image:
      "https://www.tdm.vn/image/cachewebp/catalog/product-3935/sen-tam-nong-lanh-inax-BFV-1403S-4C-47x47.webp",
  },
  {
    name: "Vòi Hoa Sen Inax BFV-1403S-4C (BFV1403S4C) Nóng Lạnh",
    quantity: 2,
    price: 90000,
    image:
      "https://www.tdm.vn/image/cachewebp/catalog/product-3935/sen-tam-nong-lanh-inax-BFV-1403S-4C-47x47.webp",
  },
]);
const totalQuantity = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

const totalCartPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

function removeFromCart(index: number) {
  cartItems.value.splice(index, 1);
}
</script>
