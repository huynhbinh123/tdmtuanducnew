<template>
  <VnwaCard :is-loading="status == 'pending'">
    <template #header>
      <div class="">
        <div class="text-lg font-semibold mb-2">Profile </div>
        <div class="text-sm opacity-80">
          Update email, phone, address, working time,..
        </div>

      </div>
      <VnwaGroupLang :locale="locale" @update:locale="locale = $event" />


    </template>
    <UForm :validate="validate" :state="appearanceData" class="space-y-4" @submit="onSubmit">
      <UCard>
        <UFormField label="Phone" name="phone">
          <UInput v-model="appearanceData.phone" />
        </UFormField>
      </UCard>
      <UCard>
        <UFormField label="Live Chat Url" name="live_chat_url">
          <UInput v-model="appearanceData.live_chat_url" />
        </UFormField>
      </UCard>

      <UCard>
        <template #header>
          <h3>Socials</h3>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField label="" name="social">
              <VnwaMutipleLink v-model="appearanceData.social" :is-icon="true" :is-to="true"
                iconsLink="https://icones.js.org/collection/simple-icons" />
            </UFormField>


          </div>



        </div>

      </UCard>
      <UCard>
        <template #header>
          <h3>Tags</h3>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4">
            <UFormField label="" name="tags">
              <VnwaMutipleLink v-model="appearanceData.tag" :is-to="true" />
            </UFormField>


          </div>



        </div>

      </UCard>


      <div class="flex items-center justify-end">

        <UButton  aria-label="Vinawebapp Button"  type="submit" icon="mdi:content-save" :loading="appearanceUpdateStatus == 'pending'">
          Save
        </UButton>
      </div>
    </UForm>

  </VnwaCard>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui';



interface AppearanceData {
  phone: string;
  live_chat_url:string;
  social: {
    label: string;
    icon: string;
    to: string;
  }[];
  tag: {
    label: string;
    to: string;
  }[];
}

const appearanceData = reactive<Partial<AppearanceData>>({
  phone: '',
  social: [],
  tag: [],

});

const locale = ref<string>(useRuntimeConfig().public.appLang);


const params = computed(() => ({
  locale: locale.value
}));


const { refresh, status } = useHttp<any>("vnwa/appearance/profile/load-data", {
  method: "GET",
  params: params,
  watch: [params],
  immediate: true,
  async onResponse({ response }) {
    const data = response._data?.data;
    appearanceData.phone = data.phone;
    appearanceData.live_chat_url = data.live_chat_url;
    
    appearanceData.social = data.social;
    appearanceData.tag = data.tag;
  }
});



const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/profile/update", {
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



const validate = (state: any): FormError[] => {
  const errors: FormError[] = [];



  return errors;
};


const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  formSubmit();
}




</script>

<style></style>