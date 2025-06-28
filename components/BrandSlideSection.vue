<script setup lang="ts">
interface BrandSectionItem {
  label: string;
  image: string;
  to: string;
}


defineProps<{
  data: BrandSectionItem[];
}>();


</script>




<template>
   <div class=" page-hover">
      <UContainer>
         <div class="divide flex items-center  gap-6 justify-between">

            <div>
               <h4 class="text-white/80 uppercase font-semibold tracking-widest min-w-[120px]  sm:pb-3 sal-animate">Trusted By </h4>

            </div>
            <div>
               <UCarousel v-slot="{ item }" loop auto-scroll :items="data" :ui="{ item: 'lg:basis-1/6 basis-1/3' }">
                  <div class="flex items-center justify-center ">
                    <NuxtLinkLocale :to="item.to" aria-label="Brand" class="filter grayscale hover:grayscale-0 cursor-pointer">
                     <NuxtImg quality="80" format="webp" loading="lazy" width="100" height="100" :src="item.image"
                        sizes="(min-width:768px) 365px, 100vw" class="block rounded-lg w-full h-auto xs:mx-auto"
                        :alt="'vinawebapp.com - ' + item.label" />
                    </NuxtLinkLocale>
                  </div>
               </UCarousel>
            </div>
         </div>
        
      </UContainer>

   </div>
</template>


<style scoped></style>