<template>
  <NuxtImg :src=" props.src" :sizes="sizes" quality="80" densities="x1 x2" :placeholder="[50, 25]" loading="lazy" :alt="alt" format="webp" />
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  bg: {
    type: String,
    default: 'none'
  },
  alt: {
    type: String,
    default: 'Vinawebapp.com'
  },
  sizes: {
    type: String,
    default: '100vw sm:50vw md:400px'
  }
});


</script>

<style>
.vnwa_image {
  display: inline-block;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
}

.vnwa_image img {
  width: 100%;
  height: 100%;
}
</style>
