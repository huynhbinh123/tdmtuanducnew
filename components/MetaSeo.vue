<script setup>
const props = defineProps({
 name: {
  type: String,
  default: ''
 },
 title: {
  type: String,
  default: 'Website Design Years Ahead of Its Time'
 },
 desc: {
  type: String,
  default: 'Are you ready for a new, beautiful, and efficient website? We, your professional web design team, are waiting for your request.'
 },
 image: {
  type: String,
  default: ''
 },
});
const config = useRuntimeConfig();

</script>
<template>
 <div>

  <Head>
   <Title> {{ props.name?   props.name  :  props.title }} </Title>
   <Meta name="og:image" :content="props.image ? props.image : '/img/favicon.png'" />
   <Meta name="og:title" :content="props.title + ' | Vinawebapp.com '" />
   <Meta name="og:description" :content="props.desc" />
   <Meta property="og:image" :content="props.image ? props.image : '/img/favicon.png'" />
   <Meta property="og:title" :content="props.title + ' | Vinawebapp.com '" />
   <Meta property="og:description" :content="props.desc" />
   <Meta name="image" :content="props.image ? props.image : '/img/favicon.png'" />
   <Meta name="title" :content="props.title + ' | Vinawebapp.com '" />
   <Meta name="description" :content="props.desc" />
   <Meta property="image" :content="props.image ? props.image : '/img/favicon.png'" />
   <Meta property="title" :content="props.title + ' | Vinawebapp.com '" />
   <Meta property="description" :content="props.desc" />

  </Head>
 </div>
</template>


<style></style>