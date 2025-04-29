<template>
  <div>
    <TreeItem
      v-for="item in treeData"
      :key="item.id"
      :item="item"
      :checked-ids="checkedIds"
      @toggle-check="handleToggle"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import TreeItem from './TreeItem.vue'

export interface TreeNode {
  id: number
  name: string
  children: TreeNode[]
  parent?: TreeNode | null
}

const props = defineProps<{
  treeData: TreeNode[]
  modelValue: number[]  // Nhận checkedIds từ bên ngoài
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void  // Để gửi giá trị checkedIds ra ngoài
}>()

// Dùng ref để lưu checkedIds nội bộ, bắt đầu với modelValue (checkedIds từ ngoài)
const checkedIds = ref(new Set<number>(props.modelValue))

// Đồng bộ lại khi checkedIds thay đổi
watch(checkedIds.value, (val) => {
  console.log(Array.from(val))  // In ra giá trị checkedIds mỗi khi thay đổi
  emit('update:modelValue', Array.from(val))  // Cập nhật giá trị mới về cho cha
})

// Đồng bộ lại khi modelValue thay đổi từ bên ngoài
watch(
  () => props.modelValue,
  (newVal) => {
    // Cập nhật checkedIds khi modelValue thay đổi (lần đầu tiên hoặc cập nhật từ ngoài)
    if (JSON.stringify([...newVal]) !== JSON.stringify(Array.from(checkedIds.value))) {
      checkedIds.value = new Set(newVal)
    }
  },
  { immediate: true }
)

const handleToggle = (payload: { item: TreeNode; checked: boolean }) => {
  if (payload.checked) {
    checkedIds.value.add(payload.item.id)
    checkAllChildren(payload.item)
    checkAllParents(payload.item)
  } else {
    checkedIds.value.delete(payload.item.id)
    uncheckAllChildren(payload.item)
  }
}

function checkAllChildren(item: TreeNode) {
  for (const child of item.children || []) {
    checkedIds.value.add(child.id)
    checkAllChildren(child)
  }
}

function uncheckAllChildren(item: TreeNode) {
  for (const child of item.children || []) {
    checkedIds.value.delete(child.id)
    uncheckAllChildren(child)
  }
}

function checkAllParents(item: TreeNode) {
  if (!item.parent) return
  checkedIds.value.add(item.parent.id)
  checkAllParents(item.parent)
}

</script>
