<template>
  <div>
    <UBreadcrumb :links="links" class="mb-5" />

    <VnwaMediaPanel />
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'VMedia '
})
const links = [{
  label: 'Dashboard',
  icon: 'i-heroicons-home',
  to: '/dashboard'
}, {
  label: 'VMedia',
  icon: 'material-symbols:folder'
}]
</script>

<style></style>
