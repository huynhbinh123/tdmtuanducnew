<template>
  <div class="bg-page-blog" v-if="status == 'success'">

    <PageHeroSection :title="data.name" :slogan="data.desc" />

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
            <div v-html="data.content"></div>
          </Card>
        </div>
      </div>

    </UContainer>


  </div>
</template>

<script lang="ts" setup>
import type { Post } from '~/type';


const { locale } = useI18n();
const route = useRoute();
console.log(route)
const { data, status } = await useHttp<Post>(`load-data-post/${route.params.slug}`, {
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

</script>


<style></style>