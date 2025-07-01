<template>
  <UModal title="Contact Detail">
    <template #body>
      <div class="p-6 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <!-- Header -->
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          {{ data.first_name }} {{ data.last_name }}
        </h2>

        <!-- Thông tin liên hệ -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Email:</span>
            <span class="text-gray-800">{{ data.email }}</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Phone:</span>
            <span class="text-gray-800">{{ data.nation_phone }} {{ data.phone }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Company:</span>
            <span class="text-gray-800">{{ data.company }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Service:</span>
            <span class="text-gray-800">

              <ul class="flex items-center justify-start flex-wrap gap-2 ">
                <li v-for="(item, index) in data.help_business">
                  <UBadge :key="index" class="mb-1" color="primary">{{ item }}</UBadge>
                </li>
              </ul>
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Biết đến qua:</span>
            <span class="text-gray-800">{{ data.from_hear }} </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Note:</span>
            <div class="text-gray-800 whitespace-pre-line">{{ data.note || "No additional notes" }}</div>
          </div>

          <!-- Badge trạng thái -->
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-600">Status:</span>
            <span class="px-3 py-1 text-sm font-semibold rounded-full"
              :class="data.is_view ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
              {{ data.is_view ? "Đã xem" : "Chưa xem" }}
            </span>
          </div>
        </div>

        <!-- Nút đóng -->
        <div class="mt-6 text-right">
          <UButton  aria-label="Vinawebapp Button"  color="primary" variant="solid" @click="$emit('close')">Close</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
type Contact = {
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

// Nhận props từ parent
defineProps<{
  data: Contact
}>()

// Phát sự kiện đóng modal
</script>