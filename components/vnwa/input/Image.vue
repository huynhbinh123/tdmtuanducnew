<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '5xl'
  },
  resize: {
    type: Array,
    default: () => [0, 0]
  }
})
const emit = defineEmits(["update:modelValue"]);
import { VnwaMediaModalPanel } from '#components'

const { $storage } = useNuxtApp();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {

    const [width, height] = props.resize;

let updatedValue = value;

// Nếu width và height khác 0, thêm chúng vào dưới dạng query string
if (width && width !== 0) {
  updatedValue += `?width=${width}`;
}

if (height && height !== 0) {
  updatedValue += width ? `&height=${height}` : `?height=${height}`;
}
console.log(updatedValue)
    emit("update:modelValue", updatedValue);
  },
});

const inputRef = ref();
const loading = ref(false);
const overlay = useOverlay()
const modal = overlay.create(VnwaMediaModalPanel)

const openVMedia = async () => {

  modal.open({
    isSelect: true,
    onSuccess(data) {
      
      value.value = data[0].path;
      modal.close()
    }
  })
};
</script>
<template>
  <div
    class="relative flex items-center justify-center w-32 h-20 border border-gray-300 rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700">
    <div v-if="!value" class="flex items-center justify-center w-full h-full">
      <UIcon name="material-symbols:add-photo-alternate-outline" class="text-gray-500 text-3xl" />
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <img :src="$storage(value)" class="object-cover max-w-full max-h-full" alt="Vnwa Image">
    </div>

    <!-- Upload button -->
    <UTooltip text="Open Vmedia Manager" class="absolute top-1 end-1" :delay-duration="0">
      <UButton type="button" color="primary" icon="i-heroicons-cloud-arrow-up" size="xs" variant="solid"
        class="rounded-full" :loading="loading" @click="openVMedia" />
    </UTooltip>

    <!-- Delete button -->
    <UTooltip text="Delete" class="absolute bottom-1 end-1" :delay-duration="0">
      <UButton type="button" color="error" icon="i-heroicons-x-mark-20-solid" size="xs" variant="solid"
        class="rounded-full" :disabled="loading" @click="value = ''" />
    </UTooltip>

    <input ref="inputRef" type="text" class="hidden" />
  </div>
</template>
