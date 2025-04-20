<template>
  <VnwaCard :is-loading="status == 'pending'">
    <template #header>

      <div class="col-span-12 lg:col-span-4">
        <div class="text-lg font-semibold mb-2">Logo </div>
        <div class="text-sm opacity-80">
          Update logo and favicon
        </div>

      </div>
    </template>

    <div class="col-span-12 lg:col-span-8">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <UFormField label="Logo Full" name="logo_full" class="flex items-center justify-center gap-4">
            <div class="p-2">
              <VnwaInputImage v-model="appearanceData.logo_full" :resize="[200,0]" width="300" height="300" />
            </div>
          </UFormField>
        </div>
        <div>
          <UFormField label="Logo Icon" name="logo_icon" class="flex items-center justify-center gap-4">
            <div class="p-2">
              <VnwaInputImage v-model="appearanceData.logo_icon" :resize="[80,80]" width="300" height="300" />
            </div>
          </UFormField>
        </div>
        <div>
          <UFormField label="Favicon" name="favicon" class="flex items-center justify-center gap-4">
            <div class="p-2">
              <VnwaInputImage v-model="appearanceData.favicon" :resize="[60,60]" width="300" height="300" />
            </div>
          </UFormField>
        </div>

      </div>

    </div>

    <template #footer>
      <div class="">
        <div class="flex items-center justify-end">
          <UButton :loading="appearanceUpdateStatus == 'pending'" @click="onSubmit()" :label="$t('save')"
            icon="mdi:content-save" />
        </div>
      </div>
    </template>

  </VnwaCard>
</template>

<script lang="ts" setup>


const appearanceData = reactive({
  logo_full: '',
  logo_icon: '',
  favicon: '',
});
const { refresh, status } = useHttp<any>("vnwa/appearance/logo/load-data", {
  async onResponse({ response }) {
    const data = response._data?.data;
    appearanceData.logo_full = response._data?.data.logo_full;
    appearanceData.logo_icon = response._data?.data.logo_icon;
    appearanceData.favicon = response._data?.data.favicon;

  }
});


const { refresh: onSubmit, status: appearanceUpdateStatus } = useHttp<any>("vnwa/appearance/logo/update", {
  method: "POST",
  body: appearanceData,
  immediate: false,
  watch: false,
  async onFetchResponse({ response }) {


    await refresh();


  }
});




</script>

<style></style>