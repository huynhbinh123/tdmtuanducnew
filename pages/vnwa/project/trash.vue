<template>
  <div>
    <div class="flex items-center justify-start">
      <NuxtLinkLocale to="/vnwa/blog/post/list">

        <UButton  color="neutral" variant="subtle" label="Back To Post Manager"/>
      </NuxtLinkLocale>
    </div>
    <VnwaTrash url-data="/vnwa/blog/post/load-trash-data-table" url-delete="/vnwa/blog/post/delete"
      url-restore="/vnwa/blog/post/restore" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'Trash Post',
});
</script>
