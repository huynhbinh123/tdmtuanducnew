<script setup lang="ts">

interface Item {
  icon: string;
  label: string;
  desc: string;
  animateColor?: string;
}
const sectionWhyMeItems = ref<Item[]>([
  {
    icon: 'emojione:computer-mouse',
    label: 'Technical Expertise',
    desc:
      "We have a team with over 10+ years of experience, and we understand this field thoroughly. You can rely on our expertise and rest assured that you'll have an outstanding website.",
    animateColor: 'bg-slate-500',
  },
  {
    icon: 'emojione:calendar',
    label: 'Clear Timeline',
    desc:
      "We have a meticulously laid out project timeline to maintain preparedness. At any given time, you'll know where we are, what the next steps are, who's responsible, and the projected final launch date.",
    animateColor: 'bg-red-500',
  },
  {
    icon: 'icon-park-outline:message-success',
    label: 'Quick Communication',
    desc:
      "Maintain close communication throughout the web design project. We're always available for calls and daily meetings.",
    animateColor: 'bg-green-500',
  },
  {
    icon: 'emojione:pen',
    label: 'Quality Content',
    desc:
      'We believe in having good written content to shape website design, so every project we engage in includes a professional content editor.',
    animateColor: 'bg-blue-500',
  },
  {
    icon: 'emojione-v1:locked',
    label: 'No Hidden Costs',
    desc:
      'When we quote a price for your website, we adhere to it. No surprises, no hidden fees. Just honest work with a reasonable cost.',
    animateColor: 'bg-yellow-500',
  },
  {
    icon: 'icon-park:reload',
    label: 'Easy Updates',
    desc:
      'We build websites on an easy-to-use content management system, Vinawebapp Admin, and provide detailed training, making it easy for you to make changes to your website.',
    animateColor: 'bg-orange-500',
  },
]);
</script>
<template>
  <div>

    <div class="process">
      <img src="~/assets/images/process_bg.jpg" class="w-full h-auto opacity-25 absolute -top-20 "
        alt="Vinawebapp.com" />
      <div class=" w-full   py-3 pt-10">
        <div class="section-sub-text color-blue text-center  md:mb-5 mb-3">Process</div>
        <div class="  text-center section-text ">Our web development process</div>
        <h3 class="md:text-xl  text-base text-gray-100/60 text-center   md:mb-5 mb-3  lg:pr-20  ">Great work doesn’t
          have to be complicated.</h3>
      </div>

      <div class="relative page-padding page-hover  py-10  ">
        <div class=" w-full   py-3 pt-10">
          <div class="  text-center section-text ">What makes a good website design project? </div>
        </div>
        <UContainer>
          <div class="grid grid-cols-12 gap-4 py-20">


            <div v-for="(item, index) in sectionWhyMeItems" :key="index"
              class="lg:col-span-4 sm:col-span-6 col-span-12">
              <FeatureCardItem :data="item" />
            </div>


          </div>
        </UContainer>

      </div>
      <div class="divider"></div>
      <div class="page-padding">
        <div class=" w-full   py-3 pt-10 ">
          <div class="section-sub-text color-blue text-center  md:mb-5 mb-3">Process</div>
          <div class="  text-center section-text ">The website development process at Vinawebapp.com</div>
        </div>
        <!-- <div class="pb-20">

      <SectionSlideProcess v-if="!pending" :data="data" />

    </div> -->
      </div>
      <div class="divider "></div>


    </div>



  </div>
</template>


<style></style>