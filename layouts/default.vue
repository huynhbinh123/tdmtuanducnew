<template>
  <div class="bg-black min-h-screen">
    <AppHeader :logo_full="data.logo_full" :logo_icon="data.logo_icon" />
    <main class="min-h-screen relative">
      <slot />
    </main>
    <AppFooter :data="data" />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/client.css'
interface AppearanceData {
  logo_full?: string;
  logo_icon?: string;
  favicon?: string;
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
const { data } = await useHttp<AppearanceData>('load-data-layout', {
  method: 'GET',
  params: {
    locale: locale
  }
});
if (data.value.favicon) {
  useHead({
    link: [
      { rel: 'icon', href: data.value.favicon }
    ]
  })
}






</script>

<style></style>