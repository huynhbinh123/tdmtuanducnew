<script lang="ts" setup>
interface Item {
    id: string | number;
    name: string;
}

const props = defineProps<{
    url: string;
    items: Item[];
}>();

const toast = useToast();
const emit = defineEmits(['success']);

const isLoading = ref(false);

function onSuccess() {
    emit('success');
}

const handleSubmit = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    useHttp(`${props.url}`, {
        method: 'POST',
        body: {
            items: props.items,
        },
        async onResponse({ response }) {
            isLoading.value = false;
            if (response?.ok) {
                toast.add({
                    icon: "i-heroicons-check-circle-20-solid",
                    title: response._data.message,
                    color: "success",
                });
                onSuccess();
            } else {
                toast.add({
                    icon: "i-heroicons-x-circle-20-solid",
                    title: response?._data?.message || 'Lỗi không xác định',
                    color: "error",
                });
            }
        },
    });
};
</script>

<template>
    <UModal :title="$t('vnwa.restore_items')">
        <template #body>
            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                <p>
                    {{ $t('vnwa.confirm_restore_items', { count: props.items.length }) }}
                </p>

                <!-- Danh sách item -->
                <ul class="list-none space-y-1">
                    <li v-for="(item, index) in props.items" :key="index" class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-arrow-path" class="text-green-500" />
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </div>
        </template>

        <template #footer>
            <div class="flex items-center justify-end w-full space-x-2">
                <UButton  aria-label="Vinawebapp Button"  :disabled="isLoading" @click="handleSubmit" :label="$t('vnwa.confirm_restore')"
                    icon="heroicons:arrow-path" color="primary" variant="solid" />
            </div>
        </template>
    </UModal>
</template>
