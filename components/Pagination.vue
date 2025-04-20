<template lang="">
  <div>
    <div class="w-full flex justify-center" v-if="paginate && slug && paginate.links.length -2 > 1">
  <nav aria-label="Page navigation example">
  <ul class="flex items-center -space-x-px h-10 text-base" v-if="paginate.links  ">
   
    <li v-if="paginate.prev_page_url">
     <NuxtLinkLocale :to="slug+ paginate.prev_page_url" @click="$emit('change', splitString(paginate.prev_page_url))" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
       <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
       </svg>
     </NuxtLinkLocale>
    </li>
    
    <li v-for="(item, index) in paginate.links" :key="index"> 
      <div v-if="index !== 0  && index !== paginate.links.length - 1 ">
       <div v-if="paginate.total <= 6">
        <NuxtLinkLocale :to="slug+ item.url" @click="$emit('change', splitString(item.url))"   v-if="index !== 0  && index !== paginate.links.length - 1 " :class="{'dark:bg-purple-700 dark:text-white/100':item.active }"  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          {{ item.label }}
        </NuxtLinkLocale>
       </div>
        <div v-else>
          <div v-if="item.label == paginate.current_page || item.label ==  paginate.current_page + 1  || item.label ==  paginate.current_page - 1 || item.label ==  splitString(paginate.first_page_url)   || item.label ==  splitString(paginate.last_page_url)"> 
            <NuxtLinkLocale :to="slug+ item.url" @click="$emit('change', splitString(item.url))"  :class="{'dark:bg-purple-700 dark:text-white/100':item.active }"  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {{ item.label }}
             </NuxtLinkLocale>
          </div>
          
        </div>
      </div>
    </li>
   
    <li>
      <NuxtLinkLocale  v-if="paginate.next_page_url"  :to="slug+ paginate.next_page_url" @click="$emit('change', splitString(paginate.next_page_url))" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span class="sr-only">Next</span>
        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </NuxtLinkLocale>
    </li>
  </ul>
</nav>
</div>

  </div>

  


 
 
</template>
<script setup>
defineProps({
  paginate: Object,
  slug: String,
});
function splitString(string) {
  const $ar = string.split("=")
  return $ar[1];
};

defineEmits(['change']);

</script>
<style lang="">
 
</style>