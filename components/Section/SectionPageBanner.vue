<template>
 <div>
  <div class="section-page-banner">
   <div v-if="url_bg" class="bg" :style="{ 'background-image': `url('${url_bg}')` }"></div>
   <div v-else class="bg" style="background-image:url('/bg_banner.jpg');"></div>
   <div class=" w-full page-padding  py-3 pt-10">
    <div class="section-sub-text color-blue text-center  md:mb-5 mb-3">{{ page_name }}</div>
    <h1 class="  text-center  ">{{ title }}</h1>
    <h3 class="md:text-xl  text-base text-gray-100/60 text-center   md:mb-5 mb-3  lg:pr-20 p-2  ">{{ desc }} </h3>
   </div>
  </div>

 </div>
</template>
<script>
export default {
 props: {
  url_bg: String,
  page_name: String,
  title: String,
  desc: String,
 },
 setup() {
  const config = useRuntimeConfig();
  return {
   config
  }
 }
}
</script>
<style lang="css">
.section-page-banner {
 width: 100%;
 height: 400px;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;
}

.section-page-banner>.bg {
 position: absolute;
 top: -100px;
 right: 0;
 width: 100%;
 height: 500px;
 background: black;
 background-size: 100%;
 background-position: center;
 opacity: 0.1;
 z-index: -1;
}

@media only screen and (max-width: 500px) {
 .section-page-banner {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
 }

 .section-page-banner>.bg {
  position: absolute;
  top: -100px;
  right: 0;
  width: 100%;
  height: 500px;
  background: black;
  background-size: auto;
  background-position: center;
  opacity: 0.1;
  z-index: -1;
 }
}
</style>