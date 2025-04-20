<template>
    <div>
        <div class="flex items-center justify-between gap-4">
            <UBreadcrumb divider="/" :links="mergedLinks" />
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  type BreadcrumbLink = {
    label: string;
    to?: string;
  };
  
  const props = defineProps({
    links: {
      type: Array as () => BreadcrumbLink[], // Định nghĩa kiểu mảng là BreadcrumbLink[]
      default: () => [],
    },
  });
  
  const defaultLinks: BreadcrumbLink[] = [
    { label: 'Home', to: '/vnwa/dashboard' },
  ];
  
  // Kết hợp mảng `defaultLinks` với `props.links`
  const mergedLinks: BreadcrumbLink[] = [...defaultLinks, ...props.links];
  </script>
  
  <style>
  /* CSS của bạn */
  </style>
  