<script lang="ts" setup>
definePageMeta({
  middleware: ["role-admin"],
  layout: 'admin',
});


</script>
<template>
 <div>
  <NuxtPage class="col-span-10 md:col-span-8" />
 </div>
</template>
