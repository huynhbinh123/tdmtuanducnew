<template>
    <div>
        <div class="items-center justify-between gap-4 py-3">
            <div></div>
            <div class="flex items-center justify-end gap-4">
                <UButton @click="restoreSelected()" color="success" variant="solid"
                    icon="heroicons:arrow-path-rounded-square-20-solid" :label="'Restore Selected'" />
                <UButton @click="deleteSelected()" color="error" variant="solid" icon="heroicons:trash"
                    :label="'Remove Selected'" />
            </div>
        </div>

        <Vue3EasyDataTable v-model:items-selected="selectedItems" v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength" :loading="status === 'pending'" :headers="headers" :items="items"
            buttons-pagination show-index must-sort>
            <template #item-name="{ name, image, slug }">
                <div class="flex items-center justify-center gap-2 py-2">
                    <img width="40" :src="$storage(image)" :alt="name" />
                    <h3 class="font-medium">{{ name }}</h3>
                </div>
            </template>

            <template #item-deleted_at="{ deleted_at }">
                {{ formatDate(deleted_at) }}
            </template>

            <template #item-operation="{ id, name }">
                <div class="flex items-center justify-center gap-4 py-2">
                    <UButton @click="restoreItem(id, name)" size="sm"
                        icon="heroicons:arrow-path-rounded-square-20-solid" :label="$t('restore')" color="success"
                        variant="solid" />
                    <UButton @click="deleteItem(id, name)" size="sm" icon="heroicons:trash" :label="$t('remove')"
                        color="error" variant="solid" />
                </div>
            </template>
        </Vue3EasyDataTable>
    </div>
</template>

<script lang="ts" setup>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'assets/css/data-table.css';
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { VnwaModalDeleteItems, VnwaModalRestoreItems } from '#components';

const toast = useToast();
const overlay = useOverlay();
const { t } = useI18n();

const props = defineProps<{
    urlData: string;
    urlDelete: string;
    urlRestore: string;
}>();

const headers: Header[] = [
    { text: t('name'), value: "name" },
    { text: t('deleted_at') || 'Deleted At', value: "deleted_at", sortable: true },
    { text: t('action') || "Action", value: "operation" },
];

const items = ref<Item[]>([]);
const selectedItems = ref<any[]>([]);
const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 10,
    sortBy: 'deleted_at',
    sortType: 'desc',
});
const serverItemsLength = ref(0);

const params = computed(() => ({
    ...serverOptions.value,
}));

const { refresh, status } = useHttp<any>(props.urlData, {
    params: params,
    immediate: true,
    watch: [params],
    async onResponse({ response }) {
        if (response.ok) {
            items.value = response._data?.data;
            serverItemsLength.value = response._data?.total;
        }
    }
});

interface ItemRemove {
    id: string | number;
    name: string;
}

const removeItems = (items: ItemRemove[]) => {
    const modal = overlay.create(VnwaModalDeleteItems);
    modal.open({
        url: props.urlDelete,
        items: items,
        onSuccess() {
            modal.close();
            refresh();
        }
    });
};

const restoreItems = (items: ItemRemove[]) => {
    const modal = overlay.create(VnwaModalRestoreItems);
    modal.open({
        url: props.urlRestore,
        items: items,
        onSuccess() {
            modal.close();
            refresh();
        }
    });
};

const deleteSelected = () => {
    if (selectedItems.value.length > 0) {
        removeItems(selectedItems.value);
    }
};

const deleteItem = (id: string | number, name: string) => {
    removeItems([{ id, name }]);
};



const restoreSelected = () => {
    if (selectedItems.value.length > 0) {
        restoreItems(selectedItems.value);
    }
};

const restoreItem = (id: string | number, name: string) => {
    restoreItems([{ id, name }]);
};
</script>

<style></style>
