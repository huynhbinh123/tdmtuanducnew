<template>
  <div class="bg-1 page-hover">

    <UContainer >
      <div class=" w-full   py-3 pt-10 mb-10">
        <PrimaryHeding class="text-center">{{ t('why_me_section.title') }}</PrimaryHeding> 
        <SubHeding class="text-center">{{ t('why_me_section.slogan') }}</SubHeding>
      </div>
      <div class="grid grid-cols-12 gap-4 py-20">




        <div class="lg:col-span-4 sm:col-span-6 col-span-12 " :class="{ 'lg:-translate-y-16': isActive(index) }"
          v-for="(item, index) in items" :key="index">

        <FeatureCardItem :data="item" />

        
        </div>


      </div>
    </UContainer>
  </div>

</template>
<script setup>
const {t} = useI18n();
const items =
  [
    {
      icon: 'emojione:military-medal',
      name: 'Many years of experience',
      desc: t('why_me_section.points.point1'),
    },
    {
      icon: 'emojione:globe-with-meridians',
      name: 'High technology',
      desc: t('why_me_section.points.point2')
    },
    {
      icon: 'emojione:airplane-departure',
      name: 'Strategic direction',
      desc: t('why_me_section.points.point3')
    },
    {
      icon: 'emojione:clinking-beer-mugs',
      name: 'Receive the ideas',
      desc: t('why_me_section.points.point4')
    },
    {
      icon: 'devicon:google',
      name: 'SEO-minded ',
      desc: t('why_me_section.points.point5'),
    },
    {
      icon: 'emojione:construction-worker-dark-skin-tone',
      name: 'High security ',
      desc: t('why_me_section.points.point6'),
    },
  ]

const isActive = (index) => (index + 1) % 3 === 2;


</script>
