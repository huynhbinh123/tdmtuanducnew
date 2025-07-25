<template>
  <div>
    <div class="flex items-center justify-between gap-4 py-3">
      <div class="flex items-center justify-start">
        <NuxtLinkLocale to="/vnwa/project/trash">

          <UButton  aria-label="Vinawebapp Button"  color="error" variant="outline" :label="`Trash (${totalTrash})`"
            icon="material-symbols:delete-sweep-outline" />
        </NuxtLinkLocale>
      </div>
      <div class="flex items-center justify-end gap-4">
        <UPopover>
          <UButton  aria-label="Vinawebapp Button"  :disabled="selectedItems.length <= 0" color="neutral" :label="$t('vnwa.vmedia.selected_action')"
            icon="i-fa6-solid:hand-pointer" />

          <template #content>
            <ul class="min-w-40  text-black dark:text-white">

              <li>
                <UButton  aria-label="Vinawebapp Button"  @click="deleteSelected()" color="neutral" variant="ghost" icon="heroicons:trash" class="w-full"
                  :label="$t('vnwa.vmedia.move_to_trash')" />
              </li>

            </ul>
          </template>
        </UPopover>
        <UButton  aria-label="Vinawebapp Button"  :loading="status === 'pending'" @click="refresh()" color="vnwa" label="Refresh"
          icon="material-symbols:rotate-left" />
        <NuxtLinkLocale to="/vnwa/project/create">

          <UButton  aria-label="Vinawebapp Button"  :loading="status === 'pending'" color="info" label="Create" icon="material-symbols:add-2" />
        </NuxtLinkLocale>


      </div>
    </div>
    <Vue3EasyDataTable v-model:items-selected="selectedItems" v-model:server-options="serverOptions"
      :server-items-length="serverItemsLength" :loading="status === 'pending'" :headers="headers" :items="items"
      buttons-pagination show-index must-sort>
      <template #item-name="{ name, logo, slug }">
        <div class="flex items-center justify-center gap-2 py-2">
          <img width="40" :src="$storage(logo)" :alt="name">
          <h3 class="font-medium">
            {{ name }}
          </h3>
        </div>
      </template>
      <template #item-tags="{ tags }">
        <div class="max-w-[300px] py-2 flex items-center justify-start gap-1 flex-wrap">
          <UBadge v-for="(item, index) in tags" :key="index" color="neutral" size="sm" variant="outline">{{ item }}
          </UBadge>
        </div>
      </template>
 
      <template #item-created_at="{ created_at }">
        {{ formatDate(created_at) }}
      </template>
      <template #item-operation="{ id, name }">
        <div class="flex items-center justify-center gap-4 py-2">
          <NuxtLinkLocale :to="`/vnwa/project/edit-${id}`">

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
  title: 'Project Manager'
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
  { text: 'Tags', value: "tags", sortable: true },
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
const totalTrash = ref(0);
const serverItemsLength = ref(0);
const params = computed(() => ({
  ...serverOptions.value,
}));
const { data, refresh, status } = await useHttp<any>("vnwa/project/load-data-table", {
  params: params,
  immediate: true,
  watch: [params],
  async onResponse({ response }) {
    if (response.ok) {
      items.value = response._data?.data;
      serverItemsLength.value = response._data?.total;
      totalTrash.value = response._data.totalTrash
    } else {

    }
  }
});
items.value = data.value?.data;
serverItemsLength.value = data.value?.total;
totalTrash.value = data.value.totalTrash

interface ItemRemove {
  id: String | Number;
  name: String;
}

const removeItems = (items: ItemRemove[]) => {
  const modal = overlay.create(VnwaModalDeleteItems);
  modal.open({
    url: 'vnwa/project/delete',
    items: items,
    isTrashOption: true,
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