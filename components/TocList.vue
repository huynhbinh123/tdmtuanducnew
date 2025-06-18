<template>
 <div>
  <ul class="blog_content_ul">
   <li v-for="(item,index) in items" :key="index" class="text-white/70 font-bold mb-2 ">
    <a :href="'#' + item.id" class="hover:text-purple-500">
     {{ item.content }}
    </a>
    <TocList class="ms-5 mt-1 w-full" v-if="item.subheadings.length" :items="item.subheadings" />
   </li>
  </ul>
 </div>

</template>

<script setup>
const props = defineProps({
 items: {
  default: [],
  type: Array
 }
});
</script>

<style></style>