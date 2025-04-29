<template>
  <div class="ml-2 mt-3">
    <label class="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        :checked="checkedIds.has(item.id)"
        @change="onToggle"
        class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span class="text-lg  text-gray-700 dark:text-white">{{ item.name }}</span>
    </label>

    <div class="ml-2">
      <VnwaTreeItem
        v-for="child in item.children"
        :key="child.id"
        :item="childWithParent(child)"
        :checked-ids="checkedIds"
        @toggle-check="emit('toggle-check', $event)"
      />
    </div>
  </div>
</template>


<script lang="ts" setup>
import type { TreeNode } from '~/type';


const props = defineProps<{
  item: TreeNode
  checkedIds: Set<number>
}>()

const emit = defineEmits<{
  (e: 'toggle-check', payload: { item: TreeNode; checked: boolean }): void
}>()

const onToggle = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  emit('toggle-check', { item: props.item, checked })
}

function childWithParent(child: TreeNode): TreeNode {
  return {
    ...child,
    parent: props.item,
  }
}
</script>
