<template>
 <div class="relative page-hover sectionSlideProcess py-10 bg-2">


  <swiper :effect="'coverflow'" :spaceBetween="30" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
   rotate: 50,
   stretch: 0,
   depth: 100,
   modifier: 1,
   slideShadows: true,
  }" :autoplay="{ delay: 2500, disableOnInteraction: false, }" :pagination="true" :modules="modules" class="mySwiper">



   <swiper-slide v-for="item, index in data">
    <div class="flex items-center ">
     <div class="w-full">
      <div class="testimonial-card">

       <div class="sm:my-10 my-5 text-center flex items-center justify-center">
        <div class="relative">
         <div class="animate-glow absolute bg-blue-500/40 top-10 right-0 left-0 w-32 h-32  "> </div>
         <Image :src="item.url_avatar"  />
        </div>
       </div>
       <div class="text-white/90 font-bold text-center uppercase lg:text-2xl text-xl mb-5">{{ index + 1 }}. {{ item.name }}</div>

       <div class="text-formatting  text-center text-white/90 px-5">
        <p class="lg:text-xl text-base">“{{ item.desc }}”</p>
       </div>
      </div>

     </div>
    </div>
   </swiper-slide>


  </swiper>

 </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Image from '../Image.vue';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default {
 props: {
  data: {
   type: Object,
   default: {}
  }
 },
 components: {
  Swiper,
  SwiperSlide,Image,
 },
 setup() {
  return {
   modules: [EffectCoverflow, Pagination, SwiperAutoplay]
  };
 },
};
</script>
<style scoped>
.sectionSlideProcess .swiper {
 width: 100%;
 padding-top: 50px;
 padding-bottom: 50px;
}

.sectionSlideProcess .swiper-slide {
 background-position: center;
 background-size: cover;
 width: 700px;
 min-height: 250px;
 height: 100%;
 border-radius: 0.5rem;
 border-width: 1px;
 border-color: rgb(255 255 255 / .1);
 background-color: rgb(21 22 47 / .5);
 padding: 15px;
}

.sectionSlideProcess .swiper-slide img {
 height: 200px;
 width: auto;
}

@media (max-width: 500px) {
 .sectionSlideProcess .swiper {
  width: 100%;
  padding-top: 10px;

 }

 .sectionSlideProcess .swiper-slide {

  width: 100%;
  min-height: 250px;

 }
}
</style>