<script setup lang="ts">
import { ref, computed } from "vue";
import draggableComponent from "vuedraggable";

const props = defineProps({
  modelValue: {
    type: Array as () => { image?: string; icon?: string; label: string; to?: string; content?: string }[],
    default: () => [],

  },
  isEditor:{
    type: Boolean,
    default: false
  },
  iconsLink: {
    type: String,
    default: ''
  },
  isIcon: {
    type: Boolean,
    default: false
  },
  isTo: {
    type: Boolean,
    default: false
  },
  isImage: {
    type: Boolean,
    default: false
  },
  isContent: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const expandedIndex = ref<number | null>(null);

const addItem = () => {
  value.value.push({ image: "", label: "", to: "/", content: "" });
};

const removeItem = (index: number) => {
  value.value.splice(index, 1);
};

const toggleExpand = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};
const copyItem = (index: number) => {
  const copiedItem = { ...value.value[index] }; // Tạo bản sao của item
  value.value.splice(index + 1, 0, copiedItem); // Thêm item sao chép vào sau item gốc
};
</script>

<template>
  <div class="space-y-4 border border-gray-300 dark:border-gray-300/50 p-4 rounded-md">

    <div class="flex items-center justify-end">
      <UButton @click="addItem" :label="$t('add_link')" color="info" icon="heroicons:plus" />
    </div>
    <draggableComponent v-model="value" handle=".handle" item-key="index" class="space-y-3">
      <template #item="{ element, index }">
        <div :class="[
          'rounded-lg shadow bg-white dark:bg-gray-800 p-4',
          !element.label ? 'border border-red-400' : 'border border-gray-300 dark:border-gray-600',
        ]">
          <div class="flex items-center gap-2 justify-between">
            <!-- Icon kéo thả -->
            <div class="flex items-center justify-start gap-2">

            <UButton icon="material-symbols:drag-handle" type="button" color="neutral" size="sm"
              class="handle cursor-grab" />
            <!-- Hiển thị tên hoặc "Item {index + 1}" nếu chưa có -->
            <h3 @click="toggleExpand(index)" class="cursor-pointer flex-1 font-medium text-gray-900 dark:text-white">
              {{ element.label || `Item ${index + 1}` }}
            </h3>
              </div>
            <div class="flex items-center justify-end gap-6">
            <UTooltip text="Coppy Item">
              <UButton type="button" color="neutral" icon="material-symbols:content-copy-outline" size="sm" variant="solid"
                class="rounded-none" @click="copyItem(index)" />
            </UTooltip>
            <UTooltip text="Delete">
              <UButton type="button" color="error" icon="i-heroicons-x-mark-20-solid" size="sm" variant="outline"
                class="rounded-full" @click="removeItem(index)" />
            </UTooltip>
              </div>
          </div>

          <!-- Form nhập dữ liệu (xổ xuống khi click vào label) -->
          <div v-if="expandedIndex === index" class="mt-3 space-y-2">
            <div v-if="isImage" class="max-w-[200px]">
              <VnwaInputImage v-model="element.image" />
            </div>
            <div class="flex items-center justify-start gap-2">
              <UTooltip v-if="iconsLink" text="Choose Icon">
                <UButton :to="iconsLink" target="_blank" label="Choose Icon" color="neutral" variant="subtle" />
              </UTooltip>
              <UInput v-if="isIcon" v-model="element.icon" placeholder="Icon" class="" />

            </div>

            <UTextarea v-model="element.label" placeholder="Tên" class="" />
            <UInput v-if="isTo" v-model="element.to" placeholder="Đường dẫn" class="" />
            <div v-if="isContent">
              
            <VnwaEditor v-if="isEditor" v-model="element.content" placeholder="Mô tả" class="w-full" />
            <UTextarea v-else v-model="element.content" placeholder="Mô tả" class="" />

          </div>
          </div>
        </div>
      </template>
    </draggableComponent>
  </div>
</template>
