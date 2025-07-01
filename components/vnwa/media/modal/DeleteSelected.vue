<script lang="ts" setup>
type Item = {
  type: string;
  name: string;
  path: string;
};

const props = defineProps<{
  items: Item[];
}>();


const emit = defineEmits(['success'])

function onSuccess() {
  emit('success')
}



const { refresh: onSubmit, status } = useHttp('vnwa/media/delete', {
  method: 'POST',
  body: {
    data: props.items
  },
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    console.log(response);
    if (response?.ok) {
      onSuccess(); // Emit sự kiện khi thành công
    }
  },
});
const handleSubmit = async () => {

  if (status.value === 'pending') return;

  await onSubmit();
};

</script>

<template>
  <UModal title="Delete Media">
    <template #body>
      <ul>
        <li v-for="(item, index) in items" class="mb-3 b border dark:border-gray-300 px-2 py-2  dark:text-gray-300">
          <span class="me-3 capitalize font-medium">{{ item.type }}: </span>
          <span>{{ item.name }}</span>
        </li>
      </ul>

    </template>
    <template #footer>
      <div class="flex items-center justify-end w-full">
        <UButton  aria-label="Vinawebapp Button"  :disabled="status === 'pending'" @click="handleSubmit" label="Xác nhận xóa Media"
          icon="heroicons:trash" color="error" variant="solid" />
      </div>

    </template>
  </UModal>

</template>
