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
    content: 'lg:w-48 w-36',
    item: ' cursor-pointer '
  }">
    <UButton color="vnwa" class="uppercase gap-1 font-bold text-white" variant="link">
      <UIcon name="material-symbols:globe" class="lg:size-6 size-4" />
      <span class="lg:text-base text-xs">{{ locale }}</span>
    </UButton>
  </UDropdownMenu>
</template>
