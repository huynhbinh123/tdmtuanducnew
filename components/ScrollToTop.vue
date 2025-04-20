<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const scrollRotate = ref(0);
const scrollPercent = ref(0);
const showButton = ref(false);

const scrollFunction = () => {
 const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
 const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 scrollRotate.value = (scrollTop / scrollHeight);
 scrollPercent.value = Math.round((scrollTop / scrollHeight) * 100);
 showButton.value = scrollPercent.value > 9;
};
// const scrollFunction = () => {
//  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//  scrollPercent.value = (scrollTop / scrollHeight);
//  showButton.value = scrollPercent.value > 0.25; // Only show button after scrolling 25% down

// };
const scrollToTop = () => {
 window.scrollTo({
  top: 0,
  behavior: 'smooth'
 });
};

onMounted(() => {
 window.addEventListener('scroll', scrollFunction);
});

onBeforeUnmount(() => {
 window.removeEventListener('scroll', scrollFunction);
});
</script>

<template>
 <div id="scollToTop" :class="{ 'left-5': showButton, '-left-full': !showButton }" class="fixed z-auto bottom-10 transition-all rounded-full text-white  font-bold sm:text-xl text-base  " @click="scrollToTop">
  <div class="relative  flex items-center justify-center ">
   <img loading="lazy" src="~/assets/img/scrollToTopBg.png" :style="{ transform: `rotate(${scrollRotate}turn)` }" width="100" height="100" alt="Vinawebapp.com" class="absolute top-0 right-0">
   <span> {{ scrollPercent }}%</span>

  </div>
 </div>
</template>
<style scoped>
#scollToTop {
 width: 100px;
 height: 100px;
 cursor: pointer;
 z-index: 100;
}

#scollToTop>div {
 width: 100px;
 height: 100px;
}

@media (max-width: 640px) {
 #scollToTop {
  width: 70px;
  height: 70px;
  cursor: pointer;
 }

 #scollToTop>div {
  width: 70px;
  height: 70px;
 }
}
</style>