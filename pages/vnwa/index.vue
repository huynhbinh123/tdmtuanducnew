<script setup lang="ts">
definePageMeta({
  middleware: async () => {
    const localePath = useLocalePath()
    return navigateTo(localePath('/vnwa/dashboard'))
  }
})
</script>

<template></template>
