<script lang="ts" setup>


const props = defineProps({
    id: String || Number,
    url: String,
    name: String
})


const toast = useToast();
const emit = defineEmits(['success'])

function onSuccess() {
    emit('success')
}

const isRemoveChild = ref(false)

const isLoading = ref(false)
const handleSubmit = async () => {

    if (isLoading.value) return;

    useHttp(`${props.url}/${props.id}`, {
        method: 'POST',
        body: {
            is_remove_child: isRemoveChild.value
        },
        async onResponse({ response }) {
            if (response?.ok) {
                toast.add({
                    icon: "i-heroicons-check-circle-20-solid",
                    title: response._data.message,
                    color: "success",
                });
                onSuccess(); // Emit sự kiện khi thành công
            }
        },
    });
    isLoading.value = false;
};

</script>

<template>
    <UModal :title="$t('vnwa.delete_category')">
        <template #body>
            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                <p>{{ $t('vnwa.confirm_delete_category', { name: props.name }) }} </p>

                <USwitch unchecked-icon="i-lucide-x" checked-icon="i-lucide-check" v-model="isRemoveChild"
                    label="Remove Child" />
            </div>
        </template>

        <template #footer>
            <div class="flex items-center justify-end  w-full space-x-2">
                <UButton :disabled="isLoading" @click="handleSubmit" :label="$t('vnwa.confirm_delete')"
                    icon="heroicons:trash" color="error" variant="solid" />
            </div>
        </template>
    </UModal>
</template>
