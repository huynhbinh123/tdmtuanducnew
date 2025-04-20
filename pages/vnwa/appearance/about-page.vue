<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="col-span-12 lg:col-span-4">
          <div class="text-lg font-semibold mb-2">About Page Manger </div>
        </div>
      </template>
      <UForm :validate="validate" :state="appearanceData" class="space-y-4" @submit="onSubmit">

        <UCard>
          <template #header>
            <h3>Top Banner</h3>
          </template>
          <div class="space-y-4">

            <div class="grid grid-cols-1 gap-4">

              <UFormField label="  Image" name="image">
                <VnwaInputImage v-model="appearanceData.image" />
              </UFormField>
              <UFormField label="Title" name="title">
                <UInput v-model="appearanceData.title" />
              </UFormField>
              <UFormField label="Sub Title" name="subTitle">
                <UInput v-model="appearanceData.subTitle" />
              </UFormField>
              <UFormField label="Content" name="content">
                <VnwaEditor v-model="appearanceData.content" />
              </UFormField>

            </div>


          </div>

        </UCard>
        <UCard>
          <template #header>
            <h3>Teams</h3>
          </template>
          <div class="space-y-4">
            <div>
              <UFormField label="" name="teams">
                <VnwaMutipleLink v-model="appearanceData.teams" :is-image="true" />
              </UFormField>
            </div>





          </div>

        </UCard>



        <UCard>
          <template #header>
            <h3>Meta Seo</h3>
          </template>
          <div class="space-y-4">
            <div>
              <UFormField label="Meta Image" name="meta_image">
                <VnwaInputImage v-model="appearanceData.meta.image" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Meta Title" name="meta_title">
                <UInput v-model="appearanceData.meta.title" />
              </UFormField>
            </div>

            <div>
              <UFormField label="Meta Description" name="meta_desc">
                <UTextarea v-model="appearanceData.meta.desc" />
              </UFormField>
            </div>





          </div>

        </UCard>


        <UButton type="submit" icon="mdi:content-save" :loading="appearanceUpdateStatus == 'pending'">
          Submit
        </UButton>
      </UForm>

    </VnwaCard>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
useSeoMeta({
  title: 'About Page Manager'
})
type AppearanceData = {
  image: string;
  title: string;
  subTitle: string;
  content: string;
  teams: {
    label: string;
    to: string;
    image: string;
  }[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};

const appearanceData = reactive<Partial<AppearanceData>>({
  image: '',
  title: '',
  subTitle: '',
  content: '',
  teams: [],
  meta: {
    title: '',
    desc: '',
    image: '',
  },

});



const { refresh, status: loadDataStatus } = useHttp<any>("vnwa/appearance/about-page/load-data", {
  async onResponse({ response }) {
    const data = response._data?.data;
    appearanceData.image = data.image;
    appearanceData.title = data.title;
    appearanceData.subTitle = data.subTitle;
    appearanceData.content = data.content;
    appearanceData.teams = data.teams;
    appearanceData.meta.title = data.meta.title;
    appearanceData.meta.image = data.meta.image;
    appearanceData.meta.desc = data.meta.desc;

  }
});


const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/about-page/update", {
  method: "POST",
  body: appearanceData,
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

  if (!state.title) {
    errors.push({ name: 'title', message: 'Trường Title không được để trống' });
  }

  if (!state.subTitle) {
    errors.push({ name: 'subTitle', message: 'Trường subTitle không được để trống' });
  }

  if (!state.content) {
    errors.push({ name: 'content', message: 'Trường content không được để trống' });
  }

  if (!state.image) {
    errors.push({ name: 'image', message: 'Vui lòng chọn ảnh nền' });
  }



  // Kiểm tra trường meta SEO
  if (!state.meta.title || state.meta.title.length > 100) {
    errors.push({ name: 'meta_title', message: 'Meta title không được để trống và tối đa 100 ký tự' });
  }
  if (!state.meta.desc || state.meta.desc.length > 300) {
    errors.push({ name: 'meta_desc', message: 'Meta description không được để trống và tối đa 300 ký tự' });
  }
  if (!state.meta.image || state.meta.image.length < 5) {
    errors.push({ name: 'meta_image', message: 'Meta image không được để trống ' });
  }





  return errors;
};



const toast = useToast()
async function onSubmit(event: FormSubmitEvent<any>) {
  formSubmit();
}


</script>

<style></style>