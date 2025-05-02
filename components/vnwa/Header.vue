<script lang="ts" setup>
const auth = useAuthStore();
const { $storage } = useNuxtApp();
const route = useRoute()

const userItems = [
  [
    {
      slot: "overview",
    },
  ],
  [
    {
      label: "Account",
      to: "/vnwa/account/general",
      icon: "i-heroicons-user",
    },
    {
      label: "Devices",
      to: "/vnwa/account/devices",
      icon: "i-heroicons-device-phone-mobile",
    },
  ],
  [
    {
      label: "Sign out",
      onSelect() {
        auth.logout();
      },
      class: 'cursor-pointer',
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];

const items = [

  {
    label: 'Home',
    icon: 'material-symbols-light:family-home',
    to: '/',
    target: '_blank'
  },

]

const isSideOpen = ref(false);
</script>
<template>
  <header
    class="h-[60px] bg-slate-950 backdrop-blur -mb-px sticky top-0 z-50 border-b border-dashed border-gray-200/80 dark:border-gray-800/80">

    <div class="px-3 flex items-center justify-between gap-3 h-16 py-2">


      <div class="flex items-center jusitfy-between gap-4 w-full">
        <h1 class="text-white text-xl font-bold">
          {{ route.meta.title || '' }}
        </h1>
        <div class="flex items-center justify-end gap-3 lg:flex-1">
          <UNavigationMenu orientation="horizontal" :items="items" class="hidden lg:block" />

          <VnwaTheme />
          <VnwaLocale />

          <UDropdownMenu v-if="auth.logged" :items="userItems" :content="{ side: 'bottom', align: 'end' }">
            <ULink class="cursor-pointer">
              <UAvatar icon="i-heroicons-user" class="rounded-lg" size="md" :src="$storage(auth.user.avatar)"
                :alt="auth.user.name" />
            </ULink>

            <template #overview>
              <div class="text-left">
                <p>Signed in as</p>
                <p class="truncate font-medium text-neutral-900 dark:text-white">
                  {{ auth.user.email }}
                </p>
              </div>
            </template>
          </UDropdownMenu>
          <NuxtLinkLocale v-else to="/vnwa/login">
            <UButton label="Log In"  variant="ghost" color="neutral" />
          </NuxtLinkLocale>


          <UDrawer v-model:open="isSideOpen" direction="right">
            <UButton class="lg:hidden" variant="ghost" color="neutral" icon="i-heroicons-bars-3" />
            <template #content>
              <div class="me-5">
                <div
                  class="flex w-3xs items-center justify-between gap-3 h-16 py-2 border-b border-dashed border-gray-200/80 dark:border-gray-800/80">
                  <VnwaLogo />
                  <UButton variant="ghost" color="neutral" icon="i-heroicons-x-mark-20-solid"
                    @click="isSideOpen = false" />
                </div>

                <div class="flex-1 py-4 sm:py-6">
                  <UNavigationMenu orientation="vertical" :items="items" />
                </div>
              </div>
            </template>
          </UDrawer>
        </div>

      </div>

    </div>
  </header>

</template>
