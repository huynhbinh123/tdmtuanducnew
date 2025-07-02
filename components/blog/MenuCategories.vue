<template>
  <div>
    <h3
      class="text-black text-lg font-medium uppercase py-4 border-t-4 border-orange-600"
    >
      {{ $t("category.title") }}
    </h3>
    <ul class="ms-4 mt-1 space-y-1">
      <li v-for="(item, index) in data" :key="index">
        <TreeNavItem
          :item="item"
          :expandedSlug="null"
          @toggle="$emit('toggle', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
interface T {
  name: string;
  slug: string;
  children: T[];
}
const { locale } = useI18n();
const { data, status } = await useHttp<T[]>("load-data-menu-blog-categories", {
  method: "GET",
  query: {
    locale: locale.value,
  },
});
const route = useRoute();
const currentSlug = computed(
  () => route.params.slug || route.path.split("/").pop()
);
</script>

<style></style>
