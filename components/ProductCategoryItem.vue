<template>
  <div class="rounded-sm overflow-hidden shadow-lg">
    <NuxtLinkLocale :to="`/pc/${slug}`">
      <div
        class="group transition-transform duration-300 cursor-pointer hover:shadow-lg rounded-sm"
      >
        <NuxtImg
          :src="image"
          alt=""
          class="bg-black/50 hover:bg-black/40 rounded-t-sm w-full"
        />
        <h3
          class="text-white text-center bg-black/80 p-3 transition-colors duration-300 group-hover:bg-orange-500 overflow-hidden"
        >
          {{ name }}
        </h3>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
