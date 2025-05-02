<script lang="ts" setup>

const props = defineProps({
  path: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['success'])

function onSuccess() {
  emit('success')
}
const form = ref();

const state = ref({
  name: '',
});

const payload = computed(() => ({
  name: state.value.name,
  basePath: props.path,
}));

const { refresh: onSubmit, status } = useHttp('vnwa/media/create-dir', {
  method: 'POST',
  body: payload,
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
  <UModal>
    <template #content>
      <UCard>
        <UForm ref="form" :state="state" @submit="handleSubmit" class="space-y-4">
          <UFormField label="Folder Name " name="name" required>
            <UInput v-model="state.name" type="text" autocomplete="on" required />
          </UFormField>

          <div class="pt-2">
            <UButton type="submit" :label="$t('vnwa.save')" :loading="status === 'pending'" />
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
</template>
