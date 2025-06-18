<template>
 <div>
  <div class="grid grid-cols-12 gap-4">
   <div v-for="(item, index) in props.data" :key="index" class="md:col-span-4 col-span-6 mb-5 bg-card">
    <NuxtLinkLocale :to="props.url + '/' + item.slug">
     <div class=" block h-full bg-card2 md:rounded-2xl rounded-xl  opacity-[85%] hover:opacity-100 cursor-pointer md:p-4 p-2 ">
      <div class="">
       <div class=" flex justify-start item-center md:h-44 h-20">
        <Image class="block md:rounded-lg rounded  xs:mx-auto w-auto h-full max-h-full m-auto" width="100" height="200" :src="item.url_avatar" :srcset="item.url_avatar + ' 768w,' + item.url_avatar_mobile + ' 1200w,'" sizes="(min-width:768px) 365px, 100vw" :alt="'vinawebapp.com - ' + item.name" />
       </div>
       <div class="">
        <div class="lg:py-5 md:pr-3">

         <h3 class="text-white  font-header font-semibold md:pb-2  mt-1 md:text-xl text-sm blog-item-title">{{ item.name }}
          <Icon name="mdi-light:arrow-right" class="ml-2  " />
         </h3>
         <div class="blog-item-desc">
          <p class="text-white/70  md:text-sm text-xs">{{ item.desc }}</p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </NuxtLinkLocale>
   </div>
  </div>
 </div>
</template>

<script setup>
const config = useRuntimeConfig();

const props = defineProps({
 data: Object,
 url: String
});
const route = useRoute();

</script>

<style>
.blog-item-title {
 max-height: 80px;
 overflow: hidden;
 display: block;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 3;
}

.blog-item-desc {
 max-height: 72px;
 overflow: hidden;
 display: block;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 3;
}

@media screen and (max-width: 480px) {
 .blog-item-title {
  max-height: 40px;
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-bottom: 5px;
 }
}
</style>