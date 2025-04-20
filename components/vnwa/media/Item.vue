<template>
  <div>
    <div :class="[
      'py-3 border-2 px-1 text-black dark:text-white transition-all rounded-md relative', // Lớp cố định
      {
        'bg-black/10 dark:bg-gray-100/10 border-blue-300': isOpen || selected, // Điều kiện
        'border-black/10 dark:border-white/10 hover:border-blue-300 dark:hover:bg-gray-100/10': !isOpen && !selected // Mặc định
      }
    ]" @contextmenu.prevent="onContextMenu">
      <div class=" cursor-pointer">

        <div class="item-avatar flex items-center justify-center relative h-20 overflow-hidden">

          <div class="absolute top-0 right-0" v-show="selected">
            <UIcon name="fa6-solid:circle-check" class="text-blue-400 w-6 h-6" />
          </div>
          <!-- Hiển thị icon nếu không phải là ảnh -->
          <template v-if="isNotImage">
            <UIcon v-if="data.type === 'dir'" name="i-fa6-solid:folder" class="w-20 h-20 text-blue-500" />
            <UIcon v-else-if="data.type === 'document'" name="fa6-solid:file-lines" class="w-20 h-20 text-green-500" />
            <UIcon v-else-if="data.type === 'video'" name="i-fa6-solid:film" class="w-20 h-20 text-yellow-500" />
            <UIcon v-else name="i-fa6-solid:file-circle-question" class="w-20 h-20 text-gray-500" />
          </template>

          <!-- Hiển thị ảnh nếu là ảnh -->
          <div v-else>
            <img :src="$storage(data.path)" :alt="data.name" width="50" class="max-w-full max-h-full w-auto h-auto" />

          </div>
        </div>

        <!-- Tên tệp tin/thư mục -->
        <div class="px-2 line-clamp-1 text-xs mt-2 text-center ">
          {{ data.name }}
        </div>
      </div>

      <UContextMenu v-model="isOpen" :virtual-element="virtualElement" :popper="{ offset: 0 }">
        <div class="p-2 text-xs">
          <slot />
        </div>
      </UContextMenu>
    </div>
  </div>
</template>

<script setup>
import { useMouse, useWindowScroll } from '@vueuse/core'
const { $storage } = useNuxtApp();

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const isOpen = ref(false)
const virtualElement = ref({ getBoundingClientRect: () => ({}) })

function onContextMenu() {
  const top = unref(y) - unref(windowY)
  const left = unref(x)

  virtualElement.value.getBoundingClientRect = () => ({
    width: 0,
    height: 0,
    top,
    left
  })

  isOpen.value = true
}
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});



const isNotImage = computed(() => props.data.type !== 'image');


</script>

<style scoped></style>
