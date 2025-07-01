<script lang="ts" setup>
import { VnwaMediaModalPanel } from '#components'
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
const { $storage } = useNuxtApp();



const inputRef = ref();
const loading = ref(false);
const overlay = useOverlay()
const modal = overlay.create(VnwaMediaModalPanel)
const value = computed({
  get() {
return props.modelValue;
  },
  set(value) {
    let updatedValue = value;

    if (!updatedValue) {
      updatedValue = '';
    }else{

    const [width, height] = props.resize;


    // // Nếu width và height khác 0, thêm chúng vào dưới dạng query string
    // if (width && width !== 0) {
    //   updatedValue += `?width=${width}`;
    // }

    // if (height && height !== 0) {
    //   updatedValue += width ? `&height=${height}` : `?height=${height}`;
    // }
  }

    emit("update:modelValue", updatedValue);
  },
});
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
  <div>
  <ClientOnly>
    <div
      class="relative flex items-center justify-center w-32 h-20 border border-gray-300 rounded-lg rounded-b-none overflow-hidden bg-gray-300 dark:bg-gray-700">
      <div v-if="!value" class="flex items-center justify-center w-full h-full">
        <UIcon name="material-symbols:add-photo-alternate-outline" class="text-gray-500 text-3xl" />
      </div>
      <div v-else class="w-full h-full flex items-center justify-center">
        <img :src="$storage(value)" class="object-cover max-w-full max-h-full" alt="Vnwa Image">
      </div>
      <!-- Upload button -->
      <UTooltip text="Open Vmedia Manager" class="absolute top-1 end-1" :delay-duration="0">
        <UButton  aria-label="Vinawebapp Button"  type="button" color="primary" icon="i-heroicons-cloud-arrow-up" size="xs" variant="solid"
          class="rounded-full" :loading="loading" @click="openVMedia" />
      </UTooltip>

      <!-- Delete button -->
      <UTooltip text="Delete" class="absolute bottom-1 end-1" :delay-duration="0">
        <UButton  aria-label="Vinawebapp Button"  type="button" color="error" icon="i-heroicons-x-mark-20-solid" size="xs" variant="solid"
          class="rounded-full" :disabled="loading" @click="value = ''" />
      </UTooltip>

    </div>
    <input v-model="value" ref="inputRef" placeholder="Paste URL Image" class=" w-32 text-xs border border-gray-300 border-t-amber-50 px-1 py-1 rounded rounded-t-none" type="text" />

  </ClientOnly>
  </div>

</template>
