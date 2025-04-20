<script setup lang="ts">
const config = useRuntimeConfig();
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
})
let parent = '/';

switch (props.type) {
  case 'blog_category':
    parent = '/bc';
    
    break;

  case 'product_category':
    parent = '/pc';
    break;

  // Thêm các case khác nếu cần
  default:
    parent = '/';
    break;
}



const path = `${parent}/${props.modelValue}`
</script>

<template>
    <UButtonGroup class="w-full">
    <UBadge color="neutral" variant="outline" size="lg" :label="config.public.appUrl" />

    <UInput color="neutral" variant="outline" placeholder="/abc" />
  </UButtonGroup>
</template>

