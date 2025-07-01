<template>
  <div class="bg-1 page-hover">

    <UContainer>
      <div class=" w-full   py-3 pt-10 mb-10">
        <PrimaryHeding class="text-center">{{ t('why_me_section.title') }}</PrimaryHeding>
        <SubHeding class="text-center">{{ t('why_me_section.slogan') }}</SubHeding>
      </div>
      <div class="grid grid-cols-12 gap-4 py-20">




        <div class="lg:col-span-4 sm:col-span-6 col-span-12 " :class="{ 'lg:-translate-y-16': isActive(index) }"
          v-for="(item, index) in data" :key="index">

          <FeatureCardItem :data="item" />


        </div>


      </div>
    </UContainer>
  </div>

</template>
<script lang="ts" setup>
interface T {
  icon: string;
  label: string;
  desc: string;
}
const { t } = useI18n();
defineProps<{
  data: T[]
}>();

const isActive = (index) => (index + 1) % 3 === 2;


</script>
