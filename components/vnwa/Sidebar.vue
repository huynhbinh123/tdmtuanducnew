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
        to: localePath('/vnwa/project/list'),  // Dùng localePath
        icon: 'i-lucide-box',
      },
      {
        label: t('vnwa.tag_manager'),
        icon: 'heroicons:tag-20-solid',
        to: localePath('/vnwa/tag/list'),  // Dùng localePath
      },
      {
        label: t('vnwa.blog_manager'),
        icon: 'material-symbols:newspaper',
        children: [
          {
            label: t('vnwa.category'),
            to: localePath('/vnwa/blog/categories'),  // Dùng localePath
          },
          {
            label: t('vnwa.post'),
            to: localePath('/vnwa/blog/post/list'),  // Dùng localePath
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
          {
            label: t('vnwa.process_page_manager'),
            to: localePath('/vnwa/appearance/process-page'),  // Dùng localePath
          },
          {
            label: t('vnwa.about_page_manager'),
            to: localePath('/vnwa/appearance/about-page'),  // Dùng localePath
          },
          {
            label: t('vnwa.blog_page_manager'),
            to: localePath('/vnwa/appearance/blog-page'),  // Dùng localePath
          },
          {
            label: t('vnwa.project_page_manager'),
            to: localePath('/vnwa/appearance/project-page'),  // Dùng localePath
          },
          {
            label: t('vnwa.contact_page_manager'),
            to: localePath('/vnwa/appearance/contact-page'),  // Dùng localePath
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
