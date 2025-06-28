<template>
    <VnwaTreeView :tree-data="data" v-model="localCheckedCategoryIds" />
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps<{
    modelValue: number[] // nhận từ cha qua v-model
  }>()
  
  const emit = defineEmits<{
    (e: 'update:modelValue', value: number[]): void
  }>()
  
  // Biến nội bộ để reactive
  const localCheckedCategoryIds = ref<number[]>([...props.modelValue])
  
  // Đồng bộ từ props -> nội bộ (khi cha thay đổi)
  watch(
    () => props.modelValue,
    (val) => {
      if (JSON.stringify(val) !== JSON.stringify(localCheckedCategoryIds.value)) {
        localCheckedCategoryIds.value = [...val]
      }
    },
    { immediate: true }
  )
  
  // Đồng bộ nội bộ -> emit cho cha
  watch(
    localCheckedCategoryIds,
    (val) => {
      emit('update:modelValue', val)
    },
    { deep: true }
  )
  
  interface TreeNode {
    id: number
    name: string
    children: TreeNode[]
    parent?: TreeNode | null
  }
  
  const { locale } = useI18n()
  const { data } = useHttp<TreeNode[]>('vnwa/load-data-tree-blog-categories', {
    params: {
      locale: locale.value
    }
  })
  </script>
  