<template>
  <div class="">
    <div class="h-full bg-banner  min-h-[calc(100vh-80px)]">
      <div class=" lg:flex gap-4 items-start justify-between ">
        <NuxtImg width="700" class="w-[700px] h-auto order-2" :src="$storage(appearanceData.image)"
          alt="vinawebapp.com" />

          <div class="h-full lg:p-10 p-5 space-y-20 order-1">
            <div>
              <h4 class="text-2xl text-white">
                {{ appearanceData.subTitle }}
              </h4>
              <div v-gsap.scroll.animateText.once.slow="appearanceData.title" class="title"></div>
            </div>
            <div class="text-white text-xl">
              <div class="text-white mb-5" v-html="appearanceData.content"></div>

              <h2 class="text-4xl" style="font-family: caveat,cursive;">Thuong Lee</h2>
            </div>
          </div>

      </div>
    </div>
    <div class="lg:p-10 p-5 bg-gray-100">
      <h3 class="text-2xl">Meet our Team</h3>

      <div class="lg:p-10 lg:mt-0 mt-10">
        <ul class="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <li v-for="(item, index) in appearanceData.teams" :key="index">
            <div class="lg:p-10 p-5 lg:border-0 border border-gray-200">

              <div class="flex items-center justify-between gap-4 text-black/80 ">
                <div class="whitespace-pre-line">
                  {{ item.label }}
                </div>
                <div>
                  <NuxtLinkLocale :to="item.to" target="_blank">
                    <div class="uppercase flex items-center justify-start gap-2 text-báe ">
                      Instagram
                      <UIcon name="material-symbols:arrow-outward" class="size-5 text-gray-600" />
                    </div>
                  </NuxtLinkLocale>
                </div>
              </div>
              <div class="mt-1">
                <NuxtImg loading="lazy" decoding="auto" :src="$storage(item.image)" width="500" height="800"
                  class="w-full h-full" />
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
  image: string;
  title: string;
  subTitle: string;
  content: string;
  teams: {
    label: string;
    to: string;
    image: string;
  }[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};

const config = useRuntimeConfig();
const { data, refresh } = await useFetch(`${config.public.apiUrl}/load-data-about-page`);
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
title {
  font-size: 3vw;
  background-color: transparent;
  font-family: "Bodoni Moda", serif;
  text-align: left;
  color: #fff;
}

.bg-banner {
  background-color: rgb(16 8 33);
}
</style>
