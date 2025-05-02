<template>
  <div>
    <VnwaCard :is-loading="loadDataStatus == 'pending'">
      <template #header>
        <div class="col-span-12 lg:col-span-4">
          <div class="text-lg font-semibold mb-2">Courses Page Manger </div>
        </div>
      </template>
      <UForm :validate="validate" :state="appearanceData" class="space-y-4" @submit="onSubmit">

        <UCard>
          <template #header>
            <h3>Top Banner</h3>
          </template>
          <div class="space-y-4">

            <div class="grid grid-cols-1 gap-4">

              <UFormField label=" Background Image" name="image">
                <VnwaInputImage v-model="appearanceData.banner.image" />
              </UFormField>
              <UFormField label="Title" name="title">
                <UTextarea v-model="appearanceData.banner.title" />
              </UFormField>
              <UFormField label="Slogan" name="slogan">
                <UInput v-model="appearanceData.banner.slogan" />
              </UFormField>
              <UFormField label="Description" name="desc">
                <UTextarea v-model="appearanceData.banner.desc" />
              </UFormField>

            </div>


          </div>

        </UCard>
        <UCard>
          <template #header>
            <h3>Detail</h3>
          </template>
          <div class="space-y-4">
            <div>
              <UFormField label="Content" name="content">
                <VnwaMutipleLink v-model="appearanceData.items" :is-content="true" :is-image="true" />
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
definePageMeta({
  title: 'Courses Page Manager'
})
type AppearanceData = {
  banner: {
    image: string;
    title: string;
    slogan: string;
    desc: string;
  };
  items: {
    label: string;
    to: string;
    content: string;
    image: string;
  }[];
  meta: {
    title: string;
    desc: string;
    image: string;
  };
};

const appearanceData = reactive<Partial<AppearanceData>>({
  banner: {
    image: '',
    title: '',
    slogan: '',
    desc: '',
  },
  items: [],
  meta: {
    title: '',
    desc: '',
    image: '',
  },

});



const { refresh, status: loadDataStatus } = useHttp<any>("vnwa/appearance/courses-page/load-data", {
  async onResponse({ response }) {
    const data = response._data?.data;

    appearanceData.banner.image = data.banner.image;
    appearanceData.banner.title = data.banner.title;
    appearanceData.banner.slogan = data.banner.slogan;
    appearanceData.banner.desc = data.banner.desc;
    appearanceData.items = data.items;
    appearanceData.meta.title = data.meta.title;
    appearanceData.meta.image = data.meta.image;
    appearanceData.meta.desc = data.meta.desc;

  }
});


const { refresh: formSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/courses-page/update", {
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

  if (!state.banner.title) {
    errors.push({ name: 'title', message: 'Trường Title không được để trống' });
  }

  if (!state.banner.slogan) {
    errors.push({ name: 'slogan', message: 'Trường Slogan không được để trống' });
  }

  if (!state.banner.image) {
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