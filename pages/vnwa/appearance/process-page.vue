<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="">
          <div class="text-lg font-semibold mb-2">Process Page Manger </div>
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



        <UCard>
          <template #header>
            <h3>Process</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="" name="process">
                <VnwaMutipleLink v-model="appearanceData.process" label-input-desc="Time Line" :is-icon="true" :is-primary-label="true" :is-text-color="true" :is-bg-color="true"
                  :is-desc="true" :is-content="true" />
              </UFormField>
            </div>
          </div>
        </UCard>





        <VnwaMetaSeoForm :meta="appearanceData.meta" @update:errors="handleErrors" />

        <UButton  aria-label="Vinawebapp Button"  type="submit" icon="mdi:content-save" :loading="appearanceUpdateStatus == 'pending'">
          {{ $t('vnwa.save') }}
        </UButton>
      </UForm>

    </VnwaCard>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
definePageMeta({
  title: 'Process Page Manager'
})

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
  process: {
    label: string;
    content: string;
    icon: string;
    primary_label: string;
    bg_color: string;
    text_color: string;
    desc: string;
  }[];

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
  process: [],
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


const { refresh, status: loadDataStatus } = await useHttp<any>("vnwa/appearance/process_page/load-data", {
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
      appearanceData.process = data.process ?? [
  {
    "image": null,
    "label": "Initial Consultation & Strategy",
    "to": "/",
    "content": "We listen to your business goals and needs. Analyze the market, target audience, and propose a design direction that aligns with your vision.",
    "icon": "ph:handshake-light",
    "primary_label": "Start",
    "desc": "Today",
    "bg_color": "#6494D3",
    "text_color": "#D8D5F6"
  },
  {
    "image": null,
    "label": "Planning & Quotation",
    "to": "/",
    "content": "We build a sitemap, establish a clear timeline, and provide a transparent quote. A clear contract is signed to officially kick off the project.",
    "icon": "carbon:task",
    "primary_label": "Planning",
    "desc": "Today",
    "bg_color": "#EAE95D",
    "text_color": "#180101"
  },
  {
    "image": null,
    "label": "UI/UX Design",
    "to": "/",
    "content": "We create smooth user experiences (UX) paired with elegant, modern user interfaces (UI) that reflect your brand identity.",
    "icon": "material-symbols:design-services-outline",
    "primary_label": "Design",
    "desc": "Day 2,3,4",
    "bg_color": "#5CAFBC",
    "text_color": "#0D0C0C"
  },
  {
    "image": null,
    "label": "Website Development",
    "to": "/",
    "content": "We develop the site based on the finalized design, ensuring both functionality and performance across all platforms.",
    "icon": "mdi:code-tags",
    "primary_label": "Development",
    "desc": "Day 5–11",
    "bg_color": "#6D5991",
    "text_color": "#FFFFFF"
  },
  {
    "image": null,
    "label": "Testing & Refinement",
    "to": "/",
    "content": "We run comprehensive tests for speed, security, browser/device compatibility, and make final adjustments based on feedback.",
    "primary_label": "Testing",
    "icon": "fluent:accessibility-checkmark-20-regular",
    "desc": "Day 12",
    "bg_color": "#D97617",
    "text_color": "#FFFFFF"
  },
  {
    "image": null,
    "label": "Handover & User Training",
    "to": "/",
    "content": "We deliver the source code, admin accounts, and provide detailed documentation and training on how to use the system.",
    "primary_label": "Delivery",
    "icon": "mdi:clipboard-check-outline",
    "desc": "Day 13",
    "bg_color": "#83C039",
    "text_color": "#FFFFFF"
  },
  {
    "image": null,
    "label": "Maintenance & Long-Term Support",
    "to": "/",
    "content": "We provide free technical support, routine maintenance, and upgrades to meet your business growth.",
    "primary_label": "Support",
    "icon": "mdi:lifebuoy",
    "desc": "Lifelong",
    "bg_color": "#B655D8",
    "text_color": "#FFFFFF"
  }
]
;
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

const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/process_page/update", {
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
