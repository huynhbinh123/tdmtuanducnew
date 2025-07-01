<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="">
          <div class="text-lg font-semibold mb-2">About Page Manger </div>
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
            <h3>Services</h3>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <UFormField label="" name="services">
                <VnwaMutipleLink v-model="appearanceData.services" :is-icon="true" :is-bg-color="true"
                  :is-desc="true" />
              </UFormField>
            </div>
          </div>
        </UCard>
        <UCard>
          <UFormField label="Short About" name="short_about">
            <VnwaEditor v-model="appearanceData.short_about" />
          </UFormField>
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
  title: 'About Page Manager'
})

interface AppearanceData {
  hero_section: {
    title: string;
    slogan: string;
  };
  services: {
    label: string;
    icon: string;
    bg_color: string;
    desc: string;
  }[];
  short_about: string;

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
  services: [],
  short_about: '',
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


const { refresh, status: loadDataStatus } = await useHttp<any>("vnwa/appearance/about_page/load-data", {
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
      appearanceData.services = data.services ?? [
        {
          label: "No Hidden Costs",
          icon: "icon-park-outline:electronic-locks-close",
          bg_color: "#facc15",
          desc: "When we quote a price for your website, we stick to it. No surprises, no additional costs."
        },
        {
          label: "Cutting-edge Technology",
          icon: "jam:microchip",
          bg_color: "#a855f7",
          desc: "We hand-code to create fast, secure, reliable, and accessible websites."
        },
        {
          label: "Your Website",
          icon: "gg:website",
          bg_color: "#ec4899",
          desc: "Our designs are always customized to your brand, no templates, exclusively for you."
        },
        {
          label: "Long-term Partnership",
          icon: "fluent-emoji:briefcase",
          bg_color: "#3f1d38",
          desc: "We invest in your success, offering lifetime warranties and upgrades."
        },
        {
          label: "Extensive Experience",
          icon: "emojione:military-medal",
          bg_color: "#facc15",
          desc: "We have a team of highly experienced and carefully selected personnel."
        },
        {
          label: "Practical Approach",
          icon: "twemoji:thumbs-up-dark-skin-tone",
          bg_color: "#fbbf24",
          desc: "Vinawebapp.com's working style is straightforward, honest, and to the point."
        },
        {
          label: "Strategic",
          icon: "fluent-emoji:chart-increasing-with-yen",
          bg_color: "#84cc16",
          desc: "Our web design is based on data-driven strategy."
        },
        {
          label: "Prompt Communication",
          icon: "icon-park-outline:message-success",
          bg_color: "#22c55e",
          desc: "Maintaining close contact throughout the web design project. We're always available for daily calls and meetings."
        },
        {
          label: "Timely Delivery",
          icon: "fluent-emoji:dna",
          bg_color: "#ef4444",
          desc: "Project implementation and completion times are clearly defined."
        },
        {
          label: "Extensive Experience",
          icon: "material-symbols:screen-search-desktop-sharp",
          bg_color: "#14b8a6",
          desc: "We have a team of highly experienced and carefully selected personnel."
        }
      ];;
      appearanceData.short_about = data.short_about ?? '';
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

const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/about_page/update", {
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
