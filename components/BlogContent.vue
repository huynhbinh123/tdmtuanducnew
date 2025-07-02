<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in allItems"
        :key="index"
        class="border-b border-gray-200 mb-10"
      >
        <div class="flex flex-col lg:flex-row my-6 gap-4">
          <div
            class="w-full lg:w-[250px] aspect-[5/3] shrink-0 overflow-hidden"
          >
            <NuxtLinkLocale
              :to="`/blog/${item.slug}`"
              class="group block w-full h-full"
            >
              <div class="relative w-full h-full">
                <NuxtImg
                  :src="item.NuxtImg"
                  alt=""
                  class="w-full h-full object-cover group-hover:opacity-80 transition duration-300"
                />
              </div>
            </NuxtLinkLocale>
          </div>

          <div class="flex flex-col justify-start lg:pl-4 pl-0 line-clamp-3">
            <h1
              class="text-black text-xl font-bold py-2 hover:text-orange-500 cursor-pointer"
            >
              <NuxtLinkLocale :to="`/blog/${item.slug}`">{{
                item.name
              }}</NuxtLinkLocale>
            </h1>
            <h1 class="text-gray-500 line-clamp-3">
              {{ item.desc }}
            </h1>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface BlogItem {
  slug: string;
  NuxtImg: string;
  name: string;
  desc: string;
}

defineProps<{
  category?: string;
  allItems: BlogItem[];
}>();
</script>
