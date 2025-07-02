<template>
  <div>
    <ul
      class="flex items-center justify-start px-3 gap-2 text-sm border border-gray-200 bg-gray-100 rounded-md py-2"
    >
      <li>
        <NuxtLinkLocale to="/" class="text-black hover:text-orange-500">{{
          $t("menu.home")
        }}</NuxtLinkLocale>
      </li>
      <li v-for="(item, index) in items" :key="index" class="mx-2">
        <span class="text-gray-500">/</span>
        <NuxtLinkLocale
          :to="item.to || '#'"
          class="ms-2 text-black hover:text-orange-500"
        >
          {{ item.name }}
        </NuxtLinkLocale>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface BreadcrumbItem {
  name: string;
  to?: string;
}
defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<style></style>
