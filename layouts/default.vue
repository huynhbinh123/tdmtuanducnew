<template>
  <div class="bg-black min-h-screen">
    <AppHeader :logo_full="appearanceData.logo_full" :logo_icon="appearanceData.logo_icon" />
    <slot />
    <AppFooter :data="appearanceData" />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/client.css'
interface AppearanceData {
  logo_full?: string;
  logo_icon?: string;
  favicon?: string;
  favicon_type?: string;
  profile: {
    phone: string;
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
}
const { locale } = useI18n();
const { data } = await useHttp('load-data-layout', {
  method:'GET',
  params: {
    locale: locale
  }
});
const appearanceData = await data.value as AppearanceData;
useHead({
  link: [
    { rel: 'icon', type: `image/${appearanceData.favicon_type}`, href: useNuxtApp().$storage(appearanceData.favicon) }
  ]
});



</script>

<style></style>