<template>
  <div
    class="relative text-black capitalize dark:text-white bg-white dark:bg-zinc-950  divide-y divide-gray-200 dark:divide-gray-500/50 ring-1 ring-gray-300 dark:ring-2 dark:ring-gray-500/20 rounded shadow">
    <div v-if="isLoading">
      <VnwaLoading />
    </div>

    <div v-if="$slots.header" class="px-2 py-2 text-xl flex items-center justify-between  font-bold  sm:px-4">

      <slot name="header" />
    </div>
    <div class="px-2 py-5 sm:p-6">

      <slot />
    </div>
    <div v-if="$slots.footer" class="px-2 py-4 sm:px-4 flex items-center justify-end gap-4">

      <slot name="footer" />
    </div>

  </div>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style></style>