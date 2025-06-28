<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="">
          <div class="text-lg font-semibold mb-2">Process Page Manger </div>
        </div>
                                    <VnwaGroupLang  :locale="locale" @update:locale="locale = $event" />

      </template>
      <UForm :validate="validate" :state="appearanceData" class="space-y-4" @submit="onSubmit">

        <UCard>
          <template #header>
            <h3>Hero Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="Title" name="hero_section.title">
                <UInput v-model="appearanceData.hero_section.title" />
              </UFormField>
              <UFormField label="Slogan" name="hero_section.slogan">
                <UTextarea v-model="appearanceData.hero_section.slogan" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3>Brands Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="" name="brand_section">
                <VnwaMutipleLink v-model="appearanceData.brand_section" :is-to="true" :is-image="true" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3>Feedback Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="" name="feedback_section">
                <VnwaMutipleLink v-model="appearanceData.feedback_section" :is-image="true" :is-content="true" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3>Why Me Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="" name="why_me_section">
                <VnwaMutipleLink v-model="appearanceData.why_me_section" :is-icon="true"
                  iconsLink="https://icones.js.org/collection/emojione" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3>Short About Section</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="Title" name="short_about_section.title">
                <UInput v-model="appearanceData.short_about_section.label" />
              </UFormField>
              <UFormField label="Content" name="short_about_section.content">
                <VnwaEditor v-model="appearanceData.short_about_section.content" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <VnwaMetaSeoForm :meta="appearanceData.meta" @update:errors="handleErrors" />

        <UButton type="submit" icon="mdi:content-save" :loading="appearanceUpdateStatus == 'pending'">
          {{$t('vnwa.save')}}
        </UButton>
      </UForm>

    </VnwaCard>
  </div>
</template>

<script lang="ts" setup>
import { UTextarea } from '#components';
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
definePageMeta({
  title: 'Home Page Manager'
})

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
  brand_section: {
    label: string;
    image_url: string;
    to: string;
  }[];
  feedback_section: {
    label: string;
    image: string;
    content: string;
  }[];
  why_me_section: {
    icon: string;
    label: string;
    content: string;
  }[];
  short_about_section: {
    label: string;
    content: string;
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
  brand_section: [],
  feedback_section: [],
  why_me_section: [],
  short_about_section: {
    label: '',
    content: '',
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


const { refresh, status: loadDataStatus } = await useHttp<any>("vnwa/appearance/home_page/load-data", {
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
      appearanceData.brand_section = data.brand_section ?? [];
      appearanceData.feedback_section = data.feedback_section ?? [];
      appearanceData.why_me_section = data.why_me_section ?? [];
      appearanceData.short_about_section = {
        label: data.short_about_section?.label ?? '',
        content: data.short_about_section?.content ?? '',
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

const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/home_page/update", {
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
