<script setup lang="ts">
import { VnwaModalContactDetail } from '#components'
import type { TableColumn } from '@nuxt/ui'
const { $http } = useNuxtApp();
definePageMeta({
  title: 'Contact Manager'
})


type T = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  nation_phone: string;
  phone: string;
  company: string;
  from_hear: string;
  help_business: string[];
  note: string;
  is_send_mail: boolean;
  is_view: boolean;
  created_at: string;
}

const columns: TableColumn<T>[] = [
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
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'service',
    header: 'Service'
  },
  {
    accessorKey: 'created_at',
    header: 'Send Date',
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

const modal = overlay.create(VnwaModalContactDetail)

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
        <template #name-cell="{ row }">
          <div>
            {{ row?.original.first_name }} {{ row?.original.last_name }}

          </div>
        </template>
        <template #phone-cell="{ row }">
          <div>
            {{ row?.original.nation_phone }}
            {{ row?.original.phone }}

          </div>
        </template>
        <template #service-cell="{ row }">
          <div>
            <ul class="flex items-center justify-start flex-wrap gap-2 max-w-lg">
              <li v-for="(item, index) in row?.original.help_business">
                <UBadge :key="index" class="mb-1" color="primary">{{ item }}</UBadge>
              </li>
            </ul>

          </div>
        </template>
        <template #is_view-cell="{ row }">
          <div>

            <UBadge v-if="!row?.original?.is_view" color="info">Chưa Xem</UBadge>
            <UBadge v-else color="neutral" variant="outline">Đã Xem</UBadge>

          </div>
        </template>
        <template #created_at-cell="{ row }">
          <div>
            {{ formatDate(row?.original.created_at) }}

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