<template>
  <div class="flex flex-col min-h-screen text-white font-sans relative">
    <SiteHeader />

    <main class="flex-grow min-h-screen bg-white pt-[16px]">
      <div class="items-center gap-2 lg:hidden flex justify-center pb-[16px]">
        <UIcon name="material-symbols:call" size="30" class="bg-orange-500" />
        <h3 class="text-black font-medium">
          HOTLINE:
          <span class="text-orange-500">0933322232 - 02822448333</span>
        </h3>
      </div>
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

<script lang="ts" setup>
import { useMockData } from "~/composables/useMockData";

const { wighets } = useMockData();
</script>
