<script lang="ts" setup>
import { VnwaMediaModalPanel } from '#components';

const { $storage } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
  maxImage: { // Giới hạn số lượng ảnh
    type: Number,
    default: null, // Mặc định không giới hạn
  }
});
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const overlay = useOverlay();
const modal = overlay.create(VnwaMediaModalPanel);

const openVMedia = async () => {
  if (props.maxImage && value.value.length >= props.maxImage) {
    alert(`Bạn chỉ có thể chọn tối đa ${props.maxImage} ảnh!`);
    return;
  }

  modal.open({
    isSelect: true,
    onSuccess(data) {
      let newImages = data.map(img => img.path);

      // Giới hạn số lượng ảnh nếu vượt quá maxImage
      if (props.maxImage) {
        let remainingSlots = props.maxImage - value.value.length;
        newImages = newImages.slice(0, remainingSlots);
      }

      value.value = [...value.value, ...newImages];
      modal.close();
    }
  });
};

const removeImage = (index: number) => {
  value.value = value.value.filter((_, i) => i !== index);
};

// Hàm cập nhật vị trí sau khi kéo thả
const updateOrder = (event: any) => {
  // console.log("Order updated:", event);
};
</script>

<template>
  <div class="flex flex-wrap gap-4 border border-gray-300 dark:border-gray-300/50 p-4 rounded-md">
    <draggable v-model="value" @end="updateOrder" item-key="index" class="flex flex-wrap gap-4">
      <template #item="{ element: item, index }">
        <div class="relative cursor-move">
          <div class="w-40 h-20 flex items-center justify-center border rounded-md overflow-hidden">
            <img :src="$storage(item)" class="h-auto w-auto max-h-full max-w-full" alt="Uploaded image">
          </div>
          <UTooltip text="Delete" class="absolute top-0 right-0 -m-2">
            <UButton  aria-label="Vinawebapp Button"  type="button" color="error" icon="i-heroicons-x-mark-20-solid" size="xs" variant="solid"
              class="rounded-full" @click="removeImage(index)" />
          </UTooltip>
        </div>
      </template>
    </draggable>

    <!-- Nút mở VMedia để chọn ảnh -->
    <div v-if="!props.maxImage || value.length < props.maxImage"
      class="w-40 h-20 flex items-center justify-center border-dashed border-2 rounded-md cursor-pointer"
      @click="openVMedia">
      <UIcon name="material-symbols:add-photo-alternate-outline" class="size-8 text-gray-500" />
    </div>
  </div>
</template>

<style scoped>
/* Để item có hiệu ứng kéo thả mượt hơn */
::v-deep(.sortable-ghost) {
  opacity: 0.5;
  background: #ddd;
}
</style>
