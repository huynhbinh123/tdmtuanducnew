<template>
  <div class="bg-page-blog" v-if="status == 'success'">

    <PageHeroSection :title="data.title" :slogan="data.slogan" />

    <UContainer>
      <div class="grid grid-cols-12 gap-4 ">
        <div class="lg:col-span-4 col-span-12 lg:order-1 order-2">
          <Card class="space-y-10">

            <div>
              <h3 class="text-white font-bold mb-1">
                {{ $t('category') }}
              </h3>
              <BlogCategoriesMenu />
            </div>
            <div>
              <h3 class="text-white font-bold mb-1">
                {{ $t('tag') }}

              </h3>
              <TagList />

            </div>
          </Card>
        </div>
        <div class="lg:col-span-8 col-span-12 lg:order-2 order-1">
          <Card>
            <PostList type="category" :value="route.params.slug"   />
          </Card>
        </div>
      </div>

    </UContainer>


  </div>
</template>

<script lang="ts" setup>
import type { MetaSeo } from '~/type';

interface AppearanceData {
  title: string;
  slogan: string;
  meta:MetaSeo

}

const { locale } = useI18n();
const route = useRoute();
const { data, status } = await useHttp<AppearanceData>(`load-data-blog-category/${route.params.slug}`, {
  method: 'GET',
  params: {
    locale: locale
  }
});

if (data.value?.meta) {
  useSeoMeta({
    title: data.value.meta.title,
    description: data.value.meta.desc,
    ogTitle: data.value.meta.title,
    ogDescription: data.value.meta.desc,
    ogImage:  useNuxtApp().$storage(data.value.meta.image),
    twitterTitle: data.value.meta.title,
    twitterDescription: data.value.meta.desc,
    twitterImage:  useNuxtApp().$storage(data.value.meta.image),
  });
}

</script>


<style></style>