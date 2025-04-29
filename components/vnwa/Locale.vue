<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
const { setLocale, locale } = useI18n()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'English',
    icon: 'emojione:flag-england',
    onSelect(e: Event) {
      setLocale('en')
    }
  },
  {
    label: 'Tiếng Việt',
    icon: 'emojione:flag-for-vietnam',
    onSelect(e: Event) {
      setLocale('vi')
    }
  }
])

</script>

<template>
  <UDropdownMenu arrow :items="items" :ui="{
    content: 'w-48',
    item: ' cursor-pointer '
  }">
    <UButton :label="locale" icon="material-symbols:globe" color="vnwa" class="uppercase font-bold text-white"
      variant="link" />
  </UDropdownMenu>
</template>
