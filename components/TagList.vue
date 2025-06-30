<template>
  <div>
    <ul class="flex items-center justify-start gap-2 flex-wrap">
      <li v-for="(item, index) in data" :key="index">
        <NuxtLinkLocale :to="`/blog/tag/${item.slug}`" class="italic border-vnwa text-white rounded text-xs p-1" :class="[
          'hover:text-gray-500',
          route.params.slug === item.slug
            ? 'bg-vnwa-500 font-semibold'
            : 'bg-primary-500/30 italic',
        ]">
          {{ item.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface T {
  name: string;
  slug: string;
}

const { data } = await useHttp<T[]>('load-data-tags');
const route = useRoute();


</script>