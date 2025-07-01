<script lang="ts" setup>
const overlay = useOverlay()
const emit = defineEmits(['success']);
const data = ref<any[]>([]); // Khởi tạo với kiểu mảng
defineProps({
  isSelect: {
    type: Boolean,
    default: false
  }
})
function onSuccess() {
  if (data.value.length > 0) {
    // console.log('ádgasdg', data.value)
    emit('success', data.value); // Truyền giá trị `data` ra ngoài
  }
}

const handleSelected = (arr: any[]) => {
  data.value = arr; // Cập nhật dữ liệu được chọn vào `data`
};
</script>

<template>
  <UModal fullscreen title="VMedia Manager" :close="{
    color: 'primary',
    variant: 'outline',
    class: 'rounded-full'
  }">

    <template #body>
      <VnwaMediaPanel :isSelect="true" @onMediaSelected="handleSelected" />
      <div>
        <div class="flex items-center justify-end space-x-4">
          <div class="text-gray-600 dark:text-gray-300">
          </div>
          <UButton  aria-label="Vinawebapp Button"  @click="onSuccess" square variant="solid" :disabled="data.length === 0"
            class="font-bold dark:text-white notOutSide">
            Insert Images
          </UButton>
        </div>
      </div>

    </template>


  </UModal>
</template>
