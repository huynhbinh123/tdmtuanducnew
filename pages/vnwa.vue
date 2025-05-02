<script lang="ts" setup>
definePageMeta({
  middleware: ["auth-admin"],
  layout: "vnwa",
});


</script>
<template>
  <div>
    <NuxtPage />

  </div>
</template>