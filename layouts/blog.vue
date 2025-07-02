<template>
  <div class="flex flex-col min-h-screen bg-white">
    <SiteHeader :showCartUser="false" :showCategoryMenu="false" />

    <main class="flex-grow pt-[16px]">
      <UContainer>
        <div class="items-center gap-2 lg:hidden flex justify-center pb-[16px]">
          <UIcon name="material-symbols:call" size="30" class="bg-orange-500" />
          <h3 class="text-black font-medium">
            HOTLINE:
            <span class="text-orange-500">0933322232 - 02822448333</span>
          </h3>
        </div>

        <!-- mobile -->
        <div class="lg:hidden block">
          <div class="flex flex-col gap-2 w-full">
            <UButton
              class="w-full bg-orange-500 text-white"
              @click="toggleMainMenu"
            >
              <div class="flex items-center justify-center w-full h-full gap-2">
                <UIcon
                  name="material-symbols:menu-rounded"
                  class="text-white mb-0.5"
                  size="20"
                />
                <span>MENU</span>
              </div>
            </UButton>
            <div :class="['slide-toggle', isMainMenuOpen ? 'open' : '']">
              <div class="flex flex-col">
                <NuxtLinkLocale
                  to="/"
                  class="flex items-center py-1 border-y border-gray-300"
                >
                  <UIcon
                    name="material-symbols:house"
                    class="text-black"
                    size="30"
                  />
                  <span class="font-bold text-black uppercase">{{
                    $t("menu.home")
                  }}</span>
                </NuxtLinkLocale>

                <div
                  v-for="(item, index) in categoryMenu"
                  :key="index"
                  @mouseenter="hoverIndex = index"
                  @mouseleave="hoverIndex = null"
                  class="relative py-1"
                >
                  <div
                    v-if="index >= 1"
                    class="flex items-center justify-between gap-2 border-b border-gray-300"
                  >
                    <ul
                      class="flex items-center justify-between w-full list-none cursor-pointer"
                    >
                      <li
                        :class="[
                          'uppercase font-bold relative',
                          hoverIndex === index
                            ? 'text-orange-500'
                            : 'text-black',
                        ]"
                      >
                        <NuxtLinkLocale :to="`/blog/category/${item.slug}`">
                          {{ item.name }}
                        </NuxtLinkLocale>
                      </li>
                      <div
                        class="px-2 border-x border-gray-200 flex items-center"
                        @click="toggleMobileMenu(index)"
                      >
                        <UIcon
                          name="material-symbols:keyboard-arrow-down"
                          size="30"
                          :class="
                            hoverIndex === index
                              ? 'text-orange-500'
                              : 'text-black'
                          "
                        />
                      </div>
                    </ul>
                  </div>

                  <!-- Menu con -->
                  <div
                    :class="[
                      'slide-toggle',
                      expandedIndexMobile === index ? 'open' : '',
                    ]"
                  >
                    <ul class="flex flex-col">
                      <li
                        v-for="(child, cIndex) in item.child"
                        :key="cIndex"
                        class="border-b border-gray-200"
                      >
                        <NuxtLinkLocale
                          :to="`/${child.slug}`"
                          class="text-black hover:text-orange-500 block p-2"
                        >
                          {{ child.name }}
                        </NuxtLinkLocale>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- lg -->
        <div
          class="lg:flex hidden items-center justify-between py-4 border-b border-gray-200"
        >
          <NuxtLinkLocale to="/">
            <UIcon
              name="material-symbols:house"
              class="text-black hover:text-orange-500"
              size="30"
            />
          </NuxtLinkLocale>

          <div
            v-for="(item, index) in categoryMenu"
            :key="item.slug || index"
            class="flex items-center gap-2 border-l border-gray-200 pl-5 relative"
            @mouseenter="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          >
            <ul
              v-if="index !== 0"
              class="flex items-center gap-2 list-none cursor-pointer"
            >
              <li
                :class="[
                  'uppercase font-bold text-sm relative',
                  hoverIndex === index ? 'text-orange-500' : 'text-black',
                ]"
              >
                <NuxtLinkLocale :to="`/blog/category/${item.slug}`">{{
                  item.name
                }}</NuxtLinkLocale>
                <span
                  v-if="hoverIndex === index"
                  class="absolute left-1/2 -bottom-[9px] transform -translate-x-1/2 z-20"
                >
                  <!-- Lớp viền ngoài -->
                  <span
                    class="block w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-300"
                  ></span>
                  <span
                    class="absolute top-[1px] left-1/2 transform -translate-x-1/2 block w-0 h-0 border-l-[9px] border-r-[9px] border-b-[9px] border-l-transparent border-r-transparent border-b-white"
                  ></span>
                  <span
                    class="absolute top-[1px] left-10 transform -translate-x-1/2 block w-40 h-10"
                  ></span>
                </span>
              </li>
              <UIcon
                name="material-symbols:keyboard-arrow-down"
                size="20"
                :class="hoverIndex === index ? 'text-orange-500' : 'text-black'"
              />
            </ul>

            <div
              v-if="hoverIndex === index && item.child && item.child.length"
              class="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-md rounded z-10 mt-2"
            >
              <ul class="flex flex-col bg-white">
                <li
                  v-for="(child, cIndex) in item.child"
                  :key="cIndex"
                  class="rounded border-b border-gray-200"
                >
                  <NuxtLinkLocale
                    :to="`/${child.slug}`"
                    class="text-black hover:text-orange-500 block p-2"
                  >
                    {{ child.name }}
                  </NuxtLinkLocale>
                </li>
              </ul>
            </div>
          </div>
        </div></UContainer
      >
      <slot />
    </main>
    <div class="fixed right-4 bottom-10">
      <ul class="space-y-4">
        <li v-for="(item, index) in wighets" :key="index">
          <div
            class="cursor-pointer flex items-center justify-start lg:gap-2 bg-white lg:rounded-3xl rounded-full lg:px-2 px-1 py-1 shadow-2xl"
          >
            <div class="lg:w-[40px]">
              <NuxtImg
                :src="item.image"
                class="rounded-full lg:w-[40px] w-[30px] lg:h-[40px] h-[30px]"
              />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-black/90 lg:block hidden">
                {{ item.name }}
              </h3>
              <h4 class="text-xs text-gray-500 lg:block hidden">
                {{ item.desc }}
              </h4>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMockData } from "~/composables/useMockData";

const { categoryMenu } = useMockData();
const hoverIndex = ref<number | null>(null);

const { wighets } = useMockData();
const expandedIndexMobile = ref<number | null>(null);
const isMainMenuOpen = ref(false);

function toggleMobileMenu(index: number | null) {
  expandedIndexMobile.value =
    expandedIndexMobile.value === index ? null : index;
}

function toggleMainMenu() {
  isMainMenuOpen.value = !isMainMenuOpen.value;
}
</script>

<style>
.slide-toggle {
  overflow: hidden;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-toggle.open {
  max-height: 1000px;
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
