<!-- layouts/admin.vue -->
<template>
  <div id="admin-layout" class="w-full bg-gray-200 dark:bg-[#18181B]  min-h-screen ">

    <Title> {{ route.meta.title || '' }}</Title>
    <div class="flex  relative">
      <VnwaSidebar />
      <div class="w-full">
        <VnwaHeader />

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
  </div>
</template>
<script lang="ts" setup>
import '~/assets/css/admin.css'
const route = useRoute()


</script>
<style>
header {
  height: 60px;
}
</style>