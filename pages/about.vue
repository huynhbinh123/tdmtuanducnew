<script lang="ts" setup>
import type { MetaSeo } from '~/type';

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
  services: {
    label: string;
    icon: string;
    bg_color: string;
    desc: string;
  }[];
  short_about: string;

  meta:MetaSeo
}
const { locale } = useI18n();
const { data, status } = await useHttp<AppearanceData>('load-data-about-page', {
  method: 'GET',
  params: {
    locale: locale
  }
});
useSeoMeta({
  title: data.value.meta.title,
  description: data.value.meta.desc,
  ogTitle: data.value.meta.title,
  ogDescription: data.value.meta.desc,
  ogImage: useNuxtApp().$storage(data.value.meta.image),
  twitterTitle: data.value.meta.title,
  twitterDescription: data.value.meta.desc,
  twitterImage: useNuxtApp().$storage(data.value.meta.image),
});
const isActive = (index) => (index + 1) % 3 === 2;

</script>
<template>
  <div class="process">
    <img src="~/assets/images/bgAbout.jpeg" class="w-full h-screen opacity-25 fixed  " alt="Vinawebapp.com" />


    <div class="relative    py-10 text-center">
      <PageHeroSection :title="data.hero_section.title" :slogan="data.hero_section.slogan" />
      <div class="flex items-center justify-center">
        <img loading="lazy" width="570" height="auto" src="/images/badges.png" class="md:my-10 my-6"
          alt="vinawebapp.com">

      </div>
    </div>

    <div class="relative  py-10">
      <div class="w-full py-3 pt-10">
        <h2 class="text-center text-white font-bold">
        {{$t('what_sets_us_apart')}}
        </h2>
      </div>
      <div class="grid grid-cols-12 gap-4 py-20">




        <div class="lg:col-span-4 sm:col-span-6 col-span-12 " :class="{ 'lg:-translate-y-16': isActive(index) }"
          v-for="(item, index) in data.services" :key="index">

          <FeatureCardItem :data="item" />


        </div>


      </div>
    </div>
    <div class="divider"></div>
    <div class="w-full py-3 pt-10">
      <div class="relative page-padding py-10">

        <div class="w-full grid grid-cols-12 gap-4 bg-short-about rounded-lg border-white/10 border-2">
          <div class="lg:col-span-6 col-span-12 lg:order-2">
            <div class="p-5">
              <img loading="lazy" src="/images/bgAbout.png" width="1000" height="1500" class="h-auto w-full"
                alt="Vinawebapp.com">
            </div>
          </div>

          <div class="lg:col-span-6 col-span-12 lg:order-1 text-white">
            <div class="w-full flex items-center justify-start">
              <div class="lg:p-20 p-5">
                <h3 class="section-sub-text color-blue md:mb-5 mb-3 font-bold">{{$t('a_few_words_about_us')}}</h3>

             <div v-html="data.short_about"> </div>

                <div class="grid grid-cols-12 gap-4 py-10">
                  <div class="col-span-4 relative">
                    <div class="lg:text-4xl text-2xl font-bold">
                      <div class="animate-glow absolute bg-red-500 top-2 w-16 h-12"> </div>
                      <span>10</span>
                      <icon name="mi:add" />
                    </div>
                    <div class="md:text-lg text-sm text-white/80">years of experience</div>
                  </div>
                  <div class="col-span-4 relative">
                    <div class="lg:text-4xl text-2xl font-bold">
                      <div class="animate-glow absolute bg-green-500 top-2 w-16 h-12"> </div>
                      <span>200</span>
                      <icon name="mi:add" />
                    </div>
                    <div class="md:text-lg text-sm text-white/80">trusted partners</div>
                  </div>
                  <div class="col-span-4 relative">
                    <div class="lg:text-4xl text-2xl font-bold">
                      <div class="animate-glow absolute bg-purple-500 top-2 w-16 h-12"> </div>
                      <span>20</span>
                      <icon name="mi:add" />
                    </div>
                    <div class="md:text-lg text-sm text-white/80">24/7 support staff</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="divider"></div>

  </div>
</template>

<style></style>