<template>
  <div class="bg-1 page-hover">

    <UContainer >
      <div class=" w-full   py-3 pt-10">
        <div class="section-sub-text color-blue text-center  md:mb-5 mb-3">{{ title }}</div>
        <div class="  text-center section-text ">{{ subTitle }}</div>
      </div>
      <div class="grid grid-cols-12 gap-4 py-20">




        <div class="lg:col-span-4 sm:col-span-6 col-span-12 " :class="{ 'lg:-translate-y-16': isActive(index) }"
          v-for="(item, index) in items" :key="index">
          <div class="h-full">
            <div class="section_why_me_item">
              <div class="icon">
                <UIcon :name="item.icon" class="size-20" />
              </div>
              <div class="text-xl text-white font-bold mb-3 text-center">{{ item.name }}</div>
              <div class="text-base text-center text-white/80 p-3">{{ item.desc }}</div>
            </div>
          </div>
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
<style>
.section_why_me_item {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: rgb(255 255 255 / .1);
  background-color: rgb(21 22 47 / .5);
  padding: 20px 15px;
}

.section_why_me_item:hover {
  transform: translateY(-0.5rem);
  cursor: pointer;
  background: linear-gradient(to bottom, #8d329f, #5b8dcd);
  background-size: cover;
  background-blend-mode: overlay;
  transition: all 0.5s;

}

.section_why_me_item .icon {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.section_why_me_item .icon svg {
  width: 50px;
  height: 50px;
}
</style>