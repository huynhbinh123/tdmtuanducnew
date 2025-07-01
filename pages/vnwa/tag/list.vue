<template>
    <div>
        <div class="items-center justify-between gap-4 py-3">
            <div></div>
            <div class="flex items-center justify-end gap-4">
                <UPopover>
                    <UButton  aria-label="Vinawebapp Button"  :disabled="selectedItems.length <= 0" color="neutral" :label="$t('vnwa.vmedia.selected_action')"
                        icon="i-fa6-solid:hand-pointer" />

                    <template #content>
                        <ul class="min-w-40  text-black dark:text-white">
                            <li>
                                <UButton  aria-label="Vinawebapp Button"  @click="deleteSelected()" color="neutral" variant="ghost"
                                    icon="heroicons:trash" class="w-full" :label="$t('vnwa.vmedia.move_to_trash')" />
                            </li>
                        </ul>
                    </template>
                </UPopover>
                <UButton  aria-label="Vinawebapp Button"  :loading="status === 'pending'" @click="refresh()" color="vnwa" label="Refresh"
                    icon="i-fa6-solid:rotate" />
                <NuxtLinkLocale to="/vnwa/tag/create">

                    <UButton  aria-label="Vinawebapp Button"  :loading="status === 'pending'" color="info" label="Create" icon="i-fa6-solid:plus" />
                </NuxtLinkLocale>

            </div>
        </div>
        <Vue3EasyDataTable v-model:items-selected="selectedItems" v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength" :loading="status === 'pending'" :headers="headers" :items="items"
            buttons-pagination show-index must-sort>



            <template #item-created_at="{ created_at }">
                {{ formatDate(created_at) }}
            </template>
            <template #item-operation="{ id, name }">
                <div class="flex items-center justify-center gap-4 py-2">
                    <NuxtLinkLocale :to="`/vnwa/tag/edit-${id}`">

                        <UButton  aria-label="Vinawebapp Button"  size="sm" icon="heroicons:pencil-square" :label="$t('vnwa.edit')" color="warning" />
                    </NuxtLinkLocale>
                    <UButton  aria-label="Vinawebapp Button"  @click="deleteItem(id, name)" size="sm" icon="heroicons:trash" :label="$t('vnwa.remove')"
                        color="error" variant="solid" />
                </div>
            </template>


        </Vue3EasyDataTable>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    title: 'Tag Manager'
})

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'assets/css/data-table.css';
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { VnwaModalDeleteItems } from '#components';
const toast = useToast()
const overlay = useOverlay()
const { t } = useI18n();

const headers: Header[] = [
    { text: t('vnwa.name'), value: "name", sortable: true },
    { text: t('vnwa.created_at'), value: "created_at", sortable: true },
    { text: "Action", value: "operation" },
];
const items = ref<Item[]>([]);
const selectedItems = ref([]);
const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 10,
    sortBy: 'created_at',
    sortType: 'desc',
});
const serverItemsLength = ref(0);
const params = computed(() => ({
    ...serverOptions.value,
}));
const { refresh, status } = useHttp<any>("vnwa/tag/load-data-table", {
    params: params,
    immediate: true,
    watch: [params],
    async onResponse({ response }) {
        if (response.ok) {
            items.value = response._data?.data;
            serverItemsLength.value = response._data?.total;

        } else {

        }
    }
});


interface ItemRemove {
    id: String | Number;
    name: String;
}

const removeItems = (items: ItemRemove[]) => {
    const modal = overlay.create(VnwaModalDeleteItems);
    modal.open({
        url: 'vnwa/tag/delete',
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
</script>

<style></style>