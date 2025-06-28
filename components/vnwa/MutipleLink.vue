<script setup lang="ts">
import { ref, computed } from "vue";
import draggableComponent from "vuedraggable";
const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: Array as () => { image?: string; icon?: string; label: string; desc?: string; primary_label?: string; to?: string; to_label?: string; to_target?: string; content?: string, bg_color?: string, text_color?: string }[],
    default: () => [],

  },
  labelInputLabel: {
    type: String,
    default: ""
  },
  labelInputDesc: {
    type: String,
    default: ""
  },
  labelInputPrimaryLabel: {
    type: String,
    default: ""
  },
  labelInputTo: {
    type: String,
    default: ""
  },
  labelInputToLabel: {
    type: String,
    default: ""
  },
  labelInputToTarget: {
    type: String,
    default: ""
  },
  labelInputContent: {
    type: String,
    default: ""
  },
  labelInputBgColor: {
    type: String,
    default: ""
  },
  labelInputTextColor: {
    type: String,
    default: ""
  },
  isEditor: {
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
  isToLabel: {
    type: Boolean,
    default: false
  },
  isToTarget: {
    type: Boolean,
    default: false
  },
  isImage: {
    type: Boolean,
    default: false
  },
  isPrimaryLabel: {
    type: Boolean,
    default: false
  },
  isDesc: {
    type: Boolean,
    default: false
  },
  isContent: {
    type: Boolean,
    default: false
  },
  isBgColor: {
    type: Boolean,
    default: false
  },
  isTextColor: {
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


const toTargetItems = [
  { label: "Mở trong cùng tab", value: "_self" },
  { label: "Mở trong tab mới", value: "_blank" },
  { label: "Mở trong cửa sổ mới", value: "_new" },
];
</script>

<template>
  <div class="space-y-4 border border-gray-300 dark:border-gray-300/50 p-4 rounded-md">

    <div class="flex items-center justify-end">
      <UButton @click="addItem()" :label="$t('vnwa.add')" color="info" icon="heroicons:plus" />
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
                <UButton type="button" color="neutral" icon="material-symbols:content-copy-outline" size="sm"
                  variant="solid" class="rounded-none" @click="copyItem(index)" />
              </UTooltip>
              <UTooltip text="Delete">
                <UButton type="button" color="error" icon="i-heroicons-x-mark-20-solid" size="sm" variant="outline"
                  class="rounded-full" @click="removeItem(index)" />
              </UTooltip>
            </div>
          </div>

          <!-- Form nhập dữ liệu (xổ xuống khi click vào label) -->
          <div v-if="expandedIndex === index" class="mt-3 space-y-4">
            <div v-if="isImage" class="max-w-[200px]">
              <VnwaInputImage v-model="element.image" />
            </div>
            <div class="flex items-center justify-start gap-6">
              <div v-if="isBgColor">
                <VnwaInputColor v-model="element.bg_color" :label="labelInputBgColor || t('vnwa.background_color')" />
              </div>
              <div v-if="isTextColor">
                <VnwaInputColor v-model="element.text_color" :label="labelInputBgColor || t('vnwa.text_color')" />
              </div>
            </div>
            <div v-if="isIcon" class="flex relative items-center justify-start gap-2">
              <UTooltip text="Choose Icon">
                <UButton :to="iconsLink || 'https://icones.js.org/'" target="_blank" label="Choose Icon" color="neutral"
                  variant="subtle" />
              </UTooltip>
              <UInput v-model="element.icon" placeholder="Icon" class="" />

            </div>
            <UFormField v-if="isPrimaryLabel" :label="labelInputLabel ? labelInputLabel : t('vnwa.primary_label')"
              required>
              <UInput v-model="element.primary_label"  class="" />
            </UFormField>

            <UFormField :label="labelInputLabel ? labelInputLabel : t('vnwa.label')" required>
              <UInput v-model="element.label" class="" />
            </UFormField>

            <UFormField v-if="isTo" :label="labelInputTo ? labelInputTo : t('vnwa.link')" required>
              <UInput v-model="element.to"  />
            </UFormField>

            <UFormField v-if="isToLabel" :label="labelInputToLabel ? labelInputToLabel : t('vnwa.name_link')">

              <UInput v-model="element.to_label"  class="" />
            </UFormField>

            <USelect class="w-full py-2" v-if="isToTarget" v-model="element.to_target" :items=[toTargetItems]
              placeholder="Target" aria-label="Select link target" />


            <UFormField v-if="isDesc" :label="labelInputDesc ? labelInputDesc : t('vnwa.description')">

              <UTextarea v-model="element.desc"  class="" />
            </UFormField>
            <UFormField v-if="isContent" :label="labelInputContent ? labelInputContent : t('vnwa.content')">

              <VnwaEditor v-if="isEditor" v-model="element.content" class="w-full" />
              <UTextarea v-else v-model="element.content" class="" />
            </UFormField>
          </div>
        </div>
      </template>
    </draggableComponent>
  </div>
</template>