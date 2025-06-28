<template>
  <div class="bg-page-blog" v-if="status == 'success'">

    <PageHeroSection :title="data.title" :slogan="data.slogan" />

    <UContainer>
      <div class="grid grid-cols-12 gap-4 ">
        <div class="col-span-4">
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
        <div class="col-span-8">
          <Card>
            <PostList type="tag" :value="route.params.slug"   />

          </Card>
        </div>
      </div>

    </UContainer>


  </div>
</template>

<script lang="ts" setup>
interface AppearanceData {
  title: string;
  slogan: string;
  meta: {
    title: string;
    desc: string;
    image: string;
  };
}

const { locale } = useI18n();
const route = useRoute();
console.log(route)
const { data, status } = await useHttp<AppearanceData>(`load-data-tag/${route.params.slug}`, {
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