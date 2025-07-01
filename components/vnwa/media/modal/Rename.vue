<script lang="ts" setup>
type Item = {
  type: string;
  name: string;
};

const props = defineProps({
  path: {
    type: String,
    default: ''
  },
  item: {
    type: Object as () => Item,
    required: true,
  },
});

const emit = defineEmits(["success"]);

function onSuccess() {
  emit("success");
}

const form = ref();

const state = ref({
  newName: props.item.name,
});

const payload = computed(() => ({
  currentName: props.item.name,
  newName: state.value.newName,
  type: props.item.type,
  path: props.path,
}));

const { refresh: onSubmit, status } = useHttp("vnwa/media/rename", {
  method: "POST",
  body: payload,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    console.log(response);
    if (response?.ok) {
      onSuccess();
    }
  },
});

const handleSubmit = async () => {
  if (status.value === "pending") return;

  await onSubmit();
};
</script>

<template>
  <UModal>
    <template #content>
      <UCard>
        <UForm ref="form" :state="state" @submit="handleSubmit" class="space-y-4">
          <UFormField label="Current Name">
            <UInput v-model="props.item.name" type="text" disabled />
          </UFormField>

          <UFormField label="New Name" name="newName" required>
            <UInput v-model="state.newName" type="text" autocomplete="on" required />
          </UFormField>

          <div class="pt-2">
            <UButton  aria-label="Vinawebapp Button"  type="submit" label="Rename" :loading="status === 'pending'" />
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
</template>
