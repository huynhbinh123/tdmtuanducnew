<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  name: '',
  email: '',
  service: '',
  note: ''
})
const items = ref(['Makeup & Hair', 'Bridal Service', 'Courses & Workshops', 'Other'])
const validate = (state: any): FormError[] => {
  const errors: FormError[] = []

  if (!state.name) {
    errors.push({ name: 'name', message: 'Name/Phone is required' })
  } else if (state.name.length > 100) {
    errors.push({ name: 'name', message: 'Name/Phone must be less than 100 characters' })
  }

  if (!state.email) {
    errors.push({ name: 'email', message: 'Email is required' })
  } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
    errors.push({ name: 'email', message: 'Invalid email format' })
  }

  if (!state.service) {
    errors.push({ name: 'service', message: 'Please select a service' })
  }

  if (state.note && state.note.length > 500) {
    errors.push({ name: 'note', message: 'Message must be less than 500 characters' })
  }

  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  formSubmit();
}
const { refresh: formSubmit, status } = useHttp<any>("send-contact", {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onFetchResponse({ response }) {
    if (response.ok) {
      toast.add({
        icon: "i-heroicons-check-circle-20-solid",
        title: response._data.message || "Gửi thành công!",
        color: "success",
      });
    }
  },
  async onFetchError({ error }) {
    let message = "Có lỗi xảy ra, vui lòng thử lại!";

    if (error.response?.status === 422) {
      // Lỗi validate từ backend Laravel
      const errors = error.response._data.errors;
      if (errors) {
        message = Object.values(errors).flat().join("\n"); // Ghép lỗi thành chuỗi
      }
    } else if (error.response?.status === 429) {
      // Lỗi quá số lần request (chống spam)
      message = error.response._data.message || "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau!";
    }

    toast.add({
      icon: "i-heroicons-exclamation-circle-20-solid",
      title: "Lỗi gửi liên hệ",
      description: message,
      color: "danger",
    });
  }
});





</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
      <UFormField label="Name/Phone" name="name" size="xl" class="w-full text-white"
        :ui="{ error: 'text-red-500', container: 'w-full' }" required>
        <UInput :disabled="status == 'pending'" v-model="state.name" class="w-full" placeholder="Name or Phone"
          :ui="{ base: 'text-black bg-white w-full' }" />
      </UFormField>
      <UFormField label="Service" name="service" size="xl" class="w-full text-white"
        :ui="{ error: 'text-red-500', container: 'w-full' }" required>
        <USelect :disabled="status == 'pending'" v-model="state.service" placeholder="Choose one" :items="items"
          class="w-full" :ui="{ base: 'text-black bg-white w-full', item: 'bg-purple-500' }" />
      </UFormField>
      <UFormField label="Email" name="email" size="xl" class="w-full text-white"
        :ui="{ error: 'text-red-500', container: 'w-full' }" required>
        <UInput :disabled="status == 'pending'" v-model="state.email" placeholder="thuongleeacademy@gmail.com"
          class="w-full" :ui="{ base: 'text-black bg-white w-full' }" />
      </UFormField>
      <UFormField label="Message" name="note" size="xl" class="w-full text-white"
        :ui="{ error: 'text-red-500', container: 'w-full' }">
        <UTextarea :disabled="status == 'pending'" v-model="state.note" placeholder="Message" class="w-full"
          :ui="{ base: 'text-black bg-white w-full' }" />
      </UFormField>
    </div>




    <UButton  aria-label="Vinawebapp Button"  type="submit" icon="ri:mail-send-fill" :loading="status == 'pending'"
      class="w-full bg-white text-midnight-blue-500 text-center flex items-center justify-center text-xl mt-10 py-2 hover:bg-white/80 cursor-pointer hover:text-black font-bold">
      Submit
    </UButton>
  </UForm>
</template>
