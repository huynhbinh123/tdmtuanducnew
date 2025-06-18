<template>
  <div class="bg-1 page-hover">

    <UContainer >
      <div class=" w-full   py-3 pt-10 mb-10">
        <PrimaryHeding class="text-center">{{ title }}</PrimaryHeding> 
        <SubHeding class="text-center">{{ subTitle }}</SubHeding>
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

const title = ref('WHY VINAWEBAPP.COM?');
const subTitle = ref("We are different because");
const items =
  [
    {
      icon: 'emojione:military-medal',
      name: 'Many years of experience',
      desc: 'We have a team with more than 10+ years of experience and we pride ourselves on our sophisticated, innovative processes and continuous innovation.',
    },
    {
      icon: 'emojione:globe-with-meridians',
      name: 'High technology',
      desc: 'Vinawebapp.com always updates and innovates technologies according to new era trends. We are proud to always create major breakthroughs in customer projects in terms of benefits and profits.',
    },
    {
      icon: 'emojione:airplane-departure',
      name: 'Strategic direction',
      desc: 'We make highly strategic content and design decisions based on the data you provide to ensure that your website will deliver high returns for your project.',
    },
    {
      icon: 'emojione:clinking-beer-mugs',
      name: 'Receive the ideas',
      desc: "We value straightforward, no-nonsense communication and will always accept and adapt to our customers' helpful comments.",
    },
    {
      icon: 'devicon:google',
      name: 'SEO-minded ',
      desc: "We build high quality websites. Our websites are always SEO optimized, load fast and deliver great user experiences - All the things Google loves. ",
    },
    {
      icon: 'emojione:construction-worker-dark-skin-tone',
      name: 'High security ',
      desc: "Our team of programmers always has experience in designing highly secure websites, preventing DDOS, and hacking websites. In addition, we also handle website harassment cases for you 24/7. ",
    },
  ]

const isActive = (index) => (index + 1) % 3 === 2;


</script>
