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
  <div class="relative page-hover  min-h-[50vh] bg-2">
    <UContainer>

      <div class="w-full py-3 pt-10 mb-10 text-center">
        <PrimaryHeding>WHAT CUSTOMERS SAY</PrimaryHeding>
        <SubHeding>
          We are proud to have worked with many clients who have shared their experiences with us. Here are some of
          their testimonials.
        </SubHeding>
      </div>

      <div class="max-w-3xl mx-auto">
        <UCarousel v-slot="{ item }" :items="data" :autoplay="{ delay: 2000 }" :snap="true" class="w-full">
          <div class="testimonial-card text-center bg-dark-600 p-6 rounded-lg">
            <h5 class="text-white/80 ">“{{ item.content }}”</h5>
            <div class="sm:my-6 my-4">
              <NuxtImg :src="`${config.public.appUrl}/images/stars.svg`" width="128" height="22" alt="5-star rating"
                class="inline-block" />
            </div>
            <div class="text-blue-500 uppercase "><h6>
              {{ item.label }}
            </h6></div>
          </div>
        </UCarousel>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.bg-dark-600 {
  background-color: rgb(21 22 47 / .5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
