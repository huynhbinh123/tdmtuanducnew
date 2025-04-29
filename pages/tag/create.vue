<template>
  <div>
    <div class="max-w-6xl mx-auto">
      <VnwaCard :is-loading="isLoading">
        <UForm ref="formRef" :validate="validate" :state="formData" class="space-y-4 relative"
          @submit.prevent="onSubmit" @error="onError">
          <div
            class="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 sticky top-16 z-10 right-0 bg-white dark:bg-gray-900 w-full ">
            <div>
              <h3 class="text-xl font-semibold text-vnwa dark:text-white">
                {{ t('create_tag') }}
              </h3>
            </div>
            <UButton type="submit" :label="$t('save')" :loading="isLoading" icon="mdi:content-save" />
          </div>


          <VnwaBaseForm :data="formData.base" @update:errors="handleErrors" type="tag">
            <UCard>
              <div class="space-y-8">
                <UFormField label="Description" name="desc">
                  <UTextarea v-model="formData.desc" />
                </UFormField>
                <UFormField label="Content" name="content">
                  <VnwaEditor v-model="formData.content" />
                </UFormField>

              </div>
            </UCard>
          </VnwaBaseForm>

        </UForm>

      </VnwaCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormErrorEvent } from '@nuxt/ui';
import type { BaseFormType } from '~/type';

definePageMeta({
  title: 'Create Tag'
})
const { t, locale } = useI18n();
const toast = useToast();
const errors = ref<FormError[]>([]);
const formRef = ref()
const isLoading = ref(false)
const formData = reactive({
  base: <BaseFormType>{
    name: '',
    slug: '',
    meta_title: '',
    meta_image: '',
    meta_desc: ''
  },
  desc: '',
  content: '',
})
const reset = () => {
  formData.base.name = ''
  formData.base.slug = ''
  formData.base.meta_title = ''
  formData.base.meta_image = ''
  formData.base.meta_desc = ''
  formData.desc = ''
  formData.content = ''
}

const handleErrors = (newErrors: FormError[]) => {
  errors.value = newErrors;
};


const pushServerErrors = (serverErrors: Record<string, string[]>) => {
  const errors: FormError[] = []

  Object.keys(serverErrors).forEach((field) => {
    errors.push({
      name: field,
      message: serverErrors[field][0]
    })
  })

  formRef.value?.setErrors(errors)
}
async function onError(event: FormErrorEvent) {
  console.log('error')
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
const validate = (state: any): FormError[] => {
  if (!state.base.name || state.base.name.length > 500) {
    errors.value.push({ name: 'name', message: t('error_message.name.required') });
  }
  if (!state.base.slug || state.base.slug.length > 500) {
    errors.value.push({ name: 'slug', message: t('error_message.slug.required') });
  }

  // if (!state.base.meta_title || state.base.meta_title.length > 100) {
  //   errors.value.push({ name: 'meta_title', message: t('error_message.meta.title') });
  // }

  // if (!state.base.meta_desc || state.base.meta_desc.length > 300) {
  //   errors.value.push({ name: 'meta_desc', message: t('error_message.meta.desc') });
  // }

  // if (!state.base.meta_image || state.base.meta_image.length < 5) {
  //   errors.value.push({ name: 'meta_image', message: t('error_message.meta.image') });
  // }



  return errors.value;
};
const onSubmit = async () => {
  clearError();
  isLoading.value = true;
  const payload = {
    name: formData.base.name,
    slug: formData.base.slug,
    desc: formData.desc,
    content: formData.content,
    meta_title: formData.base.meta_title,
    meta_image: formData.base.meta_image,
    meta_desc: formData.base.meta_desc,


  }

  await useHttp('/vnwa/tag/store', {
    method: 'POST',
    query: {
      locale: locale.value
    },
    body: payload,
    onResponse({ response }) {
      if (response.ok) {
        toast.add({
          icon: "i-heroicons-check-circle-20-solid",
          title: response._data.message || 'Lưu thành công!',
          color: "success",
        });
        // Làm mới tree và form
        reset();


      } else {
        if (response.status == 422) {
          pushServerErrors(response._data.errors)
        }

        toast.add({
          icon: "i-heroicons-x-circle-20-solid",
          title: "Lỗi",
          description: response._data?.message || 'Có lỗi xảy ra.',
          color: "error",
        });

      }
      isLoading.value = false;
    },
    onFetchError({ error }) {
      toast.add({
        icon: "i-heroicons-x-circle-20-solid",
        title: "Lỗi mạng",
        description: error?.message || 'Không thể kết nối máy chủ.',
        color: "error",
      });
      isLoading.value = false;
    }
  });
};

</script>

<style></style>