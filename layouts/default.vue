<template>
  <div class="bg-black min-h-screen vnwa_client relative">
    <AppHeader @open-contact-modal="openContactModal()" :logo_full="data.logo_full" :logo_icon="data.logo_icon" />
    <main class="min-h-screen relative">
      <slot />
    </main>
    <AppFooter  :data="data" />
    <AppLetTalk @open-contact-modal="openContactModal()" :live_chat_url="data.profile.live_chat_url"  :logo_icon="data.logo_icon" />
  </div>
</template>

<script lang="ts" setup>
import { ModalContact } from '#components';
import '@/assets/css/vinawebapp.com.scss'
interface AppearanceData {
  logo_full?: string;
  logo_icon?: string;
  favicon?: string;
  profile: {
    live_chat_url: string;
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
const overlay = useOverlay()
const openContactModal = () => {
  const modal = overlay.create(ModalContact);
  modal.open({
    onSuccess() {
      modal.close();
    }
  });

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
      { rel: 'icon', href: useRuntimeConfig().public.storageBase + data.value.favicon }
    ]
  })
}






</script>

<style></style>