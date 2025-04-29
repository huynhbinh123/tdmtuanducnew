<script setup>
const localePath = useLocalePath()
const { t } = useI18n()
const items = computed(() => {
  return [
    [
      {
        label: t('dashboard'),
        icon: 'i-heroicons-solid:home',
        to: localePath('/dashboard'),  // Dùng localePath
      },
      // {
      //   label: t('project_manager'),
      //   icon: 'i-lucide-box',
      //   children: [
      //     {
      //       label: t('project'),
      //       to: localePath('/project-manager/project'),  // Dùng localePath
      //     },

      //   ],
      // },
      {
        label: t('tag_manager'),
        icon: 'heroicons:tag-20-solid',
        to: localePath('/tag/list'),  // Dùng localePath
      },
      {
        label: t('blog_manager'),
        icon: 'material-symbols:newspaper',
        children: [
          {
            label: t('category'),
            to: localePath('/blog/categories'),  // Dùng localePath
          },
          {
            label: t('post'),
            to: localePath('/blog/post/list'),  // Dùng localePath
          },
        ],
      },


      {
        label: t('sidebarVMedia'),
        icon: 'material-symbols:folder-managed',
        to: localePath('/vmedia'),  // Dùng localePath
      },
      {
        label: t('contact'),
        icon: 'material-symbols:stacked-email-rounded',
        to: localePath('/contacts'),  // Dùng localePath
      },
      {
        label: t('appearance'),
        icon: 'i-lucide-box',
        children: [
          {
            label: t('web_manager'),
            to: localePath('/appearance/web-manager'),  // Dùng localePath
          },
          {
            label: t('home_page_manager'),
            to: localePath('/appearance/home-page'),  // Dùng localePath
          },
        ],
      },
    ]
  ]
})

</script>


<template>
  <aside class="w-[250px] bg-[#1C1C1F] border-r border-gray-800 px-2 py-3 ">
    <div class="flex items-center justify-center mb-3">
      <VnwaLogo class="lg:flex-1" />
    </div>
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
