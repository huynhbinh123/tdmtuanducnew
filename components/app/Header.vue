<template>
  <div>
    <header class="page-hover  w-full h-full  ">
      <UContainer class="h-full py-0 lg:py-0">
        <div class="flex items-center justify-between h-full gap-4">
          <div
            class="logo flex items-center justify-start max-h-full relative overflow-hidden   ">
            <div></div>
            <NuxtLinkLocale to="/" aria-label="home link" class="truncate p max-h-full">
              <div class="max-h-full">


                <NuxtImg v-if="logo_full" format="webp" :src="logo_full" width="200" height="60"
                  class=" lg:h-[60px] w-auto" :srcset="$storage(logo_icon) + ' 768w,' + $storage(logo_full) + ' 1200w'"
                  alt="Vinawebapp.com" />

              </div>
            </NuxtLinkLocale>
          </div>
          <div>
            <ul class="header-menu  flex items-center gap-1 h-full justify-end text-white">
              <li class="" v-for="(item, index) in menu" :key="index">
                <NuxtLinkLocale :to="item.to" aria-label="menu link">
                  <button class="flex items-center justify-start gap-2 relative text-base px-3 py-2 cursor-pointer uppercase">
                    <UIcon :name="item.icon" color="white" class="size-6" /> {{ $t(item.label) }}
                  </button>
                </NuxtLinkLocale>
              </li>
              <li class="ps-3">
                <AppLocale />
              </li>
              <li class="ps-3">
                <button
                  class=" text-xl rounded-xl  border border-primary-500 text-white  px-3 py-2  flex items-center justify-center gap-1 cursor-pointer  font-bold">
                  <span>Contact</span>
                  <UIcon name="material-symbols:keyboard-double-arrow-right-rounded" class="size-8" />
                </button>
              </li>
            </ul>

          </div>
        </div>

      </UContainer>
    </header>

  </div>
</template>

<script lang="ts" setup>
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
    to: '/'
  },
  {
    icon: 'codicon:record-keys',
    label: 'process',
    to: '/process'
  },
  {
    icon: 'mynaui:users-group',
    label: 'about',
    to: '/'
  },
  {
    icon: 'tabler:brand-blogger',
    label: 'blog',
    to: '/'
  }
]
</script>

<style scoped></style>