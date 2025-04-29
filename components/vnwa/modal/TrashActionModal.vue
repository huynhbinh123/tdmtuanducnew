<script lang="ts" setup>
interface Item {
  id: number | string;
  name: string;
}

const props = defineProps<{
  action: 'restore' | 'destroy';
  url: string;
  items: Item[];
}>();

const toast = useToast();
const emit = defineEmits(['success']);

const isLoading = ref(false);

const actionLabel = computed(() =>
  props.action === 'restore' ? 'Khôi phục' : 'Xoá vĩnh viễn'
);
const actionIcon = computed(() =>
  props.action === 'restore' ? 'i-heroicons-arrow-uturn-left' : 'i-heroicons-trash'
);
const actionColor = computed(() =>
  props.action === 'restore' ? 'success' : 'error'
);

const handleSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  await useHttp(props.url, {
    method: 'POST',
    body: {
      action: props.action,
      items: props.items,
    },
    async onResponse({ response }) {
      if (response.ok) {
        toast.add({
          title: response._data.message,
          icon: 'i-heroicons-check-circle',
          color: 'success',
        });
        emit('success');
      } else {
        toast.add({
          title: 'Có lỗi xảy ra',
          icon: 'i-heroicons-exclamation-triangle',
          color: 'error',
        });
      }
    },
  });

  isLoading.value = false;
};
</script>

<template>
  <UModal :title="`${actionLabel} mục đã chọn`">
    <template #body>
      <div class="space-y-2 text-sm text-gray-800 dark:text-gray-200">
        <p>Bạn có chắc chắn muốn {{ actionLabel.toLowerCase() }} các mục sau?</p>
        <ul class="list-disc list-inside ml-2">
          <li v-for="item in props.items" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <UButton
          :label="actionLabel"
          :icon="actionIcon"
          :color="actionColor"
          variant="solid"
          :disabled="isLoading"
          @click="handleSubmit"
        />
      </div>
    </template>
  </UModal>
</template>
