<script lang="ts" setup>
interface Item {
    id: String | Number;
    name: String;
}

const props = defineProps<{
    isTrashOption?: boolean;
    isTrash?: boolean;
    url: string;
    items: Item[];
}>();

const toast = useToast();
const emit = defineEmits(['success']);

const isRemoveChild = ref(false);
const isTrash = ref(props.isTrash); // Mặc định là chuyển vào thùng rác
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
            is_trash: isTrash.value,
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
            }
        },
    });
};
</script>

<template>
    <UModal :title="$t('vnwa.remove_items')">
        <template #body>
            <div class="space-y-4 text-gray-800 dark:text-gray-200">
                <p>
                    {{ $t('vnwa.confirm_remove_items', { count: props.items.length }) }}
                </p>

                <!-- Danh sách item -->
                <ul class="list-none space-y-1">
                    <li v-for="(item, index) in props.items" :key="index" class="flex items-center space-x-2">
                        <UIcon name="i-lucide-x" class="text-red-500" />
                        <span>{{ item.name }}</span>
                    </li>
                </ul>

                <div v-if="isTrashOption">
                    <USwitch v-model="isTrash" checked-icon="i-lucide-trash" color="neutral" unchecked-icon="i-lucide-x"
                        :label="$t('vnwa.move_to_trash')" />
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{
                            isTrash
                                ? $t('vnwa.move_to_trash_desc')
                                : $t('vnwa.permanent_delete_desc')
                        }}
                    </p>
                </div>



            </div>
        </template>

        <template #footer>
            <div class="flex items-center justify-end w-full space-x-2">
                <UButton :disabled="isLoading" @click="handleSubmit" :label="$t('vnwa.confirm_remove')"
                    icon="heroicons:trash" color="error" variant="solid" />
            </div>
        </template>
    </UModal>
</template>
