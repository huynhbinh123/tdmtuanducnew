<script setup lang="ts">
import { VnwaContactDetail } from '#components'
import type { TableColumn } from '@nuxt/ui'
const { $http } = useNuxtApp();


type TableData = {
  id: number
  name: string
  email: string
  service?: string
  note?: string
  is_view?: number
}

const columns: TableColumn<TableData>[] = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'service',
    header: 'Service'
  },
  {
    accessorKey: 'note',
    header: 'Note'
  },
  {
    accessorKey: 'is_view',
    header: 'Status'
  },
  {
    id: 'action',
    header: 'Actions'
  }
]
const route = useRoute()
const page = ref(1)

// Theo dõi thay đổi của route.query.page
watchEffect(() => {
  page.value = Number(route.query.page) || 1
})

// Gọi API, tự động cập nhật khi page thay đổi
const { data, refresh, status } = useHttp<any>(() => `/vnwa/contact/load-data?page=${page.value}`, {
  watch: [page]
})

// Hàm chuyển trang
function to(newPage: number) {
  return {
    query: {
      page: newPage
    },
    hash: ''
  }
}


const overlay = useOverlay()

const modal = overlay.create(VnwaContactDetail)

const toast = useToast();

const viewContact = async (id: number) => {
  console.log(id)
  await useLazyHttp<any>(`/vnwa/contact/view/${id}`, {

    async onFetchResponse({ response }) {
      if (response.ok) {
        console.log(response._data);
        modal.open({
          data: response._data
        })
        await refresh();



      }



    }
  })
}

const deleteContact = async (id: number) => {
  if (!confirm('Xác nhận xóa contact này?')) return;

  try {
    await $http("vnwa/contact/delete", {
      method: "POST",
      body: { ids: [id] }, // Gửi object { ids: [...] }
      async onFetchResponse({ response }) {
        if (response.ok) {
          toast.add({
            icon: "i-heroicons-check-circle-20-solid",
            title: response._data.message,
            color: "success",
          });
          await refresh();
        } else {
          toast.add({
            icon: "i-heroicons-exclamation-circle-20-solid",
            title: response._data.message || "Có lỗi xảy ra",
            color: "error",
          });
        }
      }
    });
  } catch (error) {
    toast.add({
      icon: "i-heroicons-exclamation-circle-20-solid",
      title: "Lỗi kết nối đến máy chủ!",
      color: "error",
    });
  }
};



</script>

<template>
  <VnwaCard>
    <template #header>
      <div class="col-span-12 lg:col-span-4">
        <div class="text-lg font-semibold mb-2">Contact Manger </div>
      </div>
    </template>
    <div v-if="data && data.data && data.data.length > 0">
      <UTable :data="data.data" :columns="columns" :loading="status == 'pending'" class="flex-1">
        <template #id-cell="{ row }">
          <div>

            {{ row.index + 1 }}

          </div>
        </template>
        <template #is_view-cell="{ row }">
          <div>

            <UBadge v-if="row?.original?.is_view == 0" color="info">Chưa Xem</UBadge>
            <UBadge v-else color="neutral" variant="outline">Đã Xem</UBadge>

          </div>
        </template>
        <template #action-cell="{ row }">
          <div class="flex items-center justify-end gap-4">
            <UButton @click="viewContact(row.original.id)" icon="material-symbols:visibility-rounded"
              color="secondary" />
            <UButton @click="deleteContact(row.original.id)" icon="material-symbols:delete" color="error" />
          </div>
        </template>
      </UTable>

      <UPagination v-if="data.last_page > 10" v-model:page="page" :total="data.last_page" :to="to" :sibling-count="1"
        show-edges />
    </div>
  </VnwaCard>
</template>
