<script setup lang="ts">
definePageMeta({
  middleware: async () => {
    const localePath = useLocalePath()
    return navigateTo(localePath('/b/all-blogs'))
  }
})
</script>

<template></template>
