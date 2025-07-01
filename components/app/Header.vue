<template>
  <header class="  w-full h-full  ">
    <UContainer class="h-full py-0 lg:py-0">
      <div class="flex items-center justify-between h-full gap-4">
        <div class="logo flex items-center justify-start max-h-full relative overflow-hidden   ">
          <div></div>
          <NuxtLinkLocale to="/" aria-label="home link" class="truncate max-h-full">
            <div class="max-h-full">
              <!-- Logo dạng ngang (desktop) -->
              <NuxtImg v-if="logo_full" :src="logo_full" format="webp" alt="Vinawebapp.com" width="200" height="60"
                sizes="(max-width: 1024px) 150px, 200px" class="  h-[60px] w-auto" />

            
            </div>
          </NuxtLinkLocale>

        </div>
        <div class="lg:block hidden">
          <ul class="header-menu  flex items-center gap-1 h-full justify-end text-white">
            <li class="" v-for="(item, index) in menu" :key="index">
              <NuxtLinkLocale :to="item.to" aria-label="menu link">
                <button
                  class="flex items-center justify-start gap-2 relative text-base px-3 py-2 cursor-pointer uppercase">
                  <UIcon :name="item.icon" color="white" class="size-6" /> {{ $t(item.label) }}
                </button>
              </NuxtLinkLocale>
            </li>
            <li class="ps-3">
              <AppLocale />
            </li>
            <li class="ps-3">
              <button aria-label="Vinawebapp Button" @click="openContactModal()"
                class=" text-xl rounded-xl  border border-primary-500 text-white  px-3 py-2  flex items-center justify-center gap-1 cursor-pointer  font-bold">
                <span>
                  {{ $t('get_in_touch') }} </span>
                <UIcon name="material-symbols:keyboard-double-arrow-right-rounded" class="size-8" />
              </button>
            </li>
          </ul>

        </div>
        <div class="lg:hidden block">
          <ul class="flex items-center justify-end gap-2">
            <li>
              <AppLocale />
            </li>
            <li>
              <UButton aria-label="Vinawebapp Button" @click="openMenu()" icon="material-symbols:menu" variant="ghost"
                color="info" size="xl" />
            </li>
          </ul>
        </div>
      </div>

    </UContainer>

  </header>

</template>

<script lang="ts" setup>
import { ModalMenu } from '#components';

defineProps({
  logo_full: {
    type: String,
    default: ''
  },
  logo_icon: {
    type: String,
    default: ''
  }
})


const menu = [
  {
    icon: 'fa6-solid:microchip',
    label: 'project',
    to: '/project'
  },
  {
    icon: 'codicon:record-keys',
    label: 'process',
    to: '/process'
  },
  {
    icon: 'mynaui:users-group',
    label: 'about',
    to: '/about'
  },
  {
    icon: 'tabler:brand-blogger',
    label: 'blog',
    to: '/blog'
  }
]
const overlay = useOverlay()
const openMenu = () => {
  const modal = overlay.create(ModalMenu);
  modal.open({
    menu: menu,
    onSuccess() {
      modal.close();
    }
  });

}
const emit = defineEmits(['openContactModal']);
const openContactModal = () => {
  emit('openContactModal');
};


</script>

<style scoped></style>