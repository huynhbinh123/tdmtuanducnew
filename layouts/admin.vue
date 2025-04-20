<!-- layouts/admin.vue -->
<template>
  <div id="admin-layout" class="w-full bg-gray-200 dark:bg-[#18181B]  min-h-screen ">
    <VnwaHeader />

    <div class="flex gap-2 relative">
      <VnwaSidebar />
      <main class="w-full">
        <div class="min-h-screen py-4">

          <div class="px-5">

            <slot />
          </div>
        </div>
        <div class="w-full ">

          <VnwaFooter />
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import '~/assets/css/admin.css'
import '~/assets/css/data-table.css'


</script>
<style>
header {
  height: 60px;
}
</style>