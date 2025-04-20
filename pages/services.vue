<template>
  <div>
    <div class="mb-5 relative border-t h-full">

      <div class="   w-full ">
        <div class="lg:px-10 px-5 py-10">

          <div class="space-y-5 text-black uppercase">
            <h1 class="service_title">{{ appearanceData.banner.title }}</h1>

            <h4 class="lg:text-base text-xs text-black/80 uppercase lg:font-bold font-medium lg:tracking-[0.4em] tracking-wide">
              {{ appearanceData.banner.slogan }}
            </h4>
          </div>



        </div>
        <div class="lg:p-10 p-5">
          <div class="grid grid-cols-12 gap-4">
            <div class="lg:col-span-7 col-span-12 lg:order-1 order-2">
              <div class="lg:py-10 py-5">
                <ul class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <li v-for="(item, index) in appearanceData.items" :key="index">
                    <h2 class="uppercase text-midnight-blue-500 lg:text-3xl text-2xl font-medium mb-5">
                      {{ item.label }}
                    </h2>
                    <div class="text-sm text-black/80" v-html="item.content"> </div>
                  </li>
                </ul>

              </div>
            </div>
            <div class="lg:col-span-5 col-span-12 lg:order-2 order-1">
              <NuxtImg loading="lazy" decoding="auto" class="w-full h-auto" :src="$storage(appearanceData.image)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type AppearanceData = {
  banner: {
    title: string;
    slogan: string;
  };
  image: string;
  items: {
    label: string;
    to: string;
    content: string;
  }[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};
const config = useRuntimeConfig();
const { data, refresh } = await useFetch(`${config.public.apiUrl}/load-data-services-page`);
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



onMounted(() => {
  refresh()
})


</script>


<style scoped>
.service_title {
  font-size: 5vw;
  background-color: transparent;
  font-family: "Bodoni Moda", serif;
  text-align: left;
  color: #222;
}
</style>
