<script lang="ts" setup>

definePageMeta({
  middleware: ['guest-admin'],
  layout: false,
});

useSeoMeta({
  title: 'Admin Login',
})
</script>
<template>
  <UCard class="w-full max-w-md mx-auto my-20">
    <h1 class="text-3xl font-black mb-6 leading-tight tracking-tight">Log In</h1>
    <VnwaAuthLogin />
  </UCard>
</template>
