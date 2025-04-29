<script lang="ts" setup>
const auth = useAuthStore();

if (auth.logged) {
try {
  await auth.fetchUser();
} catch (error) {
  await auth.logout();
}
}
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)
useHead({
  htmlAttrs: {
    lang,
    dir
  }
})

</script>

<template>
  <UApp :locale="locales[locale]">



    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>


    <NuxtLoadingIndicator class="!opacity-100" :throttle="0" />
  </UApp>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>