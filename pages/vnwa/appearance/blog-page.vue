<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="">
          <div class="text-lg font-semibold mb-2">Blog Page Manger </div>
        </div>
        <VnwaGroupLang :locale="locale" @update:locale="locale = $event" />

      </template>
      <UForm :validate="validate" :state="appearanceData" class="space-y-4" @submit="onSubmit">

        <UCard>
          <template #header>
            <h3>Hero Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="Title" name="hero_section.title">
                <UTextarea v-model="appearanceData.hero_section.title" />
              </UFormField>
              <UFormField label="Slogan" name="hero_section.slogan">
                <UTextarea v-model="appearanceData.hero_section.slogan" />
              </UFormField>
            </div>
          </div>
        </UCard>








        <VnwaMetaSeoForm :meta="appearanceData.meta" @update:errors="handleErrors" />

        <UButton type="submit" icon="mdi:content-save" :loading="appearanceUpdateStatus == 'pending'">
          {{ $t('vnwa.save') }}
        </UButton>
      </UForm>

    </VnwaCard>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
definePageMeta({
  title: 'Blog Page Manager'
})

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
 

  meta: {
    title: string;
    desc: string;
    image: string;
  };
}

const appearanceData = reactive<Partial<AppearanceData>>({
  hero_section: {
    title: '',
    slogan: '',
  },
 
  meta: {
    title: '',
    desc: '',
    image: '',
  },
});

const locale = ref<string>(useRuntimeConfig().public.appLang);


const params = computed(() => ({
  locale: locale.value
}));


const { refresh, status: loadDataStatus } = await useHttp<any>("vnwa/appearance/blog_page/load-data", {
  method: "GET",
  params: params,
  watch: [params],
  immediate: true,
  async onResponse({ response }) {
    const data = response._data?.data;

    if (data) {
      appearanceData.hero_section = {
        title: data.hero_section?.title ?? '',
        slogan: data.hero_section?.slogan ?? '',
      };
      appearanceData.meta = {
        title: data.meta?.title ?? '',
        desc: data.meta?.desc ?? '',
        image: data.meta?.image ?? '',
      };
    } else {
      console.error('Dữ liệu không hợp lệ:', data);
    }
  },
});

const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/blog_page/update", {
  method: "POST",
  body: appearanceData,
  params: params,
  immediate: false,
  watch: false,
  async onFetchResponse({ response }) {
    if (response.ok) {
      toast.add({
        icon: "i-heroicons-check-circle-20-solid",
        title: response._data.message,
        color: "success",
      });
      await refresh();
    }
  }
});

const errors = ref<FormError[]>([]);

const handleErrors = (newErrors: FormError[]) => {
  errors.value = newErrors;
};

const validate = (state: any): FormError[] => {
  return errors.value;
};

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<any>) {
  formSubmit();
}
</script>

<style></style>
