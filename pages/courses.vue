<template>
  <div class=" bg-white">
    <div class="relative">

      <Section class="border-t bg-white">

        <div class=" relative">
          <NuxtImg loading="lazy" decoding="auto" class=" lg:w-full w-auto  lg:h-auto h-[200px]"
            :src="$storage(appearanceData.banner.image)" />
          <div class="absolute bg-black/70 top-0 left-0 w-full h-full">
            <div class="flex items-center justify-center w-full h-full">
              <div class=" text-white text-center">

                <div class="space-y-4">
                  <h2 class="whitespace-pre-line lg:text-xl text-lg">
                    {{ appearanceData.banner.title }}
                  </h2>

                  <h4 class="text-white lg:text-sm text-xs px-5">{{ appearanceData.banner.slogan }}
                  </h4>
                </div>


              </div>
            </div>

          </div>
        </div>
      </Section>
      <Section class=" bg-white">
        <div class="lg:px-10 px-5 py-16">
          <div class="lg:flex items-center justify-between">
            <h1 class="title lg:text-[5vw] text-4xl lg:mb-0 mb-5 text-midnight-400">
              Courses & Workshops
            </h1>
            <div class="whitespace-pre-line text-midnight-blue-500 font-semibold lg:text-lg text-sm">
              {{ appearanceData.banner.desc }}
            </div>
          </div>
        </div>

      </Section>

    </div>

    <div class="border-t min-h-screen">
      <div class="lg:px-10 px-5 py-10">
        <ul class="divide-y">
          <li v-for="(item, index) in appearanceData.items" :key="index" class="py-10">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 lg:col-span-2 lg:order-1 order-2">
                <h3 class="whitespace-pre-line font-bold text-midnight-blue-400 text-xl">
                  {{ item.label }}
                </h3>
              </div>
              <div class="col-span-12 lg:col-span-7 lg:order-2 order-3">
                <div class="font-sans text-black/80" v-html="item.content"></div>
              </div>
              <div class="col-span-12 lg:col-span-3 lg:order-3 order-1">
                <NuxtImg loading="lazy" decoding="auto" :src="item.image" class="w-full h-auto" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type AppearanceData = {
  banner: {
    image: string;
    title: string;
    slogan: string;
    desc: string;
  };
  items: {
    label: string;
    to: string;
    content: string;
    image: string;
  }[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};
const config = useRuntimeConfig();
const { data, refresh } = await useFetch(`${config.public.apiUrl}/load-data-courses-page`);
const appearanceData = data.value as AppearanceData;

useSeoMeta({
  title: appearanceData.meta.title,
  description: appearanceData.meta.desc,
  ogTitle: appearanceData.meta.title,
  ogDescription: appearanceData.meta.desc,
  ogImage: useNuxtApp().$storage(appearanceData.meta.image),
  twitterTitle: appearanceData.meta.title,
  twitterDescription: appearanceData.meta.desc,
  twitterImage: useNuxtApp().$storage(appearanceData.meta.image),
});



</script>


<style scoped>
.title {
  background-color: transparent;
  font-family: "Bodoni Moda", serif;
  text-align: left;
}
</style>
