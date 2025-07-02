<template>
  <UContainer>
    <div><Breadcrumb :items="[{ name: product.name }]" /></div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-4">
      <!-- anh -->
      <div class="col-md-6 shadow-lg rounded-lg">
        <div class="relative w-full">
          <UCarousel
            ref="carousel"
            v-slot="{ item }"
            :items="items"
            :loop="true"
            @select="onSelect"
            class="w-full shadow-lg px-10"
          >
            <NuxtImg :src="item" class="rounded-lg w-full" />
          </UCarousel>

          <button
            @click="onClickPrev"
            class="absolute top-1/2 -left-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-md transition cursor-pointer"
          >
            ◀
          </button>

          <button
            @click="onClickNext"
            class="absolute top-1/2 -right-4 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-md transition cursor-pointer"
          >
            ▶
          </button>
        </div>

        <div class="flex gap-4 mt-4 items-center">
          <button
            @click="onThumbPrev"
            class="p-2 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition"
            :disabled="thumbScrollIndex === 0"
          >
            ◀
          </button>

          <div class="flex gap-4 overflow-hidden">
            <div
              v-for="(item, index) in visibleThumbs"
              :key="index + thumbScrollIndex"
              class="w-[96px] h-[96px] opacity-85 hover:opacity-100 transition-opacity cursor-pointer border border-gray-200 rounded-lg"
              :class="{
                'opacity-100 border-orange-400':
                  activeIndex === index + thumbScrollIndex,
                'border-gray-200': activeIndex !== index + thumbScrollIndex,
              }"
              @click="select(index + thumbScrollIndex)"
            >
              <NuxtImg
                :src="item"
                class="w-full h-full object-cover border rounded-lg"
              />
            </div>
          </div>

          <button
            @click="onThumbNext"
            class="p-2 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition"
            :disabled="thumbScrollIndex >= items.length - 5"
          >
            ▶
          </button>
        </div>
      </div>
      <!-- noi dung -->
      <div class="">
        <div class="border-b border-gray-200">
          <h2 class="text-black font-bold text-xl">
            {{ product.name }}
          </h2>

          <div class="py-3">
            <UCarousel
              v-slot="{ item }"
              :items="product.child"
              :ui="{ item: 'basis-1/3' }"
            >
              <div
                class="group border border-gray-200 rounded-lg text-sm cursor-pointer w-full py-4 px-1 flex items-center justify-center"
              >
                <div class="text-center">
                  <h4 class="text-black font-black group-hover:text-orange-500">
                    {{ item.name }}
                  </h4>
                  <p class="text-black/80">
                    {{ item.priceSale }}
                  </p>
                </div>
              </div>
            </UCarousel>
          </div>
        </div>
        <!-- thong tin -->
        <div class="flex justify-between items-center border-b border-gray-200">
          <div class="">
            <div
              v-for="(i, index) in info"
              :key="index"
              class="flex items-center gap-2"
            >
              <UIcon :name="i.icon" class="text-green-500" />
              <span class="text-gray-700 font-semibold">{{ i.name }}</span>
              <span class="text-gray-500">{{ i.desc }}</span>
            </div>
          </div>
          <div>
            <NuxtLinkLocale :to="brand.slug" class="gap-2 mt-4">
              <NuxtImg
                :src="brand.image"
                alt="Brand Logo"
                class="w-40 h-auto object-contain"
              />
            </NuxtLinkLocale>
          </div>
        </div>

        <!-- phần giá -->
        <div class="flex justify-between items-center mt-4">
          <div>
            <div class="flex items-center justify-center gap-2">
              <p class="text-gray-500">{{ $t("product.price_sale") }}:</p>
              <span class="text-orange-600 lg:text-4xl text-2xl mr-2">
                {{ product.priceSale }}
              </span>
              <span class="text-gray-500 text-lg"
                >({{ $t("product.vat") }})</span
              >
            </div>
            <div class="flex items-center gap-2">
              <p class="text-gray-500">{{ $t("product.price_market") }}:</p>
              <span class="text-gray-500 line-through">
                {{ product.priceMarket }}
              </span>
            </div>
          </div>
        </div>

        <!-- phần mua -->
        <div class="flex items-center flex-wrap gap-4 mt-4 justify-between">
          <!-- số lượng -->
          <div class="flex items-center gap-2 lg:w-auto w-full">
            <p class="whitespace-nowrap text-gray-500">
              {{ $t("product.quantity") }}
            </p>
            <input
              type="number"
              min="1"
              value="1"
              class="border border-gray-300 rounded-lg px-3 py-2 lg:w-16 w-full text-center text-black"
            />
          </div>

          <!-- nút mua ngay -->
          <UButton
            @click="addSampleProduct"
            class="flex items-center justify-center bg-orange-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors lg:min-w-[250px] min-w-full cursor-pointer"
          >
            <UIcon name="material-symbols:check" class="w-6 h-6 mr-2" />
            {{ $t("product.buy_now") }}
          </UButton>

          <!-- thêm vào giỏ -->
          <button
            @click="addToCart"
            class="flex items-center justify-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 text-black transition-colors cursor-pointer lg:w-auto w-full"
          >
            <UIcon
              name="material-symbols:shopping-cart-rounded"
              class="text-xl text-black"
            />
            {{ $t("product.add_to_cart") }}
          </button>
        </div>

        <!-- dia chi -->
        <div
          class="mt-4 border border-orange-500 rounded-lg p-2 overflow-hidden"
        >
          <ul class="table w-full">
            <li
              v-for="(item, index) in showromms"
              :key="index"
              class="whitespace-nowrap table-row py-1 text-sm overflow-hidden text-black"
            >
              <span class="font-bold text-black table-cell px-1">{{
                item.name
              }}</span
              >-
              <span
                class="text-orange-600 font-bold table-cell px-1 hover:text-blue-300 cursor-pointer w-[224px]"
              >
                <UIcon name="material-symbols:call" class="text-base size-3" />
                {{ item.phone }} </span
              >-
              <a
                :href="item.mapLink"
                target="_blank"
                class="table-cell px-1 max-w-[200px] overflow-hidden align-top"
              >
                <div class="flex items-center gap-1 overflow-hidden">
                  <UIcon
                    name="material-symbols:location-on"
                    class="text-base text-blue-500 size-3 flex-shrink-0"
                  />
                  <span
                    class="truncate block whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {{ item.address }}
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- mô tả -->
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 mt-4">
          <div
            v-for="(i, index) in categoryName"
            :key="index"
            class="text-black p-2 rounded-lg items-center text-center flex-col bg-gray-100 relative"
          >
            <div class="flex items-center">
              <NuxtImg :src="i.image" class="w-[40px] h-[25px] mr-2" />
              <p class="text-gray-500 mt-2">{{ i.decs }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-10 my-4">
      <!-- chi tiet -->
      <div>
        <div class="border border-gray-200 rounded-lg shadow p-2">
          <div class="flex items-center gap-2">
            <div class="w-4 h-6 bg-orange-500"></div>

            <h1 class="text-orange-500 font-bold text-2xl px-3">
              {{ $t("product.detail") }}
            </h1>

            <div class="flex-1 h-6 bg-gray-200"></div>
          </div>

          <div class="p-1">
            <div v-html="product.content"></div>
          </div>
        </div>
      </div>

      <!-- san pham, phu kien,... -->
      <div>
        <div class="border border-gray-200 rounded-lg shadow p-2 mb-6">
          <div class=" ">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-4 h-6 bg-orange-500"></div>
              <h2 class="text-orange-500 font-bold text-xl px-2">
                {{ $t("product.Characteristics") }}
              </h2>
              <div class="flex-1 h-6 bg-gray-200"></div>
            </div>
          </div>
          <!-- Nội dung Đặc tính -->
          <!-- <div class="text-sm text-gray-700 space-y-1">
            <div class="flex justify-between">
              <span class="font-semibold">Loại:</span>
              <span>Bồn nước đứng</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Chất liệu:</span>
              <span>Inox SUS 304</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Kích thước:</span>
              <span>Bồn 1000L</span>
            </div>
          </div> -->

          <div class="text-sm text-gray-700 space-y-1">
            <div v-html="product.tech"></div>
          </div>
        </div>

        <!-- Đánh giá -->
        <div class="border border-gray-200 rounded-lg shadow p-2">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-4 h-6 bg-orange-500"></div>
            <h2 class="text-orange-500 font-bold text-xl px-2">
              {{ $t("product.Evaluate") }}
            </h2>
            <div class="flex-1 h-6 bg-gray-200"></div>
          </div>
          <!-- Nội dung Đánh giá -->
          <div
            class="flex lg:flex-row flex-col items-center justify-center gap-4 mb-4"
          >
            <div
              class="text-sm text-gray-700 lg:border-r-2 border-gray-200 p-4"
            >
              <div class="text-2xl font-bold text-black/80 mb-1">
                <span class="text-5xl">{{ product.feedback.rating }}</span>
                <span class="text-black/70"> / 5 </span>
              </div>
              <div class="text-gray-600 mb-2">
                <div class="flex gap-1">
                  <span v-for="n in 5" :key="n" class="text-2xl cursor-pointer">
                    <span
                      :class="
                        n <= product.feedback.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                    >
                      ★
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="text-black flex flex-col items-center">
              <p class="font-medium">
                {{ $t("product.Evanluate2") }}
              </p>
              <p class="text-black/80">{{ $t("product.click") }}</p>

              <UModal
                class="flex flex-col items-center"
                :title="$t('product.review_title')"
                :description="$t('product.give')"
                :ui="{
                  overlay: 'bg-black/50',
                  content: 'bg-white text-black shadow-xl rounded-lg',
                  header: 'text-black',
                  body: 'text-black',
                  title: 'text-black font-semibold text-lg',
                  footer: 'text-black',
                  close:
                    'text-black/80 hover:bg-gray-200 hover:text-black cursor-pointer text-xl',
                }"
              >
                <UButton
                  label="Open"
                  color="neutral"
                  variant="subtle"
                  class="bg-orange-500 p-2 rounded-lg text-white mt-2 hover:bg-orange-600 transition-colors cursor-pointer font-medium w-full"
                >
                  <p class="text-lg">{{ $t("product.write_review") }}</p>
                </UButton>

                <template #body>
                  <form class="space-y-4 p-4" @submit.prevent="submitReview">
                    <!-- Tên và Email -->
                    <div class="flex flex-col gap-2">
                      <label class="font-medium text-sm"
                        >{{ $t("product.name") }}:</label
                      >
                      <input
                        type="text"
                        v-model="name"
                        class="border border-gray-300 p-2 rounded w-full"
                        :placeholder="$t('form.enterFirstName')"
                      />

                      <label class="font-medium text-sm mt-2"
                        >{{ $t("product.email") }}:</label
                      >
                      <input
                        type="email"
                        v-modal="email"
                        class="border border-gray-300 p-2 rounded w-full"
                        :placeholder="$t('form.enterEmail')"
                      />
                    </div>

                    <!-- Nội dung bình luận -->
                    <div>
                      <label class="font-medium text-sm"
                        >{{ $t("product.content") }}:</label
                      >
                      <textarea
                        rows="4"
                        v-model="message"
                        class="w-full border border-gray-300 p-2 rounded resize-none"
                        :placeholder="$t('product.comment')"
                      ></textarea>
                    </div>

                    <!-- Chấm sao -->
                    <div>
                      <label class="font-medium text-sm block mb-1"
                        >{{ $t("product.rating") }}:</label
                      >
                      <div class="flex gap-1">
                        <span
                          v-for="n in 5"
                          @click="rating = n"
                          :key="n"
                          class="text-2xl cursor-pointer"
                        >
                          <span
                            :class="
                              n <= rating ? 'text-yellow-400' : 'text-gray-300'
                            "
                          >
                            ★
                          </span>
                        </span>
                      </div>
                    </div>

                    <!-- Hình ảnh đính kèm -->
                    <div>
                      <label class="font-medium text-sm block mb-1">
                        {{ $t("product.image_upload") }}:
                      </label>

                      <div class="relative bg-gray-300">
                        <input
                          ref="fileInput"
                          type="file"
                          multiple
                          accept="image/*"
                          class="absolute inset-0 opacity-0 cursor-pointer"
                          @change="onFileChange"
                        />

                        <button
                          type="button"
                          @click="
                            ($refs.fileInput as HTMLInputElement)?.click()
                          "
                          class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                          {{ $t("product.choose_file") }}
                        </button>

                        <span class="ml-2 text-sm text-gray-600">
                          {{ selectedFilesText }}
                        </span>
                      </div>
                    </div>

                    <!-- Nút hành động -->
                    <div class="flex justify-end gap-2 mt-4">
                      <UButton
                        type="submit"
                        class="bg-orange-500 text-white font-bold cursor-pointer hover:bg-orange-600 transition-colors"
                        >{{ $t("product.send") }}</UButton
                      >
                    </div>
                  </form>
                </template>
              </UModal>
            </div>
          </div>

          <ul>
            <li
              v-for="(item, index) in product.feedback.comments"
              :key="index"
              class="my-4"
            >
              <div class="flex justify-between items-center bg-gray-100 p-2">
                <div class="flex items-center gap-4">
                  <h1 class="text-black/80 font-medium ml-2">
                    {{ item.name }}
                  </h1>
                  <div class="text-yellow-400">{{ item.rating }}</div>
                </div>
                <p class="text-black/80">{{ item.created_at }}</p>
              </div>
              <div class="px-6">
                <p class="my-2 text-black/80">
                  {{ item.content }}
                </p>
                <div
                  v-for="(i, index) in item.reply"
                  :key="index"
                  class="border-l-4 border-gray-400 pl-2"
                >
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-orange-500 font-semibold">{{
                      i.name
                    }}</span>
                    <span
                      class="bg-orange-500 text-white uppercase px-2 py-0.5 rounded-sm text-xs"
                    >
                      {{ $t("product.admin") }}
                    </span>
                    <span>:</span>
                  </div>
                  <p class="text-black/80 italic">
                    {{ i.content }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const cart = useCart() as Ref<CartItem[]>;

const auth = useAuthStore();
const router = useRouter();

const addSampleProduct = (event?: MouseEvent) => {
  if (!auth.loggedIn) {
    router.push("/login");
    return;
  }

  cart.value.push({
    name: "Vòi Hoa Sen Inax BFV-1403S-4C (BFV1403S4C) Nóng Lạnh",
    quantity: 1,
    price: 16000000,
    image:
      "https://www.tdm.vn/image/cachewebp/catalog/product-3935/sen-tam-nong-lanh-inax-BFV-1403S-4C-47x47.webp",
  });
  console.log(cart.value);
};

const addToCart = () => {
  cart.value.push({
    name: product.name,
    quantity: 1,
    price: Number(product.priceSale.replace(/[^0-9]/g, "")), // Lấy số từ chuỗi "9.620.000 đ"
    image: items[0], // ảnh đầu tiên làm thumbnail
  });

  console.log("Đã thêm vào giỏ:", cart.value);
};

const product = {
  name: "Bồn Cầu TOTO MS885DT8 Một Khối Nắp TC600VS",
  priceMarket: "11.000.000 đ",
  priceSale: "9.620.000 đ",
  child: [
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
    {
      name: "Nắp TC393VS T2",
      priceMarket: "11.000.000 đ",
      priceSale: "9.620.000 đ",
      slug: "/",
    },
  ],
  content: "",
  tech: "",
  feedback: {
    rating: 4,
    comments: [
      {
        name: "Tấn Tài",
        rating: "★★★★★",
        created_at: "27/01/2024",
        content:
          "Mình vừa đặt hàng tại Tuấn Đức, nhân viên thân thiện, tư vấn nhiệt tình.",
        reply: [
          {
            name: "ADMin",
            content: "Dạ cám ơn anh chị đã tin tưởng mua hàng tại Tuấn Đức ạ",
          },
        ],
      },
      {
        name: "Tấn Tài",
        rating: "★★★★★",
        created_at: "27/01/2024",
        content:
          "Mình vừa đặt hàng tại Tuấn Đức, nhân viên thân thiện, tư vấn nhiệt tình.",
        reply: [
          {
            name: "ADMin",
            content: "Dạ cám ơn anh chị đã tin tưởng mua hàng tại Tuấn Đức ạ",
          },
        ],
      },
      {
        name: "Tấn Tài 11",
        rating: "★★★★",
        created_at: "27/01/2024",
        content:
          "Mình vừa đặt hàng tại Tuấn Đức, nhân viên thân thiện, tư vấn nhiệt tình.",
        reply: [
          {
            name: "ADMin",
            content: "Dạ cám ơn anh chị đã tin tưởng mua hàng tại Tuấn Đức ạ",
          },
        ],
      },
      {
        name: "Tấn Tài 2",
        rating: "★★★★★",
        created_at: "27/01/2024",
        content:
          "Mình vừa đặt hàng tại Tuấn Đức, nhân viên thân thiện, tư vấn nhiệt tình.",
        reply: [
          {
            name: "ADMin",
            content: "Dạ cám ơn anh chị đã tin tưởng mua hàng tại Tuấn Đức ạ",
          },
        ],
      },
    ],
  },
};

const categoryName = [
  {
    name: "Giao hàng",
    decs: "Giao hàng nội thành nhanh chóng trong ngày",
    image:
      "https://www.tdm.vn/catalog/view/theme/default/image/icon-shop-features2-1.png",
  },
  {
    name: "Chính hãng",
    decs: "Đảm bảo 100% chính hãng và bảo hành hãng",
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

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}
const cartItems = ref<CartItem[]>([]);

const showromms = [
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
  {
    name: "TDM center ",
    NuxtImg:
      "https://www.tdm.vn/catalog/view/theme/default/image/logo-tdm-icon.svg",
    address: " 203 QL1A, kp Bình Đường 3, P. An Bình, TP. Dĩ An, Bình Dương",
    mapLink:
      "https://www.google.com/maps/place/TDM+Tu%E1%BA%A5n+%C4%90%E1%BB%A9c/@10.8746265,106.7507332,15z/data=!4m6!3m5!1s0x3174d9097a8b5259:0x84de3a69da85853c!8m2!3d10.8746265!4d106.7507332!16s%2Fg%2F11j0ykg38j?sa=X&hl=vi&ved=2ahUKEwi00pHWi-78AhWGVmwGHeJJCJEQ_BJ6BAhLEAk&coh=164777&entry=tt&shorturl=1",
    phone: "028.2244.8333 – 09333.22232",
    openTime:
      " Từ thứ 2 - thứ 6 (7:30 - 18:00); Thứ 7 (7:30 - 17:00); Chủ Nhật (8:00 - 11:00 & 14:00 - 16:30)",
  },
];
const { t } = useI18n();

const info = [
  {
    icon: "material-symbols:check-circle",
    name: t("product.code") + ":",
    desc: "MS885DT8",
  },
  {
    icon: "material-symbols:check-circle",
    name: t("product.origin") + ":",
    desc: t("product.origin_value"),
  },
  {
    icon: "material-symbols:check-circle",
    name: t("product.status") + ":",
    desc: t("product.in_stock"),
  },
];

const brand = {
  image:
    "https://www.tdm.vn/image/cachewebp/catalog/home/logo-toto-212x116.webp",
  slug: "ToTo",
};

const items = [
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/ban-cau-toto-ms885dt8-1-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-tai-tdm-tuan-duc-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-showroom-tdm-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-showroom-tdm-2-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-showroom-tdm-3-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-showroom-tdm-6-1090x1090.webp",
  "https://www.tdm.vn/image/cachewebp/catalog/products/product_ms885dt8/toto-ms885dt8-showroom-tdm-9-1090x1090.webp",
];

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);
const thumbScrollIndex = ref(0);
const visibleThumbs = computed(() =>
  items.slice(thumbScrollIndex.value, thumbScrollIndex.value + 5)
);

const onThumbNext = () => {
  if (thumbScrollIndex.value < items.length - 5) {
    thumbScrollIndex.value++;
  }
};

const onThumbPrev = () => {
  if (thumbScrollIndex.value > 0) {
    thumbScrollIndex.value--;
  }
};

const onClickNext = () => {
  activeIndex.value = (activeIndex.value + 1) % items.length;
  carousel.value?.emblaApi?.scrollTo(activeIndex.value);
};

const onClickPrev = () => {
  activeIndex.value = (activeIndex.value - 1 + items.length) % items.length;
  carousel.value?.emblaApi?.scrollTo(activeIndex.value);
};
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}

function useAuthStore() {
  return {
    loggedIn: false,
  };
}

import { $fetch } from "ofetch";

const rating = ref(0);
const name = ref("");
const email = ref("");
const message = ref("");
const images = ref<File[]>([]);

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFilesText = ref(t("product.no_file_selected"));

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFilesText.value = Array.from(target.files)
      .map((file) => file.name)
      .join(", ");
  } else {
    selectedFilesText.value = t("product.no_file_selected");
  }
};

const submitReview = async () => {
  try {
    const reviewData = {
      name: name.value,
      email: email.value,
      message: message.value,
      rating: rating.value,
      images: images.value,
    };

    console.log("Đánh giá:", reviewData);

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("message", message.value);
    formData.append("rating", rating.value.toString());
    for (const file of images.value) {
      formData.append("images", file);
    }

    await $fetch("/api/reviews", {
      method: "POST",
      body: formData,
    });

    alert("Đánh giá đã được gửi thành công!");
    // Reset
    name.value = "";
    email.value = "";
    message.value = "";
    rating.value = 0;
    images.value = [];
  } catch (err) {
    console.error("Lỗi gửi đánh giá:", err);
    alert("Gửi thất bại. Vui lòng thử lại.");
  }
};
</script>

<style scoped></style>
