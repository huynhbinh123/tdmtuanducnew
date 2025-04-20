<script setup lang="ts">
const config = useRuntimeConfig();

interface FeedbackSectionItem {
  label: string;
  image: string;
  content: string;
}
defineProps<{
  data: FeedbackSectionItem[];
}>();




</script>

<template>
  <div class="relative page-hover setion_feedback py-10 bg-2">
    <div class="w-full py-3 pt-10 text-center">
      <div class="section-sub-text uppercase color-blue md:mb-5 mb-3">WHAT CUSTOMERS SAY </div>
      <div class="section-text">Don't just listen to us</div>
    </div>

    <div class="max-w-3xl mx-auto">
      <UCarousel v-slot="{ item }" :items="data"   :autoplay="{ delay: 2000 }" :snap="true" class="w-full">
        <div class="testimonial-card text-center bg-dark-600 p-6 rounded-lg">
          <p class="text-white/80 text-base">“{{ item.content }}”</p>
          <div class="sm:my-6 my-4">
            <NuxtImg :src="`${config.public.appUrl}/images/stars.svg`" width="128" height="22" alt="5-star rating" class="inline-block" /> 
          </div>
          <div class="text-blue-500 uppercase text-lg">{{ item.label }}</div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<style scoped>
.bg-dark-600 {
  background-color: rgb(21 22 47 / .5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
