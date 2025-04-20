<script setup>
const localePath = useLocalePath()
const { t } = useI18n()
const items = computed(() => {
  return [
    [
      {
        label: t('vnwa.dashboard'),
        icon: 'i-heroicons-solid:home',
        to: localePath('/vnwa/dashboard'),  // Dùng localePath
      },
      {
        label: t('vnwa.project_manager'),
        icon: 'i-lucide-box',
        children: [
          {
            label: t('vnwa.project'),
            to: localePath('/vnwa/project-manager/project'),  // Dùng localePath
          },

        ],
      },
      {
        label: t('vnwa.blog_manager'),
        icon: 'material-symbols:newspaper',
        children: [
          {
            label: t('vnwa.category'),
            to: localePath('/vnwa/blog/categories'),  // Dùng localePath
          },

        ],
      },


      {
        label: t('vnwa.sidebarVMedia'),
        icon: 'material-symbols:folder-managed',
        to: localePath('/vnwa/vmedia'),  // Dùng localePath
      },
      {
        label: t('vnwa.contact'),
        icon: 'material-symbols:stacked-email-rounded',
        to: localePath('/vnwa/contacts'),  // Dùng localePath
      },
      {
        label: t('vnwa.appearance'),
        icon: 'i-lucide-box',
        children: [
          {
            label: t('vnwa.web_manager'),
            to: localePath('/vnwa/appearance/web-manager'),  // Dùng localePath
          },
          {
            label: t('vnwa.home_page_manager'),
            to: localePath('/vnwa/appearance/home-page'),  // Dùng localePath
          },
        ],
      },
    ]
  ]
})

</script>


<template>
  <aside class="w-[250px] bg-[#1C1C1F] border-r border-gray-800 px-2 py-3 ">

    <UNavigationMenu color="vnwa" orientation="vertical" :items="items"
      :ui="{ link: 'text-base font-medium font-mono' }" class="data-[orientation=vertical]:w-full  ">

      <template #item-label="{ item }">
        <span class="capitalize">
          {{ item.label }}
        </span>
      </template>
    </UNavigationMenu>
  </aside>
</template>
