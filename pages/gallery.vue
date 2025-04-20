<script setup lang="ts">
import { ImageDetail } from '#components';

type AppearanceData = {
  banner: {
    image: string;
    title: string;
    slogan: string;
    desc: string;
  };
  images: string[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};
const config = useRuntimeConfig();
const { data, refresh } = await useFetch(`${config.public.apiUrl}/load-data-gallery-page`);
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




const overlay = useOverlay()

const modal = overlay.create(ImageDetail)

const openImage = (url: string) => {
  modal.open({
    url: url
  })
}



</script>

<template>
  <div>
    <div class="mb-5 relative">
      <NuxtImg loading="lazy" decoding="auto" class=" lg:w-full w-auto  lg:h-auto h-[150px]"
        :src="$storage(appearanceData.banner.image)" alt="vinawebapp.com" />
      <div class="absolute bg-black/70 top-0 left-0 w-full h-full">
        <div class="lg:px-10 px-5 lg:py-20 py-5">

          <div class="lg:space-y-14">
            <h1 class="title">{{ appearanceData.banner.title }}</h1>

            <h4 class="text-white/80 lg:text-xl text-sm">{{ appearanceData.banner.slogan }}
            </h4>
          </div>

          <div class="float-end lg:block hidden">
            <div class="lg:text-2xl text-xs text-end text-white whitespace-pre-line">
              {{ appearanceData.banner.desc }}


            </div>

          </div>
        </div>
      </div>
    </div>

    <div>
      <ClientOnly>
        <MasonryWall :items="appearanceData.images" :ssr-columns="2" :column-width="300" :gap="4">
          <template #default="{ item, index }">
            <div @click="openImage(item)">
              <NuxtImg loading="lazy" decoding="auto" :key="index" :src="$storage(item)" class="w-full"
                alt="Gallery Image" />
            </div>
          </template>
        </MasonryWall>
      </ClientOnly>
    </div>
  </div>

</template>

<style scoped>
.title {
  font-size: 5vw;
  background-color: transparent;
  font-family: "Bodoni Moda", serif;
  text-align: left;
  color: #fff;
}
</style>
