<template>
  <div>
    <div class="max-w-8xl mx-auto">
      <VnwaCard :is-loading="isLoading">
        <UForm ref="formRef" :validate="validate" :state="formData" class="space-y-4 relative"
          @submit.prevent="onSubmit" @error="onError">
          <div
            class="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 sticky top-16 z-10 right-0 bg-white dark:bg-gray-900 w-full ">
            <div>
              <h3 class="text-xl font-semibold text-vnwa dark:text-white">
                {{ t('vnwa.create_post') }}
              </h3>
            </div>
            <div class="flex items-center justify-end gap-6">
              <UFormField name="status">
                <USelect v-model="formData.status" :items="['draft', 'published']" class="w-48 capitalize" />

              </UFormField>
              <UButton type="submit" :label="$t('vnwa.save')" :loading="isLoading" icon="mdi:content-save" />
            </div>
          </div>

          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8">
              <VnwaBaseForm :data="formData.base" @update:errors="handleErrors" type="post">
                <UCard>
                  <div class="space-y-8">

                    <UFormField label="Image" name="image">
                      <VnwaInputImage v-model="formData.image" />
                    </UFormField>
                    <UFormField label="Banner Image" name="banner_image">
                      <VnwaInputImage v-model="formData.banner_image" />
                    </UFormField>

                    <UFormField label="Is Show" name="is_show">
                      <USwitch v-model="formData.is_show" />
                    </UFormField>
                    <UFormField label="Highlight" name="is_show">
                      <USwitch v-model="formData.is_highlight" />
                    </UFormField>

                    <UFormField label="Description" name="desc">
                      <UTextarea v-model="formData.desc" />
                    </UFormField>
                    <UFormField label="Content" name="content">
                      <VnwaEditor v-model="formData.content" />
                    </UFormField>

                  </div>
                </UCard>
              </VnwaBaseForm>
            </div>
            <div class="col-span-4 space-y-8">
              <UCard>
                <template #header>
                  <h3 class="text-lg font-semibold">{{ $t('vnwa.category') }} </h3>
                </template>
                <VnwaTreeView :tree-data="treeCategoryData" v-model="checkedCategoryIds" />

              </UCard>
              <UCard>
                <template #header>
                  <h3 class="text-lg font-semibold">{{ $t('vnwa.tag') }} </h3>
                </template>
                <USelectMenu v-model="tagIds" value-key="id" label-key="name" multiple :items="tagItems" class="" />

              </UCard>
            </div>
          </div> 


        </UForm>

      </VnwaCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormErrorEvent } from '@nuxt/ui';
import type { BaseFormType } from '~/type';

definePageMeta({
  title: 'Create Post'
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
  status: 'draft',
  image: '',
  banner_image: '',
  desc: '',
  content: '',
  is_show: true,
  is_highlight: false,

})
const tagItems = ref();
const tagIds = ref();
const checkedCategoryIds = ref([1, 2])  // Khởi tạo giá trị checkedIds mặc định
const treeCategoryData = ref([]);
const { refresh, status } = useHttp('vnwa/blog/post/load-data-tree-categories-and-tags', {
  onResponse({ response }) {
    if (response.ok) {
      treeCategoryData.value = response._data.categories
      tagItems.value = response._data.tags
    }
  }
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
  if (!state.base.name) {
    errors.value.push({ name: 'name', message: t('vnwa.error_message.name.required') });
  }

  if (state.base.name.length > 10 && state.base.name.length < 70) {
    errors.value.push({ name: 'name', message: t('vnwa.error_message.name.required') });

  }

  if (!state.base.slug || state.base.slug.length > 500) {
    errors.value.push({ name: 'slug', message: t('vnwa.error_message.slug.required') });
  }

  // if (!state.base.meta_title || state.base.meta_title.length > 100) {
  //   errors.value.push({ name: 'meta_title', message: t('vnwa.error_message.meta.title') });
  // }

  // if (!state.base.meta_desc || state.base.meta_desc.length > 300) {
  //   errors.value.push({ name: 'meta_desc', message: t('vnwa.error_message.meta.desc') });
  // }

  // if (!state.base.meta_image || state.base.meta_image.length < 5) {
  //   errors.value.push({ name: 'meta_image', message: t('vnwa.error_message.meta.image') });
  // }



  return errors.value;
};
const onSubmit = async () => {
  clearError();
  isLoading.value = true;
  const payload = {
    name: formData.base.name,
    slug: formData.base.slug,
    meta_title: formData.base.meta_title,
    meta_image: formData.base.meta_image,
    meta_desc: formData.base.meta_desc,
    status: formData.status,
    desc: formData.desc,
    content: formData.content,
    image: formData.image,
    banner_image: formData.banner_image,
    is_show: formData.is_show,
    is_highlight: formData.is_highlight,
    tagIds: tagIds.value,
    categoryIds: checkedCategoryIds.value,

  }



  await useHttp('/vnwa/blog/post/store', {
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



const handleChecked = (ids: number[]) => {
  console.log('Checked IDs:', ids)
}
</script>

<style></style>